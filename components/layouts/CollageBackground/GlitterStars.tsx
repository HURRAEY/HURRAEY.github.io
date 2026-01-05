import { memo, useMemo } from "react";
import { GlitterStar } from "./types";
import { Y2K_CONFIG, COLORS } from "./constants";
import styles from "./styles.module.css";

// CSS 애니메이션으로 변경하여 React 리렌더 완전 분리
export const GlitterStars = memo(function GlitterStars() {
  const stars = useMemo<GlitterStar[]>(() => {
    return Array.from(
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
        repeatDelay: Math.random() * 3,
      })
    );
  }, []);

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className={styles.glitterStar}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`,
            '--repeat-delay': `${star.repeatDelay}s`,
          } as React.CSSProperties}
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
        </div>
      ))}
    </>
  );
});


