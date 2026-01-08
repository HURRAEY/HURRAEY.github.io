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
