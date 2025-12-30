import "nextra-theme-blog/style.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import SocialShare from "../components/SocialShare";
import RelatedPosts from "../components/RelatedPosts";
import Giscus from "../components/Giscus";
import "../styles/main.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // 포스트 목록 (정적 데이터, 필요시 동적으로 가져올 수 있음)
  const posts = [
    { 
      title: "Next.js Pages", 
      route: "/posts/pages", 
      date: "2021/3/18",
      description: "Learn more about Next.js pages.",
      tag: "web development"
    },
    { 
      title: "Markdown", 
      route: "/posts/markdown", 
      date: "2021/3/18",
      description: "View examples of all possible Markdown options.",
      tag: "web development"
    },
    { 
      title: "Hello HURRAEY", 
      route: "/posts/hello-hurraey", 
      date: "2025/11/25",
      description: "HURRAEY 블로그 기본 설정 과정을 기록하고 다음 글거리 메모.",
      tag: "setup"
    },
    { 
      title: "Footer Motion", 
      route: "/posts/footer-motion", 
      date: "2025/11/25",
      description: "Footer ripple 애니메이션을 React 렌더 사이클에서 분리한 여정.",
      tag: "interaction"
    },
  ];

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
