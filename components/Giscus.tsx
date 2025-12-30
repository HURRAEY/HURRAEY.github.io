import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

interface GiscusProps {
  repo: string; // "username/repo"
  repoId: string; // Giscus에서 제공하는 repo ID
  category?: string;
  categoryId?: string;
  mapping?: 'pathname' | 'url' | 'title' | 'og:title';
  reactionsEnabled?: boolean;
  emitMetadata?: boolean;
  theme?: 'light' | 'dark' | 'preferred_color_scheme';
  lang?: string;
}

export default function Giscus({
  repo,
  repoId,
  category = 'Announcements',
  categoryId,
  mapping = 'pathname',
  reactionsEnabled = true,
  emitMetadata = false,
  theme = 'preferred_color_scheme',
  lang = 'ko',
}: GiscusProps) {
  const commentsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!commentsRef.current || !repo || !repoId) return;

    // 기존 스크립트 제거
    const existingScript = document.querySelector('script[src*="giscus"]');
    if (existingScript) {
      existingScript.remove();
    }

    // 기존 댓글 컨테이너 제거
    const existingContainer = commentsRef.current.querySelector('.giscus');
    if (existingContainer) {
      existingContainer.remove();
    }

    // 새 스크립트 생성
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    if (categoryId) {
      script.setAttribute('data-category-id', categoryId);
    }
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-reactions-enabled', reactionsEnabled ? '1' : '0');
    script.setAttribute('data-emit-metadata', emitMetadata ? '1' : '0');
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', lang);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    commentsRef.current.appendChild(script);

    return () => {
      // 정리
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [router.asPath, repo, repoId, category, categoryId, mapping, reactionsEnabled, emitMetadata, theme, lang]);

  if (!repo || !repoId) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#69778c' }}>
        <p>댓글 기능을 사용하려면 Giscus 설정이 필요합니다.</p>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
          <a href="https://giscus.app" target="_blank" rel="noopener noreferrer">
            Giscus 설정하기
          </a>
        </p>
      </div>
    );
  }

  return (
    <div ref={commentsRef} style={{ marginTop: '3rem' }}>
      <style jsx global>{`
        .giscus {
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
}


