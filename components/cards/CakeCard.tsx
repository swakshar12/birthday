
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundLayer from '../BackgroundLayer';

const SmokePuff = () => (
  <motion.div
    initial={{ opacity: 0, y: 0, scale: 0.5 }}
    animate={{ opacity: [0, 0.4, 0], y: -80, scale: 2, x: [0, 10, -10, 0] }}
    transition={{ duration: 2, ease: "easeOut" }}
    className="absolute -top-12 left-0 right-0 mx-auto w-12 h-12 bg-[#F8F5F0]/20 rounded-full blur-xl pointer-events-none"
  />
);

const CakeCard: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [blown, setBlown] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      setIsListening(true);
    } catch (err) { 
      console.error("Microphone access denied or error:", err);
      alert("Microphone access is needed to blow the candles! Please enable it in your browser.");
    }
  };

  useEffect(() => {
    if (!isListening || blown) return;
    let rafId: number;
    const checkBlow = () => {
      if (!analyserRef.current) return;
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      
      setVolume(average);

      // Threshold lowered slightly to 50 for better mobile responsiveness
      if (average > 50) {
        setBlown(true); 
        setIsListening(false);
        setVolume(0);
        if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      } else {
        rafId = requestAnimationFrame(checkBlow);
      }
    };
    rafId = requestAnimationFrame(checkBlow);
    return () => cancelAnimationFrame(rafId);
  }, [isListening, blown]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between bg-[#0F172A] py-6 md:py-12 px-4 text-center relative overflow-hidden">
      <BackgroundLayer isActive={isActive}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#5B2D8B]/10 to-transparent" />
      </BackgroundLayer>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="z-10 mt-2">
        <h2 className="text-2xl md:text-5xl font-serif text-[#F8F5F0] leading-tight">
          {blown ? "The year ahead looks bright." : "Make a wish, Shweta."}
        </h2>
        {!blown && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <p className="text-[#C7BCA1] text-[8px] md:text-xs tracking-widest uppercase opacity-60">
              Mic required to blow
            </p>
            {isListening && (
              <motion.div 
                className="h-1 bg-[#D4AF37]/30 rounded-full w-32 overflow-hidden"
              >
                <motion.div 
                  className="h-full bg-[#D4AF37]"
                  style={{ width: `${Math.min(100, (volume / 50) * 100)}%` }}
                />
              </motion.div>
            )}
          </div>
        )}
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full flex-grow py-2">
        <motion.div className="relative scale-[0.65] md:scale-90 lg:scale-100 origin-center">
          {/* Smoke Puffs */}
          <AnimatePresence>
            {blown && (
              <>
                <div className="absolute -top-20 left-4"><SmokePuff /></div>
                <div className="absolute -top-20 right-4"><SmokePuff /></div>
              </>
            )}
          </AnimatePresence>

          {/* Candles */}
          <div className="flex gap-6 md:gap-12 justify-center absolute -top-20 left-0 right-0 mx-auto w-fit">
            {[2, 1].map((num, i) => (
              <div key={i} className="relative w-8 h-20 md:w-10 md:h-24 bg-[#F8F5F0] rounded-t-sm shadow-xl flex items-center justify-center font-serif text-[#5B2D8B] text-xl md:text-2xl font-bold">
                {num}
                <AnimatePresence mode="wait">
                  {!blown && (
                    <motion.div 
                      key="flame"
                      className="absolute -top-7 left-0 right-0 mx-auto w-5 h-10 bg-gradient-to-t from-orange-600 to-yellow-200 rounded-full blur-[2px] shadow-[0_0_15px_rgba(251,146,60,0.6)]"
                      animate={{ 
                        scale: [1, 1.15, 1], 
                        opacity: [0.8, 1, 0.8],
                        rotate: [-2, 2, -2]
                      }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0, 
                        y: -10,
                        transition: { duration: 0.4, ease: "easeIn" } 
                      }}
                      transition={{ 
                        duration: 0.8, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Red Velvet Cake Base */}
          <div className="w-56 h-36 md:w-80 md:h-48 bg-[#6B0D18] rounded-t-2xl border-b-4 border-[#F8F5F0] relative shadow-2xl overflow-hidden">
            <div className="absolute top-0 w-full flex justify-between px-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-8 h-8 md:w-10 md:h-10 bg-[#F8F5F0] rounded-full -mt-4 shadow-inner" />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="w-40 h-3 bg-[#E3D9C6] rounded-full mx-auto -mt-1 shadow-lg" />
          <div className="w-6 h-10 bg-[#E3D9C6] mx-auto" />
          <div className="w-32 h-6 bg-[#E3D9C6] rounded-t-full mx-auto shadow-md" />
        </motion.div>
      </div>

      <div className="z-20 w-full flex flex-col items-center gap-4 pb-4">
        {!blown ? (
          <button 
            onClick={startMicrophone} 
            disabled={isListening}
            className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-sm transition-all shadow-xl ${
              isListening 
                ? 'bg-[#5B2D8B] text-white cursor-default' 
                : 'bg-[#D4AF37] text-[#0F172A] hover:scale-105 active:scale-95'
            }`}
          >
            {isListening ? "Blow now!" : "Start Microphone"}
          </button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[#D4AF37] font-serif italic text-xl md:text-3xl drop-shadow-sm"
          >
            A magical year awaits you.
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CakeCard;
