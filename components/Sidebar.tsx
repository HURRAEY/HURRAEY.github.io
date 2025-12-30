import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Search from './Search';
import DarkModeToggle from './DarkModeToggle';

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

  const navItems = [
    { href: '/', label: '홈' },
    { href: '/posts', label: '포스트' },
    { href: '/photos', label: '사진' },
  ];

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h2>HURRAEY</h2>
            <div className="sidebar-header-actions">
              <DarkModeToggle />
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
                          className={
                            router.asPath === post.route ? 'active' : ''
                          }
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
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
          background: var(--sidebar-bg, #fff);
          border-right: 1px solid var(--border-color, #e5e7eb);
          transition: transform 0.3s ease, width 0.3s ease;
          z-index: 100;
          overflow-y: auto;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
        }

        :global(.dark) .sidebar {
          --sidebar-bg: #111827;
          --border-color: #374151;
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
          border-bottom: 1px solid var(--border-color, #e5e7eb);
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
          color: var(--text-primary, #111);
        }

        :global(.dark) .sidebar-header h2 {
          --text-primary: #f9fafb;
        }

        .sidebar-toggle {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          color: #69778c;
          transition: color 0.2s;
        }

        .sidebar-toggle:hover {
          color: #111;
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
          color: var(--text-secondary, #69778c);
          text-decoration: none;
          border-radius: 0.5rem;
          transition: all 0.2s;
          font-weight: 500;
        }

        .sidebar-nav a:hover {
          background: var(--hover-bg, #f3f4f6);
          color: var(--text-primary, #111);
        }

        .sidebar-nav a.active {
          background: #0074de;
          color: #fff;
        }

        :global(.dark) .sidebar-nav a {
          --text-secondary: #9ca3af;
          --text-primary: #f9fafb;
          --hover-bg: #1f2937;
        }

        .sidebar-posts {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color, #e5e7eb);
        }

        .sidebar-posts h3 {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary, #69778c);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 1rem 0;
        }

        :global(.dark) .sidebar-posts {
          --border-color: #374151;
          --text-secondary: #9ca3af;
        }

        .sidebar-posts ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar-posts li {
          margin-bottom: 0.5rem;
        }

        .sidebar-posts a {
          display: block;
          padding: 0.5rem 0;
          color: var(--text-secondary, #69778c);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
          line-height: 1.5;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar-posts a:hover {
          color: #0074de;
        }

        .sidebar-posts a.active {
          color: #0074de;
          font-weight: 600;
        }

        :global(.dark) .sidebar-posts a {
          --text-secondary: #9ca3af;
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

