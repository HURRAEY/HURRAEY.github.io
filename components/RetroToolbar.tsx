import { motion } from "framer-motion";

export function RetroToolbar() {
  return (
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
  );
}

