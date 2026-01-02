import Head from "next/head";

/**
 * 앱 전체에 적용되는 메타데이터와 리소스 프리로드를 담당하는 컴포넌트
 */
export default function AppHead() {
  return (
    <Head>
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS"
        href="/feed.xml"
      />
      {/* 폰트는 CSS @font-face에서 로드되므로 preload 제거 */}
    </Head>
  );
}


