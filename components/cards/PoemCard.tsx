
import React from 'react';
import { motion } from 'framer-motion';
import BackgroundLayer from '../BackgroundLayer';

const PoemCard: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const poemLines = [
    "You notice things —",
    "often quietly,",
    "often without saying much.",
    "You listen more than you speak,",
    "and when you do speak,",
    "it usually matters.",
    "There’s an ease in how you are,",
    "a kind of calm",
    "that doesn’t ask for attention.",
    "You have a way of making moments lighter,",
    "not by trying,",
    "just by being yourself.",
    "That kind of presence",
    "often goes unnoticed.",
    "It shouldn’t.",
    "Glad to have you as a pal!"
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#0F172A] px-4 text-center overflow-y-auto py-12 md:py-24 relative scroll-smooth">
      <BackgroundLayer isActive={isActive}>
        <div className="fixed inset-0 bg-[#0F172A] opacity-90" />
      </BackgroundLayer>

      <div className="z-10 max-w-2xl mx-auto flex flex-col gap-1 md:gap-3">
        {poemLines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
            className={`font-serif tracking-wide ${
              i >= poemLines.length - 2 
                ? 'text-[#D4AF37] text-xl md:text-4xl mt-4 font-semibold italic' 
                : 'text-[#F8F5F0] text-base md:text-xl opacity-90'
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
};

export default PoemCard;
