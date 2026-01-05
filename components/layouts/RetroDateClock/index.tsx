import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ClockHand } from "./ClockHand";
import { ClockTooltip } from "./ClockTooltip";
import { SchedulePieChart } from "./SchedulePieChart";
import { ClockDecorations } from "./ClockDecorations";
import { calculateMonthRotation } from "./utils";
import styles from "./styles.module.css";

export function RetroDateClock() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentMonth = currentDate.getMonth() + 1; // 0-11 to 1-12
  const rotation = calculateMonthRotation(currentMonth);

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className={styles.clockWrapper}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Clock Face */}
        <div className={styles.clockFaceContainer}>
          <motion.img
            src="/images/home/clock/1.svg"
            alt="Clock Face"
            className={styles.clockImage}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />

          {/* 24-Hour Schedule Pie Chart Overlay */}
          <SchedulePieChart />

          {/* Clock Hand - rotating based on month */}
          <ClockHand rotation={rotation} />
        </div>

        {/* Tooltip */}
        <ClockTooltip show={showTooltip} date={currentDate} />

        {/* Decorations */}
        <ClockDecorations />
      </motion.div>
    </div>
  );
}

