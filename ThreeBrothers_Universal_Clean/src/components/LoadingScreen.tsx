import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_CONFIG } from '../data/brothers';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [subtitle, setSubtitle] = useState('INITIALIZING 3D ENVIRONMENT...');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoaded, 400);
          return 100;
        }
        if (prev === 40) {
          setSubtitle('ENTERING OUR WORLD...');
        }
        if (prev === 75) {
          setSubtitle('PREPARING THREE JOURNEYS...');
        }
        return prev + 3;
      });
    }, 25);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07090e] text-white px-6 overflow-hidden"
      >
        <div className="absolute w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute w-[350px] h-[350px] bg-violet-600/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-cyan-400/30 border-t-cyan-400 border-r-transparent"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2.5 rounded-full border border-violet-500/30 border-b-violet-400 border-l-transparent"
          />
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(0,242,254,0.3)]"
          >
            <span className="font-mono text-xs font-bold tracking-widest text-cyan-400">
              {progress}%
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2.5"
        >
          <h1 className="text-xl md:text-3xl font-extrabold tracking-[0.25em] font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 uppercase">
            {BRAND_CONFIG.mainTitle}
          </h1>
          <p className="text-[11px] tracking-[0.22em] text-cyan-400 font-mono font-medium uppercase h-4">
            {subtitle}
          </p>
          <p className="text-[10px] tracking-[0.2em] text-gray-500">
            {BRAND_CONFIG.namesShort}
          </p>
        </motion.div>

        <div className="w-48 h-[2px] bg-white/10 rounded-full mt-6 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
