import { useRouter } from "next/router";
import { loadPosts } from "../../lib/loadPosts";
import Link from "next/link";

export default function TagPage() {
  const router = useRouter();
  const { tag } = router.query;
  const posts = loadPosts();

  // 태그로 필터링
  const filteredPosts = posts.filter((post) => {
    if (!post.tag || !tag) return false;
    const tags = post.tag.split(",").map((t) => t.trim());
    return tags.includes(tag as string);
  });

  if (!tag) {
    return <div>태그를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h1>Posts Tagged with &quot;{tag}&quot;</h1>
      {filteredPosts.length === 0 ? (
        <p>이 태그로 작성된 포스트가 없습니다.</p>
      ) : (
        <ul>
          {filteredPosts.map((post) => (
            <li key={post.route}>
              <Link href={post.route}>
                <h2>{post.title}</h2>
                {post.description && <p>{post.description}</p>}
                {post.date && <p>{post.date}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


