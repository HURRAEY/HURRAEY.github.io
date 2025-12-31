import React, { createContext, useContext } from "react";

// pageProps.title을 공유하기 위한 간단한 Context
const PageTitleContext = createContext<string | undefined>(undefined);

export function PageTitleProvider({ children, title }: { children: React.ReactNode; title?: string }) {
  return <PageTitleContext.Provider value={title}>{children}</PageTitleContext.Provider>;
}

export function usePageTitle() {
  return useContext(PageTitleContext);
}

