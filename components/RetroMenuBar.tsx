import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useRef, useEffect } from "react";
import { useTags } from "../hooks/useTags";

interface TagMenuItem {
  label: string;
  path: string;
}

const MENU_PATHS: { [key: string]: string } = {
  Home: "/",
  Posts: "/posts",
  Photos: "/photos",
  About: "/about",
};

interface RetroMenuBarProps {
  openMenu: string | null;
  onMenuToggle: (menuName: string) => void;
}

export function RetroMenuBar({ openMenu, onMenuToggle }: RetroMenuBarProps) {
  const router = useRouter();
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { tagsMenuItems } = useTags();

  // 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenu) {
        const menuElement = menuRefs.current[openMenu];
        if (menuElement && !menuElement.contains(event.target as Node)) {
          onMenuToggle(openMenu);
        }
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu, onMenuToggle]);

  const handleMenuClick = (menuName: string) => {
    // Tags가 아닌 경우 바로 이동
    if (menuName !== "Tags" && MENU_PATHS[menuName]) {
      router.push(MENU_PATHS[menuName]);
      return;
    }
    // Tags인 경우 드롭다운 토글
    onMenuToggle(menuName);
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    onMenuToggle("Tags");
  };

  return (
    <div className="retro-menu-bar">
      {Object.keys(MENU_PATHS).map((menu) => (
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
  );
}

