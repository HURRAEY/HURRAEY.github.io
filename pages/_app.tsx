import "nextra-theme-blog/style.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import SocialShare from "../components/SocialShare";
import RelatedPosts from "../components/RelatedPosts";
import Giscus from "../components/Giscus";
import "../styles/main.css";

// 자동 생성된 포스트 목록 import (빌드 시 scripts/gen-rss.js에서 생성)
// 파일이 없을 경우를 대비해 기본값 제공
let posts: Array<{
  title: string;
  route: string;
  date: string;
  description: string;
  tag: string;
}> = [];

try {
  // 빌드 타임에 생성된 포스트 목록 import
  // @ts-ignore - 동적으로 생성되는 파일이므로 타입 체크 무시
  const postsModule = require("../lib/posts");
  posts = postsModule.posts || [];
} catch (e) {
  // 개발 환경에서 아직 빌드되지 않은 경우를 위한 기본값
  // 빌드 전에는 빈 배열로 시작
  if (process.env.NODE_ENV === "development") {
    console.warn(
      "포스트 목록을 불러올 수 없습니다. 'pnpm build' 또는 'node scripts/gen-rss.js'를 실행해주세요."
    );
  }
  posts = [];
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isPost = router.pathname.startsWith('/posts/') && router.pathname !== '/posts';
  const currentPost = posts.find(p => p.route === router.asPath);
  
  const fullUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://hurraey.github.io${router.asPath}`;

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
        {isPost && currentPost && (
          <div className="post-extras">
            <SocialShare
              title={currentPost.title}
              url={fullUrl}
              description={currentPost.description}
            />
            <RelatedPosts
              currentPost={{
                route: router.asPath,
                tag: currentPost.tag,
              }}
              allPosts={posts}
            />
            <Giscus
              repo="HURRAEY/HURRAEY.github.io"
              repoId=""
              mapping="pathname"
              reactionsEnabled={true}
              theme="preferred_color_scheme"
              lang="ko"
            />
          </div>
        )}
      </div>
      <style jsx global>{`
        .main-content {
          margin-left: 280px;
          transition: margin-left 0.3s ease;
          min-height: 100vh;
          background: var(--bg-primary, #fff);
          color: var(--text-primary, #111);
        }

        .post-extras {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem 3rem;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
          }
        }

        :global(.dark) {
          --bg-primary: #111827;
          --text-primary: #f9fafb;
        }
      `}</style>
    </>
  );
}
