import { RetroWindow } from "./RetroWindow";
import { RetroImage } from "./RetroImage";
import { PixelGrid } from "./PixelGrid";

export function RetroHome() {
  return (
    <div className="retro-home-page">
      {/* Main Content */}
      <div>
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

