import { RetroWindow } from "../RetroWindow";
import { RetroImage } from "../RetroImage";
import { PixelGrid } from "../PixelGrid";
import { PageConfig } from "../../lib/pageConfig";
import { RetroPageWithConfig } from "../RetroPageWithConfig";

interface RetroPageLayoutProps {
  config?: PageConfig;
  pageId?: string;
}

/**
 * 페이지 레이아웃 컴포넌트
 * JSON 설정 파일을 기반으로 RetroWindow, RetroImage, PixelGrid를 렌더링합니다.
 * 
 * @param config - 페이지 설정 객체 (선택사항)
 * @param pageId - 페이지 ID (config가 없을 때 자동 로드)
 */
export function RetroPageLayout({ config, pageId }: RetroPageLayoutProps) {
  // config가 없으면 기본값 사용
  const pageConfig: PageConfig = config || {
    window: { title: pageId?.toUpperCase() || "PAGE" },
  };

  console.log('RetroPageLayout pageConfig:', pageConfig);
  console.log('RetroPageLayout contentConfig:', pageConfig.content);

  return (
    <div>
      {/* Main Content */}
      <div>
        <RetroWindow 
          pageTitle={pageConfig.window?.title}
          contentConfig={pageConfig.content}
        />
        <RetroImage config={pageConfig.image} />
        <PixelGrid config={pageConfig.pixelGrid} />
      </div>
    </div>
  );
}

/**
 * 레거시 호환성을 위한 RetroHome 컴포넌트
 * home.json 파일을 자동으로 로드합니다.
 */
export function RetroHome() {
  return <RetroPageWithConfig pageId="home" />;
}

