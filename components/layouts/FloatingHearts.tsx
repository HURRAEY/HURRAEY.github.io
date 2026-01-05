import { memo } from "react";
import { Heart } from "lucide-react";
import styles from "./FloatingHearts.module.css";

// CSS 애니메이션으로 변경하여 React 리렌더 완전 분리
export const FloatingHearts = memo(function FloatingHearts() {
  const hearts = Array.from({ length: 8 });

  return (
    <div className={styles.container}>
      {hearts.map((_, i) => {
        const duration = 8 + (i % 4) * 1; // Math.random() 대신 인덱스 기반으로 고정
        const delay = i * 0.5;
        const xOffset = Math.sin(i) * 50;
        
        return (
          <div
            key={i}
            className={styles.heartWrapper}
            style={{
              left: `${10 + i * 12}%`,
              bottom: "-50px",
              '--duration': `${duration}s`,
              '--delay': `${delay}s`,
              '--x-offset': `${xOffset}px`,
            } as React.CSSProperties}
          >
            <Heart className={styles.heartIcon} />
          </div>
        );
      })}
    </div>
  );
});

