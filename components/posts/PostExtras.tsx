import { useRouter } from "next/router";
import SocialShare from "./SocialShare";
import RelatedPosts from "./RelatedPosts";
import Giscus from "./Giscus";
import { GISCUS_CONFIG } from "../../lib/constants";
import type { Post } from "../../lib/types";

interface PostExtrasProps {
  currentPost: Post;
  allPosts: Post[];
}

/**
 * 포스트 페이지 하단에 표시되는 추가 컴포넌트들
 * (소셜 공유, 관련 포스트, 댓글)
 */
export default function PostExtras({ currentPost, allPosts }: PostExtrasProps) {
  const router = useRouter();

  const fullUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://hurraey.github.io${router.asPath}`;

  return (
    <div className="post-extras">
      <SocialShare
        title={currentPost.title}
        url={fullUrl}
        description={currentPost.description}
      />
      <RelatedPosts
        currentPost={{
          route: router.asPath,
          tag: currentPost.tag,
        }}
        allPosts={allPosts}
      />
      <Giscus
        repo={GISCUS_CONFIG.repo}
        repoId={GISCUS_CONFIG.repoId}
        mapping={GISCUS_CONFIG.mapping}
        reactionsEnabled={GISCUS_CONFIG.reactionsEnabled}
        theme={GISCUS_CONFIG.theme}
        lang={GISCUS_CONFIG.lang}
      />
    </div>
  );
}



