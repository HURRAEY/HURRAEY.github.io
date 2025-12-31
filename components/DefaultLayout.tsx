import { PixelBackground } from "./PixelBackground";
import { FloatingHearts } from "./FloatingHearts";
import { RetroFooter } from "./RetroFooter";
import { ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      {/* 배경 애니메이션 요소 */}
      <PixelBackground />
      <FloatingHearts />
      {/* Main Content */}
      <div className="retro-home-content">
        {children}
      </div>
      {/* Footer */}
      <RetroFooter />
    </>
  );
}

