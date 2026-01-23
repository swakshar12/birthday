
import React from 'react';
import { motion } from 'framer-motion';
import BackgroundLayer from '../BackgroundLayer';

// Assets logic: using the provided high-res zodiac logos
const ZodiacOverlay = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Large Zodiac Logos */}
      {Array.from({ length: 14 }).map((_, i) => {
        const isCapricorn = i % 2 === 0;
        return (
          <motion.div
            key={`zodiac-${i}`}
            style={{ 
              left: `${Math.random() * 100}%`,
            }}
            initial={{ 
              y: -400, 
              rotate: Math.random() * 40 - 20, 
              opacity: 0,
              scale: 0.7 + Math.random() * 0.6 // Increased scale significantly
            }}
            animate={{ 
              y: '110vh', 
              x: [0, 60, -60, 20], 
              rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
              opacity: [0, 0.35, 0.35, 0] // Slightly more opaque for visibility
            }}
            transition={{ 
              duration: 20 + Math.random() * 15, 
              repeat: Infinity, 
              delay: Math.random() * 25,
              ease: "linear"
            }}
            className="absolute flex items-center justify-center"
          >
            {/* 
              Luxury Gold Filter:
              Making the logos significantly bigger (w-80 to w-112)
            */}
            <img 
              src={isCapricorn ? 'https://files.catbox.moe/u0fzh0.png' : 'https://files.catbox.moe/jpsu5d.png'} 
              alt="Zodiac Logo"
              className="w-80 h-80 md:w-[28rem] md:h-[28rem] object-contain"
              style={{
                filter: 'invert(75%) sepia(57%) saturate(464%) hue-rotate(5deg) brightness(92%) contrast(89%) drop-shadow(0 0 15px rgba(212,175,55,0.15))',
                opacity: 0.6
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = document.createElement('span');
                  fallback.innerText = isCapricorn ? '♑' : '♈';
                  fallback.className = "text-9xl text-[#D4AF37] opacity-40 font-serif";
                  parent.appendChild(fallback);
                }
              }}
            />
          </motion.div>
        );
      })}

      {/* Floating stardust for depth */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1.5 h-1.5 bg-[#F8F5F0]"
          style={{ 
            left: `${Math.random() * 100}%`,
            borderRadius: '50%',
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: '110vh',
            opacity: [0, 0.5, 0] 
          }}
          transition={{ 
            duration: 12 + Math.random() * 10, 
            repeat: Infinity, 
            delay: Math.random() * 15,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const SoftSpotlight = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#0F172A]">
    <motion.div
      animate={{ 
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-radial from-[#D4AF37]/10 to-transparent blur-[140px] rounded-full"
    />
  </div>
);

const PrePoemCard: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const lines = [
    "Before you scroll again —",
    "I wrote something.",
    "It’s short.",
    "And I hope you like it.... 😊"
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#111827] px-6 text-center relative overflow-hidden">
      <BackgroundLayer isActive={isActive}>
        <SoftSpotlight />
      </BackgroundLayer>

      {/* Large Custom Zodiac logo animation layer */}
      <ZodiacOverlay />

      <div className="z-10 max-w-2xl space-y-8">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 2.0, 
              delay: 0.8 + i * 2.2, 
              ease: "easeOut" 
            }}
            className={`font-serif text-[#F8F5F0] italic leading-relaxed ${
              i === lines.length - 1 ? 'text-3xl md:text-5xl text-[#D4AF37]' : 'text-2xl md:text-3xl opacity-90'
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        transition={{ delay: 8, duration: 2 }}
        className="absolute bottom-16 text-[#D4AF37] text-sm tracking-[0.5em] uppercase z-10 font-medium"
      >
        Keep going
      </motion.div>
    </div>
  );
};

export default PrePoemCard;
