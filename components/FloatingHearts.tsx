import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function FloatingHearts() {
  const hearts = Array.from({ length: 8 });

  return (
    <div className="floating-hearts">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="floating-heart"
          style={{
            left: `${10 + i * 12}%`,
            bottom: "-50px",
          }}
          animate={{
            y: [0, -1000],
            x: [0, Math.sin(i) * 50],
            rotate: [0, 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear",
          }}
        >
          <Heart 
            className="floating-heart-icon" 
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>
      ))}
    </div>
  );
}

