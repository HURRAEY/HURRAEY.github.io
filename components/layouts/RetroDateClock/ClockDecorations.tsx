import { memo } from "react";
import { Heart, Cloud, Moon, Sun } from "lucide-react";
import styles from "./styles.module.css";

// CSS 애니메이션으로 변경하여 React 리렌더 완전 분리
export const ClockDecorations = memo(function ClockDecorations() {
  return (
    <>
      {/* Sparkle Effects */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className={styles.sparkle}
          style={{
            top: `${15 + Math.sin(i * Math.PI / 3) * 65}%`,
            left: `${15 + Math.cos(i * Math.PI / 3) * 65}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      {/* Decorative Characters - Top Left (Heart) */}
      <div className={`${styles.decorationIcon} ${styles.heartDecoration}`}>
        <Heart
          className={styles.iconHeart}
          strokeWidth={2}
        />
      </div>

      {/* Decorative Characters - Top Right (Sun) */}
      <div className={`${styles.decorationIcon} ${styles.sunDecoration}`}>
        <Sun
          className={styles.iconSun}
          strokeWidth={2}
        />
      </div>

      {/* Decorative Characters - Bottom Left (Cloud) */}
      <div className={`${styles.decorationIcon} ${styles.cloudDecoration}`}>
        <Cloud
          className={styles.iconCloud}
          strokeWidth={2}
        />
      </div>

      {/* Decorative Characters - Bottom Right (Moon) */}
      <div className={`${styles.decorationIcon} ${styles.moonDecoration}`}>
        <Moon
          className={styles.iconMoon}
          strokeWidth={2}
        />
      </div>

      {/* Cute Pixel Star Decorations */}
      <div className={`${styles.pixelStar} ${styles.pixelStarLeft}`}>
        <svg width="32" height="32" viewBox="0 0 32 32">
          <rect x="12" y="4" width="8" height="8" fill="#FFD700" stroke="#000" strokeWidth="2" />
          <rect x="4" y="12" width="8" height="8" fill="#FF69B4" stroke="#000" strokeWidth="2" />
          <rect x="20" y="12" width="8" height="8" fill="#87CEEB" stroke="#000" strokeWidth="2" />
          <rect x="12" y="20" width="8" height="8" fill="#98FB98" stroke="#000" strokeWidth="2" />
          <rect x="12" y="12" width="8" height="8" fill="#FFF" stroke="#000" strokeWidth="2" />
        </svg>
      </div>

      <div className={`${styles.pixelStar} ${styles.pixelStarRight}`}>
        <svg width="32" height="32" viewBox="0 0 32 32">
          <rect x="12" y="4" width="8" height="8" fill="#9370DB" stroke="#000" strokeWidth="2" />
          <rect x="4" y="12" width="8" height="8" fill="#00CED1" stroke="#000" strokeWidth="2" />
          <rect x="20" y="12" width="8" height="8" fill="#FFB6C1" stroke="#000" strokeWidth="2" />
          <rect x="12" y="20" width="8" height="8" fill="#FF1493" stroke="#000" strokeWidth="2" />
          <rect x="12" y="12" width="8" height="8" fill="#FFF" stroke="#000" strokeWidth="2" />
        </svg>
      </div>

      {/* Cute Pixel Character - Bottom Center */}
      <div className={styles.pixelCat}>
        <svg width="48" height="48" viewBox="0 0 48 48">
          <rect x="8" y="12" width="8" height="8" fill="#FFB6C1" stroke="#000" strokeWidth="2" />
          <rect x="32" y="12" width="8" height="8" fill="#FFB6C1" stroke="#000" strokeWidth="2" />
          <rect x="12" y="16" width="24" height="20" fill="#FFE4E1" stroke="#000" strokeWidth="2" />
          <rect x="16" y="22" width="4" height="4" fill="#000" />
          <rect x="28" y="22" width="4" height="4" fill="#000" />
          <rect x="22" y="28" width="4" height="2" fill="#FF69B4" />
          <line x1="8" y1="26" x2="12" y2="26" stroke="#000" strokeWidth="2" />
          <line x1="36" y1="26" x2="40" y2="26" stroke="#000" strokeWidth="2" />
        </svg>
      </div>
    </>
  );
});

