import type { Post } from "./types";

/**
 * 태그 문자열을 배열로 변환
 */
export function parseTags(tagString: string): string[] {
  if (!tagString) return [];
  return tagString
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/**
 * 간단한 해시 함수 (서버/클라이언트에서 동일한 값 생성)
 */
export function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * 포스트의 초기 좋아요 수 계산
 */
export function getInitialLikes(post: Post): number {
  const hash = simpleHash(post.route + post.title);
  return 50 + (hash % 200);
}

/**
 * 포스트의 초기 조회수 계산
 */
export function getInitialViews(post: Post): number {
  const hash = simpleHash(post.route + post.date);
  return 500 + (hash % 5000);
}

/**
 * 색상 그라데이션 타입
 */
export interface ColorGradient {
  from: string;
  to: string;
}

/**
 * 포스트 제목 기반으로 색상 그라데이션 결정
 * RetroPostCard와 동일한 로직 사용
 */
export function getColorGradient(post: Post): ColorGradient {
  const colors: ColorGradient[] = [
    { from: "#e91e63", to: "#f06292" },
    { from: "#9c27b0", to: "#ba68c8" },
    { from: "#00bcd4", to: "#4dd0e1" },
    { from: "#4caf50", to: "#81c784" },
    { from: "#ff9800", to: "#ffb74d" },
    { from: "#f44336", to: "#e57373" },
  ];
  const index = post.title.charCodeAt(0) % colors.length;
  return colors[index];
}
