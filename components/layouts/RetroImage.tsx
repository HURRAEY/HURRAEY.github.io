import { motion } from "framer-motion";
import { PageImageConfig } from "../../lib/pageConfig";

interface RetroImageProps {
  config?: PageImageConfig;
}

export function RetroImage({ config }: RetroImageProps) {
  // config가 없거나 enabled가 false면 렌더링하지 않음
  if (!config || config.enabled === false) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="retro-image-container"
    >
      <div className="retro-image-frame">
        <div className="retro-image-header">
          <div className="retro-image-dot retro-image-dot-red" />
          <div className="retro-image-dot retro-image-dot-yellow" />
          <div className="retro-image-dot retro-image-dot-green" />
          <span className="retro-image-title">
            {config.title || "RETRO.IMG"}
          </span>
        </div>
        <motion.img
          src={config.src}
          alt={config.alt}
          className="retro-image"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

