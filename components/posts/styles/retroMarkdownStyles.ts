import { css } from "@emotion/react";

/**
 * 레트로 픽셀 아트 스타일의 마크다운 스타일
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
    margin: 2rem 0 1rem;
    padding-bottom: 1rem;
    border-bottom: 4px solid #ffb6c1;
    font-weight: bold;
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
    @media (min-width: 1024px) {
      font-size: 1.875rem;
    }
  }

  & h2 {
    font-family: "DungGeunMo", monospace;
    color: #e91e63;
    font-size: 1.125rem;
    margin: 1.5rem 0 0.75rem;
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
    margin: 1.25rem 0 0.5rem;
    font-weight: bold;
    @media (min-width: 768px) {
      font-size: 1.125rem;
    }
  }

  & h4 {
    font-family: "DungGeunMo", monospace;
    color: #ff1493;
    font-size: 0.875rem;
    margin: 1rem 0 0.5rem;
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

  /* Emphasis */
  & strong {
    color: #ff1493;
    font-weight: bold;
  }

  & em {
    color: #9c27b0;
    font-style: italic;
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
    font-size: 0.875rem;
    @media (min-width: 768px) {
      font-size: 1rem;
    }
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
    display: block;
    margin: 0.5rem 0;
    color: #1a0033;
    font-size: 0.75rem;
    position: relative;
    padding-left: 1.25rem;
    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  }

  & ul li::before {
    content: "●";
    color: #ff1493;
    position: absolute;
    left: 0;
    top: 0.25rem;
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
    display: block;
    margin: 0.5rem 0;
    color: #1a0033;
    font-size: 0.75rem;
    counter-increment: list-counter;
    position: relative;
    padding-left: 1.75rem;
    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  }

  & ol li::before {
    content: counter(list-counter) ".";
    color: #00bcd4;
    position: absolute;
    left: 0;
    top: 0;
    font-weight: bold;
  }

  /* Code */
  & code:not(pre code) {
    padding: 0.25rem 0.5rem;
    background: #1e1e1e;
    color: #d4d4d4;
    border: 2px solid #3e3e3e;
    font-size: 0.75rem;
    font-family: "Fira Code", "JetBrains Mono", "Consolas", "Monaco", "Courier New", monospace;
    border-radius: 3px;
    font-weight: 500;
  }

  & pre {
    background: #1e1e1e;
    border: 1px solid #3e3e3e;
    border-left: 4px solid #007acc;
    padding: 1.25rem;
    margin: 1.5rem 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05);
    overflow-x: auto;
    border-radius: 4px;
    position: relative;
    @media (min-width: 768px) {
      padding: 1.5rem;
    }
  }

  & pre::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2.5rem;
    background: linear-gradient(to bottom, rgba(0, 122, 204, 0.1), transparent);
    pointer-events: none;
    border-radius: 4px 4px 0 0;
  }

  & pre code {
    background: transparent !important;
    border: none;
    padding: 0;
    color: #d4d4d4 !important;
    font-family: "Fira Code", "JetBrains Mono", "Consolas", "Monaco", "Courier New", monospace;
    font-size: 0.8125rem;
    line-height: 1.6;
    font-weight: 400;
    display: block;
    white-space: pre;
    @media (min-width: 768px) {
      font-size: 0.875rem;
      line-height: 1.7;
    }
  }

  /* highlight.js 기본 스타일 오버라이드 */
  & pre code.hljs,
  & pre code:not(.hljs),
  & pre code span {
    background: transparent !important;
    color: #d4d4d4 !important;
  }

  /* highlight.js가 적용되지 않은 경우를 위한 기본 색상 */
  & pre code *:not(.hljs-keyword):not(.hljs-string):not(.hljs-comment):not(.hljs-number):not(.hljs-function):not(.hljs-variable):not(.hljs-type) {
    color: #d4d4d4 !important;
  }

  /* 코드 구문 강조 색상 (VS Code 스타일) */
  & pre code .hljs-keyword,
  & pre code .hljs-selector-tag,
  & pre code .hljs-built_in,
  & pre code .hljs-name,
  & pre code .hljs-tag {
    color: #569cd6 !important;
    font-weight: 600;
  }

  & pre code .hljs-string,
  & pre code .hljs-attr,
  & pre code .hljs-symbol,
  & pre code .hljs-bullet,
  & pre code .hljs-link {
    color: #ce9178 !important;
  }

  & pre code .hljs-title,
  & pre code .hljs-section,
  & pre code .hljs-function,
  & pre code .hljs-title.function_ {
    color: #dcdcaa !important;
  }

  & pre code .hljs-comment,
  & pre code .hljs-quote,
  & pre code .hljs-doctag {
    color: #6a9955 !important;
    font-style: italic;
  }

  & pre code .hljs-number,
  & pre code .hljs-literal {
    color: #b5cea8 !important;
  }

  & pre code .hljs-variable,
  & pre code .hljs-template-variable,
  & pre code .hljs-attribute {
    color: #9cdcfe !important;
  }

  & pre code .hljs-type,
  & pre code .hljs-class,
  & pre code .hljs-class .hljs-title {
    color: #4ec9b0 !important;
  }

  & pre code .hljs-meta,
  & pre code .hljs-meta .hljs-keyword {
    color: #569cd6 !important;
  }

  & pre code .hljs-params {
    color: #d4d4d4 !important;
  }

  & pre code .hljs-property {
    color: #9cdcfe !important;
  }

  & pre code .hljs-operator {
    color: #d4d4d4 !important;
  }

  & pre code .hljs-punctuation {
    color: #d4d4d4 !important;
  }

  & pre code .hljs-regexp {
    color: #d16969 !important;
  }

  /* Tables */
  & table {
    width: 100%;
    border: 4px solid #ff1493;
    box-shadow: 6px 6px 0px 0px rgba(255, 20, 147, 0.3);
    margin: 1.5rem 0;
    image-rendering: pixelated;
    border-collapse: separate;
    border-spacing: 0;
  }

  & thead {
    background: linear-gradient(to right, #ff1493, #ff69b4);
  }

  & th {
    border: 2px solid #c2185b;
    padding: 0.75rem 1rem;
    text-align: left;
    color: white;
    font-family: "DungGeunMo", monospace;
    font-size: 0.625rem;
    font-weight: bold;
    @media (min-width: 768px) {
      font-size: 0.75rem;
      padding: 1rem;
    }
  }

  & tbody {
    font-family: "DungGeunMo", monospace;
  }

  & tbody tr:nth-child(even) {
    background: #ffe4e1;
  }

  & tbody tr:nth-child(odd) {
    background: white;
  }

  & tbody tr:hover {
    background: #ffb6c1;
    transition: background-color 0.2s;
  }

  & td {
    border: 2px solid #ffb6c1;
    padding: 0.75rem 1rem;
    color: #1a0033;
    font-size: 0.75rem;
    @media (min-width: 768px) {
      font-size: 0.875rem;
      padding: 1rem;
    }
  }

  & td:first-child {
    color: #ff1493;
    font-weight: bold;
  }

  /* Links */
  & a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #ffe4e1;
    border: 3px solid #ff1493;
    color: #ff1493;
    text-decoration: none;
    font-family: "DungGeunMo", monospace;
    font-size: 0.875rem;
    box-shadow: 4px 4px 0px 0px rgba(255, 20, 147, 0.3);
    image-rendering: pixelated;
    transition: all 0.2s;
    margin: 0.25rem 0;
  }

  & a:hover {
    background: #ffb6c1;
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px 0px rgba(255, 20, 147, 0.3);
  }

  & a::before {
    content: "";
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ff1493' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'/%3E%3Cpath d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
  }

  /* Footnotes */
  & sup {
    color: #ff1493;
    font-size: 0.625rem;
  }

  & sup a {
    display: inline;
    padding: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    margin: 0;
    font-size: inherit;
  }

  & sup a:hover {
    text-decoration: underline;
    transform: none;
    box-shadow: none;
  }

  & sup a::before {
    display: none;
  }

  /* Paragraphs */
  & p {
    margin: 1rem 0;
    color: #1a0033;
    font-size: 0.875rem;
    @media (min-width: 768px) {
      font-size: 1rem;
    }
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
