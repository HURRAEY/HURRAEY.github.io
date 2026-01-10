export const posts = [
  {
    title: "ZUSTAND SLICE PATTERN FOR AI DAW",
    titleKo: "TypeScript와 Zustand Slice 패턴으로 AI 기반 웹 DAW 상태 관리하기",
    author: "HURRAEY",
    date: "2025-12-01",
    description: "Drop AI 프로젝트에서 Zustand Slice 패턴을 적용하여 복잡한 상태 관리를 모듈화한 경험을 공유합니다. Modular state management with Zustand Slice pattern.",
    tag: "typescript, zustand, react, daw, ai",
    content: `## 목차

1. 왜 Slice 패턴을 사용했을까?
2. Zustand Slices pattern 적용
3. 기존 스토어 수정
   - 변경 전 - 거대한 단일 스토어
   - 변경 후 - ChatSlice
   - 변경 후 - AgentSlice
4. 상위 스토어 생성 후 사용
   - 상위 스토어 생성
   - 사용
5. 왜 Slice 패턴이 AI 기반 웹 DAW에서 필수적인가?
   - AI에게 "전지적 시점(God View)" 제공
   - 기능 간의 복잡한 상호작용 (Cross-Slice Interaction)
   - 코드 유지보수와 성능 최적화 (Tone.js 격리)
6. 결과
7. Slice 간 상태 참조하기 (고급)
8. 글을 마치며

---

## 왜 Slice 패턴을 사용했을까?

Drop AI 프로젝트를 진행하면서 상태관리 라이브러리로 Zustand를 사용하고 있다. 초기에는 모든 상태를 하나의 거대한 스토어에 몰아넣으려고 했지만, 프로젝트가 커지면서 다음과 같은 문제들이 발생했다.

\`\`\`typescript
//초기 시도: 거대한 단일 스토어
export const useAppStore = create((set) => ({
  // 채팅 관련
  messages: [],
  status: "idle",
  addMessage: () => {},

  // 에이전트 관련
  isModelReady: false,
  modelLoadingProgress: 0,
  setModelReady: () => {},

  // ... 수백 줄의 상태와 액션
}));
\`\`\`

**문제점들:**

1. **파일이 너무 커짐**: 하나의 파일에 모든 상태가 모여있어 관리가 어려움
2. **기능별 분리 불가**: 채팅 기능과 에이전트 기능이 섞여있어 독립적 개발이 어려움
3. **타입 안정성 부족**: 모든 상태가 하나의 인터페이스에 있어 타입 추론이 복잡함
4. **협업 어려움**: 여러 개발자가 동시에 작업할 때 충돌이 자주 발생

또한, AI 기반 웹 DAW라는 특수한 환경에서 **AI 에이전트가 DAW의 복잡한 상태를 '한 번에' 읽고 제어해야 하는 요구사항**이 있었다. 여러 개의 독립적인 스토어를 사용하면 AI에게 현재 상태를 알려주기 위해 각각의 스토어에서 데이터를 가져와 합치는 번거로운 작업이 필요했다.

우리 팀은 Zustand의 공식문서를 참고하여, **도메인별로 슬라이스를 만들어** 각각 독립적으로 관리하고, 그것을 useAppStore.ts에서 합쳐서 하나의 Store로 create하여 사용하는 방식으로 전환하기로 했다.

상태 관리를 모듈화하는 방법은 여러 가지가 있었다:

1. **여러 개의 독립적인 스토어 사용**: \`useChatStore\`, \`useAgentStore\` 등으로 완전히 분리
2. **Slice 패턴 사용**: 각 도메인을 slice로 만들고 하나의 스토어로 합치기

첫 번째 방법은 간단해 보였지만, 다음과 같은 문제가 있었다:

- 각 스토어가 독립적이라 상태 간 의존성을 처리하기 어려움
- 컴포넌트에서 여러 스토어를 동시에 구독해야 해서 복잡함
- 타입 추론이 각각 분리되어 있어 통합 관리가 어려움
- **AI 에이전트가 전체 상태를 한 번에 읽기 어려움**

따라서 **Slice 패턴**을 선택했다. 이 방식은:

- 각 도메인을 독립적인 slice로 분리하여 모듈화
- 하나의 스토어로 합쳐서 타입 안정성과 일관성 확보
- 필요시 slice 간 상태 참조도 가능
- **AI 에이전트가 \`getState()\` 한 번으로 모든 상태 접근 가능**

---

## Zustand Slices pattern 적용

Zustand 공식 문서의 [Slices pattern 가이드](https://docs.pmnd.rs/zustand/guides/slices-pattern)를 참고했다.

> "Slicing the store into smaller stores" - 스토어를 더 작은 스토어로 분할한다

더 많은 기능을 추가할수록 스토어는 점점 더 커지고 관리에 어려움이 있을 수 있으니, 상위 스토어를 만들고 거기에 개별적인 스토어를 결합하라는 것이다. 이를 통해서 상위스토어에 하위스토어들을 병합하여 사용하라는 것으로 이해할 수 있다.

저는 타입스크립트를 사용하므로 문서의 아래로 내리면 타입스크립트와 함께 사용하는 법이 있다.

저의 경우 \`chat\`, \`agent\` 라는 두개의 스토어를 이용해서 스토어를 관리하고 있었고, 이 두개를 하위스토어로 사용하기 위해 기존의 코드에서 변경을 진행했다.

> 더 자세한 내용은 전체 포스트를 참고하세요!`,
    tags: ["TypeScript", "Zustand", "React", "DAW", "AI"],
    likes: 234,
    comments: 56,
    views: 1876,
    color: "from-[#a8edea] to-[#fed6e3]",
  },
  {
    title: "NEXT.JS PAGES GUIDE",
    titleKo: "Next.js 페이지 가이드",
    author: "HURRAEY",
    date: "2021-03-18",
    description: "Learn more about Next.js pages. Next.js 페이지 시스템을 완벽하게 이해하는 가이드입니다.",
    tag: "nextjs, react, web development",
    content: `# Next.js Pages

In Next.js, a **page** is a [React Component](https://react.dev/reference/react/Component) exported from a \`.js\`, \`.jsx\`, \`.ts\`, or \`.tsx\` file in the \`pages\` directory. Each page is associated with a route based on its file name.

**Example**: If you create \`pages/about.js\` that exports a React component like below, it will be accessible at \`/about\`.

\`\`\`javascript
function About() {
  return <div>About</div>
}

export default About
\`\`\`

### Pages with Dynamic Routes

Next.js supports pages with dynamic routes. For example, if you create a file called \`pages/posts/[id].js\`, then it will be accessible at \`posts/1\`, \`posts/2\`, etc.

> To learn more about dynamic routing, check the [Dynamic Routing documentation](/docs/routing/dynamic-routes.md).

## Pre-rendering

By default, Next.js **pre-renders** every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.

Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called _hydration_.)

> 더 자세한 내용은 전체 포스트를 참고하세요!`,
    tags: ["Next.js", "React", "Web Development"],
    likes: 167,
    comments: 42,
    views: 1245,
    color: "from-[#fa709a] to-[#fee140]",
  },
  {
    title: "FOOTER INTERACTION REFACTORING",
    titleKo: "Footer 인터랙션 리팩터링 노트",
    author: "HURRAEY",
    date: "2025-11-25",
    description: "Footer ripple 애니메이션을 React 렌더 사이클에서 분리한 여정. Journey of separating ripple animation from React render cycle.",
    tag: "react, performance, animation",
    content: `## 두서

Footer에 마우스만 올려도 살짝 버벅거린다는 제보를 받았습니다. 처음엔 "이 정도 애니메이션이면 괜찮지 않을까?"라고 생각했지만, 직접 커서를 움직여 보니 살짝 어색한 딜레이가 느껴졌습니다. \`mousemove\` 이벤트는 초당 수십 번씩 일어나는데, 매번 React state를 바꾸고 있으니 전체 Footer가 리렌더되는 구조였죠. ripple 효과도 좌표를 \`key\`로 써서 매번 새 컴포넌트를 만들고 있었습니다. "이걸 그대로 두면 인터랙션이 무거울 수밖에 없겠구나"라는 결론이 자연스럽게 나왔습니다.

이번 글에서는 그 고민의 흔적과, 어떻게 애니메이션 레이어를 React 렌더 사이클에서 떼어냈는지 한 걸음씩 정리해 보겠습니다.

---

## Step 1. 상태를 모션 레이어로 옮기기

처음 시도는 throttling을 걸어 호출 빈도를 줄이는 것이었습니다. 하지만 아무리 간격을 늘려도 state 기반 구조는 그대로였고, ripple을 재사용하지 않는 한 재렌더는 계속 발생합니다. 그래서 "Framer Motion이 이미 있는데, 굳이 React state로 좌표를 관리할 이유가 있을까?"라는 질문을 다시 던졌습니다. 답은 \`useMotionValue\`. 모션 값은 렌더 없이 DOM 스타일을 직접 갱신해 주니, 애니메이션 전용으로 안성맞춤이었습니다.

\`src/components/Footer/Footer.tsx\`의 핵심.

\`\`\`typescript
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
  const waveBackground = useMotionTemplate\`radial-gradient(circle at \${mouseX}px \${mouseY}px, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 30%, transparent 60%)\`;
\`\`\`

좌표와 강도를 모두 모션 값으로 바꾸자 "이제 렌더에 영향을 주지 않고도 애니메이션을 조작할 수 있겠구나"라는 확신이 들었습니다. \`useSpring\`으로 약간의 탄성을 주어 움직임도 더 자연스럽게 만들었어요.

> 더 자세한 내용은 전체 포스트를 참고하세요!`,
    tags: ["React", "Performance", "Animation"],
    likes: 89,
    comments: 15,
    views: 523,
    color: "from-[#f093fb] to-[#f5576c]",
  },
  {
    title: "BLOG RESET & PLANS",
    titleKo: "블로그 리셋과 앞으로의 계획",
    author: "HURRAEY",
    date: "2025-11-25",
    description: "HURRAEY 블로그 기본 설정 과정을 기록하고 다음 글거리 메모. Recording the basic setup process and planning future content.",
    tag: "setup, blog",
    content: `# 블로그 리셋과 앞으로의 계획

오늘은 블로그 뼈대를 정리하는 데 집중했습니다. Next.js로 구축되어 Markdown 파일만 추가하면 자동으로 포스트가 만들어지고, RSS도 \`pnpm build\` 단계에서 같이 생성되도록 스크립트를 손봤습니다.

## 지금까지 한 일

- 소개 페이지와 푸터를 HURRAEY 이름에 맞게 반영
- RSS 메타 정보와 SNS 메타 태그 기본값 설정
- 예시 포스트 대신 실제로 사용할 수 있는 첫 글 생성

## 앞으로 작성할 아이디어

1. 최근 진행 중인 실험/사이드 프로젝트 회고
2. 자주 쓰는 개발 환경 설정 팁
3. 사진 페이지와 연동할 간단한 이야기

필요한 뼈대는 갖춰졌으니 이제 글만 쓰면 됩니다. 다음 포스트에서는 첫 번째 프로젝트 회고를 정리해볼 예정!`,
    tags: ["Setup", "Blog"],
    likes: 42,
    comments: 8,
    views: 256,
    color: "from-[#667eea] to-[#764ba2]",
  },
  {
    title: "MARKDOWN EXAMPLES",
    titleKo: "마크다운 예제 모음",
    author: "HURRAEY",
    date: "2021-03-19",
    description: "View examples of all possible Markdown options. 모든 마크다운 옵션을 확인할 수 있는 예제 모음입니다.",
    tag: "markdown, tutorial, guide",
    content: `# Markdown Examples

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading

## Emphasis

**This is bold text**

_This is italic text_

~~Strikethrough~~

## Blockquotes

> Develop. Preview. Ship. – Vercel

## Lists

Unordered

- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit
- Integer molestie lorem at massa

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

## Code

Inline \`code\` 예시입니다.

\`\`\`jsx
// React 컴포넌트 예제
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
\`\`\`

TypeScript 예제:

\`\`\`typescript
// 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
}

// 함수 선언
const getUserData = async (userId: number): Promise<User> => {
  const response = await fetch(\`/api/users/\${userId}\`);
  return response.json();
}

// 사용 예시
const user = await getUserData(1);
console.log(user.name);
\`\`\`

## Tables

| **Option** | **Description**                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| First      | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. |
| Second     | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. |
| Third      | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. |

## Links

- [Next.js](https://nextjs.org)
- [Vercel](http://vercel.com)`,
    tags: ["Markdown", "Tutorial", "Guide"],
    likes: 125,
    comments: 31,
    views: 892,
    color: "from-[#4facfe] to-[#00f2fe]",
  },
];
