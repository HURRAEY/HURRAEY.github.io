import { motion } from "framer-motion";
import { useState } from "react";
import { useTabName } from "../hooks/useTabName";
import { RetroTitleBar } from "./RetroTitleBar";
import { RetroMenuBar } from "./RetroMenuBar";
import { RetroToolbar } from "./RetroToolbar";
import { RetroContent } from "./RetroContent";
import { RetroStatusBar } from "./RetroStatusBar";

interface RetroWindowProps {
  pageTitle?: string;
  children?: React.ReactNode;
}

export function RetroWindow({ pageTitle, children }: RetroWindowProps = {}) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const currentTabName = useTabName(pageTitle);

  const handleMenuToggle = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="retro-window"
    >
      <RetroTitleBar
        title={currentTabName}
        onMinimize={() => setIsMinimized(!isMinimized)}
      />

      <RetroMenuBar openMenu={openMenu} onMenuToggle={handleMenuToggle} />

      <RetroToolbar />

      {!isMinimized && <RetroContent>{children}</RetroContent>}

      <RetroStatusBar />
    </motion.div>
  );
}

