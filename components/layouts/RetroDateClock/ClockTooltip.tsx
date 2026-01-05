import * as Tooltip from "@radix-ui/react-tooltip";
import { formatDate, formatTime } from "./utils";
import styles from "./styles.module.css";

interface ClockTooltipProps {
  date: Date;
  children: React.ReactNode;
}

export function ClockTooltip({ date, children }: ClockTooltipProps) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={styles.tooltipContent}
            side="bottom"
            sideOffset={8}
          >
            <div className={styles.tooltipArrow} />
            <div>
              <div className={styles.tooltipDate}>{formatDate(date)}</div>
              <div className={styles.tooltipTime}>{formatTime(date)}</div>
            </div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

