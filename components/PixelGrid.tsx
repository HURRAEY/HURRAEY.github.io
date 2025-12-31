import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function PixelGrid() {
  const gridItems = Array.from({ length: 12 });
  const [cellColors, setCellColors] = useState<Array<Array<string>>>([]);

  useEffect(() => {
    // 클라이언트에서만 랜덤 색상 생성
    const colors = gridItems.map(() =>
      Array.from({ length: 16 }).map(() =>
        Math.random() > 0.5 
          ? "rgba(255,255,255,0.1)" 
          : "rgba(0,0,0,0.1)"
      )
    );
    setCellColors(colors);
  }, []);

  return (
    <div className="pixel-grid-container">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pixel-grid-title"
      >
        ◆ PIXEL GALLERY ◆
      </motion.h2>
      
      <div className="pixel-grid">
        {gridItems.map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 1.4 + i * 0.1,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              zIndex: 10,
            }}
            className="pixel-grid-item"
          >
            <div className="pixel-grid-inner">
              {Array.from({ length: 16 }).map((_, j) => (
                <motion.div
                  key={j}
                  className="pixel-grid-cell"
                  style={{
                    backgroundColor: cellColors[i]?.[j] || "rgba(255,255,255,0.1)",
                  }}
                  animate={{
                    backgroundColor: [
                      "rgba(255,255,255,0.1)",
                      "rgba(0,0,0,0.1)",
                      "rgba(255,255,255,0.1)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: j * 0.1,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

