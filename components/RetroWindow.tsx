import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { Heart, Star, Sparkles } from "lucide-react";

export function RetroWindow() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const router = useRouter();
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // 현재 경로에 따라 탭 이름 결정
  const getTabName = () => {
    const pathname = router.pathname;
    
    if (pathname === "/") {
      return "HOME";
    } else if (pathname === "/posts" || pathname.startsWith("/posts/")) {
      return "POSTS";
    } else if (pathname === "/photos" || pathname.startsWith("/photos/")) {
      return "PHOTOS";
    } else if (pathname === "/about") {
      return "ABOUT";
    } else if (pathname.startsWith("/tags/")) {
      return "TAGS";
    }
    
    // 기본값: 경로의 첫 번째 부분을 대문자로 변환
    const firstPath = pathname.split("/")[1];
    return firstPath ? firstPath.toUpperCase() : "HOME";
  };

  const currentTabName = getTabName();

  // 메뉴 구조 정의
  const menuItems = {
    Home: [
      { label: "Home", path: "/" },
      { label: "Posts", path: "/posts" },
      { label: "Photos", path: "/photos" },
    ],
    Posts: [
      { label: "Posts", path: "/posts" },
    ],
    Photos: [
      { label: "Photos", path: "/photos" },
    ],
    Tags: [
      { label: "Tags", path: "/tags" },
    ],
    About: [
      { label: "About", path: "/about" },
    ],
  };

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
        {Object.keys(menuItems).map((menu) => (
          <div
            key={menu}
            ref={(el) => {
              menuRefs.current[menu] = el;
            }}
            className="retro-menu-item-wrapper"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMenuClick(menu)}
              className={`retro-menu-button ${openMenu === menu ? "retro-menu-button-active" : ""}`}
            >
              {menu}
            </motion.button>
            <AnimatePresence>
              {openMenu === menu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="retro-menu-dropdown"
                >
                  {menuItems[menu as keyof typeof menuItems].map((item) => (
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
        ))}
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

