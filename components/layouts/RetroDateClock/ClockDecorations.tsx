import { motion } from "motion/react";
import { Heart, Cloud, Moon, Sun } from "lucide-react";
import styles from "./styles.module.css";

export function ClockDecorations() {
  return (
    <>
      {/* Sparkle Effects */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className={styles.sparkle}
          style={{
            top: `${15 + Math.sin(i * Math.PI / 3) * 65}%`,
            left: `${15 + Math.cos(i * Math.PI / 3) * 65}%`,
          }}
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.4,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Decorative Characters - Top Left (Heart) */}
      <motion.div
        className={`${styles.decorationIcon} ${styles.heartDecoration}`}
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Heart
          className={styles.iconHeart}
          strokeWidth={2}
        />
      </motion.div>

      {/* Decorative Characters - Top Right (Sun) */}
      <motion.div
        className={`${styles.decorationIcon} ${styles.sunDecoration}`}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Sun
          className={styles.iconSun}
          strokeWidth={2}
        />
      </motion.div>

      {/* Decorative Characters - Bottom Left (Cloud) */}
      <motion.div
        className={`${styles.decorationIcon} ${styles.cloudDecoration}`}
        animate={{
          x: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Cloud
          className={styles.iconCloud}
          strokeWidth={2}
        />
      </motion.div>

      {/* Decorative Characters - Bottom Right (Moon) */}
      <motion.div
        className={`${styles.decorationIcon} ${styles.moonDecoration}`}
        animate={{
          rotate: [0, 20, -20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Moon
          className={styles.iconMoon}
          strokeWidth={2}
        />
      </motion.div>

      {/* Cute Pixel Star Decorations */}
      <motion.div
        className={`${styles.pixelStar} ${styles.pixelStarLeft}`}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <rect x="12" y="4" width="8" height="8" fill="#FFD700" stroke="#000" strokeWidth="2" />
          <rect x="4" y="12" width="8" height="8" fill="#FF69B4" stroke="#000" strokeWidth="2" />
          <rect x="20" y="12" width="8" height="8" fill="#87CEEB" stroke="#000" strokeWidth="2" />
          <rect x="12" y="20" width="8" height="8" fill="#98FB98" stroke="#000" strokeWidth="2" />
          <rect x="12" y="12" width="8" height="8" fill="#FFF" stroke="#000" strokeWidth="2" />
        </svg>
      </motion.div>

      <motion.div
        className={`${styles.pixelStar} ${styles.pixelStarRight}`}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <rect x="12" y="4" width="8" height="8" fill="#9370DB" stroke="#000" strokeWidth="2" />
          <rect x="4" y="12" width="8" height="8" fill="#00CED1" stroke="#000" strokeWidth="2" />
          <rect x="20" y="12" width="8" height="8" fill="#FFB6C1" stroke="#000" strokeWidth="2" />
          <rect x="12" y="20" width="8" height="8" fill="#FF1493" stroke="#000" strokeWidth="2" />
          <rect x="12" y="12" width="8" height="8" fill="#FFF" stroke="#000" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Cute Pixel Character - Bottom Center */}
      <motion.div
        className={styles.pixelCat}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48">
          {/* Pixel Cat */}
          {/* Ears */}
          <rect x="8" y="12" width="8" height="8" fill="#FFB6C1" stroke="#000" strokeWidth="2" />
          <rect x="32" y="12" width="8" height="8" fill="#FFB6C1" stroke="#000" strokeWidth="2" />

          {/* Head */}
          <rect x="12" y="16" width="24" height="20" fill="#FFE4E1" stroke="#000" strokeWidth="2" />

          {/* Eyes */}
          <rect x="16" y="22" width="4" height="4" fill="#000" />
          <rect x="28" y="22" width="4" height="4" fill="#000" />

          {/* Nose */}
          <rect x="22" y="28" width="4" height="2" fill="#FF69B4" />

          {/* Whiskers */}
          <line x1="8" y1="26" x2="12" y2="26" stroke="#000" strokeWidth="2" />
          <line x1="36" y1="26" x2="40" y2="26" stroke="#000" strokeWidth="2" />
        </svg>
      </motion.div>
    </>
  );
}

