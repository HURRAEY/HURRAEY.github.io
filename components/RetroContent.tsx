import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface RetroContentProps {
  children?: React.ReactNode;
}

export function RetroContent({ children }: RetroContentProps) {
  const defaultContent = (
    <>
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
          ease: "easeInOut",
        }}
        className="retro-sparkles"
      >
        <Sparkles className="retro-icon-sparkles" />
      </motion.div>
    </>
  );

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="retro-content"
    >
      <div className="retro-content-inner">
        {children || defaultContent}
      </div>
    </motion.div>
  );
}

