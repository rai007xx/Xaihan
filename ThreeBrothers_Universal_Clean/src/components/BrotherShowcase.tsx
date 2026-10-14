import React from 'react';
import { motion } from 'framer-motion';
import { Brother } from '../data/brothers';
import { Facebook, ExternalLink } from 'lucide-react';
import { RaihanScene3D, IbrahimScene3D, RabiulScene3D } from '../scenes/BrotherSpecificScenes';

interface BrotherShowcaseProps {
  brother: Brother;
  index: number;
  playHover: () => void;
  playClick: () => void;
}

export const BrotherShowcase: React.FC<BrotherShowcaseProps> = ({ brother, index, playHover, playClick }) => {
  const isEven = index % 2 === 0;

  const renderScene = () => {
    switch (brother.number) {
      case "01": return <RaihanScene3D brother={brother} />;
      case "02": return <IbrahimScene3D brother={brother} />;
      case "03": return <RabiulScene3D brother={brother} />;
      default: return null;
    }
  };

  return (
    <section id={`brother-${brother.number}`} className="relative min-h-screen py-16 md:py-24 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full gap-8 lg:gap-16 grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">

        {/* 3D Scene Container */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-80px" }}
           transition={{ duration: 0.9 }}
           className={`relative w-full h-[400px] sm:h-[480px] lg:h-[650px] ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
           style={{ touchAction: 'pan-y' }}
        >
          {/* Glowing Ambient Behind the Canvas */}
          <div className="absolute inset-0 opacity-25 blur-3xl rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${brother.themeColor} 0%, transparent 70%)` }} />
          {renderScene()}
        </motion.div>

        {/* Text Details & Buttons */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-80px" }}
           transition={{ duration: 0.8 }}
           className={`flex flex-col space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        >
          {/* Frosted Glass Header Container with Backdrop Blur */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden backdrop-blur-3xl bg-[#04060a]/85 border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.85)] group">
            {/* Ambient Accent Line & Glow */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${brother.themeColor}, transparent)` }}
            />
            <div
              className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-15 pointer-events-none transition-opacity duration-500 group-hover:opacity-30"
              style={{ background: brother.themeColor }}
            />

            <div className="flex items-center space-x-3 mb-3 relative z-10">
              <span className="text-3xl sm:text-4xl md:text-5xl font-mono font-black tracking-tighter" style={{ color: brother.themeColor }}>
                {brother.number}
              </span>
              <div className="h-[2px] w-12" style={{ background: `linear-gradient(90deg, ${brother.themeColor}, transparent)` }} />
              <span className="text-xs uppercase tracking-widest text-gray-300 font-semibold bg-white/5 px-3 py-1 rounded-full border border-white/10">{brother.relationship}</span>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-2 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
                {brother.name}
              </h2>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold uppercase tracking-widest drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]" style={{ color: brother.themeColor }}>
                {brother.role}
              </h3>
              {brother.company && (
                <p className="text-xs sm:text-sm font-mono text-gray-300 tracking-wider mt-1.5 inline-block bg-white/5 px-2.5 py-0.5 rounded border border-white/5">{brother.company}</p>
              )}
            </div>

            <div className="mt-5 pt-5 border-t border-white/10 relative z-10">
              <p className="text-gray-200 leading-relaxed font-light text-sm sm:text-base">
                {brother.description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-1">
            {brother.website && (
              <a href={brother.website} target="_blank" rel="noopener noreferrer"
                 onMouseEnter={playHover} onClick={playClick}
                 className={`flex items-center space-x-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-all shadow-lg hover:-translate-y-0.5 ${brother.website.includes('YOUR_') ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'}`}
                 style={{ backgroundColor: brother.themeColor, boxShadow: `0 8px 24px -6px ${brother.themeColor}` }}>
                <span>{brother.websiteLabel || 'Visit Website'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {brother.facebook && (
              <a href={brother.facebook} target="_blank" rel="noopener noreferrer"
                 onMouseEnter={playHover} onClick={playClick}
                 className="flex items-center space-x-2 px-5 py-3.5 rounded-full glass-panel backdrop-blur-md bg-black/40 hover:bg-white/10 text-xs font-semibold tracking-wider text-gray-200 transition-all hover:scale-105 border border-white/10 shadow-md">
                <Facebook className="w-4 h-4 text-cyan-400" />
                <span>Facebook</span>
              </a>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
