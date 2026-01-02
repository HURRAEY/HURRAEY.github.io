import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 초기 테마 확인
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="dark-mode-toggle"
      aria-label="다크 모드 토글"
    >
      {isDark ? '☀️' : '🌙'}
      <style jsx>{`
        .dark-mode-toggle {
          background: none;
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          cursor: pointer;
          font-size: 1.25rem;
          transition: all 0.2s;
          background: var(--toggle-bg, #fff);
          color: var(--toggle-text, #111);
        }

        .dark-mode-toggle:hover {
          background: var(--toggle-hover-bg, #f3f4f6);
        }

        :global(.dark) .dark-mode-toggle {
          --border-color: #374151;
          --toggle-bg: #1f2937;
          --toggle-text: #f9fafb;
          --toggle-hover-bg: #374151;
        }
      `}</style>
    </button>
  );
}



