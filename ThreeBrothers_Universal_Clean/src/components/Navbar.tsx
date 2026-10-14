import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brothers';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  playHover: () => void;
  playClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  onToggleSound,
  playHover,
  playClick
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'BROTHERS', href: '#brothers' },
    { label: 'ABOUT', href: '#about' },
    { label: 'FRIENDS', href: '#friends' }
  ];

  const handleLinkClick = (href: string) => {
    playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#hero');
          }}
          onMouseEnter={playHover}
          className="group flex flex-col"
        >
          <span className="text-sm md:text-base font-extrabold tracking-[0.25em] text-white group-hover:text-cyan-400 transition-colors uppercase font-mono">
            {BRAND_CONFIG.mainTitle}
          </span>
          <span className="text-[9px] tracking-[0.2em] text-gray-400 group-hover:text-gray-300 transition-colors">
            {BRAND_CONFIG.namesShort}
          </span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              onMouseEnter={playHover}
              className="text-xs font-semibold tracking-[0.2em] text-gray-300 hover:text-white transition-all relative py-1 group uppercase"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}

          <button
            onClick={() => {
              playClick();
              onToggleSound();
            }}
            onMouseEnter={playHover}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] text-xs text-gray-300 hover:text-white transition-all backdrop-blur-md"
            title={soundEnabled ? 'Disable Audio Ambience' : 'Enable Audio Ambience'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="text-[9px] tracking-widest uppercase text-cyan-400 font-mono">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-[9px] tracking-widest uppercase text-gray-500 font-mono">AUDIO OFF</span>
              </>
            )}
          </button>
        </nav>

        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={onToggleSound}
            className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white bg-white/5"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white bg-white/5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07090e]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-left text-sm font-semibold tracking-widest text-gray-200 hover:text-cyan-400 py-2 border-b border-white/5 uppercase font-mono"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
