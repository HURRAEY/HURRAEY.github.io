import { loadPosts } from "../../lib/loadPosts";
import Link from "next/link";

export default function PostsIndex() {
  const posts = loadPosts();

  return (
    <div>
      <h1>Posts</h1>
      {posts.length === 0 ? (
        <p>포스트가 없습니다.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.route}>
              <Link href={post.route}>
                <h2>{post.title}</h2>
                {post.description && <p>{post.description}</p>}
                {post.date && <p>{post.date}</p>}
                {post.tag && <p>태그: {post.tag}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

