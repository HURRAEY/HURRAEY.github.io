import "nextra-theme-blog/style.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import "../styles/main.css";

export default function App({ Component, pageProps }: AppProps) {
  // 포스트 목록 (정적 데이터, 필요시 동적으로 가져올 수 있음)
  const posts = [
    { title: "Next.js Pages", route: "/posts/pages", date: "2021/3/18" },
    { title: "Markdown", route: "/posts/markdown", date: "2021/3/18" },
    { title: "Hello HURRAEY", route: "/posts/hello-hurraey", date: "2021/3/18" },
    { title: "Footer Motion", route: "/posts/footer-motion", date: "2021/3/18" },
  ];

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
      <Sidebar posts={posts} />
      <div className="main-content">
        <Component {...pageProps} />
      </div>
      <style jsx global>{`
        .main-content {
          margin-left: 280px;
          transition: margin-left 0.3s ease;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
          }
        }
      `}</style>
    </>
  );
}
