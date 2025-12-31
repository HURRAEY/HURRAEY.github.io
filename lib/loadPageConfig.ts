import { PageConfig } from "./pageConfig";

/**
 * 페이지 설정을 로드하는 함수 (클라이언트 사이드 전용)
 * @param pageId 페이지 식별자 (예: 'home', 'about')
 * @returns 페이지 설정 객체
 */
export async function loadPageConfig(pageId: string): Promise<PageConfig | null> {
  try {
    // 클라이언트 사이드에서만 사용
    if (typeof window === "undefined") {
      console.warn("loadPageConfig should only be used on client side. Use loadPageConfigSync for server side.");
      return null;
    }

    const response = await fetch(`/pages/${pageId}.json`);
    if (response.ok) {
      return await response.json() as PageConfig;
    }
    return null;
  } catch (error) {
    console.error(`Failed to load page config for ${pageId}:`, error);
    return null;
  }
}

/**
 * 동기적으로 페이지 설정을 로드하는 함수 (빌드 타임 전용)
 * @param pageId 페이지 식별자
 * @returns 페이지 설정 객체
 */
export function loadPageConfigSync(pageId: string): PageConfig | null {
  if (typeof window !== "undefined") {
    console.warn("loadPageConfigSync should only be used on server side");
    return null;
  }

  try {
    const fs = require("fs");
    const path = require("path");
    const configPath = path.join(process.cwd(), "public", "pages", `${pageId}.json`);
    
    if (fs.existsSync(configPath)) {
      const fileContent = fs.readFileSync(configPath, "utf-8");
      return JSON.parse(fileContent) as PageConfig;
    }
    return null;
  } catch (error) {
    console.error(`Failed to load page config for ${pageId}:`, error);
    return null;
  }
}

