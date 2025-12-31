# 페이지 설정 가이드

페이지별로 다른 내용을 표시하기 위해 JSON 설정 파일을 사용할 수 있습니다.

## 구조

### JSON 파일 위치
```
public/pages/{pageId}.json
```

### JSON 구조 예시

```json
{
  "window": {
    "title": "HOME"
  },
  "content": {
    "heading": "★ WELCOME TO PIXEL WORLD ★",
    "textList": [
      "► Experience the nostalgic charm of retro computing",
      "► Pixel-perfect design with modern responsiveness",
      "► Built with love and retro vibes ♥"
    ],
    "cards": [
      {
        "title": "GAME",
        "color": "retro-card-pink"
      },
      {
        "title": "MUSIC",
        "color": "retro-card-purple"
      },
      {
        "title": "ART",
        "color": "retro-card-cyan"
      },
      {
        "title": "CODE",
        "color": "retro-card-yellow"
      }
    ],
    "showSparkles": true,
    "enabled": true
  },
  "image": {
    "src": "/images/home/image.png",
    "alt": "페이지 이미지",
    "title": "RETRO.IMG",
    "enabled": true
  },
  "pixelGrid": {
    "title": "◆ PIXEL GALLERY ◆",
    "itemCount": 12,
    "enabled": true
  }
}
```

## 사용 방법

### 방법 1: RetroPageWithConfig 사용 (자동 로드)

```tsx
import { RetroPageWithConfig } from "../components/RetroPageWithConfig";

<RetroPageWithConfig pageId="home" />
```

### 방법 2: RetroPageLayout 사용 (수동 설정)

```tsx
import { RetroPageLayout } from "../components/RetroHome";
import { PageConfig } from "../lib/pageConfig";

const config: PageConfig = {
  window: { title: "ABOUT" },
  content: {
    heading: "★ ABOUT ME ★",
    textList: [
      "► Passionate developer",
      "► Love retro aesthetics"
    ],
    cards: [
      { title: "SKILLS", color: "retro-card-cyan" },
      { title: "PROJECTS", color: "retro-card-purple" }
    ],
    enabled: true
  },
  image: {
    src: "/images/about/image.png",
    alt: "About Image",
    title: "ABOUT.IMG",
    enabled: true
  },
  pixelGrid: {
    title: "◆ ABOUT GALLERY ◆",
    itemCount: 8,
    enabled: true
  }
};

<RetroPageLayout config={config} />
```

### 방법 3: MDX 파일에서 사용

```mdx
---
type: page
title: About
---

import { RetroPageWithConfig } from "../components/RetroPageWithConfig";

<RetroPageWithConfig pageId="about" />
```

## 설정 옵션

### window
- `title` (string, optional): RetroWindow의 제목

### content
- `heading` (string, optional): 메인 제목 (기본값: "★ WELCOME TO PIXEL WORLD ★")
- `textList` (string[], optional): 텍스트 리스트 (각 항목은 "► "로 시작하는 것을 권장)
- `cards` (array, optional): 카드 배열
  - `title` (string, required): 카드 제목
  - `color` (string, required): 카드 색상 ("retro-card-pink", "retro-card-purple", "retro-card-cyan", "retro-card-yellow")
- `showSparkles` (boolean, optional): 스파클 아이콘 표시 여부 (기본값: true)
- `enabled` (boolean, optional): 컨텐츠 표시 여부 (기본값: true)

### image
- `src` (string, required): 이미지 경로
- `alt` (string, required): 이미지 대체 텍스트
- `title` (string, optional): 이미지 프레임의 제목 (기본값: "RETRO.IMG")
- `enabled` (boolean, optional): 이미지 표시 여부 (기본값: true)

### pixelGrid
- `title` (string, optional): 픽셀 그리드 제목
- `itemCount` (number, optional): 그리드 아이템 개수 (기본값: 12)
- `enabled` (boolean, optional): 픽셀 그리드 표시 여부 (기본값: true)

## 예시

### home.json
```json
{
  "window": {
    "title": "HOME"
  },
  "content": {
    "heading": "★ WELCOME TO PIXEL WORLD ★",
    "textList": [
      "► Experience the nostalgic charm of retro computing",
      "► Pixel-perfect design with modern responsiveness",
      "► Built with love and retro vibes ♥"
    ],
    "cards": [
      {
        "title": "GAME",
        "color": "retro-card-pink"
      },
      {
        "title": "MUSIC",
        "color": "retro-card-purple"
      },
      {
        "title": "ART",
        "color": "retro-card-cyan"
      },
      {
        "title": "CODE",
        "color": "retro-card-yellow"
      }
    ],
    "showSparkles": true,
    "enabled": true
  },
  "image": {
    "src": "/images/home/Gemini_Generated_Image_fk02h4fk02h4fk02.png",
    "alt": "Retro Home Image",
    "title": "RETRO.IMG",
    "enabled": true
  },
  "pixelGrid": {
    "title": "◆ PIXEL GALLERY ◆",
    "itemCount": 12,
    "enabled": true
  }
}
```

### about.json
```json
{
  "window": {
    "title": "ABOUT"
  },
  "content": {
    "heading": "★ ABOUT ME ★",
    "textList": [
      "► Passionate developer",
      "► Love retro aesthetics",
      "► Building pixel-perfect experiences"
    ],
    "cards": [
      {
        "title": "SKILLS",
        "color": "retro-card-cyan"
      },
      {
        "title": "PROJECTS",
        "color": "retro-card-purple"
      }
    ],
    "showSparkles": false,
    "enabled": true
  },
  "image": {
    "src": "/images/about/profile.png",
    "alt": "Profile Image",
    "title": "PROFILE.IMG",
    "enabled": true
  },
  "pixelGrid": {
    "enabled": false
  }
}
```

