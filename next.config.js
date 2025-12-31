const createMDX = require("@next/mdx");

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
  webpack: (config, options) => {
    // .md 파일도 MDX 로더로 처리
    config.module.rules.push({
      test: /\.md$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            remarkPlugins: [],
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
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX(nextConfig);
