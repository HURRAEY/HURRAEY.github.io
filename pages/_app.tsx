import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AppHead from "../components/AppHead";
import PostExtras from "../components/PostExtras";
import { loadPosts } from "../lib/loadPosts";
import "../styles/main.css";
import "../styles/retro.css";
import "react-clock/dist/Clock.css";
import { RetroSidebar } from "../components/RetroSidebar";
import { PageTitleProvider } from "../contexts/PageTitleContext";
import DefaultLayout from "../components/DefaultLayout";
import { RetroLoading } from "../components/RetroLoading";

// 빌드 타임에 포스트 목록 로드
const posts = loadPosts();

/**
 * Next.js 앱의 루트 컴포넌트
 * 모든 페이지에 공통으로 적용되는 레이아웃과 기능을 제공합니다.
 */
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      // 약간의 딜레이를 주어 부드러운 전환 효과
      setTimeout(() => {
        setLoading(false);
      }, 300);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const isPost =
    router.pathname.startsWith("/posts/") && router.pathname !== "/posts";
  const currentPost = posts.find((p) => p.route === router.asPath);

  // pageProps에서 title 추출
  const pageTitle = (pageProps as any)?.title;

  return (
    <PageTitleProvider title={pageTitle}>
      <AppHead />
      {loading && <RetroLoading />}
      <div className="retro-home-page">
        <DefaultLayout>
          <Component {...pageProps} />
          {isPost && currentPost && (
            <PostExtras currentPost={currentPost} allPosts={posts} />
          )}
        </DefaultLayout>
      </div>
      <RetroSidebar />
      {/* <Sidebar posts={posts} /> */}
    </PageTitleProvider>
  );
}
