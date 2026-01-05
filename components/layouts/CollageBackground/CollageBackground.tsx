import { CollageImage } from "./CollageImage";
import { GradientOverlay } from "./GradientOverlay";
import { GlitterStars } from "./GlitterStars";
import { FloatingPinkHearts } from "./FloatingPinkHearts";
import { ScatteredStickers } from "./ScatteredStickers";
import { PixelNoiseOverlay } from "./PixelNoiseOverlay";
import styles from "./styles.module.css";

export function Y2KCollageBackground() {
  return (
    <div className={styles.container}>
      <CollageImage />
      <GradientOverlay />
      <GlitterStars />
      <FloatingPinkHearts />
      <ScatteredStickers />
      <PixelNoiseOverlay />
    </div>
  );
}

