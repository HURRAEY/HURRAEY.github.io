import { RetroWindow } from "./RetroWindow";
import { PixelBackground } from "./PixelBackground";
import { FloatingHearts } from "./FloatingHearts";
import { RetroImage } from "./RetroImage";
import { PixelGrid } from "./PixelGrid";

export function RetroHome() {
  return (
    <div className="retro-home-page">
      {/* Animated Background Elements */}
      <PixelBackground />
      <FloatingHearts />
      
      {/* Main Content */}
      <div className="retro-home-content">
        <RetroWindow />
        <RetroImage />
        <PixelGrid />
      </div>
      
      {/* Footer */}
      <div className="retro-footer">
        <p className="retro-footer-text">
          ♥ MADE WITH PIXEL LOVE ♥
        </p>
      </div>
    </div>
  );
}

