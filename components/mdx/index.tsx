// MDX 컴포넌트 라이브러리
// 포스트에서 직접 사용할 수 있는 커스텀 컴포넌트들


export const Video = ({ src, title, ...props }: { src: string; title?: string; [key: string]: any }) => {
  return (
    <figure style={{ margin: '2rem 0' }}>
      {title && <figcaption style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#69778c' }}>{title}</figcaption>}
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        style={{ width: '100%', borderRadius: '0.5rem' }}
        {...props}
      />
    </figure>
  );
};

export const Callout = ({ type = 'info', children }: { type?: 'info' | 'warning' | 'error' | 'success'; children: React.ReactNode }) => {
  const colors = {
    info: { bg: '#e0f2fe', border: '#0284c7', text: '#0c4a6e' },
    warning: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
    error: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
    success: { bg: '#d1fae5', border: '#10b981', text: '#065f46' },
  };

  const color = colors[type];

  return (
    <div
      style={{
        padding: '1rem 1.5rem',
        margin: '1.5rem 0',
        backgroundColor: color.bg,
        borderLeft: `4px solid ${color.border}`,
        borderRadius: '0.5rem',
        color: color.text,
      }}
    >
      {children}
    </div>
  );
};

export const CodeBlock = ({ children, language }: { children: string; language?: string }) => {
  return (
    <pre
      style={{
        padding: '1rem',
        backgroundColor: '#1f2937',
        color: '#f9fafb',
        borderRadius: '0.5rem',
        overflow: 'auto',
        fontSize: '0.875rem',
        lineHeight: '1.5',
      }}
    >
      <code>{children}</code>
    </pre>
  );
};

export const Image = ({ src, alt, caption }: { src: string; alt?: string; caption?: string }) => {
  return (
    <figure style={{ margin: '2rem 0' }}>
      <img
        src={src}
        alt={alt || ''}
        style={{ width: '100%', borderRadius: '0.5rem' }}
      />
      {caption && (
        <figcaption style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#69778c', textAlign: 'center' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export const Tabs = ({ children }: { children: React.ReactNode }) => {
  return <div className="tabs">{children}</div>;
};

export const Tab = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <div className="tab">
      <div className="tab-label">{label}</div>
      <div className="tab-content">{children}</div>
    </div>
  );
};







