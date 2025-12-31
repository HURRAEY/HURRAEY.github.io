# HURRAEY 블로그

**Next.js**로 구축된 개인 블로그입니다. Markdown으로 콘텐츠에 집중할 수 있습니다.

## 주요 기능

### 기본 기능
- ✅ Markdown/MDX 자동 처리
- ✅ RSS 피드 자동 생성
- ✅ 아름다운 테마 제공
- ✅ 태그로 포스트 분류
- ✅ 최적화된 웹 폰트 로딩

### 추가된 기능
- 🔍 **검색 기능**: 포스트 제목, 설명, 태그로 검색 (⌘K 또는 Ctrl+K)
- 🌙 **다크 모드**: 시스템 설정 자동 감지 및 수동 전환
- 💬 **댓글 시스템**: Giscus 기반 GitHub Discussions 연동
- 📤 **소셜 공유**: Twitter, Facebook, LinkedIn, 링크 복사
- 🔗 **관련 포스트 추천**: 태그 기반 자동 추천
- 🖼️ **이미지 최적화**: Next.js 이미지 최적화 지원
- 🎨 **MDX 컴포넌트**: Video, Callout, CodeBlock 등 커스텀 컴포넌트

https://demo.vercel.blog

## 설정

### 기본 설정

1. 설정 파일에서 블로그 정보를 업데이트하세요.
2. `scripts/gen-rss.js`에서 RSS 피드 정보를 업데이트하세요.
3. `pages/_document.tsx`에서 메타 태그를 업데이트하세요.
4. `pages/posts/*.md`에 포스트를 작성하세요.

### Giscus 댓글 설정

댓글 기능을 사용하려면 [GISCUS_SETUP.md](./GISCUS_SETUP.md)를 참고하여 설정하세요.

### MDX 컴포넌트 사용

포스트에서 커스텀 컴포넌트를 사용할 수 있습니다:

```mdx
import { Video, Callout } from '../components/mdx-components'

<Video src="/path/to/video.mp4" title="비디오 제목" />

<Callout type="info">
  이것은 정보성 콜아웃입니다.
</Callout>
```

사용 가능한 컴포넌트:
- `Video`: 비디오 플레이어
- `Callout`: 정보/경고/에러/성공 메시지
- `CodeBlock`: 코드 블록
- `Image`: 이미지 (캡션 포함)
- `Tabs`, `Tab`: 탭 컴포넌트

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/blog&project-name=portfolio&repository-name=portfolio)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example blog my-blog
```

```bash
yarn create next-app --example blog my-blog
```

```bash
pnpm create next-app --example blog my-blog
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
