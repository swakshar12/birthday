
import React from 'react';
import { motion } from 'framer-motion';
import BackgroundLayer from '../BackgroundLayer';

const LightRays = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#0F172A]">
    {Array.from({ length: 8 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-[150%] w-32 bg-gradient-to-b from-[#D4AF37]/10 to-transparent blur-3xl origin-top"
        style={{
          left: `${15 * i}%`,
          top: '-25%',
          transform: `rotate(${15 + i * 5}deg)`
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          skewX: [-5, 5, -5]
        }}
        transition={{
          duration: 7 + i,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

const WishesCard: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const wishLines = [
    "May the year ahead",
    "leave room",
    "for more conversations,",
    "for getting to know each other",
    "a little better,",
    "for spending time when we can —",
    "talking,",
    "or just working alongside each other.",
    "And for things to feel easy,",
    "the way good friendships usually do."
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#111827] px-6 text-center overflow-hidden">
      <BackgroundLayer isActive={isActive}>
        <LightRays />
      </BackgroundLayer>

      <div className="z-10 max-w-3xl flex flex-col gap-2 md:gap-3">
        {wishLines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 2.0, // Slow fade-in duration
              delay: 0.5 + (i * 1.5), // Slower interval between lines
              ease: [0.16, 1, 0.3, 1] 
            }}
            className={`font-serif leading-tight tracking-wide ${
              line.includes('easy') || line.includes('friendships')
                ? 'text-[#D4AF37] text-2xl md:text-3xl italic mt-2'
                : 'text-[#F8F5F0] text-xl md:text-3xl opacity-90'
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
};

export default WishesCard;
