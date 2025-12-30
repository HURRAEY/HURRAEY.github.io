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
      <link
        rel="preload"
        href="/fonts/Inter-roman.latin.var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </Head>
  );
}

