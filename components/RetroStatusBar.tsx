import { motion } from "framer-motion";

export function RetroStatusBar() {
  return (
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
  );
}

