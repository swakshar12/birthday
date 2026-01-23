
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundLayerProps {
  isActive: boolean;
  children: React.ReactNode;
}

const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ isActive, children }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackgroundLayer;
