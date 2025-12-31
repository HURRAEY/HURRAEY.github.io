import { useRouter } from "next/router";
import { usePageTitle } from "../contexts/PageTitleContext";

export function useTabName(pageTitle?: string): string {
  const contextTitle = usePageTitle();
  const router = useRouter();
  
  // prop이 있으면 prop 우선, 없으면 context에서 가져오기
  const pageTitleFromProps = pageTitle || contextTitle;

  // 현재 경로에 따라 탭 이름 결정
  if (pageTitleFromProps) {
    return pageTitleFromProps.toUpperCase();
  }

  const pathname = router.pathname;

  // 루트 경로인 경우
  if (pathname === "/") {
    return "HOME";
  }

  // 경로의 첫 번째 부분(슬래시 뒤의 단어)을 대문자로 변환
  const firstPath = pathname.split("/")[1];
  return firstPath ? firstPath.toUpperCase() : "HOME";
}

