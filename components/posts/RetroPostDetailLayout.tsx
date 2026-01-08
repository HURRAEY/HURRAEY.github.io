/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import type { Post } from "../../lib/types";
import {
  getInitialLikes,
  getInitialViews,
  parseTags,
} from "../../lib/postUtils";
import { BackButton } from "./BackButton";
import { PostHeader } from "./PostHeader";
import { PostMeta } from "./PostMeta";
import { PostContent } from "./PostContent";
import { PostTags } from "./PostTags";
import { PostActionBar } from "./PostActionBar";

interface RetroPostDetailLayoutProps {
  post: Post;
  children: React.ReactNode;
}

export function RetroPostDetailLayout({
  post,
  children,
}: RetroPostDetailLayoutProps) {
  const router = useRouter();
  const [likes, setLikes] = useState(() => getInitialLikes(post));
  const [isLiked, setIsLiked] = useState(false);

  const tags = useMemo(() => parseTags(post.tag), [post.tag]);
  const views = useMemo(() => getInitialViews(post), [post]);

  const handleLike = () => {
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/posts");
    }
  };

  return (
    <div
      css={css`
        width: 100%;
        max-width: 64rem;
        margin: 1.5rem auto 0;
        padding: 0 1rem;
        @media (min-width: 768px) {
          margin-top: 2rem;
        }
      `}
    >
      <BackButton onClick={handleBack} />

      {/* Main Post Container */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        css={css`
          background: white;
          border: 4px solid black;
          box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.3);
        `}
      >
        <PostHeader post={post} />
        <PostMeta post={post} views={views} />

        <div
          css={css`
            padding: 1.25rem 1rem 1.5rem;
            @media (min-width: 768px) {
              padding: 2rem 2rem 2.5rem;
            }
          `}
        >
          <PostContent>{children}</PostContent>
          <PostTags tags={tags} />
        </div>

        <PostActionBar
          likes={likes}
          isLiked={isLiked}
          onLike={handleLike}
        />
      </motion.article>
    </div>
  );
}
