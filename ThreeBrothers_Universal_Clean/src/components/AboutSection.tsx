import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_CONFIG } from '../data/brothers';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative w-full py-28 md:py-36 flex items-center justify-center pointer-events-auto">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 rounded-full blur-[90px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="relative z-10 w-full max-w-4xl px-6"
      >
        <div className="glass-panel p-8 md:p-14 rounded-3xl relative overflow-hidden backdrop-blur-2xl text-center border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

          <h2 className="text-xs font-semibold tracking-[0.4em] text-cyan-400 uppercase mb-8 font-mono">ABOUT US</h2>

          <div className="space-y-5 text-base sm:text-xl md:text-2xl font-light leading-relaxed text-gray-200">
            {BRAND_CONFIG.aboutText.split('\n').map((line, idx) => (
              <p key={idx} className={idx === BRAND_CONFIG.aboutText.split('\n').length - 1 ? 'mt-6 font-medium text-white border-t border-white/10 pt-4' : ''}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
