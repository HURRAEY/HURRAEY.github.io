import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";

interface RetroTitleBarProps {
  title: string;
  onMinimize: () => void;
}

export function RetroTitleBar({ title, onMinimize }: RetroTitleBarProps) {
  return (
    <div className="retro-title-bar">
      <div className="retro-title-left">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Star className="retro-icon-star" style={{ imageRendering: "pixelated" }} />
        </motion.div>
        <span className="retro-title-text">{title}</span>
      </div>

      <div className="retro-title-right">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Heart className="retro-icon-heart" style={{ imageRendering: "pixelated" }} />
          </motion.div>
        ))}
        <button
          onClick={onMinimize}
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
  );
}

