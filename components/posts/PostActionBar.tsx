/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface PostActionBarProps {
  likes: number;
  isLiked: boolean;
  onLike: () => void;
}

export function PostActionBar({
  likes,
  isLiked,
  onLike,
}: PostActionBarProps) {
  return (
    <div
      css={css`
        padding: 0.75rem 1rem 1rem;
        border-top: 4px solid #fce4ec;
        background: linear-gradient(to right, #fce4ec, white);
        @media (min-width: 768px) {
          padding: 1.25rem 1.75rem 1.5rem;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        `}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLike}
          css={css`
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border: 3px solid black;
            box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
            font-family: "DungGeunMo", monospace;
            font-size: 0.875rem;
            transition: all 0.2s;
            ${isLiked
              ? css`
                  background: #e91e63;
                  color: white;
                `
              : css`
                  background: white;
                  color: #e91e63;
                  &:hover {
                    background: #fce4ec;
                  }
                `}
          `}
        >
          <Heart
            css={css`
              width: 1.25rem;
              height: 1.25rem;
              ${isLiked ? "fill: currentColor;" : ""}
            `}
          />
          <span>{likes}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          css={css`
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: white;
            border: 3px solid black;
            box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
            color: #9c27b0;
            font-family: "DungGeunMo", monospace;
            font-size: 0.875rem;
            transition: all 0.2s;
            &:hover {
              background: #fce4ec;
            }
          `}
        >
          <MessageCircle
            css={css`
              width: 1.25rem;
              height: 1.25rem;
            `}
          />
          <span>Comments</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          css={css`
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: white;
            border: 3px solid black;
            box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
            color: #00bcd4;
            font-family: "DungGeunMo", monospace;
            font-size: 0.875rem;
            margin-left: auto;
            transition: all 0.2s;
            &:hover {
              background: #fce4ec;
            }
          `}
        >
          <Share2
            css={css`
              width: 1.25rem;
              height: 1.25rem;
            `}
          />
          <span>공유 • Share</span>
        </motion.button>
      </div>
    </div>
  );
}
