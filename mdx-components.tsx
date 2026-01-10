// MDX 컴포넌트 설정
// Next.js가 자동으로 이 파일을 찾아서 MDX 파일에 적용합니다
import type { ComponentType } from 'react';
import { Video, Callout, CodeBlock, Image, Tabs, Tab } from './components/mdx';
import { RetroCodeBlock } from './components/mdx/RetroCodeBlock';

type MDXComponents = {
  [key: string]: ComponentType<any> | undefined;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 기본 HTML 요소들을 커스터마이즈할 수 있습니다
    ...components,
    // 코드 블록 커스터마이즈
    pre: ({ children, ...props }: any) => {
      // code 요소를 찾아서 RetroCodeBlock으로 렌더링
      if (children?.type === 'code') {
        return <RetroCodeBlock {...children.props} />;
      }
      return <pre {...props}>{children}</pre>;
    },
    code: ({ inline, children, className, ...props }: any) => {
      // 인라인 코드는 다운로드 프로젝트 스타일 사용
      if (inline) {
        return (
          <code
            style={{
              padding: '0.25rem 0.75rem',
              background: 'linear-gradient(to right, #ff1493, #ff69b4)',
              color: 'white',
              border: '3px solid #ff1493',
              fontSize: '0.75rem',
              fontFamily: "'VT323', monospace",
              fontWeight: 500,
              margin: '0 0.25rem',
              boxShadow: '3px 3px 0px 0px rgba(255, 20, 147, 0.6), inset -1px -1px 0 0 rgba(0, 0, 0, 0.3), inset 1px 1px 0 0 rgba(255, 255, 255, 0.3)',
              imageRendering: 'pixelated' as any,
              transition: 'all 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '5px 5px 0px 0px rgba(255, 20, 147, 0.8), inset -1px -1px 0 0 rgba(0, 0, 0, 0.3), inset 1px 1px 0 0 rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '3px 3px 0px 0px rgba(255, 20, 147, 0.6), inset -1px -1px 0 0 rgba(0, 0, 0, 0.3), inset 1px 1px 0 0 rgba(255, 255, 255, 0.3)';
            }}
            {...props}
          >
            ⟨ {children} ⟩
          </code>
        );
      }
      // 블록 코드는 RetroCodeBlock에서 처리됨
      return <code className={className} {...props}>{children}</code>;
    },
    // 커스텀 컴포넌트들
    Video,
    Callout,
    CodeBlock,
    Image,
    Tabs,
    Tab,
  };
}

