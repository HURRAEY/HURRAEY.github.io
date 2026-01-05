import { useRouter } from "next/router";

export function useTabName(pageTitle?: string): string {
  const router = useRouter();
  
  // prop이 있으면 prop 사용
  if (pageTitle) {
    return pageTitle.toUpperCase();
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

