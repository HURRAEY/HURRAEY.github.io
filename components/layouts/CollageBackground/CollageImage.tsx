import { memo } from "react";
import { Y2K_CONFIG } from "./constants";
import styles from "./styles.module.css";

// CSS 애니메이션으로 변경하여 React 리렌더 완전 분리
export const CollageImage = memo(function CollageImage() {
  return (
    <div className={styles.collageImageWrapper}>
      <img
        src={Y2K_CONFIG.COLLAGE_IMAGE_PATH}
        alt="Y2K Collage Background"
        className={styles.collageImage}
        style={{ 
          '--image-opacity': Y2K_CONFIG.COLLAGE_IMAGE_OPACITY.toString(),
        } as React.CSSProperties}
      />
    </div>
  );
});


