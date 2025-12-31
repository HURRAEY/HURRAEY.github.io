// 페이지 설정 타입 정의
export interface PageWindowConfig {
  title?: string;
}

export interface PageContentConfig {
  heading?: string;
  textList?: string[];
  cards?: Array<{
    title: string;
    color: "retro-card-pink" | "retro-card-purple" | "retro-card-cyan" | "retro-card-yellow";
  }>;
  showSparkles?: boolean;
  enabled?: boolean;
}

export interface PageImageConfig {
  src: string;
  alt: string;
  title?: string;
  enabled?: boolean;
}

export interface PagePixelGridConfig {
  title?: string;
  itemCount?: number;
  enabled?: boolean;
}

export interface PageConfig {
  window?: PageWindowConfig;
  content?: PageContentConfig;
  image?: PageImageConfig;
  pixelGrid?: PagePixelGridConfig;
}

