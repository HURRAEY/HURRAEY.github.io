import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect, useMemo, useContext, createContext } from "react";
import { useRouter } from "next/router";
import { Heart, Star, Sparkles } from "lucide-react";
import { loadPosts } from "../lib/loadPosts";

// pageProps.title을 공유하기 위한 간단한 Context
const PageTitleContext = createContext<string | undefined>(undefined);

export function PageTitleProvider({ children, title }: { children: React.ReactNode; title?: string }) {
  return <PageTitleContext.Provider value={title}>{children}</PageTitleContext.Provider>;
}

interface RetroWindowProps {
  pageTitle?: string;
}

export function RetroWindow({ pageTitle }: RetroWindowProps = {}) {
  const contextTitle = useContext(PageTitleContext);
  // prop이 있으면 prop 우선, 없으면 context에서 가져오기
  const pageTitleFromProps = pageTitle || contextTitle;
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const router = useRouter();
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  // 포스트 데이터 로드
  const posts = useMemo(() => loadPosts(), []);
  
  // 태그 추출 및 개수 계산 (Sidebar와 동일한 로직)
  const tagData = useMemo(() => {
    const tagCounts = posts.reduce((acc, post) => {
      if (post.tag) {
        const tags = post.tag.split(',').map((t) => t.trim()).filter(Boolean);
        tags.forEach((tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
      }
      return acc;
    }, {} as Record<string, number>);

    // 태그를 개수순으로 정렬 (같으면 알파벳순)
    const allTags = Object.entries(tagCounts)
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1]; // 개수순
        return a[0].localeCompare(b[0]); // 알파벳순
      })
      .map(([tag]) => tag);

    return { tagCounts, allTags };
  }, [posts]);

  // 현재 경로에 따라 탭 이름 결정
  const getTabName = () => {
    // pageProps에서 받은 title이 있으면 우선 사용
    if (pageTitleFromProps) {
      return pageTitleFromProps.toUpperCase();
    }
    
    const pathname = router.pathname;
    
    // 루트 경로인 경우
    if (pathname === "/") {
      return "HOME";
    }
    
    // 경로의 첫 번째 부분(슬래시 뒤의 단어)을 대문자로 변환
    const firstPath = pathname.split("/")[1];
    return firstPath ? firstPath.toUpperCase() : "HOME";
  };

  const currentTabName = getTabName();

  // 메뉴 구조 정의
  const menuPaths: { [key: string]: string } = {
    Home: "/",
    Posts: "/posts",
    Photos: "/photos",
    About: "/about",
  };

  // Tags 메뉴 항목 (드롭다운용)
  const tagsMenuItems = tagData.allTags.length > 0
    ? tagData.allTags.map((tag) => ({
        label: `${tag} (${tagData.tagCounts[tag]})`,
        path: `/tags/${encodeURIComponent(tag)}`,
      }))
    : [{ label: "No tags", path: "/tags" }];

  // 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenu) {
        const menuElement = menuRefs.current[openMenu];
        if (menuElement && !menuElement.contains(event.target as Node)) {
          setOpenMenu(null);
        }
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  const handleMenuClick = (menuName: string) => {
    // Tags가 아닌 경우 바로 이동
    if (menuName !== "Tags" && menuPaths[menuName]) {
      router.push(menuPaths[menuName]);
      return;
    }
    // Tags인 경우 드롭다운 토글
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    setOpenMenu(null);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="retro-window"
    >
      {/* Title Bar */}
      <div className="retro-title-bar">
        <div className="retro-title-left">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Star className="retro-icon-star" />
          </motion.div>
          <span className="retro-title-text">{currentTabName}</span>
        </div>
        
        <div className="retro-title-right">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              <Heart className="retro-icon-heart" />
            </motion.div>
          ))}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="retro-button retro-button-yellow"
          >
            <span className="retro-button-text">_</span>
          </button>
          <button className="retro-button retro-button-green">
            <span className="retro-button-text">□</span>
          </button>
          <button className="retro-button retro-button-red">
            <span className="retro-button-text">X</span>
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="retro-menu-bar">
        {Object.keys(menuPaths).map((menu) => (
          <motion.button
            key={menu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMenuClick(menu)}
            className="retro-menu-button"
          >
            {menu}
          </motion.button>
        ))}
        {/* Tags 메뉴 (드롭다운 포함) */}
        <div
          ref={(el) => {
            menuRefs.current["Tags"] = el;
          }}
          className="retro-menu-item-wrapper"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMenuClick("Tags")}
            className={`retro-menu-button ${openMenu === "Tags" ? "retro-menu-button-active" : ""}`}
          >
            Tags
          </motion.button>
          <AnimatePresence>
            {openMenu === "Tags" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="retro-menu-dropdown"
              >
                {tagsMenuItems.map((item) => (
                  <motion.button
                    key={item.path}
                    whileHover={{ x: 4, backgroundColor: "#e91e63" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMenuItemClick(item.path)}
                    className="retro-menu-dropdown-item"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Toolbar */}
      <div className="retro-toolbar">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.button
            key={i}
            whileHover={{ y: -2 }}
            className="retro-toolbar-button"
          >
            <div className="retro-toolbar-icon" />
          </motion.button>
        ))}
      </div>

      {/* Content Area */}
      {!isMinimized && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="retro-content"
        >
          <div className="retro-content-inner">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="retro-heading">
                ★ WELCOME TO PIXEL WORLD ★
              </h1>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="retro-text-list"
            >
              <p className="retro-text">
                ► Experience the nostalgic charm of retro computing
              </p>
              <p className="retro-text">
                ► Pixel-perfect design with modern responsiveness
              </p>
              <p className="retro-text">
                ► Built with love and retro vibes ♥
              </p>
            </motion.div>

            <div className="retro-grid">
              {[
                { title: "GAME", color: "retro-card-pink" },
                { title: "MUSIC", color: "retro-card-purple" },
                { title: "ART", color: "retro-card-cyan" },
                { title: "CODE", color: "retro-card-yellow" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className={`retro-card ${item.color}`}
                >
                  <h3 className="retro-card-title">
                    {item.title}
                  </h3>
                  <div className="retro-card-content" />
                </motion.div>
              ))}
            </div>

            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="retro-sparkles"
            >
              <Sparkles className="retro-icon-sparkles" />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Status Bar */}
      <div className="retro-status-bar">
        <div className="retro-status-left">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="retro-status-indicator"
          />
          <span className="retro-status-text">READY</span>
        </div>
        <span className="retro-status-text">100%</span>
      </div>
    </motion.div>
  );
}

