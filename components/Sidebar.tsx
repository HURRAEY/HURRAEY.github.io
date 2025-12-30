import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Search from './Search';

interface SidebarProps {
  posts?: Array<{
    title: string;
    date: string;
    route: string;
    description?: string;
    tag?: string;
  }>;
}

export default function Sidebar({ posts = [] }: SidebarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [tagSearchQuery, setTagSearchQuery] = useState('');

  const navItems = [
    { href: '/', label: '홈' },
    { href: '/posts', label: '포스트' },
    { href: '/photos', label: '사진' },
    { href: '/about', label: '소개' },
  ];

  // 태그 추출 및 개수 계산
  const tagCounts = posts.reduce((acc, post) => {
    if (post.tag) {
      const tags = post.tag.split(',').map((t) => t.trim()).filter(Boolean);
      tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
    }
    return acc;
  }, {} as Record<string, number>);

  // 태그를 개수순으로 정렬 (같으면 알파벳순)
  const allTags = Object.entries(tagCounts)
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1]; // 개수순
      return a[0].localeCompare(b[0]); // 알파벳순
    })
    .map(([tag]) => tag);

  // 태그 검색 필터링
  const filteredTags = tagSearchQuery.trim()
    ? allTags.filter((tag) =>
        tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
      )
    : allTags;

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h2>HURRAEY</h2>
            <div className="sidebar-header-actions">
              <button
                className="sidebar-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="사이드바 토글"
              >
                {isOpen ? '←' : '→'}
              </button>
            </div>
          </div>

          {isOpen && (
            <>
              <div className="sidebar-search">
                <Search posts={posts} />
              </div>
              <nav className="sidebar-nav">
                <ul>
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={router.pathname === item.href ? 'active' : ''}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {posts.length > 0 && (
                <div className="sidebar-posts">
                  <h3>최근 포스트</h3>
                  <ul>
                    {posts.slice(0, 5).map((post) => (
                      <li key={post.route}>
                        <Link
                          href={post.route}
                          className={`sidebar-post-link ${
                            router.asPath === post.route ? 'active' : ''
                          }`}
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {allTags.length > 0 && (
                <div className="sidebar-tags">
                  <h3>태그</h3>
                  <div className="sidebar-tag-search">
                    <input
                      type="text"
                      placeholder="태그 검색..."
                      value={tagSearchQuery}
                      onChange={(e) => setTagSearchQuery(e.target.value)}
                      className="sidebar-tag-search-input"
                    />
                    {tagSearchQuery && (
                      <button
                        className="sidebar-tag-search-clear"
                        onClick={() => setTagSearchQuery('')}
                        aria-label="검색 초기화"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  {filteredTags.length > 0 ? (
                    <div className="sidebar-tags-list">
                      {filteredTags.map((tag) => {
                        const isActive = router.query.tag === tag;
                        return (
                          <Link
                            key={tag}
                            href={`/tags/${encodeURIComponent(tag)}`}
                            className={`sidebar-tag ${isActive ? 'active' : ''}`}
                          >
                            <span className="sidebar-tag-name">{tag}</span>
                            <span className="sidebar-tag-count">{tagCounts[tag]}</span>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="sidebar-tags-no-results">
                      검색 결과가 없습니다.
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </aside>
      <style jsx>{`
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          width: 280px;
          background: #f8bbd0;
          border-right: 1px solid #f48fb1;
          transition: transform 0.3s ease, width 0.3s ease;
          z-index: 100;
          overflow-y: auto;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
        }

        .sidebar.closed {
          transform: translateX(-100%);
        }

        .sidebar-content {
          padding: 1.5rem;
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f48fb1;
        }

        .sidebar-header-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .sidebar-search {
          margin-bottom: 1.5rem;
        }

        .sidebar-header h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a0033;
        }

        .sidebar-toggle {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          color: #4a0066;
          transition: color 0.2s;
        }

        .sidebar-toggle:hover {
          color: #1a0033;
        }

        .sidebar-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar-nav li {
          margin-bottom: 0.5rem;
        }

        .sidebar-nav a {
          display: block;
          padding: 0.75rem 1rem;
          color: #4a0066;
          text-decoration: none;
          border-radius: 0.5rem;
          transition: all 0.2s;
          font-weight: 500;
        }

        .sidebar-nav a:hover {
          background: #f48fb1;
          color: #1a0033;
        }

        .sidebar-nav a.active {
          background: #e91e63;
          color: #fff;
        }

        .sidebar-posts {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #f48fb1;
          width: 100%;
          overflow: hidden;
        }

        .sidebar-posts h3 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #4a0066;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 1rem 0;
        }

        .sidebar-posts ul {
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
          overflow: hidden;
        }

        .sidebar-posts li {
          margin-bottom: 0.5rem;
          overflow: hidden;
          width: 100%;
          max-width: 100%;
        }

        :global(.sidebar-posts li a),
        .sidebar-posts li :global(a),
        :global(.sidebar-post-link) {
          display: block !important;
          padding: 0.5rem 0;
          color: #4a0066;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
          line-height: 1.5;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        :global(.sidebar-post-link:hover),
        .sidebar-posts a:hover {
          color: #e91e63;
        }

        :global(.sidebar-post-link.active),
        .sidebar-posts a.active {
          color: #e91e63;
          font-weight: 600;
        }

        .sidebar-tags {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #f48fb1;
          width: 100%;
        }

        .sidebar-tags h3 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #4a0066;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 1rem 0;
        }

        .sidebar-tag-search {
          position: relative;
          margin-bottom: 1rem;
        }

        .sidebar-tag-search-input {
          width: 100%;
          padding: 0.5rem 2rem 0.5rem 0.75rem;
          border: 1px solid #f48fb1;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          background: #fff;
          color: #1a0033;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .sidebar-tag-search-input:focus {
          outline: none;
          border-color: #e91e63;
          box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1);
        }

        .sidebar-tag-search-input::placeholder {
          color: #4a0066;
        }

        .sidebar-tag-search-clear {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 1.25rem;
          color: #4a0066;
          cursor: pointer;
          padding: 0.25rem;
          line-height: 1;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar-tag-search-clear:hover {
          color: #1a0033;
        }

        .sidebar-tags-no-results {
          padding: 1rem;
          text-align: center;
          color: #4a0066;
          font-size: 0.875rem;
        }

        .sidebar-tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        :global(.sidebar-tag) {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          background: #fce4ec;
          color: #4a0066;
          text-decoration: none;
          border-radius: 1rem;
          font-size: 0.75rem;
          transition: all 0.2s;
          border: 1px solid transparent;
        }

        :global(.sidebar-tag:hover) {
          background: #f48fb1;
          color: #1a0033;
          transform: translateY(-1px);
        }

        :global(.sidebar-tag.active) {
          background: #e91e63;
          color: #fff;
          border-color: #e91e63;
          font-weight: 500;
        }

        :global(.sidebar-tag-name) {
          font-weight: 500;
        }

        :global(.sidebar-tag-count) {
          background: rgba(0, 0, 0, 0.1);
          padding: 0.125rem 0.375rem;
          border-radius: 0.75rem;
          font-size: 0.6875rem;
          font-weight: 600;
        }

        :global(.sidebar-tag.active .sidebar-tag-count) {
          background: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}

