import { motion } from "framer-motion";
import { Y2K_CONFIG } from "./constants";
import styles from "./styles.module.css";

export function CollageImage() {
  return (
    <motion.div
      className={styles.collageImageWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <img
        src={Y2K_CONFIG.COLLAGE_IMAGE_PATH}
        alt="Y2K Collage Background"
        className={styles.collageImage}
        style={{ opacity: Y2K_CONFIG.COLLAGE_IMAGE_OPACITY }}
      />
    </motion.div>
  );
}

