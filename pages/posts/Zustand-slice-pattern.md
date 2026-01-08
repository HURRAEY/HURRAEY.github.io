---
title: ZUSTAND SLICE PATTERN FOR AI DAW
titleKo: TypeScript와 Zustand Slice 패턴으로 AI 기반 웹 DAW 상태 관리하기
author: HURRAEY
date: 2025-12-01
description: Drop AI 프로젝트에서 Zustand Slice 패턴을 적용하여 복잡한 상태 관리를 모듈화한 경험을 공유합니다. Modular state management with Zustand Slice pattern.
tags: typescript, zustand, react, daw, ai
color: from-[#a8edea] to-[#fed6e3]
likes: 234
comments: 56
views: 1876
---

## 목차

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

```typescript
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
```

**문제점들:**

1. **파일이 너무 커짐**: 하나의 파일에 모든 상태가 모여있어 관리가 어려움
2. **기능별 분리 불가**: 채팅 기능과 에이전트 기능이 섞여있어 독립적 개발이 어려움
3. **타입 안정성 부족**: 모든 상태가 하나의 인터페이스에 있어 타입 추론이 복잡함
4. **협업 어려움**: 여러 개발자가 동시에 작업할 때 충돌이 자주 발생

또한, AI 기반 웹 DAW라는 특수한 환경에서 **AI 에이전트가 DAW의 복잡한 상태를 '한 번에' 읽고 제어해야 하는 요구사항**이 있었다. 여러 개의 독립적인 스토어를 사용하면 AI에게 현재 상태를 알려주기 위해 각각의 스토어에서 데이터를 가져와 합치는 번거로운 작업이 필요했다.

우리 팀은 Zustand의 공식문서를 참고하여, **도메인별로 슬라이스를 만들어** 각각 독립적으로 관리하고, 그것을 useAppStore.ts에서 합쳐서 하나의 Store로 create하여 사용하는 방식으로 전환하기로 했다.

상태 관리를 모듈화하는 방법은 여러 가지가 있었다:

1. **여러 개의 독립적인 스토어 사용**: `useChatStore`, `useAgentStore` 등으로 완전히 분리
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
- **AI 에이전트가 `getState()` 한 번으로 모든 상태 접근 가능**

---

## Zustand Slices pattern 적용

Zustand 공식 문서의 [Slices pattern 가이드](https://docs.pmnd.rs/zustand/guides/slices-pattern)를 참고했다.

> "Slicing the store into smaller stores" - 스토어를 더 작은 스토어로 분할한다

더 많은 기능을 추가할수록 스토어는 점점 더 커지고 관리에 어려움이 있을 수 있으니, 상위 스토어를 만들고 거기에 개별적인 스토어를 결합하라는 것이다. 이를 통해서 상위스토어에 하위스토어들을 병합하여 사용하라는 것으로 이해할 수 있다.

저는 타입스크립트를 사용하므로 문서의 아래로 내리면 타입스크립트와 함께 사용하는 법이 있다.

저의 경우 `chat`, `agent` 라는 두개의 스토어를 이용해서 스토어를 관리하고 있었고, 이 두개를 하위스토어로 사용하기 위해 기존의 코드에서 변경을 진행했다.

---

## 기존 스토어 수정

### 변경 전 - 거대한 단일 스토어

모든 상태가 하나의 파일에 몰려있어 관리가 어려웠다.

```typescript
// useAppStore.ts (변경 전)
import { create } from "zustand";

export const useAppStore = create((set) => ({
  // 채팅 관련
  messages: [],
  status: "idle",
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  updateMessage: (id, content) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, content } : m
      ),
    })),
  setStatus: (status) => set({ status }),
  clearMessages: () => set({ messages: [] }),

  // 에이전트 관련
  isModelReady: false,
  modelLoadingProgress: 0,
  modelLoadingText: "Initializing...",
  setModelReady: (ready) => set({ isModelReady: ready }),
  setLoadingProgress: (progress, text) =>
    set({ modelLoadingProgress: progress, modelLoadingText: text }),

  // ... 수백 줄의 상태와 액션
}));
```

### 변경 후 - ChatSlice

ChatSlice의 기능은 AI와의 대화 메시지를 담고 있는 스토어다. 아래의 기능은 사용자가 메시지를 보냈을 경우 메시지를 추가하고, 메시지 상태를 관리하는 스토어다.

```typescript
// src/stores/slices/chatSlice.ts
import type { StateCreator } from "zustand";
import type { Message, AgentStatus } from "@/types/agent";

export interface ChatSlice {
  messages: Message[];
  status: AgentStatus;

  actions: {
    addMessage: (message: Message) => void;
    updateMessage: (id: string, content: string) => void;
    setStatus: (status: AgentStatus) => void;
    clearMessages: () => void;
  };
}

export const createChatSlice: StateCreator<ChatSlice> = (set) => ({
  messages: [],
  status: "idle",

  actions: {
    addMessage: (message) =>
      set((state) => ({ messages: [...state.messages, message] })),
    updateMessage: (id, content) =>
      set((state) => ({
        messages: state.messages.map((m) =>
          m.id === id ? { ...m, content } : m
        ),
      })),
    setStatus: (status) => set({ status }),
    clearMessages: () => set({ messages: [] }),
  },
});
```

**변경점:**

- `export interface`로 변경 - export로 내보내는 이유는 상위 스토어를 생성할때 타입이 필요하기 때문
- `create`로 생성하던 스토어를 `StateCreator`로 변경
- `devtools` 제거 (상위 스토어에서 추가)
- 변수명, 타입명 변경 (개개인의 개발성향에 따라 수정)

### 변경 후 - AgentSlice

AgentSlice도 동일하게 변경했다.

```typescript
// src/stores/slices/agentSlice.ts
import type { StateCreator } from "zustand";

export interface AgentSlice {
  isModelReady: boolean;
  modelLoadingProgress: number;
  modelLoadingText: string;

  agentActions: {
    setModelReady: (ready: boolean) => void;
    setLoadingProgress: (progress: number, text: string) => void;
  };
}

export const createAgentSlice: StateCreator<AgentSlice> = (set) => ({
  isModelReady: false,
  modelLoadingProgress: 0,
  modelLoadingText: "Initializing...",

  agentActions: {
    setModelReady: (ready) => set({ isModelReady: ready }),
    setLoadingProgress: (progress, text) =>
      set({ modelLoadingProgress: progress, modelLoadingText: text }),
  },
});
```

**변경점:**

- 위 변경점과 동일하게 수정

---

## 상위 스토어 생성 후 사용

### 상위 스토어 생성

`useAppStore.ts`라는 파일을 만들었고 코드는 아래와 같이 작성했다.

```typescript
// src/stores/useAppStore.ts
import { create } from "zustand";
import { createChatSlice, type ChatSlice } from "./slices/chatSlice";
import { createAgentSlice, type AgentSlice } from "./slices/agentSlice";

interface AppState extends ChatSlice, AgentSlice {}

export const useAppStore = create<AppState>()((...a) => ({
  ...createChatSlice(...a),
  ...createAgentSlice(...a),
}));
```

**핵심 포인트:**

- 하위 스토어인 `chat`, `agent`를 하나의 스토어로 결합
- 하위 스토어에서 정의한 타입을 재사용 (`interface AppState extends ChatSlice, AgentSlice`)
- 하위 스토어가 받는 `StateCreator`의 인자는 `set`, `get`, `api`가 존재한다. 그렇기 때문에 `...a`로 넘기게 된다.
- `StateCreator<ChatSlice>`: TypeScript가 slice의 타입을 정확히 추론하도록 보장
- `interface AppState extends ChatSlice, AgentSlice`: TypeScript가 모든 slice의 타입을 합쳐서 검증

### 사용

스토어를 사용할 파일로 이동하여 `const { messages, actions } = useAppStore()`로 스토어에 정의된 함수를 사용한다.

```typescript
// 컴포넌트에서 사용
function ChatComponent() {
  const messages = useAppStore((state) => state.messages);
  const addMessage = useAppStore((state) => state.actions.addMessage);
  const status = useAppStore((state) => state.status);
  const isReady = useAppStore((state) => state.isModelReady);

  // ...
}
```

또는 구조 분해 할당으로 사용할 수도 있다:

```typescript
// src/hooks/agent/useAgent.ts
export function useAgent() {
  // 한 번의 호출로 모든 상태 접근 가능
  const updateMessage = useAppStore.getState().actions.updateMessage;
  const setStatus = useAppStore.getState().actions.setStatus;

  // AI 응답 처리 시 전체 상태를 쉽게 참조
  await handleAIResponse({
    // ...
    updateMessage,
    setStatus,
    // ...
  });
}
```

---

## 왜 Slice 패턴이 AI 기반 웹 DAW에서 필수적인가?

**Slice(슬라이스) 패턴**이 이 프로젝트(AI 기반 웹 DAW)에서 필수적인 이유는 단순히 코드를 깔끔하게 하기 위해서가 아니라, **AI 에이전트가 DAW의 복잡한 상태를 '한 번에' 읽고 제어해야 하기 때문**이다.

DAW는 일반적인 앱보다 상태(State)가 훨씬 복잡하다. 트랙 정보, 재생 상태, 오디오 엔진(Tone.js) 제어, 채팅 창 UI 등이 서로 얽혀 있다. 이를 해결하기 위해 Slice 패턴이 필요한 3가지 핵심 이유를 정리해 드린다.

---

### 1. AI에게 "전지적 시점(God View)"을 제공하기 위함

AI가 올바른 판단을 내리려면 현재 프로젝트의 **모든 상태**를 알고 있어야 한다.

**문제점 (Slice 미사용 시):**
트랙 정보는 `TrackStore`에, 재생 상태는 `TransportStore`에, 이펙트는 `EffectStore`에 따로 흩어져 있다면, AI에게 현재 상태를 알려주기 위해 각각의 스토어에서 데이터를 가져와 합치는 번거로운 작업이 필요하다.

```typescript
// ❌ 나쁜 예: 여러 스토어에서 데이터를 수집해야 함
const trackState = useTrackStore.getState();
const transportState = useTransportStore.getState();
const effectState = useEffectStore.getState();

// AI에게 전달할 컨텍스트를 수동으로 합성
const context = {
  tracks: trackState.tracks,
  isPlaying: transportState.isPlaying,
  effects: effectState.effects,
  // ... 더 많은 상태들을 수동으로 합치기
};
```

**해결책 (Slice 사용 시):**
모든 슬라이스(조각)가 하나의 **거대한 스토어(Bound Store)**로 합쳐져 있다. AI 에이전트가 "현재 상태 알려줘"라고 할 때, `useAppStore.getState()` 한 번만 호출하면 트랙, 볼륨, 재생 위치 등 모든 정보를 하나의 완벽한 JSON 객체(**Shadow Graph**)로 추출하여 프롬프트에 주입할 수 있다.

```typescript
// ✅ 좋은 예: 한 번의 호출로 모든 상태 획득
const fullState = useAppStore.getState();

// AI 프롬프트에 바로 주입 가능한 완전한 컨텍스트
const systemPrompt = `
You are an AI Audio Engineer. Current project state:
${JSON.stringify(
  {
    messages: fullState.messages,
    status: fullState.status,
    isModelReady: fullState.isModelReady,
    // 모든 slice의 상태가 자동으로 포함됨
  },
  null,
  2
)}
`;
```

실제 프로젝트에서는 다음과 같이 사용한다:

```typescript
// src/hooks/agent/aiResponseHandler.ts
const completion = await engine.chat.completions.create({
  messages: [
    {
      role: "system",
      content: `You are an AI Audio Engineer. ${trackCount} tracks. Respond briefly.`,
    },
    { role: "user", content: userInput },
  ],
  max_tokens: 64,
  temperature: 0.1,
});
```

### 2. 기능 간의 복잡한 상호작용 (Cross-Slice Interaction)

DAW에서는 한 기능의 변화가 다른 기능에 영향을 미치는 경우가 빈번하다.

**시나리오:** AI가 "드럼 트랙만 솔로(Solo)로 재생해줘"라고 요청함.

**로직의 흐름:**

1. `TrackSlice`: 드럼 트랙의 `solo` 값을 `true`로 변경.
2. `TransportSlice`: 오디오 엔진을 `playing` 상태로 변경.
3. `ChatSlice`: 채팅창에 "드럼 트랙을 솔로로 재생합니다." 메시지 추가.

**Slice 패턴의 이점:**
하나의 슬라이스 내부에서 `get()`과 `set()`을 통해 **다른 슬라이스의 상태나 액션에 접근**할 수 있다. 즉, `TrackSlice`의 함수 안에서 `ChatSlice`의 메시지 추가 함수를 바로 호출할 수 있어 로직이 끊기지 않는다.

```typescript
// 예시: TrackSlice에서 ChatSlice의 액션 호출
export const createTrackSlice: StateCreator<
  TrackSlice & ChatSlice, // 다른 slice 타입도 받음
  [],
  [],
  TrackSlice
> = (set, get) => ({
  tracks: [],
  actions: {
    soloTrack: (trackId: string) => {
      // TrackSlice의 상태 변경
      set((state) => ({
        tracks: state.tracks.map((track) =>
          track.id === trackId ? { ...track, solo: true } : track
        ),
      }));

      // ⭐ ChatSlice의 액션을 바로 호출 가능!
      get().actions.addMessage({
        id: generateId(),
        role: "system",
        content: `트랙 ${trackId}를 솔로로 재생합니다.`,
      });
    },
  },
});
```

### 3. 코드 유지보수와 성능 최적화 (Tone.js 격리)

Tone.js는 명령형(Imperative) 라이브러리이고, React는 선언형(Declarative) UI 라이브러리다. 이 둘을 섞으면 코드가 매우 지저분해진다.

**역할 분담:**

- `AudioSlice`: Tone.js와 직접 통신하는 **더럽고 복잡한 로직**을 담당한다. (예: `oscillator.start()`, `transport.schedule()`)
- `UISlice`: 화면에 보여주는 **깔끔한 데이터**만 관리한다.

**성능 이점:**
파형(Visualizer)이나 재생 헤드처럼 1초에 60번씩 변하는 데이터는 `AudioSlice`에서 관리하고, React 컴포넌트는 필요한 부분만 구독(Subscribe)하여 불필요한 전체 렌더링을 막을 수 있다.

---

### [코드 예시] Slice 패턴이 적용된 실제 구조

이렇게 나누어져 있지만, 실제로는 하나로 합쳐져서 동작한다.

#### 1. 오디오 슬라이스 (`audioSlice.ts`) - Tone.js 제어 담당

```typescript
export const createAudioSlice = (set, get) => ({
  isPlaying: false,
  togglePlay: () => {
    const current = get().isPlaying; // 현재 상태 확인
    if (current) Tone.Transport.stop();
    else Tone.Transport.start();

    set({ isPlaying: !current }); // 상태 업데이트

    // ⭐ 다른 슬라이스(Chat)의 액션을 여기서 바로 호출 가능!
    get().addSystemMessage(current ? "일시정지됨" : "재생 시작됨");
  },
});
```

#### 2. 챗 슬라이스 (`chatSlice.ts`) - AI 대화 담당

```typescript
export const createChatSlice = (set) => ({
  messages: [],
  addSystemMessage: (text) =>
    set((state) => ({
      messages: [...state.messages, { role: "system", content: text }],
    })),
});
```

#### 3. 통합 스토어 (`useAppStore.ts`) - AI가 바라보는 곳

```typescript
import { create } from "zustand";

export const useAppStore = create((...a) => ({
  ...createAudioSlice(...a), // 오디오 기능 탑재
  ...createChatSlice(...a), // 채팅 기능 탑재
}));
```

이렇게 하면:

- `audioSlice`에서 `togglePlay()`를 호출하면 → Tone.js를 제어하고 → `chatSlice`의 `addSystemMessage()`를 자동으로 호출
- AI 에이전트는 `useAppStore.getState()`로 모든 상태를 한 번에 읽을 수 있음
- React 컴포넌트는 필요한 부분만 구독하여 렌더링 최적화

```typescript
// 컴포넌트에서는 필요한 부분만 구독
function PlayButton() {
  // isPlaying만 구독하여 불필요한 렌더링 방지
  const isPlaying = useAppStore((state) => state.isPlaying);
  const togglePlay = useAppStore((state) => state.togglePlay);

  return <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>;
}
```

**결론:**
Slice 패턴은 **"AI에게 전체 상황을 한 번에 설명해주고(Context Injection)", "AI의 명령이 오디오와 UI를 동시에 건드릴 수 있게(Cross-Slice Interaction)"** 하기 위해 이 프로젝트에서 반드시 필요한 설계 방식이다.

---

## 결과

이렇게 하니 각 도메인별로 코드가 깔끔하게 분리되었고, TypeScript의 타입 추론도 완벽하게 작동하여 개발 경험이 크게 향상되었다.

**주요 개선 사항:**

1. **코드 가독성 향상**: 각 slice가 독립적인 파일로 관리되어 코드를 찾기 쉬워짐
2. **타입 안정성**: TypeScript가 모든 slice의 타입을 자동으로 합쳐서 검증
3. **AI 에이전트 통합**: `useAppStore.getState()` 한 번의 호출로 모든 상태 접근 가능
4. **협업 효율성**: 여러 개발자가 동시에 작업할 때 충돌이 줄어듦
5. **유지보수성**: 각 도메인별로 독립적으로 개발하고 테스트 가능

**실제 사용 예시:**

```typescript
// AI 에이전트에서 전체 상태를 한 번에 읽기
const fullState = useAppStore.getState();
console.log("All state:", fullState);
// {
//   messages: [...],
//   status: 'idle',
//   isModelReady: true,
//   modelLoadingProgress: 100,
//   ...
// }

// 컴포넌트에서 필요한 부분만 구독
const messages = useAppStore((state) => state.messages);
const addMessage = useAppStore((state) => state.actions.addMessage);
```

---

## Slice 간 상태 참조하기 (고급)

만약 ChatSlice에서 AgentSlice의 상태를 참조해야 한다면, `StateCreator`의 제네릭 타입을 확장하면 된다:

```typescript
export const createChatSlice: StateCreator<
  ChatSlice & AgentSlice, // 다른 slice 타입도 받음
  [], // Middleware
  [], // Immer 없음
  ChatSlice // 반환 타입
> = (set, get) => ({
  messages: [],
  status: "idle",
  actions: {
    addMessage: (message) => {
      const isReady = get().isModelReady; // AgentSlice의 상태 참조
      if (isReady) {
        set((state) => ({ messages: [...state.messages, message] }));
      }
    },
    // ...
  },
});
```

이렇게 하면 slice 간 의존성을 처리할 수 있으면서도, 각 slice는 여전히 독립적인 파일로 관리할 수 있다.

---

## 번외) Zustand의 슬라이스 패턴에서는 슬라이스를 모아 왜 한 군데에서 create를 할까?

팀원 중에 한 분이 이런 질문을 했는데 아무런 답도 찾지 못했고, 대신 챗GPT가 대답을 해주었다. 성능 및 메모리 관리, 일관성과 유지보수 측면에서 강점이 있기 때문에 그렇다고 한다.

**Q: Zustand는 해당 라이브러리내에서 슬라이스라는 개념이 있고 리덕스와 비슷하게 활용하는것 같은데, 그럼 zustand에서 스토어를 여러개 사용할수있다면 왜 굳이 슬라이스 개념을 사용해서 하나의 스토어로 combine해서 해야하는지 모르겠어. 그 이유를 자세히 알려줘.**

**A.** Zustand와 리덕스는 상태 관리를 위한 라이브러리이지만, 몇 가지 차이점이 있다. Zustand가 여러 개의 스토어를 사용할 수 있는 것은 맞지만, 왜 슬라이스와 같은 개념을 사용하여 하나의 스토어로 combine하는지에 대한 이유는 여러 가지가 있다.

1. **성능 및 메모리 관리**: 여러 개의 작은 스토어를 사용하는 것보다 하나의 큰 스토어를 사용하는 경우 메모리 사용량 및 전체적인 성능에 이점이 있을 수 있다. 또한, 하나의 스토어에서 상태를 변경할 때마다 리렌더링이 발생하므로 상태 간의 의존성이 있는 경우에는 하나의 스토어에서 더 쉽게 처리할 수 있다.

2. **일관성과 유지보수**: 하나의 스토어를 사용하면 애플리케이션의 전반적인 상태를 한곳에서 쉽게 관리할 수 있다. 이는 코드의 일관성을 유지하고 유지보수를 쉽게 만들어준다. 스토어가 분리되어 있다면, 각각의 스토어에서 상태를 변경하고 관리해야 하기 때문에 코드가 복잡해질 수 있다.

3. **중앙 집중화된 로직 및 미들웨어 적용**: 리덕스는 미들웨어를 통한 중앙 집중화된 로직 적용이 쉽다. 하나의 스토어에서 액션을 디스패치하고 미들웨어에서 처리할 수 있다. Zustand도 비슷한 패턴을 사용할 수 있지만, 하나의 스토어로 중앙 집중화된 로직을 적용하는 것이 효과적일 수 있다.

4. **타입 안정성**: TypeScript를 사용하는 경우, 하나의 스토어로 combine하면 모든 slice의 타입을 합쳐서 검증할 수 있어 타입 안정성이 향상된다.

```typescript
// 하나의 스토어로 combine하면 타입 추론이 완벽하게 작동
interface AppState extends ChatSlice, AgentSlice {}
// TypeScript가 모든 slice의 타입을 자동으로 합쳐서 검증
```

그러나 상황에 따라 여러 개의 스토어를 사용하는 것이 나을 수도 있다. 예를 들어, 서로 독립적인 모듈 또는 컴포넌트가 각각의 스토어를 가지고 있고, 이들 간에 강한 의존성이 없다면 여러 개의 스토어를 사용하여 컴포넌트를 분리하고 유지보수성을 높일 수 있다. 따라서 사용하고자 하는 상황 및 애플리케이션의 구조에 따라서 선택하는 것이 중요하다.

---

## 글을 마치며

사실 다양한 스펙 중 zustand를 사용한 이유는 redux는 이제 너무 많은 양의 보일러플레이트가 존재하기 때문에 flux 패턴을 사용하던 저와 같은 개발자는 zustand로 넘어가는 추세인 것 같다. 이미 프로덕션 환경에서 적용하여 사용하는 곳도 있는 것 같고 redux 환경 구축에 지친 개발자 분들이라면 한번쯤 토이프로젝트를 통해 접해보는 것을 추천한다.

특히 **AI 기반 웹 애플리케이션**을 개발할 때는 Slice 패턴이 더욱 중요하다. AI 에이전트가 전체 상태를 한 번에 읽고 제어할 수 있어야 하기 때문이다. 여러 개의 독립적인 스토어를 사용하면 AI에게 컨텍스트를 제공하는 것이 복잡해지지만, Slice 패턴을 사용하면 `getState()` 한 번의 호출로 모든 상태를 얻을 수 있다.

이 글은 제가 처음 velog에 기재하는 글이다.
글이 많이 부족하다고 느끼셨다면 발전해나가도록 하겠다.

---

## 참고 링크

1. Zustand 공식 문서 - TypeScript 가이드
   https://docs.pmnd.rs/zustand/guides/typescript

2. Zustand 공식 문서 - Slice 패턴
   https://docs.pmnd.rs/zustand/guides/slices-pattern

3. Zustand GitHub - Slice 패턴 예제
   https://github.com/pmndrs/zustand#slices-pattern
