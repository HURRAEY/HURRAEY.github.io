import { PixelBackground } from "./PixelBackground";
import { Y2KCollageBackground } from "./Y2KCollageBackground/index";
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
      <Y2KCollageBackground />
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

