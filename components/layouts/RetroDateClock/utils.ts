import { TextPosition } from "./types";

/**
 * 파이 조각 경로 생성
 * @param startHour 시작 시간 (0-24)
 * @param endHour 종료 시간 (0-24)
 * @param centerX 중심 X 좌표
 * @param centerY 중심 Y 좌표
 * @param radius 반지름
 * @returns SVG path 문자열
 */
export function createPieSlice(
  startHour: number,
  endHour: number,
  centerX: number,
  centerY: number,
  radius: number
): string {
  // 12시 방향을 0도로, 시계방향으로 회전
  const startAngle = (startHour / 24) * 360 - 90;
  const endAngle = (endHour / 24) * 360 - 90;

  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const x1 = centerX + radius * Math.cos(startRad);
  const y1 = centerY + radius * Math.sin(startRad);
  const x2 = centerX + radius * Math.cos(endRad);
  const y2 = centerY + radius * Math.sin(endRad);

  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

/**
 * 텍스트 위치 계산
 * @param startHour 시작 시간
 * @param endHour 종료 시간
 * @param centerX 중심 X 좌표
 * @param centerY 중심 Y 좌표
 * @param textRadius 텍스트 반지름
 * @returns 텍스트 위치 정보
 */
export function getTextPosition(
  startHour: number,
  endHour: number,
  centerX: number,
  centerY: number,
  textRadius: number
): TextPosition {
  const midHour = (startHour + endHour) / 2;
  const angle = (midHour / 24) * 360 - 90;
  const rad = (angle * Math.PI) / 180;

  return {
    x: centerX + textRadius * Math.cos(rad),
    y: centerY + textRadius * Math.sin(rad),
    angle: angle + 90,
  };
}

/**
 * 날짜 포맷팅
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

/**
 * 시간 포맷팅
 */
export function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

/**
 * 월별 회전 각도 계산
 * Month 1 = 30 degrees (1 o'clock)
 * Month 2 = 60 degrees (2 o'clock)
 * Month 12 = 0 degrees (12 o'clock)
 */
export function calculateMonthRotation(month: number): number {
  return month === 12 ? 0 : month * 30;
}

