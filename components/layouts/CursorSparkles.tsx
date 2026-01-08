/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { css, keyframes } from "@emotion/react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

const sparkleAnimation = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) rotate(180deg) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(360deg) scale(0.5);
  }
`;

const containerStyle = css`
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  overflow: hidden;
`;

const sparkleStyle = (size: number, rotation: number) => css`
  position: absolute;
  width: ${size}px;
  height: ${size}px;
  left: 0;
  top: 0;
  transform: translate(-50%, -50%) rotate(${rotation}deg);
  animation: ${sparkleAnimation} 0.8s ease-out forwards;
`;

const svgStyle = css`
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
`;

export function CursorSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let sparkleId = 0;
    let lastSparkleTime = 0;
    const sparkleColors = ["#FF1493", "#FF69B4", "#FFB6C1", "#FFC0CB", "#FFE4E1"];

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const now = Date.now();
      // Create sparkles every 50ms
      if (now - lastSparkleTime > 50) {
        lastSparkleTime = now;

        const newSparkle: Sparkle = {
          id: sparkleId++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 4,
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
          rotation: Math.random() * 360,
        };

        setSparkles((prev) => [...prev, newSparkle]);

        // Remove sparkle after animation
        setTimeout(() => {
          setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
        }, 800);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div css={containerStyle}>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          css={sparkleStyle(sparkle.size, sparkle.rotation)}
          style={{
            left: sparkle.x,
            top: sparkle.y,
          }}
        >
          {/* Pixel star shape */}
          <svg
            css={svgStyle}
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Pixel star */}
            <rect x="5" y="0" width="2" height="2" fill={sparkle.color} />
            <rect x="3" y="2" width="2" height="2" fill={sparkle.color} />
            <rect x="5" y="2" width="2" height="2" fill={sparkle.color} />
            <rect x="7" y="2" width="2" height="2" fill={sparkle.color} />
            <rect x="0" y="5" width="2" height="2" fill={sparkle.color} />
            <rect x="2" y="4" width="2" height="2" fill={sparkle.color} />
            <rect x="4" y="3" width="2" height="2" fill={sparkle.color} />
            <rect x="6" y="3" width="2" height="2" fill={sparkle.color} />
            <rect x="8" y="4" width="2" height="2" fill={sparkle.color} />
            <rect x="10" y="5" width="2" height="2" fill={sparkle.color} />
            <rect x="3" y="6" width="2" height="2" fill={sparkle.color} />
            <rect x="5" y="6" width="2" height="2" fill={sparkle.color} />
            <rect x="7" y="6" width="2" height="2" fill={sparkle.color} />
            <rect x="4" y="8" width="2" height="2" fill={sparkle.color} />
            <rect x="6" y="8" width="2" height="2" fill={sparkle.color} />
            <rect x="5" y="10" width="2" height="2" fill={sparkle.color} />
          </svg>
        </div>
      ))}
    </div>
  );
}
