import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../components/layouts/Sidebar";
import AppHead from "../components/layouts/AppHead";
import PostExtras from "../components/posts/PostExtras";
import { loadPosts } from "../lib/loadPosts";
import "../styles/main.css";
import "../styles/retro.css";
import "react-clock/dist/Clock.css";
import { RetroSidebar } from "../components/layouts/RetroSidebar";
import { PageTitleProvider } from "../contexts/PageTitleContext";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { RetroLoading } from "../components/layouts/loading/RetroLoading";

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

  // Pink pixel cursor designs as SVG data URLs (larger size: 32x32)
  useEffect(() => {
    const pinkArrowCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="9" width="3" height="3" fill="#FF69B4"/>
        <rect x="6" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="12" width="3" height="3" fill="#FFB6C1"/>
        <rect x="6" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="15" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="15" width="3" height="3" fill="#FFC0CB"/>
        <rect x="6" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="18" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="18" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="18" width="3" height="3" fill="#FFC0CB"/>
        <rect x="18" y="18" width="3" height="3" fill="#FFE4E1"/>
        <rect x="6" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="21" width="3" height="3" fill="#FFB6C1"/>
        <rect x="9" y="24" width="3" height="3" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkHeartCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect x="9" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="18" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="21" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="12" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="12" width="3" height="3" fill="#FFB6C1"/>
        <rect x="21" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="24" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="12" y="15" width="3" height="3" fill="#FFC0CB"/>
        <rect x="15" y="15" width="3" height="3" fill="#FFE4E1"/>
        <rect x="18" y="15" width="3" height="3" fill="#FFC0CB"/>
        <rect x="21" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="24" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="18" width="3" height="3" fill="#FFB6C1"/>
        <rect x="12" y="18" width="3" height="3" fill="#FFC0CB"/>
        <rect x="15" y="18" width="3" height="3" fill="#FFE4E1"/>
        <rect x="18" y="18" width="3" height="3" fill="#FFC0CB"/>
        <rect x="21" y="18" width="3" height="3" fill="#FFB6C1"/>
        <rect x="24" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="15" y="21" width="3" height="3" fill="#FFB6C1"/>
        <rect x="18" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="21" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="24" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="24" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="24" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="27" width="3" height="3" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkStarCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="6" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="9" width="3" height="3" fill="#FFB6C1"/>
        <rect x="18" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="15" y="12" width="3" height="3" fill="#FFE4E1"/>
        <rect x="18" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="21" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="15" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="15" width="3" height="3" fill="#FFC0CB"/>
        <rect x="18" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="21" y="15" width="3" height="3" fill="#FF69B4"/>
        <rect x="24" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="18" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="24" width="3" height="3" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkBowCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="21" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="24" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="18" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="21" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="24" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="15" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="21" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="18" width="3" height="3" fill="#FFE4E1"/>
        <rect x="18" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="21" width="3" height="3" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkPawCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <!-- Left toe -->
        <rect x="6" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="9" y="12" width="3" height="3" fill="#FF1493"/>
        <!-- Middle toe -->
        <rect x="13" y="6" width="3" height="3" fill="#FF1493"/>
        <rect x="13" y="9" width="3" height="3" fill="#FF69B4"/>
        <rect x="16" y="9" width="3" height="3" fill="#FF1493"/>
        <!-- Right toe -->
        <rect x="21" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="21" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="24" y="12" width="3" height="3" fill="#FF1493"/>
        <!-- Main pad outline -->
        <rect x="9" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="18" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="18" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="18" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="18" width="3" height="3" fill="#FFB6C1"/>
        <rect x="18" y="18" width="3" height="3" fill="#FF69B4"/>
        <rect x="21" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="21" width="3" height="3" fill="#FFC0CB"/>
        <rect x="15" y="21" width="3" height="3" fill="#FFC0CB"/>
        <rect x="18" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="21" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="24" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="24" width="3" height="3" fill="#FF69B4"/>
        <rect x="15" y="24" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="24" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="27" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="27" width="3" height="3" fill="#FF1493"/>
      </svg>
    `)}`;
    
    const cursorImages = [pinkArrowCursor, pinkHeartCursor, pinkStarCursor, pinkBowCursor, pinkPawCursor];
    
    const handleClick = () => {
      // Pick random cursor (excluding paw for general cursor)
      const generalCursors = [pinkArrowCursor, pinkHeartCursor, pinkStarCursor, pinkBowCursor];
      const randomCursor = generalCursors[Math.floor(Math.random() * generalCursors.length)];
      
      // Apply cursor to all elements
      const style = document.createElement('style');
      style.id = 'dynamic-cursor-style';
      
      // Remove previous dynamic style if exists
      const existingStyle = document.getElementById('dynamic-cursor-style');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      style.innerHTML = `
        *, *::before, *::after {
          cursor: url("${randomCursor}") 6 6, auto !important;
        }
        a, button, [role="button"], [type="button"], [type="submit"], [type="reset"],
        select, summary, [onclick], .cursor-pointer {
          cursor: url("${pinkPawCursor}") 15 15, pointer !important;
        }
        input[type="text"], input[type="email"], input[type="password"], input[type="search"],
        input[type="tel"], input[type="url"], input[type="number"], textarea, [contenteditable="true"] {
          cursor: url("${randomCursor}") 6 6, text !important;
        }
      `;
      
      document.head.appendChild(style);
    };

    // Set initial cursor
    handleClick();
    
    // Add click listener to entire document
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      const existingStyle = document.getElementById('dynamic-cursor-style');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

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
