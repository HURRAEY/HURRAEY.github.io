/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Clock, Eye, User } from "lucide-react";
import type { Post } from "../../lib/types";

interface PostMetaProps {
  post: Post;
  views: number;
}

export function PostMeta({ post, views }: PostMetaProps) {
  return (
    <div
      css={css`
        background: #fce4ec;
        padding: 0.75rem 1rem;
        border-bottom: 2px solid #ec407a;
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        font-size: 0.75rem;
        @media (min-width: 768px) {
          padding: 0.875rem 1.75rem;
          gap: 1rem;
          font-size: 0.875rem;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 0.35rem;
        `}
      >
        <User
          css={css`
            width: 1rem;
            height: 1rem;
            color: #e91e63;
            @media (min-width: 768px) {
              width: 1.25rem;
              height: 1.25rem;
            }
          `}
        />
        <span
          css={css`
            font-family: "DungGeunMo", monospace;
          `}
        >
          {post.author || "HURRAEY"}
        </span>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 0.35rem;
        `}
      >
        <Clock
          css={css`
            width: 1rem;
            height: 1rem;
            color: #9c27b0;
            @media (min-width: 768px) {
              width: 1.25rem;
              height: 1.25rem;
            }
          `}
        />
        <span
          css={css`
            font-family: "VT323", monospace;
          `}
        >
          {post.date}
        </span>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 0.35rem;
        `}
      >
        <Eye
          css={css`
            width: 1rem;
            height: 1rem;
            color: #00bcd4;
            @media (min-width: 768px) {
              width: 1.25rem;
              height: 1.25rem;
            }
          `}
        />
        <span
          css={css`
            font-family: "VT323", monospace;
          `}
        >
          {views.toLocaleString()} views
        </span>
      </div>
    </div>
  );
}
