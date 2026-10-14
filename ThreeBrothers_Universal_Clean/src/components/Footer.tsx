import React from 'react';
import { BRAND_CONFIG, BROTHERS_DATA } from '../data/brothers';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full py-16 md:py-24 bg-[#050608] border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090e] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-white mb-2">
          {BRAND_CONFIG.mainTitle}.
        </h2>
        <h3 className="text-lg sm:text-2xl md:text-3xl font-light tracking-tight uppercase text-gray-500 mb-2">
          {BRAND_CONFIG.subtitle.split('.')[0]}.
        </h3>
        <p className="text-lg sm:text-2xl md:text-3xl font-light tracking-tight uppercase text-cyan-400 mb-12 text-glow">
           ONE FAMILY.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-10">
            {[BROTHERS_DATA[2], BROTHERS_DATA[1], BROTHERS_DATA[0]].map((b) => (
              <React.Fragment key={b.number}>
                <span className="hover:text-cyan-400 transition-colors cursor-default">{b.name}</span>
                <span className="text-white/10 hidden sm:inline">|</span>
              </React.Fragment>
            ))}
            <span className="hover:text-cyan-400 transition-colors cursor-default">Flarko LLC</span>
            <span className="text-white/10 hidden sm:inline">|</span>
            <span className="hover:text-cyan-400 transition-colors cursor-default">Brothers Digital</span>
        </div>

        <p className="text-[9px] tracking-[0.25em] text-gray-600 uppercase font-mono">
          © 2026 {BRAND_CONFIG.mainTitle}
        </p>
      </div>
    </footer>
  );
};
