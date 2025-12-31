import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function PixelBackground() {
  const [pixelData, setPixelData] = useState<Array<{
    left: number;
    top: number;
    backgroundColor: string;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // 클라이언트에서만 랜덤 값 생성
    const pixels = Array.from({ length: 50 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      backgroundColor: [
        "#ff69b4",
        "#e91e63",
        "#9c27b0",
        "#00bcd4",
        "#ffeb3b"
      ][Math.floor(Math.random() * 5)],
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setPixelData(pixels);
  }, []);

  if (pixelData.length === 0) {
    return <div className="pixel-background" />;
  }

  return (
    <div className="pixel-background">
      {pixelData.map((pixel, i) => (
        <motion.div
          key={i}
          className="pixel-background-item"
          style={{
            left: `${pixel.left}%`,
            top: `${pixel.top}%`,
            backgroundColor: pixel.backgroundColor,
            imageRendering: "pixelated",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: pixel.duration,
            repeat: Infinity,
            delay: pixel.delay,
          }}
        />
      ))}
    </div>
  );
}

