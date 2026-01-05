import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FloatingHeart } from "./types";
import { Y2K_CONFIG, COLORS } from "./constants";
import styles from "./styles.module.css";

export function FloatingPinkHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const floatingHearts: FloatingHeart[] = Array.from(
      { length: Y2K_CONFIG.FLOATING_HEARTS_COUNT },
      (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration:
          Math.random() * (Y2K_CONFIG.HEART_DURATION_MAX - Y2K_CONFIG.HEART_DURATION_MIN) +
          Y2K_CONFIG.HEART_DURATION_MIN,
        delay: Math.random() * 5,
      })
    );
    setHearts(floatingHearts);
  }, []);

  if (hearts.length === 0) {
    return null;
  }

  return (
    <>
      {hearts.map((heart) => (
        <motion.div
          key={`heart-${heart.id}`}
          className={styles.floatingHeart}
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -100],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24">
            <defs>
              <linearGradient
                id={`heart-gradient-${heart.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={COLORS.HEART_START} />
                <stop offset="100%" stopColor={COLORS.HEART_END} />
              </linearGradient>
            </defs>
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={`url(#heart-gradient-${heart.id})`}
              stroke={COLORS.HEART_STROKE}
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>
      ))}
    </>
  );
}


