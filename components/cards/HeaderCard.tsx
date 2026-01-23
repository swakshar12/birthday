
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundLayer from '../BackgroundLayer';

const ConfettiBurst = ({ side }: { side: 'left' | 'right' }) => {
  const colors = ['#D4AF37', '#F8F5F0', '#C7BCA1', '#FFFFFF'];
  return (
    <div className={`absolute bottom-0 ${side === 'left' ? 'left-0' : 'right-0'} w-24 h-24 md:w-48 md:h-48 pointer-events-none z-50`}>
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = side === 'left' ? (Math.random() * 60 + 15) : (Math.random() * 60 + 105);
        const velocity = (window.innerWidth < 768 ? 600 : 1000) + Math.random() * 500;
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-sm"
            style={{ backgroundColor: colors[i % colors.length] }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ 
              x: Math.cos(angle * (Math.PI / 180)) * velocity * 0.8 * (side === 'left' ? 1 : -1),
              y: -Math.sin(angle * (Math.PI / 180)) * velocity - (Math.random() * 200),
              opacity: 0,
              rotate: 1080
            }}
            transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}
    </div>
  );
};

const HeaderCard: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0F172A] px-4 text-center relative overflow-hidden">
      <BackgroundLayer isActive={isActive}>
        <div className="absolute inset-0 bg-[#0F172A] opacity-50" />
      </BackgroundLayer>

      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div key="bursts" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ConfettiBurst side="left" />
            <ConfettiBurst side="right" />
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0], y: -100 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute bottom-12 left-8 md:left-16 text-4xl md:text-8xl"
            >
              🎉
            </motion.div>
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0], y: -100 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
              className="absolute bottom-12 right-8 md:right-16 text-4xl md:text-8xl"
            >
              🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 relative"
      >
        <motion.h2 
          className="text-4xl md:text-9xl font-serif text-[#F8F5F0] mb-4 md:mb-8 tracking-tight leading-tight px-2"
          animate={{ 
            textShadow: [
              "0 0 15px rgba(212,175,55,0.2)",
              "0 0 40px rgba(212,175,55,0.5)",
              "0 0 15px rgba(212,175,55,0.2)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Happy 21st Ishani!
        </motion.h2>
        
        <p className="text-sm md:text-3xl text-[#D4AF37] tracking-[0.4em] md:tracking-[0.6em] font-medium uppercase opacity-90">
          January 13, 2005 — <br className="md:hidden" /> still becoming.
        </p>
        
        <div className="mt-8 md:mt-16 flex justify-center gap-6 md:gap-12 text-3xl md:text-5xl opacity-90">
          <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>✨</motion.span>
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }}>🌱</motion.span>
          <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>✨</motion.span>
        </div>
      </motion.div>
    </div>
  );
};

export default HeaderCard;
