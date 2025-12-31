import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Menu, 
  Home, 
  Gamepad2, 
  Music, 
  Palette, 
  Code, 
  Mail, 
  Settings,
  X,
  Star,
  Heart
} from "lucide-react";

export function RetroSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "HOME", color: "#e91e63" },
    { icon: Gamepad2, label: "GAMES", color: "#9c27b0" },
    { icon: Music, label: "MUSIC", color: "#00bcd4" },
    { icon: Palette, label: "ART", color: "#ffeb3b" },
    { icon: Code, label: "CODE", color: "#4caf50" },
    { icon: Mail, label: "MAIL", color: "#ff5722" },
    { icon: Settings, label: "SETUP", color: "#607d8b" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="retro-sidebar-mobile-toggle"
      >
        {isOpen ? (
          <X className="retro-sidebar-icon" />
        ) : (
          <Menu className="retro-sidebar-icon" />
        )}
      </motion.button>

      {/* Desktop Sidebar - Always visible on large screens */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="retro-sidebar-desktop"
      >
        <SidebarContent menuItems={menuItems} />
      </motion.div>

      {/* Mobile/Tablet Sidebar - Toggleable */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="retro-sidebar-overlay"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="retro-sidebar-mobile"
            >
              <SidebarContent menuItems={menuItems} onClose={() => setIsOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({ 
  menuItems, 
  onClose 
}: { 
  menuItems: Array<{ icon: any; label: string; color: string }>;
  onClose?: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="retro-sidebar-content">
      {/* Header */}
      <div className="retro-sidebar-header">
        <div className="retro-sidebar-header-inner">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Star className="retro-sidebar-star" />
          </motion.div>
          <h2 className="retro-sidebar-header-title">
            MENU
          </h2>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Star className="retro-sidebar-star" />
          </motion.div>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="retro-sidebar-profile">
        <div className="retro-sidebar-profile-inner">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="retro-sidebar-avatar"
          >
            <Heart className="retro-sidebar-heart" />
          </motion.div>
          <div className="retro-sidebar-profile-text">
            <p className="retro-sidebar-player">
              PLAYER
            </p>
            <p className="retro-sidebar-level">
              Level 99
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="retro-sidebar-nav">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;
          return (
            <motion.button
              key={item.label}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveIndex(index);
                if (onClose) onClose();
              }}
              className={`retro-sidebar-menu-item ${isActive ? 'retro-sidebar-menu-item-active' : ''}`}
            >
              <div 
                className="retro-sidebar-menu-icon-wrapper"
                style={{ backgroundColor: isActive ? 'white' : item.color }}
              >
                <Icon 
                  className="retro-sidebar-menu-icon" 
                  style={{ 
                    color: isActive ? item.color : 'white',
                    imageRendering: "pixelated" 
                  }} 
                />
              </div>
              <span className="retro-sidebar-menu-label">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </nav>

      {/* Footer Stats */}
      <div className="retro-sidebar-footer">
        <div className="retro-sidebar-footer-stats">
          <div className="retro-sidebar-stat">
            <span className="retro-sidebar-stat-label">
              CPU
            </span>
            <div className="retro-sidebar-stat-bar-container">
              <motion.div
                className="retro-sidebar-stat-bar retro-sidebar-stat-bar-cpu"
                initial={{ width: "0%" }}
                animate={{ width: "73%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <span className="retro-sidebar-stat-value">
              73%
            </span>
          </div>

          <div className="retro-sidebar-stat">
            <span className="retro-sidebar-stat-label">
              RAM
            </span>
            <div className="retro-sidebar-stat-bar-container">
              <motion.div
                className="retro-sidebar-stat-bar retro-sidebar-stat-bar-ram"
                initial={{ width: "0%" }}
                animate={{ width: "45%" }}
                transition={{ duration: 1, delay: 0.7 }}
              />
            </div>
            <span className="retro-sidebar-stat-value">
              45%
            </span>
          </div>

          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="retro-sidebar-status"
          >
            <div className="retro-sidebar-status-indicator" />
            <span className="retro-sidebar-status-text">
              SYSTEM ONLINE
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
