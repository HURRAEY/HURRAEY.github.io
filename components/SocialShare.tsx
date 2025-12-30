import { useEffect, useState } from 'react';

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

export default function SocialShare({ title, url, description }: SocialShareProps) {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(typeof window !== 'undefined' ? window.location.href : url);
  }, [url]);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    copy: currentUrl,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('링크가 클립보드에 복사되었습니다!');
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <div className="social-share">
      <div className="social-share-label">공유하기</div>
      <div className="social-share-buttons">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share-button twitter"
          aria-label="Twitter로 공유"
        >
          <span>🐦</span>
          <span className="social-share-text">Twitter</span>
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share-button facebook"
          aria-label="Facebook으로 공유"
        >
          <span>📘</span>
          <span className="social-share-text">Facebook</span>
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share-button linkedin"
          aria-label="LinkedIn으로 공유"
        >
          <span>💼</span>
          <span className="social-share-text">LinkedIn</span>
        </a>
        <button
          onClick={handleCopy}
          className="social-share-button copy"
          aria-label="링크 복사"
        >
          <span>🔗</span>
          <span className="social-share-text">복사</span>
        </button>
      </div>
      <style jsx>{`
        .social-share {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color, #e5e7eb);
        }

        .social-share-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary, #69778c);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .social-share-buttons {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .social-share-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 0.5rem;
          background: var(--button-bg, #fff);
          color: var(--button-text, #111);
          text-decoration: none;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .social-share-button:hover {
          background: var(--button-hover-bg, #f3f4f6);
          border-color: var(--button-hover-border, #d1d5db);
          transform: translateY(-1px);
        }

        .social-share-button span:first-child {
          font-size: 1rem;
        }

        .social-share-text {
          font-weight: 500;
        }

        .social-share-button.twitter:hover {
          background: #1da1f2;
          color: #fff;
          border-color: #1da1f2;
        }

        .social-share-button.facebook:hover {
          background: #1877f2;
          color: #fff;
          border-color: #1877f2;
        }

        .social-share-button.linkedin:hover {
          background: #0077b5;
          color: #fff;
          border-color: #0077b5;
        }

        .social-share-button.copy:hover {
          background: #0074de;
          color: #fff;
          border-color: #0074de;
        }

        :global(.dark) .social-share {
          --border-color: #374151;
          --text-secondary: #9ca3af;
          --button-bg: #1f2937;
          --button-text: #f9fafb;
          --button-hover-bg: #374151;
          --button-hover-border: #4b5563;
        }

        @media (max-width: 768px) {
          .social-share-buttons {
            flex-direction: column;
          }

          .social-share-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

