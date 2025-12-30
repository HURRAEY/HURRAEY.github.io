import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import * as Tooltip from '@radix-ui/react-tooltip';

// react-clock은 클라이언트 사이드에서만 작동하므로 dynamic import 사용
const Clock = dynamic(() => import('react-clock'), {
  ssr: false
});

interface AnalogClockProps {
  size?: number;
  className?: string;
}

/**
 * 아날로그 시계 컴포넌트
 * 각 숫자가 월을 의미합니다 (1=1월, 2=2월, ..., 12=12월).
 * 초침이 현재 월과 일자 진행률에 따라 움직이며, 시침과 분침은 표시되지 않습니다.
 * 예: 12월 30일이면 초침이 12시와 1시 사이의 약 96.77% 지점을 가리킵니다.
 */
export default function AnalogClock({ size = 300, className = '' }: AnalogClockProps) {
  const [value, setValue] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  const clockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // 초침이 현재 월과 일자 진행률에 따라 움직이도록 설정
    // 시침과 분침은 CSS로 숨김 처리됨
    const getMonthTime = () => {
      const now = new Date();
      const currentMonth = now.getMonth() + 1; // 0-11을 1-12로 변환
      const currentDay = now.getDate(); // 1-31
      
      // 현재 월의 총 일수 구하기
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      
      // 현재 월의 진행률 계산 (0 ~ 1)
      // 예: 12월 30일이면 (30-1)/31 = 0.9355 (93.55%)
      const progress = (currentDay - 1) / daysInMonth;
      
      // 현재 월의 위치 (초 단위)
      // 1월 = 5초, 2월 = 10초, ..., 12월 = 0초
      const currentMonthSecond = (currentMonth * 5) % 60;
      
      // 다음 월의 위치 계산
      const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
      const nextMonthSecond = (nextMonth * 5) % 60;
      
      // 현재 위치에서 다음 위치로 진행률만큼 이동
      // 예: 12월 30일이면 0초에서 5초 방향으로 93.55% 이동 = 약 4.68초
      // 12월에서 1월로 넘어갈 때도 자연스럽게 처리됨 (0초에서 5초로)
      const finalSecond = currentMonthSecond + (nextMonthSecond - currentMonthSecond) * progress;
      
      // 시와 분은 0으로 고정, 초만 월과 일자 진행률에 맞게 설정
      return new Date(2024, 0, 1, 0, 0, Math.round(finalSecond));
    };

    // 날짜와 시간 포맷팅 함수
    const formatDateTime = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(formatDateTime(now));
    };

    setValue(getMonthTime());
    updateDateTime();
    
    // 일자가 바뀔 때마다 업데이트 (1분마다 체크)
    const interval = setInterval(() => {
      setValue(getMonthTime());
      updateDateTime();
    }, 60000);

    // 시간을 실시간으로 업데이트 (1초마다)
    const timeInterval = setInterval(() => {
      updateDateTime();
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);


  if (!mounted || !value) {
    return (
      <div className={`analog-clock-wrapper ${className}`}>
        <div style={{ 
          width: size, 
          height: size, 
          borderRadius: '50%', 
          border: '2px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-secondary)'
        }}>
          <span style={{ color: 'var(--text-secondary)' }}>로딩 중...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        .analog-clock-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          margin: 2rem 0;
          position: relative;
        }
        /* 시침과 분침 숨기기 */
        .analog-clock-wrapper :global(.react-clock__hour-hand),
        .analog-clock-wrapper :global(.react-clock__minute-hand) {
          display: none !important;
        }
        /* 초침만 표시 */
        .analog-clock-wrapper :global(.react-clock__second-hand) {
          display: block !important;
          cursor: pointer;
        }
        /* Radix UI Tooltip 스타일 커스터마이징 */
        .analog-clock-wrapper :global([data-radix-tooltip-content]) {
          background: var(--bg-secondary) !important;
          color: var(--text-primary) !important;
          padding: 0.5rem 0.75rem !important;
          border-radius: 0.375rem !important;
          font-size: 0.875rem !important;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08) !important;
          border: 1px solid var(--border-color) !important;
          z-index: 1000 !important;
        }
        .dark .analog-clock-wrapper :global([data-radix-tooltip-content]) {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>
      <Tooltip.Provider delayDuration={0}>
        <div className={`analog-clock-wrapper ${className}`} ref={clockRef}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
                <Clock
                  value={value}
                  size={size}
                  renderNumbers={true}
                  renderMinuteMarks={true}
                  renderSecondHand={true}
                />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                align="center"
                sideOffset={8}
                className="clock-tooltip-content"
              >
                {currentDateTime}
                <Tooltip.Arrow className="clock-tooltip-arrow" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </div>
      </Tooltip.Provider>
    </>
  );
}

