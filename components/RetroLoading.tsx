import { useEffect, useState } from "react";
import styles from "./RetroLoading.module.css";

interface RetroLoadingProps {
  message?: string;
}

/**
 * 레트로 스타일의 로딩 화면 컴포넌트
 */
export function RetroLoading({ message = "로딩 중..." }: RetroLoadingProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.retroLoadingOverlay}>
      <div className={styles.retroLoadingWindow}>
        <div className={styles.retroLoadingTitleBar}>
          <div className={styles.retroLoadingTitleLeft}>
            <svg
              className={styles.retroLoadingIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className={styles.retroLoadingTitleText}>로딩 중</span>
          </div>
          <div className={styles.retroLoadingTitleRight}>
            <div className={styles.retroLoadingButton}></div>
            <div className={styles.retroLoadingButton}></div>
            <div className={styles.retroLoadingButton}></div>
          </div>
        </div>

        <div className={styles.retroLoadingContent}>
          <div className={styles.retroLoadingSpinner}>
            <div className={styles.retroLoadingPixel}></div>
            <div className={styles.retroLoadingPixel}></div>
            <div className={styles.retroLoadingPixel}></div>
            <div className={styles.retroLoadingPixel}></div>
            <div className={styles.retroLoadingPixel}></div>
            <div className={styles.retroLoadingPixel}></div>
            <div className={styles.retroLoadingPixel}></div>
            <div className={styles.retroLoadingPixel}></div>
          </div>
          <div className={styles.retroLoadingText}>
            {message}
            <span className={styles.retroLoadingDots}>{dots}</span>
          </div>
          <div className={styles.retroLoadingProgress}>
            <div className={styles.retroLoadingProgressBar}></div>
          </div>
        </div>

        <div className={styles.retroLoadingStatusBar}>
          <div className={styles.retroLoadingStatusLeft}>
            <div className={styles.retroLoadingStatusIndicator}></div>
            <span className={styles.retroLoadingStatusText}>준비 중...</span>
          </div>
        </div>
      </div>
    </div>
  );
}


