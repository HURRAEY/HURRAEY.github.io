/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type { Post } from "../../lib/types";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <div
      css={css`
        background: linear-gradient(to right, #e91e63, #f06292, #ba68c8);
        padding: 1rem;
        border-bottom: 4px solid black;
        @media (min-width: 768px) {
          padding: 1.5rem 1.75rem;
        }
      `}
    >
      <h1
        css={css`
          color: white;
          font-size: 1rem;
          margin: 0 0 0.5rem;
          font-family: "DungGeunMo", monospace;
          line-height: 1.6;
          text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
          font-weight: bold;
          @media (min-width: 768px) {
            font-size: 1.25rem;
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
