import React from 'react';
import { motion } from 'framer-motion';
import { HeroScene } from '../scenes/HeroScene';
import { BRAND_CONFIG } from '../data/brothers';
import { ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden flex flex-col justify-between items-center">
      {/* 3D Scene Layer (covers full screen behind text) */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <HeroScene />
      </div>

      {/* Top Header Typography Layer - Positioned high at the top to guarantee zero card overlap */}
      <div className="relative z-20 pointer-events-none w-full max-w-3xl px-4 pt-16 md:pt-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center px-6 py-4 md:px-10 md:py-5 rounded-2xl glass-panel relative"
        >
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[0.2em] font-mono mb-1 text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-300 uppercase drop-shadow-[0_0_30px_rgba(0,0,0,1)]">
            {BRAND_CONFIG.mainTitle}
          </h1>
          <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.22em] text-cyan-400 font-semibold uppercase text-glow">
            {BRAND_CONFIG.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-20 pb-5 pointer-events-auto flex flex-col items-center"
      >
        <span className="text-[9px] tracking-[0.3em] text-cyan-400 uppercase mb-1 font-mono font-bold glass-panel px-4 py-1.5 rounded-full">
          SCROLL TO EXPLORE ↓
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-cyan-400 opacity-90" />
        </motion.div>
      </motion.div>
    </section>
  );
};
