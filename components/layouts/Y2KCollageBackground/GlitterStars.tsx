import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GlitterStar } from "./types";
import { Y2K_CONFIG, COLORS } from "./constants";
import styles from "./styles.module.css";

export function GlitterStars() {
  const [stars, setStars] = useState<GlitterStar[]>([]);

  useEffect(() => {
    const glitterStars: GlitterStar[] = Array.from(
      { length: Y2K_CONFIG.GLITTER_STARS_COUNT },
      (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size:
          Math.random() * (Y2K_CONFIG.STAR_SIZE_MAX - Y2K_CONFIG.STAR_SIZE_MIN) +
          Y2K_CONFIG.STAR_SIZE_MIN,
        delay: Math.random() * 2,
        duration:
          Math.random() * (Y2K_CONFIG.STAR_DURATION_MAX - Y2K_CONFIG.STAR_DURATION_MIN) +
          Y2K_CONFIG.STAR_DURATION_MIN,
      })
    );
    setStars(glitterStars);
  }, []);

  if (stars.length === 0) {
    return null;
  }

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={styles.glitterStar}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient
                id={`gold-gradient-${star.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={COLORS.GOLD_START} />
                <stop offset="50%" stopColor={COLORS.GOLD_MID} />
                <stop offset="100%" stopColor={COLORS.GOLD_END} />
              </linearGradient>
              <filter id={`sparkle-${star.id}`}>
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <polygon
              points="50,5 60,40 95,40 67,60 78,95 50,75 22,95 33,60 5,40 40,40"
              fill={`url(#gold-gradient-${star.id})`}
              filter={`url(#sparkle-${star.id})`}
              stroke={COLORS.GOLD_STROKE}
              strokeWidth="2"
            />
            <polygon
              points="50,15 56,38 75,38 60,50 65,73 50,60 35,73 40,50 25,38 44,38"
              fill={COLORS.GOLD_HIGHLIGHT}
              opacity="0.7"
            />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

