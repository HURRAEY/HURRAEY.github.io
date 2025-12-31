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
import { RetroSidebar } from "../components/RetroSidebar";
import { PageTitleProvider } from "../contexts/PageTitleContext";
import { RetroWindow } from "../components/RetroWindow";
import { RetroImage } from "../components/RetroImage";
import { PixelGrid } from "../components/PixelGrid";
import { PixelBackground } from "../components/PixelBackground";
import { FloatingHearts } from "../components/FloatingHearts";

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

  // pageProps에서 title 추출 (nextra-theme-blog가 frontmatter에서 가져온 값)
  const pageTitle = (pageProps as any)?.title;

  return (
    <PageTitleProvider title={pageTitle}>
      <AppHead />
      <div className="retro-home-page">
        {/* 배경 애니메이션 요소 */}
          <PixelBackground />
          <FloatingHearts />
        {/* Main Content */}
        <div className="retro-home-content">
          <RetroWindow pageTitle={pageTitle}>

          <Component {...pageProps} />
            {isPost && currentPost && (
              <PostExtras currentPost={currentPost} allPosts={posts} />
            )}
          </RetroWindow>
          <RetroImage />
          <PixelGrid />
        </div>
        
        {/* Footer */}
        <div className="retro-footer">
          <p className="retro-footer-text">
            ♥ MADE WITH PIXEL LOVE ♥
          </p>
        </div>
      </div>
      <RetroSidebar />
      {/* <Sidebar posts={posts} /> */}
    </PageTitleProvider>
  );
}
