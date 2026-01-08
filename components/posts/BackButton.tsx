/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      css={css`
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        margin-bottom: 1rem;
        background: white;
        border: 4px solid black;
        box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
        color: #e91e63;
        font-family: "DungGeunMo", monospace;
        font-size: 0.75rem;
        @media (min-width: 768px) {
          padding: 0.75rem 1.25rem;
          margin-bottom: 1.25rem;
          font-size: 0.875rem;
        }
      `}
    >
      <ArrowLeft
        css={css`
          width: 1rem;
          height: 1rem;
          @media (min-width: 768px) {
            width: 1.25rem;
            height: 1.25rem;
          }
        `}
      />
      <span>목록으로 • Back to List</span>
    </motion.button>
  );
}
