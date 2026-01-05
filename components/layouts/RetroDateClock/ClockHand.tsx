import { motion } from "motion/react";
import styles from "./styles.module.css";

interface ClockHandProps {
  rotation: number;
}

export function ClockHand({ rotation }: ClockHandProps) {
  return (
    <motion.div
      className={styles.clockHandContainer}
      animate={{
        rotate: rotation,
      }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 15,
      }}
    >
      <div className={styles.handWrapper}>
        <div className={styles.handBody}>
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={styles.heartIcon}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF69B4" />
                <stop offset="50%" stopColor="#FF1493" />
                <stop offset="100%" stopColor="#FF69B4" />
              </linearGradient>
              <filter id="heartGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect x="6" y="6" width="3" height="3" fill="#FF69B4" opacity="0.3" filter="url(#heartGlow)" />
            <rect x="9" y="6" width="3" height="3" fill="#FF69B4" opacity="0.3" filter="url(#heartGlow)" />
            <rect x="15" y="6" width="3" height="3" fill="#FF69B4" opacity="0.3" filter="url(#heartGlow)" />
            <rect x="18" y="6" width="3" height="3" fill="#FF69B4" opacity="0.3" filter="url(#heartGlow)" />
            <rect x="6" y="6" width="3" height="3" fill="#9c27b0" />
            <rect x="9" y="6" width="3" height="3" fill="#9c27b0" />
            <rect x="15" y="6" width="3" height="3" fill="#9c27b0" />
            <rect x="18" y="6" width="3" height="3" fill="#9c27b0" />

            <rect x="3" y="9" width="3" height="3" fill="#9c27b0" />
            <rect x="6" y="9" width="3" height="3" fill="url(#heartGradient)" opacity="0.8" />
            <rect x="9" y="9" width="3" height="3" fill="url(#heartGradient)" />
            <rect x="12" y="9" width="3" height="3" fill="url(#heartGradient)" opacity="0.8" />
            <rect x="15" y="9" width="3" height="3" fill="url(#heartGradient)" />
            <rect x="18" y="9" width="3" height="3" fill="url(#heartGradient)" opacity="0.8" />
            <rect x="21" y="9" width="3" height="3" fill="#9c27b0" />

            <rect x="3" y="12" width="3" height="3" fill="#9c27b0" />
            <rect x="6" y="12" width="3" height="3" fill="url(#heartGradient)" opacity="0.9" />
            <rect x="9" y="12" width="3" height="3" fill="url(#heartGradient)" />
            <rect x="12" y="12" width="3" height="3" fill="url(#heartGradient)" />
            <rect x="15" y="12" width="3" height="3" fill="url(#heartGradient)" />
            <rect x="18" y="12" width="3" height="3" fill="url(#heartGradient)" opacity="0.9" />
            <rect x="21" y="12" width="3" height="3" fill="#9c27b0" />

            <rect x="6" y="15" width="3" height="3" fill="#9c27b0" />
            <rect x="9" y="15" width="3" height="3" fill="url(#heartGradient)" opacity="0.8" />
            <rect x="12" y="15" width="3" height="3" fill="url(#heartGradient)" opacity="0.9" />
            <rect x="15" y="15" width="3" height="3" fill="url(#heartGradient)" opacity="0.8" />
            <rect x="18" y="15" width="3" height="3" fill="#9c27b0" />

            <rect x="9" y="18" width="3" height="3" fill="#9c27b0" />
            <rect x="12" y="18" width="3" height="3" fill="url(#heartGradient)" opacity="0.8" />
            <rect x="15" y="18" width="3" height="3" fill="#9c27b0" />

            <rect x="12" y="21" width="3" height="3" fill="#9c27b0" />
          </motion.svg>
          <div className={styles.pixelStick}>
            {[...Array(20)].map((_, i) => {
              const opacity = 1 - (i / 20) * 0.3;
              return (
                <div key={i} className={styles.pixelRow}>
                  <div className={styles.pixelBorder} />
                  <div 
                    className={styles.pixelWhite} 
                    style={{
                      background: `linear-gradient(to bottom, rgba(255, 105, 180, ${opacity * 0.1}), rgba(255, 255, 255, ${opacity}))`,
                    }}
                  />
                  <div 
                    className={styles.pixelGray}
                    style={{
                      background: `linear-gradient(to bottom, rgba(255, 20, 147, ${opacity * 0.15}), rgba(232, 232, 232, ${opacity}))`,
                    }}
                  />
                  <div className={styles.pixelBorder} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

