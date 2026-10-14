import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FRIENDS_DATA, Friend } from '../data/friends';
import { Facebook } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface FriendsSectionProps {
  playHover?: () => void;
  playClick?: () => void;
}

// -------------------------------------------------------------
// 3D Particles Background for Friends Section
// -------------------------------------------------------------
function Friends3DBackgroundContent() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <group ref={groupRef}>
        <Sparkles count={80} scale={15} size={2} speed={0.2} color="#00f2fe" opacity={0.6} />
        <Sparkles count={60} scale={12} size={3} speed={0.4} color="#f59e0b" opacity={0.5} />
        <Sparkles count={50} scale={10} size={2.5} speed={0.3} color="#a855f7" opacity={0.4} />

        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[-5, 2, -3]}>
            <octahedronGeometry args={[0.5, 0]} />
            <meshBasicMaterial color="#00f2fe" wireframe transparent opacity={0.3} />
          </mesh>
          <mesh position={[6, -3, -4]}>
            <dodecahedronGeometry args={[0.7, 0]} />
            <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.2} />
          </mesh>
        </Float>
      </group>
    </>
  );
}

function Friends3DBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={1}>
        <Friends3DBackgroundContent />
      </Canvas>
    </div>
  );
}

// -------------------------------------------------------------
// Interactive 3D Tilt Card Wrapper
// -------------------------------------------------------------
function TiltCard({ children, className, playHover }: { children: React.ReactNode, className?: string, playHover?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the rotation
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse movement to rotation degrees (max 12 deg tilt)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className={`relative perspective-1000 ${className}`}
    >
      {/* Dynamic Glare overlay */}
      <motion.div
        className="absolute inset-0 z-50 rounded-2xl pointer-events-none"
        style={{
          background: useTransform(
            () => `radial-gradient(circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(255,255,255,0.15), transparent 60%)`
          )
        }}
      />
      {children}
    </motion.div>
  );
}

