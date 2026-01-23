
import React from 'react';
import { motion } from 'framer-motion';
import BackgroundLayer from '../BackgroundLayer';

const CelebrationOverlay = () => {
  const emojis = ['🎉', '🎂', '🥳', '🎈', '🎊'];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {/* Floating Emojis Rain */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`emoji-${i}`}
          style={{ 
            left: `${Math.random() * 100}%`, // Use left for screen-wide distribution
          }}
          initial={{ 
            y: -100, 
            rotate: 0, 
            opacity: 0,
            scale: 0.6 + Math.random()
          }}
          animate={{ 
            y: '110vh', 
            x: [0, 25, -25, 0], // Subtle horizontal drift
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 10 + Math.random() * 12, 
            repeat: Infinity, 
            delay: Math.random() * 15,
            ease: "linear"
          }}
          className="absolute text-2xl md:text-5xl filter blur-[0.3px]"
        >
          {emojis[i % emojis.length]}
        </motion.div>
      ))}

      {/* Luxury Gold/White Confetti Rain */}
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={`confetti-${i}`}
          className={`absolute w-1.5 h-1.5 md:w-2 md:h-2 ${i % 2 === 0 ? 'bg-[#D4AF37]' : 'bg-white'}`}
          style={{ 
            left: `${Math.random() * 100}%`, // Ensure distribution everywhere
            borderRadius: i % 3 === 0 ? '50%' : '20%',
            boxShadow: i % 2 === 0 ? '0 0 10px rgba(212, 175, 55, 0.4)' : 'none'
          }}
          initial={{ 
            y: -20, 
            opacity: 0,
            rotate: 0
          }}
          animate={{ 
            y: '110vh',
            x: [0, 15, -15, 5],
            opacity: [0, 0.9, 0.9, 0],
            rotate: 720
          }}
          transition={{ 
            duration: 7 + Math.random() * 9, 
            repeat: Infinity, 
            delay: Math.random() * 12,
            ease: "easeIn"
          }}
        />
      ))}
    </div>
  );
};

const CenterGlow = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.4, 0.2] 
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="w-[60vw] h-[60vw] bg-radial from-[#D4AF37] via-[#5B2D8B]/20 to-transparent blur-[120px] rounded-full"
    />
  </div>
);

const FinalCard: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#111827] px-6 text-center relative overflow-hidden">
      <BackgroundLayer isActive={isActive}>
        <CenterGlow />
      </BackgroundLayer>

      {/* Celebration Layer spans the entire card */}
      <CelebrationOverlay />

      <div className="z-10 max-w-2xl flex flex-col items-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-[#C7BCA1] uppercase tracking-[0.4em] text-[10px] md:text-xs mb-10"
        >
          Before this ends —
        </motion.p>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="text-4xl md:text-6xl font-serif text-[#F8F5F0] mb-4 leading-tight"
        >
          just wanted to say
        </motion.h2>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 3.5 }}
          className="text-4xl md:text-6xl font-serif text-[#D4AF37] italic mb-8 leading-tight"
        >
          it’s genuinely nice
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 5.5 }}
          className="text-2xl md:text-3xl font-serif text-[#F8F5F0]/90 italic mb-16"
        >
          knowing you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 7.5 }}
          className="relative px-4"
        >
          <div className="absolute -inset-4 bg-[#D4AF37]/5 blur-2xl rounded-full" />
          <h1 className="text-3xl md:text-5xl font-serif text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] relative">
            Happy Birthday, Shweta!
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 3, delay: 9 }}
          className="mt-8 flex gap-4 text-3xl md:text-4xl"
        >
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎉</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎂</span>
          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🥳</span>
          <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>🎈</span>
          <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>🎊</span>
        </motion.div>
      </div>
    </div>
  );
};

export default FinalCard;
