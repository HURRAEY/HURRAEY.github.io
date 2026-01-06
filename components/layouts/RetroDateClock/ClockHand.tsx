import { memo, useState, useEffect } from "react";
import styles from "./styles.module.css";

interface ClockHandProps {
  rotation: number;
}

// CSS 애니메이션으로 변경하여 React 리렌더 완전 분리
export const ClockHand = memo(function ClockHand({ rotation }: ClockHandProps) {
  const [handLength, setHandLength] = useState(20);

  useEffect(() => {
    const updateHandLength = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // 모바일
        setHandLength(15);
      } else if (width < 1024) {
        // 태블릿
        setHandLength(18);
      } else {
        // 데스크톱
        setHandLength(20);
      }
    };

    updateHandLength();
    window.addEventListener("resize", updateHandLength);

    return () => window.removeEventListener("resize", updateHandLength);
  }, []);

  return (
    <div
      className={styles.clockHandContainer}
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div className={styles.handWrapper}>
        <div className={styles.handBody}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={styles.heartIcon}
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
          </svg>
          <div className={styles.pixelStick}>
            {[...Array(handLength)].map((_, i) => {
              const opacity = 1 - (i / handLength) * 0.3;
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
    </div>
  );
});

