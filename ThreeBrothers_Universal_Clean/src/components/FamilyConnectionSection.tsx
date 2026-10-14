import React from 'react';
import { motion } from 'framer-motion';
import { FamilyOrbitScene } from '../scenes/FamilyOrbitScene';

export const FamilyConnectionSection: React.FC = () => {
  return (
    <section id="connection" className="relative w-full py-24 md:py-32 overflow-hidden bg-gradient-to-b from-transparent via-[#090b14]/30 to-transparent">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10 mb-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-cyan-400 uppercase block mb-3">
            ONE FAMILY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 pb-2">
            Different dreams.
            <br />
            Different journeys.
            <br />
            <span className="text-white">One family.</span>
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <FamilyOrbitScene />
      </motion.div>
    </section>
  );
};
