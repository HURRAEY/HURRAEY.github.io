import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Post {
  title: string;
  route: string;
  date: string;
  description?: string;
  tag?: string;
}

interface SearchProps {
  posts: Post[];
}

export default function Search({ posts }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.description?.toLowerCase().includes(searchTerm) ||
        post.tag?.toLowerCase().includes(searchTerm)
    );
    setResults(filtered);
  }, [query, posts]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (route: string) => {
    router.push(route);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="검색... (⌘K 또는 Ctrl+K)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      {isOpen && query && (
        <div className="search-results">
          {results.length > 0 ? (
            <ul>
              {results.map((post) => (
                <li key={post.route}>
                  <Link
                    href={post.route}
                    onClick={() => handleSelect(post.route)}
                    className="search-result-item"
                  >
                    <div className="search-result-title">{post.title}</div>
                    {post.description && (
                      <div className="search-result-description">{post.description}</div>
                    )}
                    <div className="search-result-meta">
                      {post.date} {post.tag && `• ${post.tag}`}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="search-no-results">검색 결과가 없습니다.</div>
          )}
        </div>
      )}

      <style jsx>{`
        .search-container {
          position: relative;
          width: 100%;
          max-width: 500px;
        }

        .search-input-wrapper {
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 2.5rem 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: all 0.2s;
          background: var(--search-bg, #fff);
          color: var(--search-text, #111);
        }

        .search-input:focus {
          outline: none;
          border-color: #0074de;
          box-shadow: 0 0 0 3px rgba(0, 116, 222, 0.1);
        }

        .search-icon {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          opacity: 0.5;
        }

        .search-results {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 0.5rem;
          background: var(--search-results-bg, #fff);
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          max-height: 400px;
          overflow-y: auto;
          z-index: 1000;
        }

        .search-results ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .search-results li {
          border-bottom: 1px solid #f3f4f6;
        }

        .search-results li:last-child {
          border-bottom: none;
        }

        .search-result-item {
          display: block;
          padding: 1rem;
          text-decoration: none;
          color: var(--search-text, #111);
          transition: background 0.2s;
        }

        .search-result-item:hover {
          background: var(--search-hover-bg, #f9fafb);
        }

        .search-result-title {
          font-weight: 600;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
          color: var(--search-text, #111);
        }

        .search-result-description {
          font-size: 0.75rem;
          color: var(--search-description, #69778c);
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        .search-result-meta {
          font-size: 0.75rem;
          color: var(--search-meta, #9ca3af);
        }

        .search-no-results {
          padding: 2rem;
          text-align: center;
          color: var(--search-meta, #9ca3af);
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .search-container {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

