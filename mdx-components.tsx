// MDX 컴포넌트 설정
// Next.js가 자동으로 이 파일을 찾아서 MDX 파일에 적용합니다
import type { ComponentType } from 'react';
import { Video, Callout, CodeBlock, Image, Tabs, Tab } from './components/mdx';

type MDXComponents = {
  [key: string]: ComponentType<any> | undefined;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 기본 HTML 요소들을 커스터마이즈할 수 있습니다
    ...components,
    // 커스텀 컴포넌트들
    Video,
    Callout,
    CodeBlock,
    Image,
    Tabs,
    Tab,
  };
}

