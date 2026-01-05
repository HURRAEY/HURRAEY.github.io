import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sticker } from "./types";
import { Y2K_CONFIG, STICKER_EMOJIS } from "./constants";
import styles from "./styles.module.css";

export function ScatteredStickers() {
  const [stickers, setStickers] = useState<Sticker[]>([]);

  useEffect(() => {
    const scatteredStickers: Sticker[] = Array.from(
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
    setStickers(scatteredStickers);
  }, []);

  if (stickers.length === 0) {
    return null;
  }

  return (
    <>
      {stickers.map((sticker) => (
        <motion.div
          key={`sticker-${sticker.id}`}
          className={styles.sticker}
          style={{
            left: `${sticker.x}%`,
            top: `${sticker.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1.2, 0],
            rotate: [0, sticker.rotation],
          }}
          transition={{
            duration: sticker.duration,
            delay: sticker.delay,
            repeat: Infinity,
          }}
        >
          {sticker.emoji}
        </motion.div>
      ))}
    </>
  );
}

