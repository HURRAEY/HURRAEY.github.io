import { motion } from "motion/react";
import { SCHEDULE } from "./constants";
import { createPieSlice, getTextPosition } from "./utils";
import styles from "./styles.module.css";

interface SchedulePieChartProps {
  imageWidth?: number;
  imageHeight?: number;
}

export function SchedulePieChart({ imageWidth, imageHeight }: SchedulePieChartProps) {
  // 이미지의 실제 크기에 맞춰 viewBox 계산 (정사각형 기준)
  const viewBoxSize = 100;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;
  const radius = 38;
  const textRadius = 28;

  return (
    <svg
      className={styles.pieChartOverlay}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      style={
        imageWidth && imageHeight
          ? {
              width: imageWidth,
              height: imageHeight,
            }
          : undefined
      }
    >
      {SCHEDULE.map((slot, index) => {
        const textPos = getTextPosition(
          slot.startHour,
          slot.endHour,
          centerX,
          centerY,
          textRadius
        );

        return (
          <g key={index}>
            <motion.path
              d={createPieSlice(
                slot.startHour,
                slot.endHour,
                centerX,
                centerY,
                radius
              )}
              fill={slot.color}
              stroke="black"
              strokeWidth="0.3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.08 }}
            />
            <text
              x={textPos.x}
              y={textPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${textPos.angle}, ${textPos.x}, ${textPos.y})`}
              style={{
                fontFamily: "'DungGeunMo', monospace",
                fontSize: slot.endHour - slot.startHour >= 2 ? "3.2px" : "2.4px",
                fill: "#333",
                fontWeight: "bold",
                pointerEvents: "none",
              }}
            >
              {slot.title}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

