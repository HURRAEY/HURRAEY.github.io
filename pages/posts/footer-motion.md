---
title: Footer 인터랙션 리팩터링 노트
date: 2025/11/25
description: Footer ripple 애니메이션을 React 렌더 사이클에서 분리한 여정.
tag: interaction
author: HURRAEY
---

<figure>
  <figcaption>AS-IS: 기존 Footer ripple 반응 (2025-11-25)</figcaption>
  <video
    src="/media/2025-11-25/화면 녹화 중 2025-11-25 200322.mp4"
    controls
    playsInline
    preload="metadata"
    width="100%"
  />
</figure>

<figure>
  <figcaption>TO-BE: 모션 레이어로 분리한 후 (2025-11-25)</figcaption>
  <video
    src="/media/2025-11-25/화면 녹화 중 2025-11-25 201127.mp4"
    controls
    playsInline
    preload="metadata"
    width="100%"
  />
</figure>

## 두서

Footer에 마우스만 올려도 살짝 버벅거린다는 제보를 받았습니다. 처음엔 “이 정도 애니메이션이면 괜찮지 않을까?”라고 생각했지만, 직접 커서를 움직여 보니 살짝 어색한 딜레이가 느껴졌습니다. `mousemove` 이벤트는 초당 수십 번씩 일어나는데, 매번 React state를 바꾸고 있으니 전체 Footer가 리렌더되는 구조였죠. ripple 효과도 좌표를 `key`로 써서 매번 새 컴포넌트를 만들고 있었습니다. “이걸 그대로 두면 인터랙션이 무거울 수밖에 없겠구나”라는 결론이 자연스럽게 나왔습니다.

이번 글에서는 그 고민의 흔적과, 어떻게 애니메이션 레이어를 React 렌더 사이클에서 떼어냈는지 한 걸음씩 정리해 보겠습니다.

---

## Step 1. 상태를 모션 레이어로 옮기기

처음 시도는 throttling을 걸어 호출 빈도를 줄이는 것이었습니다. 하지만 아무리 간격을 늘려도 state 기반 구조는 그대로였고, ripple을 재사용하지 않는 한 재렌더는 계속 발생합니다. 그래서 “Framer Motion이 이미 있는데, 굳이 React state로 좌표를 관리할 이유가 있을까?”라는 질문을 다시 던졌습니다. 답은 `useMotionValue`. 모션 값은 렌더 없이 DOM 스타일을 직접 갱신해 주니, 애니메이션 전용으로 안성맞춤이었습니다.

`src/components/Footer/Footer.tsx`의 핵심.

```
export function Footer() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const intensity = useMotionValue(0);
  const waveOpacity = useSpring(intensity, {
    stiffness: 120,
    damping: 25,
  });
  const rippleX = useSpring(mouseX, { stiffness: 220, damping: 30 });
  const rippleY = useSpring(mouseY, { stiffness: 220, damping: 30 });
  const rippleControls = useAnimationControls();
  const waveBackground = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 30%, transparent 60%)`;
```

좌표와 강도를 모두 모션 값으로 바꾸자 “이제 렌더에 영향을 주지 않고도 애니메이션을 조작할 수 있겠구나”라는 확신이 들었습니다. `useSpring`으로 약간의 탄성을 주어 움직임도 더 자연스럽게 만들었어요.

---

## Step 2. 이벤트 루프에서 애니메이션 재생만 조작하기

다음 고민은 ripple을 어떻게 재사용할 것인가였습니다. 기존 방식은 좌표가 바뀔 때마다 `key`가 달라지며 새 컴포넌트가 생성되어 애니메이션이 초기화됩니다. 대신 `useAnimationControls`를 사용하면 동일한 요소에 대해 애니메이션 시퀀스를 반복해서 재생할 수 있습니다. 그래서 이벤트 핸들러를 아래처럼 재작성했습니다.

```
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (footerRef.current) {
      const rect = footerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
      intensity.set(1);
      rippleControls.stop();
      rippleControls.start({
        width: [0, 400],
        height: [0, 400],
        opacity: [0.8, 0],
        transition: { duration: 1.5, ease: "easeOut" },
      });
    }
  };

  const handleMouseLeave = () => {
    intensity.set(0);
  };
  …
}, [intensity, mouseX, mouseY, rippleControls]);
```

핵심은 두 가지입니다.

1. `mousemove`마다 좌표와 intensity만 업데이트하고, ripple 애니메이션은 컨트롤러로 재생한다.
2. `mouseleave`에서는 intensity만 0으로 내려 wave가 자연스럽게 사라지게 한다.

이렇게 옮겨놓고 나니, `mousemove`가 아무리 빠르게 들어와도 React 렌더는 한 번도 일어나지 않습니다.

---

## Step 3. 렌더 트리에는 정적인 요소만 남기기

마지막 단계는 레이아웃을 최대한 손대지 않는 것입니다. wave 오버레이는 모션 템플릿과 스프링 값을 style에 직접 주입했고, ripple은 단 하나의 `motion.div`만 남겼습니다.

```
<motion.div
  className={styles.waveOverlay}
  style={{
    background: waveBackground,
    opacity: waveOpacity,
  }}
  transition={{
    opacity: { duration: 0.3 },
  }}
/>

<motion.div
  className={styles.ripple}
  style={{
    left: rippleX,
    top: rippleY,
  }}
  initial={{
    width: 0,
    height: 0,
    x: "-50%",
    y: "-50%",
    opacity: 0,
  }}
  animate={rippleControls}
/>
```

wave와 ripple은 더 이상 React state에 묶여 있지 않고, 모션 값이 직접 스타일을 업데이트합니다. 덕분에 Footer 콘텐츠나 그리드 레이아웃 등 나머지 구조는 그대로 유지됩니다.

---

## 마무리

결과적으로, 이번 수정의 핵심은 “애니메이션은 애니메이션 레이어에서 처리하고, React는 정적인 트리 관리에 집중하게 하자”였습니다. `mousemove`처럼 자주 발생하는 이벤트라도 렌더 사이클을 건드리지 않으면 훨씬 가볍고 자연스러운 인터랙션을 만들 수 있습니다. Footer는 더 이상 마우스 움직임마다 리렌더되지 않고, wave/ripple은 부드럽게 따라다닙니다.

혹시 비슷한 패턴의 인터랙션이 있다면 이번 접근법을 그대로 적용해 보세요. 모션 값과 컨트롤러를 활용하면 생각보다 간단하게 렌더 부하를 줄일 수 있습니다.
