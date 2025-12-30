import { motion } from "framer-motion";

export function RetroImage() {
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
            RETRO.IMG
          </span>
        </div>
        <motion.img
          src="/images/home/Gemini_Generated_Image_fk02h4fk02h4fk02.png"
          alt="Retro Document"
          className="retro-image"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

