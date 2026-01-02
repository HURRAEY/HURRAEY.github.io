import Link from 'next/link';
import { useRouter } from 'next/router';

interface Post {
  title: string;
  route: string;
  date: string;
  tag?: string;
}

interface RelatedPostsProps {
  currentPost: {
    route: string;
    tag?: string;
  };
  allPosts: Post[];
  limit?: number;
}

export default function RelatedPosts({
  currentPost,
  allPosts,
  limit = 3,
}: RelatedPostsProps) {
  const router = useRouter();

  // 현재 포스트 제외
  const otherPosts = allPosts.filter((post) => post.route !== currentPost.route);

  // 태그가 있으면 태그 기반 추천, 없으면 최신 포스트
  let relatedPosts: Post[] = [];

  if (currentPost.tag) {
    const tagArray = currentPost.tag.split(',').map((t) => t.trim());
    relatedPosts = otherPosts
      .filter((post) => {
        if (!post.tag) return false;
        const postTags = post.tag.split(',').map((t) => t.trim());
        return tagArray.some((tag) => postTags.includes(tag));
      })
      .slice(0, limit);
  }

  // 태그 기반 추천이 부족하면 최신 포스트로 채움
  if (relatedPosts.length < limit) {
    const recentPosts = otherPosts
      .filter((post) => !relatedPosts.some((rp) => rp.route === post.route))
      .slice(0, limit - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...recentPosts];
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="related-posts">
      <h3 className="related-posts-title">관련 포스트</h3>
      <div className="related-posts-grid">
        {relatedPosts.map((post) => (
          <Link
            key={post.route}
            href={post.route}
            className="related-post-card"
          >
            <div className="related-post-title">{post.title}</div>
            <div className="related-post-meta">
              {post.date} {post.tag && `• ${post.tag}`}
            </div>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .related-posts {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color, #e5e7eb);
        }

        .related-posts-title {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--text-primary, #111);
        }

        .related-posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .related-post-card {
          display: block;
          padding: 1.5rem;
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 0.5rem;
          text-decoration: none;
          transition: all 0.2s;
          background: var(--card-bg, #fff);
        }

        .related-post-card:hover {
          border-color: #0074de;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 116, 222, 0.1);
        }

        .related-post-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-primary, #111);
          line-height: 1.4;
        }

        .related-post-meta {
          font-size: 0.75rem;
          color: var(--text-secondary, #69778c);
        }

        :global(.dark) .related-posts {
          --border-color: #374151;
          --text-primary: #f9fafb;
          --text-secondary: #9ca3af;
          --card-bg: #1f2937;
        }

        @media (max-width: 768px) {
          .related-posts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}



