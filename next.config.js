const createMDX = require("@next/mdx");
// rehype-highlight v7은 MDX 3.x와 호환성 문제가 있어 주석 처리
// const rehypeHighlight = require("rehype-highlight");
// const typescript = require("highlight.js/lib/languages/typescript");
// const javascript = require("highlight.js/lib/languages/javascript");
// const json = require("highlight.js/lib/languages/json");
// const bash = require("highlight.js/lib/languages/bash");
// const css = require("highlight.js/lib/languages/css");
// const html = require("highlight.js/lib/languages/xml");

// frontmatter를 제거하는 remark 플러그인
function remarkRemoveFrontmatter() {
  return (tree) => {
    if (!tree.children) return;
    
    // frontmatter 노드(yaml, toml)를 찾아서 제거
    tree.children = tree.children.filter(
      (node) => node.type !== "yaml" && node.type !== "toml"
    );
  };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Ensure Next.js treats this folder as the workspace root.
    root: __dirname,
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  // Next.js 13+ Link 컴포넌트 동작 명시적 설정
  reactStrictMode: true,
  // MDX 파일을 페이지로 처리
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Emotion 설정
  compiler: {
    emotion: true,
  },
  webpack: (config, options) => {
    // .md 파일도 MDX 로더로 처리
    config.module.rules.push({
      test: /\.md$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            remarkPlugins: [remarkRemoveFrontmatter],
            rehypePlugins: [],
          },
        },
      ],
    });

    return config;
  },
};

const withMDX = createMDX({
  // MDX 옵션 설정
  options: {
    remarkPlugins: [remarkRemoveFrontmatter],
    rehypePlugins: [],
  },
});

module.exports = withMDX(nextConfig);
