
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundLayer from '../BackgroundLayer';

const SnowBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Background layer: Tiny, slow, blurred flakes */}
    {Array.from({ length: 80 }).map((_, i) => {
      const size = Math.random() * 2 + 1;
      return (
        <motion.div
          key={`bg-snow-${i}`}
          className="absolute bg-white rounded-full blur-[1px]"
          style={{ 
            width: size, 
            height: size,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          initial={{ y: -50 }}
          animate={{
            y: '110dvh',
            x: Math.random() * 40 - 20,
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * -30 // Start mid-animation
          }}
        />
      );
    })}
    
    {/* Foreground layer: Larger, crisp flakes */}
    {Array.from({ length: 60 }).map((_, i) => {
      const size = Math.random() * 4 + 2;
      return (
        <motion.div
          key={`fg-snow-${i}`}
          className="absolute bg-white rounded-full blur-[0.3px] shadow-[0_0_8px_rgba(255,255,255,0.3)]"
          style={{ 
            width: size, 
            height: size,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.6 + 0.2,
          }}
          initial={{ y: -50 }}
          animate={{
            y: '110dvh',
            x: Math.random() * 100 - 50,
            rotate: 360
          }}
          transition={{
            duration: 10 + Math.random() * 12,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * -15 // Start mid-animation
          }}
        />
      );
    })}
  </div>
);

const IntroCard: React.FC<{ isActive: boolean; isMusicPlaying?: boolean; onMusicToggle?: () => void }> = ({ isActive, isMusicPlaying = false, onMusicToggle }) => {
  const [glitterParticles, setGlitterParticles] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  const handleButtonClick = () => {
    onMusicToggle?.();
    
    // Create a wave of glitter particles across the entire width
    const particles = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3, // Stagger particles for wave effect
    }));
    
    setGlitterParticles(particles);
    
    // Clear particles after animation completes
    setTimeout(() => setGlitterParticles([]), 2500);
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0F172A] px-4 text-center relative overflow-hidden">
      <BackgroundLayer isActive={isActive}>
        <SnowBackground />
      </BackgroundLayer>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 relative"
      >
        <h1 className="text-4xl md:text-8xl font-serif text-[#F8F5F0] mb-4 md:mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] leading-tight">
          Hey Shweta!
        </h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 0.8 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="text-lg md:text-3xl text-[#C7BCA1] italic font-serif"
        >
          I made something small — <br className="md:hidden" /> just for your birthday.
        </motion.p>
      </motion.div>

      {/* Music Toggle Button - Above scroll to begin text */}
      <button
        onClick={handleButtonClick}
        className="absolute bottom-24 md:bottom-32 flex items-center justify-center px-12 py-6 md:px-16 md:py-8 rounded-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition-colors border border-[#D4AF37]/30 hover:border-[#D4AF37]/60"
        title={isMusicPlaying ? 'Pause music' : 'Play music'}
      >
        <span className="text-[#D4AF37] font-bold italic text-xl md:text-3xl">click me and then scroll!</span>
      </button>

      {/* Glitter Wave Effect */}
      {glitterParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none"
          style={{
            left: `${particle.left}%`,
            top: '-20px',
            width: `${Math.random() * 6 + 4}px`,
            height: `${Math.random() * 6 + 4}px`,
            background: 'radial-gradient(circle, #FFD700, #FFA500)',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.9), 0 0 20px rgba(255, 215, 0, 0.6)',
          }}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ 
            opacity: 0, 
            y: '105vh',
            x: (Math.random() - 0.5) * 100,
            scale: Math.random() * 0.3 + 0.2,
          }}
          transition={{
            duration: 2.2,
            delay: particle.delay,
            ease: 'easeIn',
          }}
        />
      ))}

      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 md:bottom-16 text-[#D4AF37] uppercase tracking-[0.4em] text-[9px] md:text-xs font-bold"
      >
        scroll to begin
      </motion.div>
    </div>
  );
};

export default IntroCard;
