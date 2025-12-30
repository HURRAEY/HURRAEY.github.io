const { promises: fs } = require("fs");
const path = require("path");
const RSS = require("rss");
const matter = require("gray-matter");

async function generate() {
  const feed = new RSS({
    title: "HURRAEY의 개발로그",
    site_url: "https://hurraey.github.io",
    feed_url: "https://hurraey.github.io/feed.xml",
  });

  const posts = await fs.readdir(path.join(__dirname, "..", "pages", "posts"));

  await Promise.all(
    posts.map(async (name) => {
      if (name.startsWith("index.")) return;

      const content = await fs.readFile(
        path.join(__dirname, "..", "pages", "posts", name),
      );
      const frontmatter = matter(content);
      const tagField = frontmatter.data.tag;
      const categories = tagField
        ? String(tagField)
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [];

      feed.item({
        title: frontmatter.data.title,
        url: "/posts/" + name.replace(/\.mdx?/, ""),
        date: frontmatter.data.date,
        description: frontmatter.data.description || "",
        categories,
        author: frontmatter.data.author,
      });
    }),
  );

  await fs.writeFile("./public/feed.xml", feed.xml({ indent: true }));

  // 포스트 목록 JSON 생성 (pages/_app.tsx에서 사용)
  const postsList = [];
  for (const name of posts) {
    if (name.startsWith("index.")) continue;

    const content = await fs.readFile(
      path.join(__dirname, "..", "pages", "posts", name),
    );
    const frontmatter = matter(content);
    const tagField = frontmatter.data.tag;
    const tag = tagField
      ? String(tagField)
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)[0] || ""
      : "";

    postsList.push({
      title: frontmatter.data.title || name.replace(/\.mdx?/, ""),
      route: "/posts/" + name.replace(/\.mdx?/, ""),
      date: frontmatter.data.date || "",
      description: frontmatter.data.description || "",
      tag: tag,
    });
  }

  // 날짜순으로 정렬 (최신순)
  postsList.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  await fs.writeFile(
    "./public/posts.json",
    JSON.stringify(postsList, null, 2),
  );

  // TypeScript 파일로도 생성 (빌드 타임에 import 가능)
  const libDir = path.join(__dirname, "..", "lib");
  try {
    await fs.access(libDir);
  } catch {
    // lib 디렉토리가 없으면 생성
    await fs.mkdir(libDir, { recursive: true });
  }

  const tsContent = `// 이 파일은 자동으로 생성됩니다. 수정하지 마세요.
// 빌드 시 pages/posts/ 디렉토리의 마크다운 파일을 스캔하여 생성됩니다.

export interface Post {
  title: string;
  route: string;
  date: string;
  description: string;
  tag: string;
}

export const posts: Post[] = ${JSON.stringify(postsList, null, 2)};
`;

  await fs.writeFile(path.join(libDir, "posts.ts"), tsContent);
}

generate();
