import { memo, useMemo } from "react";
import { Sticker } from "./types";
import { Y2K_CONFIG, STICKER_EMOJIS } from "./constants";
import styles from "./styles.module.css";

// CSS 애니메이션으로 변경하여 React 리렌더 완전 분리
export const ScatteredStickers = memo(function ScatteredStickers() {
  const stickers = useMemo<Sticker[]>(() => {
    return Array.from(
      { length: Y2K_CONFIG.SCATTERED_STICKERS_COUNT },
      (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: STICKER_EMOJIS[i % STICKER_EMOJIS.length],
        duration: Y2K_CONFIG.STICKER_DURATION,
        delay: Math.random() * Y2K_CONFIG.STICKER_DELAY_MAX,
        rotation: Math.random() * 360,
      })
    );
  }, []);

  return (
    <>
      {stickers.map((sticker) => (
        <div
          key={`sticker-${sticker.id}`}
          className={styles.sticker}
          style={{
            left: `${sticker.x}%`,
            top: `${sticker.y}%`,
            '--duration': `${sticker.duration}s`,
            '--delay': `${sticker.delay}s`,
            '--rotation': `${sticker.rotation}deg`,
          } as React.CSSProperties}
        >
          {sticker.emoji}
        </div>
      ))}
    </>
  );
});


