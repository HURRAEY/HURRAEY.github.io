import "nextra-theme-blog/style.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import AppHead from "../components/AppHead";
import PostExtras from "../components/PostExtras";
import { loadPosts } from "../lib/loadPosts";
import "../styles/main.css";
import "../styles/app.css";
import "../styles/retro.css";
import "react-clock/dist/Clock.css";

// 빌드 타임에 포스트 목록 로드
const posts = loadPosts();

/**
 * Next.js 앱의 루트 컴포넌트
 * 모든 페이지에 공통으로 적용되는 레이아웃과 기능을 제공합니다.
 */
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isPost =
    router.pathname.startsWith("/posts/") && router.pathname !== "/posts";
  const currentPost = posts.find((p) => p.route === router.asPath);

  return (
    <>
      <AppHead />
      <Sidebar posts={posts} />
      <div className="main-content">
        <Component {...pageProps} />
        {isPost && currentPost && (
          <PostExtras currentPost={currentPost} allPosts={posts} />
        )}
      </div>
    </>
  );
}
