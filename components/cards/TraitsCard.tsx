
import React from 'react';
import { motion } from 'framer-motion';
import BackgroundLayer from '../BackgroundLayer';
import { TRAITS } from '../../constants';

const TraitsCard: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0F172A] px-4 text-center overflow-y-auto py-8">
      <BackgroundLayer isActive={isActive}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/5 to-transparent" />
      </BackgroundLayer>

      <motion.h3 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-xl md:text-3xl font-serif text-[#C7BCA1] mb-6 md:mb-12 italic"
      >
        Little things that make you… you
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl z-10 w-full px-2">
        {TRAITS.map((trait, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-[#111827] p-4 md:p-6 rounded-lg border border-[#D4AF37]/20 flex flex-col items-start text-left"
          >
            <span className="text-[#D4AF37] font-serif text-lg md:text-xl mb-1">{trait.title}</span>
            <span className="text-[#F8F5F0]/60 text-[9px] md:text-xs font-medium uppercase tracking-widest">{trait.description}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TraitsCard;
