import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import IntroCard from './components/cards/IntroCard';
import HeaderCard from './components/cards/HeaderCard';
import CakeCard from './components/cards/CakeCard';
import MessageCard from './components/cards/MessageCard';
import TraitsCard from './components/cards/TraitsCard';
import WishesCard from './components/cards/WishesCard';
import PrePoemCard from './components/cards/PrePoemCard';
import PoemCard from './components/cards/PoemCard';
import FinalCard from './components/cards/FinalCard';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  
  const totalCards = 9;

  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      threshold: 0.5,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveCardIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = containerRef.current?.querySelectorAll('section');
    sections?.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      if (isMusicPlaying) {
        audioRef.current.volume = 0.5; // Set reasonable volume
        
        // Create a promise for play to handle browser autoplay restrictions
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Audio playing successfully');
            })
            .catch((error) => {
              console.error('Audio play failed:', error);
              // Reset state if play failed
              setIsMusicPlaying(false);
            });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      const section = containerRef.current.querySelector(`section[data-index="${index}"]`);
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cards = useMemo(() => [
    <IntroCard key="intro" isActive={activeCardIndex === 0} isMusicPlaying={isMusicPlaying} onMusicToggle={() => setIsMusicPlaying(!isMusicPlaying)} />,
    <HeaderCard key="header" isActive={activeCardIndex === 1} />,
    <CakeCard key="cake" isActive={activeCardIndex === 2} />,
    <MessageCard key="message" isActive={activeCardIndex === 3} />,
    <TraitsCard key="traits" isActive={activeCardIndex === 4} />,
    <WishesCard key="wishes" isActive={activeCardIndex === 5} />,
    <PrePoemCard key="pre-poem" isActive={activeCardIndex === 6} />,
    <PoemCard key="poem" isActive={activeCardIndex === 7} />,
    <FinalCard key="final" isActive={activeCardIndex === 8} />,
  ], [activeCardIndex]);

  return (
    <div 
      ref={containerRef} 
      className="h-[100dvh] w-full overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#0F172A] relative"
    >
      {/* Audio Element for Background Music */}
      <audio 
        ref={audioRef} 
        src={new URL('../background-music.mp3', import.meta.url).href}
        crossOrigin="anonymous"
        preload="auto"
        controls={false}
        muted={false}
      />
      
      {/* Fixed accidental ' section>' typo after the closing tag of section */}
      {cards.map((card, idx) => (
        <section 
          key={idx} 
          data-index={idx}
          className="w-full h-[100dvh] flex-shrink-0 relative overflow-hidden snap-start flex flex-col"
        >
          {card}
        </section>
      ))}
      
      {/* Vertical Scroll Progress Indicator - Mobile Optimized */}
      <div className="fixed right-3 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-end gap-4 md:gap-6 z-50">
        <div className="flex flex-col gap-3 md:gap-5">
          {Array.from({ length: totalCards }).map((_, i) => (
            <div 
              key={i} 
              className="group relative flex items-center justify-end cursor-pointer p-1"
              onClick={() => scrollToSection(i)}
            >
              {/* Active Number Label - Hidden on very small screens to save space */}
              <AnimatePresence>
                {activeCardIndex === i && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 0.6, x: -12 }}
                    exit={{ opacity: 0, x: -5 }}
                    className="absolute right-full text-[9px] md:text-[10px] font-serif tracking-widest text-[#D4AF37] uppercase pointer-events-none whitespace-nowrap hidden xs:block"
                  >
                    0{i + 1}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* The Dot/Bar */}
              <motion.div 
                animate={{ 
                  height: activeCardIndex === i ? (window.innerWidth < 768 ? 20 : 32) : 6,
                  backgroundColor: activeCardIndex === i ? '#D4AF37' : 'rgba(248, 245, 240, 0.15)',
                  boxShadow: activeCardIndex === i ? '0 0 12px rgba(212, 175, 55, 0.5)' : 'none'
                }}
                className="w-[3px] md:w-1 rounded-full transition-all duration-500 ease-out group-hover:bg-[#D4AF37]/50"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.3)_100%)]" />
    </div>
  );
};

export default App;