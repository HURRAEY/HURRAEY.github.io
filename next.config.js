const withNextra = require("nextra")({
  theme: "nextra-theme-blog",
  themeConfig: "./theme.config.js",
  unstable_staticImage: true, // 이미지 최적화 활성화
});

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
};

module.exports = withNextra(nextConfig);
