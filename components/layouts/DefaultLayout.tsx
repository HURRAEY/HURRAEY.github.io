import { Y2KCollageBackground } from "./CollageBackground/CollageBackground";
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
      <div className="relative z-10 py-4 md:py-8 px-4">
        {/* Main Content */}
        <div className="retro-home-content">
          {children}
        </div>
      </div>
      
      {/* Footer */}
      <RetroFooter />
    </>
  );
}

