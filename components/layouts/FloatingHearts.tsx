/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { css } from "@emotion/react";

const containerStyle = css`
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
`;

const heartWrapperStyle = css`
  position: absolute;
`;

const heartIconStyle = css`
  width: 16px;
  height: 16px;
  color: #f48fb1;
  fill: #f48fb1;
  image-rendering: pixelated;

  @media (min-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;

export function FloatingHearts() {
  const hearts = Array.from({ length: 8 });

  return (
    <div css={containerStyle}>
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          css={heartWrapperStyle}
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
          <Heart css={heartIconStyle} />
        </motion.div>
      ))}
    </div>
  );
}

