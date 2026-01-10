const createMDX = require("@next/mdx");

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

// rehype-pretty-code 설정
function getRehypePlugins() {
  try {
    const rehypePrettyCode = require("rehype-pretty-code");
    // 함수인지 확인
    const plugin = typeof rehypePrettyCode === "function" 
      ? rehypePrettyCode 
      : (rehypePrettyCode.default || rehypePrettyCode);
    
    if (typeof plugin !== "function") {
      console.warn("rehype-pretty-code가 함수가 아닙니다. 코드 하이라이팅이 비활성화됩니다.");
      return [];
    }

    return [
      [
        plugin,
        {
          theme: "github-light",
          keepBackground: false,
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted from the browser
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
            
            // Add emoji icons based on line content
            const lineText = node.children
              .map(child => {
                if (child.type === 'text') return child.value;
                if (child.type === 'element' && child.children) {
                  return child.children.map(c => c.value || '').join('');
                }
                return '';
              })
              .join('')
              .trim();
            
            // Add data attribute for styling
            if (!node.properties) node.properties = {};
            if (!node.properties.className) node.properties.className = [];
            
            // Add line class
            if (!node.properties.className.includes('line')) {
              node.properties.className.push('line');
            }
            
            // Determine line type and add appropriate emoji
            if (lineText.startsWith('//') || lineText.startsWith('/*') || lineText.startsWith('*')) {
              node.properties['data-line-type'] = 'comment';
            } else if (lineText.includes('function') || lineText.includes('class') || lineText.includes('const') || lineText.includes('let') || lineText.includes('var')) {
              node.properties['data-line-type'] = 'declaration';
            } else if (lineText.includes('import') || lineText.includes('export')) {
              node.properties['data-line-type'] = 'import';
            } else if (lineText.includes('return')) {
              node.properties['data-line-type'] = 'return';
            } else if (lineText.includes('"') || lineText.includes("'") || lineText.includes('`')) {
              node.properties['data-line-type'] = 'string';
            } else if (lineText.includes('<') && lineText.includes('>')) {
              node.properties['data-line-type'] = 'jsx';
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className = ["line", "highlighted"];
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word", "highlighted"];
          },
        },
      ],
    ];
  } catch (e) {
    console.warn("rehype-pretty-code를 로드할 수 없습니다:", e.message);
    return [];
  }
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
            rehypePlugins: getRehypePlugins(),
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
    rehypePlugins: getRehypePlugins(),
  },
});

module.exports = withMDX(nextConfig);