// -------------------------------------------------------------
// Avatar Component
// -------------------------------------------------------------
function FriendAvatar({ friend }: { friend: Friend }) {
  const [imgError, setImgError] = useState(false);

  const initials = friend.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl border border-white/10"
      style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
    >
      {!imgError ? (
        <img
          src={friend.image}
          alt={friend.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-4 text-center w-full h-full bg-gradient-to-b from-[#111827] to-[#0a0f1d] border border-white/5">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-black font-mono shadow-2xl mb-2 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${friend.themeColor}33, ${friend.themeColor}11)`,
              border: `2px solid ${friend.themeColor}`,
              color: friend.themeColor,
              boxShadow: `0 0 25px ${friend.themeColor}40`
            }}
          >
            {initials}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-[10px] text-gray-400 font-mono tracking-wider">
            PHOTO READY
          </span>
        </div>
      )}

      {/* Cyber overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#010203]/90 via-[#07090e]/40 to-transparent opacity-80 pointer-events-none" />
    </div>
  );
}

export const FriendsSection: React.FC<FriendsSectionProps> = ({
  playHover,
  playClick
}) => {
  const bestFriend = FRIENDS_DATA.find((f) => f.isBestFriend);
  const otherFriends = FRIENDS_DATA.filter((f) => !f.isBestFriend);

  return (
    <section id="friends" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden perspective-[2000px]">

      {/* 3D Global Particles */}
      <Friends3DBackground />

      {/* Background Glow Blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <span>🤝</span>
            <span>Inner Circle & Brotherhood</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-400">FRIENDS</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            The companions who share life’s memorable milestones, laughter, and vision. Together creating stories that stand the test of time.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* BEST FRIEND SPOTLIGHT CARD (RASEL HOSSAIN) */}
        {/* ========================================================= */}
        {bestFriend && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-14 cursor-pointer"
            onClick={playClick}
          >
            <TiltCard playHover={playHover} className="group w-full block">
              {/* Outer Glow Halo tracking 3D */}
              <div
                className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-cyan-500 via-sky-500 to-amber-500 opacity-40 group-hover:opacity-70 blur-2xl transition-all duration-700"
                style={{ transform: 'translateZ(-10px)' }}
              />

              <div
                className="relative rounded-3xl bg-[#0b0f19]/90 border border-cyan-500/40 p-6 sm:p-10 backdrop-blur-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Background ambient lighting */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Photo / Avatar Column - Pops out in 3D */}
                  <div className="lg:col-span-4 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-h-[420px] w-full rounded-2xl overflow-visible relative">
                    <FriendAvatar friend={bestFriend} />

                    {/* Floating 3D Best Friend Badge */}
                    <div
                      className="absolute -top-3 -left-3 z-30 transition-transform duration-500 group-hover:scale-110"
                      style={{ transform: 'translateZ(60px)' }}
                    >
                      <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-xs font-bold tracking-widest shadow-[0_10px_20px_rgba(0,242,254,0.4)] border border-cyan-300">
                        <span className="animate-pulse">★</span>
                        <span>BEST FRIEND</span>
                      </span>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="lg:col-span-8 flex flex-col justify-center space-y-4 sm:space-y-6" style={{ transform: 'translateZ(15px)' }}>
                    <div>
                      <div className="inline-flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-widest mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00f2fe]" />
                        <span>{bestFriend.tagline}</span>
                      </div>
                      <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-wider drop-shadow-lg">
                        {bestFriend.name}
                      </h3>
                      <p className="text-sm font-medium text-cyan-400/90 font-mono mt-2 tracking-wide">
                        {bestFriend.role}
                      </p>
                    </div>

                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light drop-shadow-md">
                      {bestFriend.description}
                    </p>

                    {/* Highlights Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-lg">
                        <div className="text-[10px] text-gray-400 uppercase font-mono">Bond</div>
                        <div className="text-xs sm:text-sm font-bold text-white mt-0.5">Lifelong</div>
                      </div>
                      <div className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-lg" style={{ transform: 'translateZ(10px)' }}>
                        <div className="text-[10px] text-gray-400 uppercase font-mono">Trust</div>
                        <div className="text-xs sm:text-sm font-bold text-cyan-400 mt-0.5">Unconditional</div>
                      </div>
                      <div className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-lg col-span-2 sm:col-span-1" style={{ transform: 'translateZ(20px)' }}>
                        <div className="text-[10px] text-gray-400 uppercase font-mono">Status</div>
                        <div className="text-xs sm:text-sm font-bold text-amber-400 mt-0.5">True Brother</div>
                      </div>
                    </div>

                    {/* Action Buttons / Social Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-4" style={{ transform: 'translateZ(30px)' }}>
                      {bestFriend.facebook && bestFriend.facebook !== '#' && (
                        <a
                          href={bestFriend.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            playClick?.();
                          }}
                          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-white border border-cyan-500/40 text-xs font-mono font-bold tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,242,254,0.7)]"
                        >
                          <Facebook className="w-4 h-4" />
                          <span>FACEBOOK PROFILE</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* CLOSE FRIENDS GRID (SHAKIB, ASIF, RAKIB, TAHAJJUL) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {otherFriends.map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              onClick={playClick}
              className="cursor-pointer"
            >
              <TiltCard className="group h-full block" playHover={playHover}>
                <div
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none -z-10"
                  style={{
                    background: `linear-gradient(135deg, ${friend.themeColor}70, transparent)`
                  }}
                />

                <div
                  className="relative h-full rounded-2xl bg-gradient-to-b from-[#090d16]/90 to-[#03050a]/90 border border-white/10 group-hover:border-white/30 p-5 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between shadow-2xl"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div style={{ transformStyle: 'preserve-3d' }}>
                    {/* Photo / Avatar */}
                    <div className="relative aspect-[4/4.5] w-full rounded-xl overflow-visible mb-5">
                      <FriendAvatar friend={friend} />

                      {/* Floating 3D Badge */}
                      <div
                        className="absolute -top-2 -right-2 z-20 transition-transform duration-500 group-hover:scale-110"
                        style={{ transform: 'translateZ(40px)' }}
                      >
                        <span
                          className="inline-block px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border shadow-lg backdrop-blur-md"
                          style={{
                            backgroundColor: `${friend.themeColor}33`,
                            borderColor: `${friend.themeColor}88`,
                            color: '#ffffff',
                            textShadow: `0 0 10px ${friend.themeColor}`
                          }}
                        >
                          {friend.badge}
                        </span>
                      </div>
                    </div>

                    {/* Friend Info Layered */}
                    <div style={{ transform: 'translateZ(20px)' }}>
                      <h4 className="text-xl font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors drop-shadow-md">
                        {friend.name}
                      </h4>
                      <p
                        className="text-[11px] font-mono font-bold mt-1 tracking-wider"
                        style={{ color: friend.themeColor, textShadow: `0 0 10px ${friend.themeColor}40` }}
                      >
                        {friend.tagline}
                      </p>
                      <p className="mt-3 text-[13px] text-gray-300 font-light leading-relaxed drop-shadow-sm">
                        {friend.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer accent line & Facebook Link */}
                  <div
                    className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    {friend.facebook && friend.facebook !== '#' ? (
                      <a
                        href={friend.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          playClick?.();
                        }}
                        className="inline-flex items-center space-x-1.5 text-xs text-white hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:shadow-lg border border-white/20"
                        style={{ backgroundColor: `${friend.themeColor}40` }}
                      >
                        <Facebook className="w-3.5 h-3.5" />
                        <span>Profile</span>
                      </a>
                    ) : (
                      <span className="text-gray-500">Circle</span>
                    )}
                    <span
                      className="font-bold flex items-center gap-1.5"
                      style={{ color: friend.themeColor }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: friend.themeColor }}></span>
                      Connected
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

