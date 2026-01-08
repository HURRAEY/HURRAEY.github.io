/** @jsxImportSource @emotion/react */
import { retroMarkdownStyles } from "./styles/retroMarkdownStyles";

interface PostContentProps {
  children: React.ReactNode;
}

export function PostContent({ children }: PostContentProps) {
  return <div css={retroMarkdownStyles}>{children}</div>;
}
