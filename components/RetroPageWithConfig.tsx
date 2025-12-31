import { useEffect, useState } from "react";
import { RetroPageLayout } from "./Home/RetroHome";
import { PageConfig } from "../lib/pageConfig";
import { loadPageConfig } from "../lib/loadPageConfig";

interface RetroPageWithConfigProps {
  pageId: string;
}

/**
 * JSON 설정 파일을 자동으로 로드하는 페이지 레이아웃 컴포넌트
 * 
 * @param pageId - public/pages/{pageId}.json 파일을 로드합니다
 */
export function RetroPageWithConfig({ pageId }: RetroPageWithConfigProps) {
  const [config, setConfig] = useState<PageConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      setLoading(true);
      const pageConfig = await loadPageConfig(pageId);
      console.log('Loaded page config for', pageId, ':', pageConfig);
      setConfig(pageConfig);
      setLoading(false);
    }
    fetchConfig();
  }, [pageId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <RetroPageLayout config={config || undefined} pageId={pageId} />;
}

