
import React from 'react';
import { motion } from 'framer-motion';
import BackgroundLayer from '../BackgroundLayer';

const MessageCard: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const lines = [
    "You tend to notice more than you say —",
    "and there’s a thoughtfulness",
    "in how you move through things.",
    "",
    "You don’t fill every silence.",
    "",
    "You’re comfortable",
    "letting moments be what they are.",
    "",
    "Your humor is quiet —",
    "but it lands,",
    "and somehow,",
    "it makes things feel lighter.",
    "",
    "You stay focused on what matters to you,",
    "without needing",
    "to draw attention to it.",
    "",
    "It’s the kind of presence people admire —",
    "not always immediately,",
    "but deeply.",
    "",
    "And it stays with them."
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#111827] px-6 text-center overflow-y-auto scroll-smooth py-12 md:py-24 relative">
      <BackgroundLayer isActive={isActive}>
        <div className="fixed inset-0 bg-[#0F172A] opacity-80" />
      </BackgroundLayer>

      <div className="z-10 max-w-2xl w-full mx-auto">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 1.2, delay: i * 0.15 }}
            className={`font-serif text-[#F8F5F0] ${
              line === "" ? 'h-4 md:h-8' : 
              i === lines.length - 1 ? 'text-xl md:text-3xl text-[#D4AF37] italic mt-4' : 
              'text-base md:text-xl opacity-90'
            } leading-relaxed`}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
};

export default MessageCard;
