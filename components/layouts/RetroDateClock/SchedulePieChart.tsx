import { memo } from "react";
import { SCHEDULE } from "./constants";
import { createPieSlice, getTextPosition } from "./utils";
import styles from "./styles.module.css";

// CSS 애니메이션으로 변경하여 React 리렌더 완전 분리
export const SchedulePieChart = memo(function SchedulePieChart() {
  // 이미지의 실제 크기에 맞춰 viewBox 계산 (정사각형 기준)
  const viewBoxSize = 100;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;
  const radius = 32; // 시계보다 작게 설정
  const textRadius = 24; // 텍스트도 비례해서 조정

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
            <path
              className={styles.pieSlice}
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
              style={{
                animationDelay: `${0.5 + index * 0.08}s`,
              }}
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
});

