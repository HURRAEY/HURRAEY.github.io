/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type { Post } from "../../lib/types";
import type { ColorGradient } from "../../lib/postUtils";

interface PostHeaderProps {
  post: Post;
  headerGradient: ColorGradient;
}

export function PostHeader({ post, headerGradient }: PostHeaderProps) {
  return (
    <div
      css={css`
        background: linear-gradient(to right, ${headerGradient.from}, ${headerGradient.to});
        padding: 1rem;
        border-bottom: 4px solid black;
        @media (min-width: 768px) {
          padding: 1.5rem 1.75rem;
        }
      `}
    >
      <h1
        className="post-header-title"
        css={css`
          color: white !important;
          font-size: 1.5rem;
          margin: 0 0 0.75rem;
          font-family: "DungGeunMo", monospace !important;
          line-height: 1.5;
          text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.6);
          font-weight: bold;
          display: block !important;
          @media (min-width: 768px) {
            font-size: 2rem;
            margin: 0 0 1rem;
          }
          @media (min-width: 1024px) {
            font-size: 2.5rem;
          }
        `}
      >
        {post.title}
      </h1>
      {post.description && (
        <p
          css={css`
            color: rgba(255, 255, 255, 0.9);
            margin: 0;
            font-size: 0.875rem;
            font-family: "DungGeunMo", monospace;
            @media (min-width: 768px) {
              font-size: 1rem;
            }
          `}
        >
          {post.description}
        </p>
      )}
    </div>
  );
}
