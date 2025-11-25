const withNextra = require("nextra")({
  theme: "nextra-theme-blog",
  themeConfig: "./theme.config.js",
  // optional: add `unstable_staticImage: true` to enable Nextra's auto image import
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Ensure Next.js treats this folder as the workspace root.
    root: __dirname,
  },
};

module.exports = withNextra(nextConfig);
