import { css } from "@emotion/react";

/**
 * 레트로 픽셀 아트 스타일의 마크다운 스타일 (다운로드 프로젝트와 동일)
 */
export const retroMarkdownStyles = css`
  font-family: "DungGeunMo", monospace;
  font-size: 0.875rem;
  color: #1a0033;
  line-height: 1.7;
  @media (min-width: 768px) {
    font-size: 1rem;
  }

  /* Headings */
  & h1 {
    font-family: "DungGeunMo", monospace;
    color: #ff1493;
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 4px solid #ffb6c1;
    font-weight: bold;
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  & h2 {
    font-family: "DungGeunMo", monospace;
    color: #e91e63;
    font-size: 1.125rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid #ffb6c1;
    font-weight: bold;
    @media (min-width: 768px) {
      font-size: 1.25rem;
    }
  }

  & h3 {
    font-family: "DungGeunMo", monospace;
    color: #ff69b4;
    font-size: 1rem;
    margin-bottom: 0.75rem;
    margin-top: 1.5rem;
    font-weight: bold;
    @media (min-width: 768px) {
      font-size: 1.125rem;
    }
  }

  & h4 {
    font-family: "DungGeunMo", monospace;
    color: #ff1493;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
    font-weight: bold;
    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }

  & h5 {
    font-family: "DungGeunMo", monospace;
    color: #c2185b;
    font-size: 0.75rem;
    margin: 0.875rem 0 0.5rem;
    font-weight: bold;
    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  }

  & h6 {
    font-family: "DungGeunMo", monospace;
    color: #880e4f;
    font-size: 0.75rem;
    margin: 0.75rem 0 0.5rem;
    font-weight: bold;
  }

  /* Paragraphs */
  & p {
    color: #1a0033;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    line-height: 1.625;
    font-family: "DungGeunMo", monospace;
    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }

  /* Emphasis */
  & strong {
    color: #ff1493;
    font-weight: bold;
  }

  & em {
    color: #9c27b0;
    font-style: normal;
    text-decoration: underline;
    text-decoration-style: wavy;
  }

  & del {
    color: #808080;
    text-decoration: line-through;
  }

  /* Blockquotes */
  & blockquote {
    background: linear-gradient(to bottom right, #ffe4e1, #ffc0cb);
    border-left: 4px solid #ff1493;
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    box-shadow: 4px 4px 0px 0px rgba(255, 20, 147, 0.3);
    image-rendering: pixelated;
    position: relative;
    @media (min-width: 768px) {
      padding: 1.5rem 2rem;
    }
  }

  & blockquote::before {
    content: "";
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ff69b4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z'/%3E%3Cpath d='M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25-.25 4-2.75 4v3c0 1 0 1 1 1z'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    margin-bottom: 0.5rem;
  }

  & blockquote p {
    color: #c2185b;
    margin: 0;
    font-family: "DungGeunMo", monospace;
  }

  & blockquote > * {
    font-family: "DungGeunMo", monospace;
  }

  /* Lists */
  & ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
    background: #fff0f5;
    border: 3px solid #ffb6c1;
    padding: 1rem;
    box-shadow: 4px 4px 0px 0px rgba(255, 182, 193, 0.5);
    image-rendering: pixelated;
  }

  & ul li {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin: 0.5rem 0;
    color: #1a0033;
    font-size: 0.75rem;
    font-family: "DungGeunMo", monospace;
    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  }

  & ul li::before {
    content: "●";
    color: #ff1493;
    margin-top: 0.25rem;
    flex-shrink: 0;
  }

  /* 중첩된 리스트가 아래에 표시되도록 */
  & ul li > ul,
  & ul li > ol,
  & ol li > ul,
  & ol li > ol {
    margin-top: 0.5rem;
    margin-left: 1rem;
    width: calc(100% - 1rem);
  }

  & ol {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
    background: #f0f8ff;
    border: 3px solid #00bcd4;
    padding: 1rem;
    box-shadow: 4px 4px 0px 0px rgba(0, 188, 212, 0.5);
    image-rendering: pixelated;
    counter-reset: list-counter;
  }

  & ol li {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin: 0.5rem 0;
    color: #1a0033;
    font-size: 0.75rem;
    counter-increment: list-counter;
    font-family: "DungGeunMo", monospace;
    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  }

  & ol li::before {
    content: counter(list-counter) ".";
    color: #00bcd4;
    font-weight: bold;
    flex-shrink: 0;
  }

  /* Code - Inline code with Pink Gradient */
  & code:not(pre code) {
    padding: 0.25rem 0.75rem;
    background: linear-gradient(to right, #ff1493, #ff69b4);
    color: white;
    border: 3px solid #ff1493;
    font-size: 0.75rem;
    font-family: "VT323", monospace;
    border-radius: 0;
    font-weight: 500;
    margin: 0 0.25rem;
    box-shadow: 
      3px 3px 0px 0px rgba(255, 20, 147, 0.6),
      inset -1px -1px 0 0 rgba(0, 0, 0, 0.3),
      inset 1px 1px 0 0 rgba(255, 255, 255, 0.3);
    image-rendering: pixelated;
    transition: all 0.2s;
    display: inline-block;
  }

  & code:not(pre code):hover {
    box-shadow: 
      5px 5px 0px 0px rgba(255, 20, 147, 0.8),
      inset -1px -1px 0 0 rgba(0, 0, 0, 0.3),
      inset 1px 1px 0 0 rgba(255, 255, 255, 0.3);
  }

  & code:not(pre code)::before {
    content: "⟨ ";
  }

  & code:not(pre code)::after {
    content: " ⟩";
  }

  /* Code blocks - Windows 95 Style with Pink Theme (다운로드 프로젝트 스타일) */
  & figure[data-rehype-pretty-code-figure] {
    margin: 2rem 0;
    background: #c0c0c0;
    border: 4px solid #ff1493;
    box-shadow: 8px 8px 0px 0px rgba(255, 20, 147, 0.5);
    overflow: hidden;
    border-radius: 0;
    position: relative;
    image-rendering: pixelated;
  }

  & figure[data-rehype-pretty-code-figure] pre {
    margin: 0;
    background: transparent;
    border: none;
    padding: 0;
    overflow: visible;
  }

  /* Window Title Bar */
  & figure[data-rehype-pretty-code-figure]::before {
    content: "📟 CODE_BLOCK.EXE";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2rem;
    background: linear-gradient(to right, #ff1493, #ff69b4);
    border-bottom: 4px solid #c71585;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 0.75rem;
    color: white;
    font-family: "Press Start 2P", monospace;
    font-size: 0.625rem;
    text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 
      inset -1px -1px 0 0 rgba(0, 0, 0, 0.5),
      inset 1px 1px 0 0 rgba(255, 255, 255, 0.5);
    @media (min-width: 768px) {
      font-size: 0.75rem;
      height: 2.5rem;
    }
  }
  
  /* Blinking green LED animation */
  @keyframes blink-led {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0.3;
    }
  }

  /* LED indicators and Window Control Buttons */
  & figure[data-rehype-pretty-code-figure]::after {
    content: "🟢 🟡 🟣    ▭  ☐  ✕";
    position: absolute;
    top: 0.5rem;
    right: 0.75rem;
    color: white;
    font-family: "Press Start 2P", monospace;
    font-size: 0.625rem;
    z-index: 4;
    display: flex;
    align-items: center;
    gap: 1rem;
    @media (min-width: 768px) {
      font-size: 0.75rem;
      top: 0.75rem;
      right: 1rem;
    }
  }

  /* Menu Bar */
  & figure[data-rehype-pretty-code-figure] pre code::before {
    content: "File    Edit    View    Help";
    position: absolute;
    top: 2rem;
    left: 0;
    right: 0;
    height: 1.5rem;
    background: #c0c0c0;
    border-bottom: 2px solid #808080;
    z-index: 2;
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    font-family: "VT323", monospace;
    font-size: 0.625rem;
    color: black;
    box-shadow: 
      inset -1px -1px 0 0 #000000,
      inset 1px 1px 0 0 #ffffff;
    word-spacing: 0.5rem;
    @media (min-width: 768px) {
      top: 2.5rem;
      height: 1.75rem;
      font-size: 0.75rem;
    }
  }

  & figure[data-rehype-pretty-code-figure] pre code {
    display: block;
    min-width: 100%;
    width: max-content;
    background: linear-gradient(to bottom right, #1a0033, #2d0a4e, #1a0033) !important;
    border: none;
    padding: 1rem;
    padding-top: 4.5rem;
    padding-bottom: 3rem;
    color: #f8f8f2;
    font-family: "VT323", monospace;
    font-size: 0.875rem;
    line-height: 1.8;
    font-weight: 400;
    counter-reset: line;
    position: relative;
    white-space: pre;
    overflow-x: auto;
    @media (min-width: 768px) {
      padding: 1.5rem;
      padding-top: 5.5rem;
      padding-bottom: 3.5rem;
      font-size: 1rem;
      line-height: 2;
    }
  }

  /* Code Content Wrapper with Inner Border */
  & figure[data-rehype-pretty-code-figure] pre code {
    box-shadow: 
      inset 0 0 0 4px rgba(255, 105, 180, 0.3),
      inset 4px 4px 12px rgba(255, 20, 147, 0.2);
  }

  & figure[data-rehype-pretty-code-figure] pre code > .line {
    padding: 0.125rem 0.5rem;
    position: relative;
    display: block;
    padding-left: 4.5rem;
    min-height: 1.5rem;
    @media (min-width: 768px) {
      padding-left: 5rem;
      min-height: 1.75rem;
    }
  }

  /* Line Numbers */
  & figure[data-rehype-pretty-code-figure] pre code > .line::before {
    counter-increment: line;
    content: counter(line, decimal-leading-zero);
    position: absolute;
    left: 0;
    width: 3rem;
    text-align: right;
    color: #ff69b4;
    font-size: 0.625rem;
    font-family: "Press Start 2P", monospace;
    padding-right: 1rem;
    padding-left: 0.5rem;
    user-select: none;
    background: rgba(45, 10, 78, 0.5);
    border-right: 4px solid rgba(255, 20, 147, 0.5);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @media (min-width: 768px) {
      font-size: 0.75rem;
      width: 3.5rem;
    }
  }

  /* Line type icons based on data-line-type attribute */
  & figure[data-rehype-pretty-code-figure] pre code > .line[data-line-type="comment"]::after {
    content: "💭";
    position: absolute;
    right: 0.5rem;
    opacity: 0.5;
    font-size: 0.75rem;
  }
  
  & figure[data-rehype-pretty-code-figure] pre code > .line[data-line-type="declaration"]::after {
    content: "★";
    position: absolute;
    right: 0.5rem;
    opacity: 0.5;
    font-size: 0.75rem;
  }
  
  & figure[data-rehype-pretty-code-figure] pre code > .line[data-line-type="import"]::after {
    content: "⚡";
    position: absolute;
    right: 0.5rem;
    opacity: 0.5;
    font-size: 0.75rem;
  }
  
  & figure[data-rehype-pretty-code-figure] pre code > .line[data-line-type="return"]::after {
    content: "←";
    position: absolute;
    right: 0.5rem;
    opacity: 0.5;
    font-size: 0.75rem;
  }
  
  & figure[data-rehype-pretty-code-figure] pre code > .line[data-line-type="string"]::after {
    content: "✿";
    position: absolute;
    right: 0.5rem;
    opacity: 0.5;
    font-size: 0.75rem;
  }
  
  & figure[data-rehype-pretty-code-figure] pre code > .line[data-line-type="jsx"]::after {
    content: "♦";
    position: absolute;
    right: 0.5rem;
    opacity: 0.5;
    font-size: 0.75rem;
  }

  /* Highlighted lines */
  & figure[data-rehype-pretty-code-figure] pre code > .line.highlighted {
    background: rgba(255, 182, 193, 0.2);
  }

  /* Highlighted words */
  & figure[data-rehype-pretty-code-figure] pre code .word.highlighted {
    background: rgba(255, 20, 147, 0.3);
    padding: 0.125rem 0.25rem;
    border: 2px solid #ff69b4;
  }

  /* Status Bar */
  & figure[data-rehype-pretty-code-figure] pre code::after {
    content: "🟩 LINES: " counter(line) "   🟢 READY   │   UTF-8   │   CRLF   │   PIXEL MODE";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2rem;
    background: #c0c0c0;
    border-top: 2px solid #808080;
    z-index: 2;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    font-family: "VT323", monospace;
    font-size: 0.625rem;
    color: black;
    box-shadow: 
      inset -1px -1px 0 0 #000000,
      inset 1px 1px 0 0 #ffffff;
    justify-content: flex-start;
    gap: 1rem;
    @media (min-width: 768px) {
      height: 2.25rem;
      font-size: 0.75rem;
    }
  }

  /* Syntax highlighting colors - Dracula-inspired Pink Theme */
  /* 주석 - 퍼플 */
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="rgb(106, 115, 125)"],
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="color: rgb(106, 115, 125)"],
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="#6A737D"] {
    color: #bd93f9 !important;
    opacity: 0.7;
  }

  /* 키워드, 함수 - 핑크 */
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="rgb(215, 58, 73)"],
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="rgb(111, 66, 193)"],
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="color: rgb(215, 58, 73)"],
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="color: rgb(111, 66, 193)"],
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="#D73A49"],
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="#6F42C1"] {
    color: #ff79c6 !important;
    font-weight: 600;
  }

  /* import/export - 사이언 */
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="rgb(0, 92, 197)"],
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="color: rgb(0, 92, 197)"],
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="#005CC5"] {
    color: #8be9fd !important;
  }

  /* return - 그린 */
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="color: rgb(34, 134, 58)"],
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="#22863A"] {
    color: #50fa7b !important;
  }

  /* 문자열 - 옐로우 */
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="rgb(0, 111, 224)"],
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="rgb(0, 134, 179)"],
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="color: rgb(0, 111, 224)"],
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="color: rgb(0, 134, 179)"],
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="#032F62"] {
    color: #f1fa8c !important;
  }

  /* JSX 태그 - 오렌지 */
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="color: rgb(173, 86, 0)"],
  & figure[data-rehype-pretty-code-figure] pre code .line span[style*="#E36209"] {
    color: #ffb86c !important;
  }

  /* 기본 텍스트 - 화이트 */
  & figure[data-rehype-pretty-code-figure] pre code .line span {
    color: #f8f8f2;
  }

  /* Tables */
  & table {
    width: 100%;
    border: 4px solid #ff1493;
    box-shadow: 6px 6px 0px 0px rgba(255, 20, 147, 0.3);
    margin: 1.5rem 0;
    image-rendering: pixelated;
    border-collapse: collapse;
    overflow: hidden;
  }

  & thead {
    background: linear-gradient(to right, #ff1493, #ff69b4);
  }

  & th {
    border: 2px solid #c2185b;
    padding: 0.75rem 1rem;
    text-align: left;
    color: white;
    font-family: "Press Start 2P", monospace;
    font-size: 0.75rem;
    font-weight: bold;
    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  }

  & tbody {
    font-family: "DungGeunMo", monospace;
  }

  & tbody tr {
    background: white;
    transition: background-color 0.2s;
  }

  & tbody tr:hover {
    background: #ffb6c1;
  }

  & td {
    border: 2px solid #ffb6c1;
    padding: 0.75rem 1rem;
    color: #1a0033;
    font-size: 0.75rem;
    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  }

  /* Links */
  & a {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: #ff1493;
    text-decoration: underline;
    font-family: "DungGeunMo", monospace;
    transition: color 0.2s;
  }

  & a:hover {
    color: #c2185b;
  }

  /* Images */
  & img {
    max-width: 100%;
    height: auto;
    margin: 1.5rem 0;
    border: 3px solid #ff1493;
    box-shadow: 4px 4px 0px 0px rgba(255, 20, 147, 0.3);
    image-rendering: pixelated;
  }

  /* Horizontal Rules */
  & hr {
    border: none;
    border-top: 4px solid #ffb6c1;
    margin: 2rem 0;
  }
`;
