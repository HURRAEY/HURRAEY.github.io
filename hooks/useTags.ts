import { useMemo } from "react";
import { loadPosts } from "../lib/loadPosts";

interface TagData {
  tagCounts: Record<string, number>;
  allTags: string[];
}

interface TagMenuItem {
  label: string;
  path: string;
}

export function useTags() {
  // 포스트 데이터 로드
  const posts = useMemo(() => loadPosts(), []);

  // 태그 추출 및 개수 계산
  const tagData: TagData = useMemo(() => {
    const tagCounts = posts.reduce((acc, post) => {
      if (post.tag) {
        const tags = post.tag.split(',').map((t) => t.trim()).filter(Boolean);
        tags.forEach((tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
      }
      return acc;
    }, {} as Record<string, number>);

    // 태그를 개수순으로 정렬 (같으면 알파벳순)
    const allTags = Object.entries(tagCounts)
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1]; // 개수순
        return a[0].localeCompare(b[0]); // 알파벳순
      })
      .map(([tag]) => tag);

    return { tagCounts, allTags };
  }, [posts]);

  // Tags 메뉴 항목 (드롭다운용)
  const tagsMenuItems: TagMenuItem[] = useMemo(() => {
    return tagData.allTags.length > 0
      ? tagData.allTags.map((tag) => ({
          label: `${tag} (${tagData.tagCounts[tag]})`,
          path: `/tags/${encodeURIComponent(tag)}`,
        }))
      : [{ label: "No tags", path: "/tags" }];
  }, [tagData]);

  return { tagData, tagsMenuItems };
}

