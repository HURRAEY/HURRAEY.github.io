import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import React from "react";
import { PageContentConfig } from "../lib/pageConfig";

interface RetroContentProps {
  children?: React.ReactNode;
  config?: PageContentConfig;
}

export function RetroContent({ children, config }: RetroContentProps) {
  // children이 실제로 내용이 있는 경우에만 children을 우선 표시
  // React.Children을 사용하여 실제 children이 있는지 확인
  const childrenCount = React.Children.count(children);
  const hasValidChildren = childrenCount > 0;
  
  console.log('RetroContent - children:', children, 'count:', childrenCount, 'hasValid:', hasValidChildren);
  console.log('RetroContent - config:', config);
  
  if (hasValidChildren) {
    return (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="retro-content"
      >
        <div className="retro-content-inner">
          {children}
        </div>
      </motion.div>
    );
  }

  // config가 없거나 enabled가 false면 아무것도 표시하지 않음
  if (!config || config.enabled === false) {
    console.log('RetroContent - no config or disabled');
    return null;
  }
  
  console.log('RetroContent - using config, heading:', config.heading);

  // 기본값 설정
  const heading = config.heading || "★ WELCOME TO PIXEL WORLD ★";
  const textList = config.textList || [];
  const cards = config.cards || [];
  const showSparkles = config.showSparkles !== false; // 기본값 true

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="retro-content"
    >
      <div className="retro-content-inner">
        {heading && (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 
              className="retro-heading"
              style={{ color: '#e91e63' }}
            >
              {heading}
            </h1>
          </motion.div>
        )}

        {textList.length > 0 && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="retro-text-list"
          >
            {textList.map((text, i) => (
              <p key={i} className="retro-text">
                {text}
              </p>
            ))}
          </motion.div>
        )}

        {cards.length > 0 && (
          <div className="retro-grid">
            {cards.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className={`retro-card ${item.color}`}
              >
                <h3 className="retro-card-title">
                  {item.title}
                </h3>
                <div className="retro-card-content" />
              </motion.div>
            ))}
          </div>
        )}

        {showSparkles && (
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="retro-sparkles"
          >
            <Sparkles className="retro-icon-sparkles" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

