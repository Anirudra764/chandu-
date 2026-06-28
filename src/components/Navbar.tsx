import React, { useState, useEffect } from 'react';
import { Menu, X, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  setActiveSection?: (section: string) => void;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Campaigns', href: '#campaigns' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.slice(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of fixed navbar
      const yOffset = -offset;
      const y = element.getBoundingClientRect().top + (window.pageYOffset || window.scrollY) + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });

      if (setActiveSection) {
        setActiveSection(targetId);
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      id="main-nav"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'py-3 bg-black/95 backdrop-blur-xl shadow-lg border-b border-white/10'
          : 'py-5 bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo and Brand */}
        <a href="#home" className="flex items-center space-x-3 group animate-logo-float relative">
          <motion.div
            animate={{
              filter: [
                "drop-shadow(0 0 0px rgba(230, 57, 70, 0))",
                "drop-shadow(0 0 10px rgba(230, 57, 70, 0.75))",
                "drop-shadow(0 0 0px rgba(230, 57, 70, 0))"
              ]
            }}
            transition={{ delay: 1.5, duration: 1.0 }}
            className="flex items-center space-x-3 relative overflow-hidden py-1 px-2 rounded"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-display font-black tracking-tighter text-white">
              CM<span className="text-[#e63946]">.</span>
            </div>
            <div className="flex flex-col border-l-2 border-white/20 pl-3">
              <span className="font-display font-black text-[10px] sm:text-xs md:text-sm tracking-[0.22em] text-white/90 transition-colors duration-300">
                CHANDAN MAHANTY
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] md:text-[10px] text-[#e63946] tracking-[0.25em] font-bold">
                META ADS PARTNER
              </span>
            </div>

            {/* Apple-style soft light sweep */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ delay: 1.5, duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
            />
          </motion.div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-8 text-[11px] uppercase tracking-[0.2em] font-semibold">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <motion.li
                  key={link.name}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative font-sans transition-colors duration-300 ${
                      isActive
                        ? 'text-[#e63946]'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#e63946]"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Mobile menu */}
        <div className="flex items-center md:hidden space-x-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 sm:p-3 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg border border-white/10 transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer relative z-[101]"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X size={22} className="text-white" />
            ) : (
              <div className="flex items-center gap-1.5">
                <Menu size={22} className="text-neutral-300" />
                <div className="w-[1px] h-4 bg-white/20" />
                <MoreVertical size={20} className="text-[#e63946] animate-pulse" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-2xl overflow-hidden"
          >
            <ul className="px-6 py-6 space-y-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`block font-sans text-xs font-semibold tracking-widest uppercase py-3 px-3 rounded-lg transition-colors ${
                        isActive
                          ? 'text-[#e63946] bg-[#e63946]/10'
                          : 'text-white/75 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
