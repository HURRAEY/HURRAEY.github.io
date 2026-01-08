/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";

interface PostTagsProps {
  tags: string[];
}

export function PostTags({ tags }: PostTagsProps) {
  if (tags.length === 0) return null;

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 2rem;
        padding-top: 1.25rem;
        border-top: 2px solid #fce4ec;
      `}
    >
      {tags.map((tag) => (
        <motion.span
          key={tag}
          whileHover={{ scale: 1.1, rotate: 2 }}
          css={css`
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.35rem 0.75rem;
            background: #f8bbd0;
            border: 2px solid #ec407a;
            font-size: 0.75rem;
            font-family: "DungGeunMo", monospace;
          `}
        >
          <Tag
            css={css`
              width: 0.9rem;
              height: 0.9rem;
            `}
          />
          {tag}
        </motion.span>
      ))}
    </div>
  );
}
