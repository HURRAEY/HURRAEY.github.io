import { motion } from "motion/react";
import { formatDate, formatTime } from "./utils";
import styles from "./styles.module.css";

interface ClockTooltipProps {
  show: boolean;
  date: Date;
}

export function ClockTooltip({ show, date }: ClockTooltipProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={styles.tooltip}
    >
      <div className={styles.tooltipContent}>
        <div className={styles.tooltipArrow} />
        <div>
          <div className={styles.tooltipDate}>{formatDate(date)}</div>
          <div className={styles.tooltipTime}>{formatTime(date)}</div>
        </div>
      </div>
    </motion.div>
  );
}

