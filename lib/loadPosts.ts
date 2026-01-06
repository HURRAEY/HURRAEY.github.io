import type { Post } from "./types";

/**
 * 빌드 타임에 생성된 포스트 목록을 로드합니다.
 * 파일이 없을 경우를 대비해 빈 배열을 반환합니다.
 */
export function loadPosts(): Post[] {
  try {
    // 빌드 타임에 생성된 포스트 목록 import
    // @ts-ignore - 동적으로 생성되는 파일이므로 타입 체크 무시
    const postsModule = require("./posts");
    return postsModule.posts || [];
  } catch (e) {
    // 개발 환경에서 아직 빌드되지 않은 경우를 위한 기본값
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "포스트 목록을 불러올 수 없습니다. 'pnpm build' 또는 'node scripts/gen-rss.js'를 실행해주세요."
      );
    }
    return [];
  }
}







