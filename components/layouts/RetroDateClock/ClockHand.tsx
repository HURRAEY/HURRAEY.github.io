import { motion } from "motion/react";
import styles from "./styles.module.css";

interface ClockHandProps {
  rotation: number;
}

export function ClockHand({ rotation }: ClockHandProps) {
  return (
    <motion.div
      className={styles.clockHandContainer}
      animate={{
        rotate: rotation,
      }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 15,
      }}
    >
      <div className={styles.handWrapper}>
        <div className={styles.handBody}>
          {/* Pixel Heart at top */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={styles.heartIcon}
          >
            {/* White Pixel heart */}
            <rect x="6" y="6" width="3" height="3" fill="#000000" />
            <rect x="9" y="6" width="3" height="3" fill="#000000" />
            <rect x="15" y="6" width="3" height="3" fill="#000000" />
            <rect x="18" y="6" width="3" height="3" fill="#000000" />

            <rect x="3" y="9" width="3" height="3" fill="#000000" />
            <rect x="6" y="9" width="3" height="3" fill="#E0E0E0" />
            <rect x="9" y="9" width="3" height="3" fill="#F5F5F5" />
            <rect x="12" y="9" width="3" height="3" fill="#E0E0E0" />
            <rect x="15" y="9" width="3" height="3" fill="#F5F5F5" />
            <rect x="18" y="9" width="3" height="3" fill="#E0E0E0" />
            <rect x="21" y="9" width="3" height="3" fill="#000000" />

            <rect x="3" y="12" width="3" height="3" fill="#000000" />
            <rect x="6" y="12" width="3" height="3" fill="#F5F5F5" />
            <rect x="9" y="12" width="3" height="3" fill="#FFFFFF" />
            <rect x="12" y="12" width="3" height="3" fill="#FFFFFF" />
            <rect x="15" y="12" width="3" height="3" fill="#FFFFFF" />
            <rect x="18" y="12" width="3" height="3" fill="#F5F5F5" />
            <rect x="21" y="12" width="3" height="3" fill="#000000" />

            <rect x="6" y="15" width="3" height="3" fill="#000000" />
            <rect x="9" y="15" width="3" height="3" fill="#E0E0E0" />
            <rect x="12" y="15" width="3" height="3" fill="#F5F5F5" />
            <rect x="15" y="15" width="3" height="3" fill="#E0E0E0" />
            <rect x="18" y="15" width="3" height="3" fill="#000000" />

            <rect x="9" y="18" width="3" height="3" fill="#000000" />
            <rect x="12" y="18" width="3" height="3" fill="#E0E0E0" />
            <rect x="15" y="18" width="3" height="3" fill="#000000" />

            <rect x="12" y="21" width="3" height="3" fill="#000000" />
          </svg>

          {/* Pixel stick body */}
          <div className={styles.pixelStick}>
            {[...Array(20)].map((_, i) => (
              <div key={i} className={styles.pixelRow}>
                <div className={styles.pixelBorder} />
                <div className={styles.pixelWhite} />
                <div className={styles.pixelGray} />
                <div className={styles.pixelBorder} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

