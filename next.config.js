const createMDX = require("@next/mdx");

// frontmatter를 제거하는 remark 플러그인
function remarkRemoveFrontmatter() {
  return function transformer(tree) {
    if (!tree.children) return;
    
    // frontmatter 노드(yaml, toml)를 찾아서 제거
    tree.children = tree.children.filter(
      (node) => node.type !== "yaml" && node.type !== "toml"
    );
  };
}

// frontmatter를 제거하는 rehype 플러그인 (HTML에서 제거)
function rehypeRemoveFrontmatter() {
  return function transformer(tree) {
    if (!tree.children) return;
    
    // frontmatter로 보이는 모든 요소 제거
    tree.children = tree.children.filter((node) => {
      if (node.type === "element") {
        const textContent = getTextContent(node);
        // frontmatter 형식인지 확인
        // title:, date:, description:, tag:, author: 등이 포함된 경우
        if (
          textContent &&
          (/^---\s*title:/.test(textContent) ||
            /title:\s*[^\n]+\s*date:\s*[^\n]+\s*description:/.test(textContent) ||
            /^title:\s*[^\n]+\s*date:\s*[^\n]+\s*description:/.test(textContent))
        ) {
          return false; // 제거
        }
      }
      return true; // 유지
    });
  };
}

// 요소에서 텍스트 추출 헬퍼 함수
function getTextContent(node) {
  if (node.type === "text") {
    return node.value;
  }
  if (node.children) {
    return node.children.map(getTextContent).join("");
  }
  return "";
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
            rehypePlugins: [rehypeRemoveFrontmatter],
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
    rehypePlugins: [rehypeRemoveFrontmatter],
  },
});

module.exports = withMDX(nextConfig);
