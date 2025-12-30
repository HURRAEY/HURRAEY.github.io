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
}

generate();
