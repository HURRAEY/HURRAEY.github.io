import { motion } from "motion/react";
import { SCHEDULE } from "./constants";
import { createPieSlice, getTextPosition } from "./utils";
import styles from "./styles.module.css";

export function SchedulePieChart() {
  const centerX = 50;
  const centerY = 50;
  const radius = 38;
  const textRadius = 28;

  return (
    <svg
      className={styles.pieChartOverlay}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
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

            {/* Activity text */}
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

