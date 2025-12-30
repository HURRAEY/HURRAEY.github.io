import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Star, Sparkles } from "lucide-react";

export function RetroWindow() {
  const [isMinimized, setIsMinimized] = useState(false);

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
          <span className="retro-title-text">RETRO PIXEL</span>
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
        {["File", "Edit", "View", "Insert", "Help"].map((menu) => (
          <motion.button
            key={menu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="retro-menu-button"
          >
            {menu}
          </motion.button>
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

