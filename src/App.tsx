import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  ChevronRight, 
  Sparkles, 
  ExternalLink,
  Flame,
  Award,
  Globe,
  Monitor,
  Briefcase
} from 'lucide-react';

import GoldCursorTrail from './components/GoldCursorTrail';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import CountUpStat from './components/CountUpStat';
import ServiceCard from './components/ServiceCard';
import CaseStudyModal from './components/CaseStudyModal';
import TechStackSection from './components/TechStackSection';
import CampaignsBackground from './components/CampaignsBackground';
import CampaignCard from './components/CampaignCard';
import AboutSection from './components/AboutSection';
import Contact3DCard from './components/Contact3DCard';
import Vision3DCube from './components/Vision3DCube';
import KnowledgeVault from './components/KnowledgeVault';

// Animated Hero Components
import HeroBackground from './components/HeroBackground';
import ProfileHero from './components/ProfileHero';
import ScrollIndicator from './components/ScrollIndicator';
import ProfessionTyper from './components/ProfessionTyper';
import AvailableBadge from './components/AvailableBadge';
import ClientsBadge from './components/ClientsBadge';
import BudgetBadge from './components/BudgetBadge';

import { personalInfo, stats, services, caseStudies, tools, certifications } from './data';
import { CaseStudy } from './types';

function SectionDivider() {
  return (
    <div className="w-full h-[1px] relative overflow-hidden z-20 bg-transparent">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="w-full h-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(230,57,70,0.4) 20%, rgba(230,57,70,0.8) 50%, rgba(230,57,70,0.4) 80%, transparent 100%)',
          transformOrigin: 'center'
        }}
      />
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Meta Ads' | 'Google Ads' | 'SEO' | 'Branding'>('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);

  // Screen shake & shockwave feedback states
  const [isShaking, setIsShaking] = useState(false);
  const [clickShockwaves, setClickShockwaves] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const triggerFeedback = (e: React.MouseEvent<HTMLElement>) => {
    // 1. Shudder/shake screen
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 120);

    // 2. Generate local coordinates shockwave inside element
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newSW = { id: Date.now() + Math.random(), x, y };
    setClickShockwaves(prev => [...prev, newSW]);
    setTimeout(() => {
      setClickShockwaves(prev => prev.filter(item => item.id !== newSW.id));
    }, 600);
  };

  // Dynamic profile image with automatic extension probing & fallback
  const [profileImage, setProfileImage] = useState('/images/WhatsApp Image 2026-06-27 at 11.09.03 AM.jpeg');

  const handleProfileImageError = () => {
    if (profileImage === '/images/WhatsApp Image 2026-06-27 at 11.09.03 AM.jpeg') {
      setProfileImage('/WhatsApp Image 2026-06-27 at 11.09.03 AM.jpeg');
      return;
    }
    // Final elegant backup fallback to professional headshot from Unsplash
    setProfileImage('https://images.unsplash.com/photo-1624561172888-ac93c696e10c?auto=format&fit=crop&w=600&h=600&q=80');
  };

  // 1. Mouse coordinates as MotionValues
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Spring-smoothed values for lag-free cinematic motion inertia
  const springConfig = { stiffness: 55, damping: 18, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3. Normalized mouse update handler on the page container
  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize coordinates around zero [-0.5, 0.5]
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // 4. Transform mappings for precise parallax layers as requested
  const bgX = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);

  const titleX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const titleY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const portraitX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const portraitY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  const buttonsX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const buttonsY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  // 5. Scroll-linked reactive values
  const { scrollY } = useScroll();
  const textScrollY = useTransform(scrollY, [0, 600], [0, -110]); // Moves upward slower than the page
  const portraitScrollY = useTransform(scrollY, [0, 600], [0, -40]);
  const portraitScrollScale = useTransform(scrollY, [0, 600], [1, 0.88]); // Scales down slightly on scroll

  // Combined translations
  const combinedTextX = titleX;
  const combinedTextY = useTransform([titleY, textScrollY], ([tY, sY]) => (tY as number) + (sY as number));

  const combinedPortraitX = portraitX;
  const combinedPortraitY = useTransform([portraitY, portraitScrollY], ([pY, sY]) => (pY as number) + (sY as number));

  const combinedButtonsX = buttonsX;
  const combinedButtonsY = useTransform([buttonsY, textScrollY], ([bY, sY]) => (bY as number) + (sY as number));

  // Profile picture hover tracking
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  // Button magnet states for high-end feel
  const [btnCoords1, setBtnCoords1] = useState({ x: 0, y: 0 });
  const [btnCoords2, setBtnCoords2] = useState({ x: 0, y: 0 });
  const [isBtn1Hovered, setIsBtn1Hovered] = useState(false);
  const [isBtn2Hovered, setIsBtn2Hovered] = useState(false);
  const [btn1Magnet, setBtn1Magnet] = useState({ x: 0, y: 0 });
  const [btn2Magnet, setBtn2Magnet] = useState({ x: 0, y: 0 });

  const handleBtn1MouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBtnCoords1({ x, y });
    const magX = (x - rect.width / 2) * 0.15;
    const magY = (y - rect.height / 2) * 0.15;
    setBtn1Magnet({ x: magX, y: magY });
  };

  const handleBtn2MouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBtnCoords2({ x, y });
    const magX = (x - rect.width / 2) * 0.15;
    const magY = (y - rect.height / 2) * 0.15;
    setBtn2Magnet({ x: magX, y: magY });
  };

  // Force dark theme by default — always dark, no toggle needed
  useEffect(() => {
    setIsDarkMode(true);
    document.documentElement.classList.remove('light');
    // Storage note: theme is always dark; no localStorage needed since the
    // preference is never read back. Removed to minimize client-side storage footprint.
  }, []);

  // Scroll transition animations and Active navigation IntersectionObserver
  useEffect(() => {
    // A. One IntersectionObserver for Scroll Animation Triggers
    const isMobile = window.innerWidth < 768;
    const wordStagger = isMobile ? 56 : 80;
    const cardStagger = isMobile ? 63 : 90;

    /**
     * Security note: splitAndAnimateHeading reads h.textContent (trusted static DOM text
     * set by React) and writes back via innerHTML. The only variable injected is `word`,
     * which comes directly from textContent — it cannot contain HTML or event handlers.
     * NEVER pass user-supplied input here.
     */
    const splitAndAnimateHeading = (h: HTMLElement, wordStagger: number) => {
      if (h.children.length > 0 && !h.dataset.splitDone) return;
      if (!h.dataset.splitDone) {
        const text = h.textContent || '';
        const words = text.trim().split(/\s+/);
        h.innerHTML = words.map(word => {
          return `<span class="inline-block overflow-hidden py-1 mr-[0.25em] last:mr-0">
            <span class="section-word inline-block" style="transform: translateY(70px); opacity: 0; filter: blur(4px); will-change: transform, opacity, filter;">${word}</span>
          </span>`;
        }).join(' ');
        h.dataset.splitDone = 'true';
      }
      const wordSpans = h.querySelectorAll('.section-word');
      wordSpans.forEach((word, idx) => {
        const el = word as HTMLElement;
        const delay = 100 + idx * wordStagger;
        el.style.transition = 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1), filter 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
        el.style.transitionDelay = `${delay}ms`;
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
        el.style.filter = 'blur(0px)';
      });
    };

    const sections = document.querySelectorAll('.section-container');

    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target as HTMLElement;
          if (section.dataset.animated === 'true') return;
          section.dataset.animated = 'true';

          // 1. Shutter line horizontal flash
          const shutter = section.querySelector('.section-shutter-line');
          if (shutter) {
            shutter.classList.add('animate-shutter');
          }

          // 2. Background Reveal Glow
          const bgReveal = section.querySelector('.section-bg-reveal') as HTMLElement;
          if (bgReveal) {
            bgReveal.style.transition = 'opacity 1s ease-out';
            bgReveal.style.opacity = '1';
          }

          // 3. Section Label (Red labels above headings)
          const labels = section.querySelectorAll('.section-label');
          labels.forEach((label) => {
            const el = label as HTMLElement;
            el.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
            el.style.transform = 'translateX(0)';
            el.style.opacity = '1';
          });

          // 4. Section Heading Word-by-Word Reveal
          const headings = section.querySelectorAll('.section-heading');
          headings.forEach((heading) => {
            splitAndAnimateHeading(heading as HTMLElement, wordStagger);
          });

          // 5. Section Body Paragraphs
          const bodies = section.querySelectorAll('.section-body');
          bodies.forEach((body) => {
            const el = body as HTMLElement;
            el.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            el.style.transitionDelay = '400ms';
            el.style.transform = 'translateY(0)';
            el.style.opacity = '1';
          });

          // 6. Cards and Grid Items
          const cards = section.querySelectorAll('.grid-card-item');
          cards.forEach((card, idx) => {
            const el = card as HTMLElement;
            const delay = 500 + idx * cardStagger;
            el.style.transition = 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
            el.style.transitionDelay = `${delay}ms`;
            el.style.transform = 'translateY(0) scale(1)';
            el.style.opacity = '1';
          });

          // Stop observing once animated
          animObserver.unobserve(section);
        }
      });
    }, { threshold: 0.1 });

    sections.forEach((section) => animObserver.observe(section));

    // Backup Fallback: Trigger reveal animations for all sections after 1.5 seconds if they haven't run yet
    const backupTimeout = setTimeout(() => {
      sections.forEach((sec) => {
        const section = sec as HTMLElement;
        if (section.dataset.animated === 'true') return;
        section.dataset.animated = 'true';

        // 1. Shutter line horizontal flash
        const shutter = section.querySelector('.section-shutter-line');
        if (shutter) {
          shutter.classList.add('animate-shutter');
        }

        // 2. Background Reveal Glow
        const bgReveal = section.querySelector('.section-bg-reveal') as HTMLElement;
        if (bgReveal) {
          bgReveal.style.transition = 'opacity 1s ease-out';
          bgReveal.style.opacity = '1';
        }

        // 3. Section Label
        const labels = section.querySelectorAll('.section-label');
        labels.forEach((label) => {
          const el = label as HTMLElement;
          el.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
          el.style.transform = 'translateX(0)';
          el.style.opacity = '1';
        });

        // 4. Section Heading
        const headings = section.querySelectorAll('.section-heading');
        headings.forEach((heading) => {
          splitAndAnimateHeading(heading as HTMLElement, wordStagger);
        });

        // 5. Section Body
        const bodies = section.querySelectorAll('.section-body');
        bodies.forEach((body) => {
          const el = body as HTMLElement;
          el.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
          el.style.transitionDelay = '400ms';
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
        });

        // 6. Cards and Grid Items
        const cards = section.querySelectorAll('.grid-card-item');
        cards.forEach((card, idx) => {
          const el = card as HTMLElement;
          const delay = 500 + idx * cardStagger;
          el.style.transition = 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
          el.style.transitionDelay = `${delay}ms`;
          el.style.transform = 'translateY(0) scale(1)';
          el.style.opacity = '1';
        });

        animObserver.unobserve(section);
      });
    }, 1500);

    // B. Active Section Navigation Observer (threshold 0.4)
    const navSections = ['home', 'about', 'services', 'campaigns', 'certificates', 'contact']
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      root: null,
      rootMargin: '-80px 0px 0px 0px', // Header offset
      threshold: 0.4
    });

    navSections.forEach((section) => navObserver.observe(section));

    // C. Custom Smooth-Scroll link click interceptor
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        const targetId = anchor.hash.slice(1);
        const element = document.getElementById(targetId);
        if (element) {
          e.preventDefault();
          const offset = 80; // height of fixed navbar
          const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
          
          const smoothScrollTo = (targetY: number, duration: number = 800) => {
            const startY = window.scrollY;
            const difference = targetY - startY;
            const startTime = performance.now();

            const easeOutQuart = (t: number) => 1 - (--t) * t * t * t;

            const step = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const ease = easeOutQuart(progress);
              window.scrollTo(0, startY + difference * ease);

              if (progress < 1) {
                requestAnimationFrame(step);
              }
            };

            requestAnimationFrame(step);
          };

          smoothScrollTo(targetY, 800);
          setActiveSection(targetId);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      clearTimeout(backupTimeout);
      sections.forEach((section) => animObserver.unobserve(section));
      navSections.forEach((section) => navObserver.unobserve(section));
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [isLoading]);

  // Local Mouse offsets for spotlight cursor card tracking
  const handleLuxuryCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  // Filtered case studies
  const filteredCaseStudies = selectedCategory === 'All'
    ? caseStudies
    : caseStudies.filter(cs => cs.category === selectedCategory);

  const skillProgress = [
    { name: "Meta Ads (Facebook & Instagram)", percent: 98, level: "Expert" },
    { name: "Google Search & YouTube Campaigns", percent: 95, level: "Expert" },
    { name: "Conversion Rate Optimization (CRO)", percent: 92, level: "Advanced" },
    { name: "Search Engine Optimization (SEO)", percent: 90, level: "Advanced" },
    { name: "Funnel Building & Landing Pages", percent: 88, level: "Advanced" }
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 relative bg-noise ${
      isDarkMode ? 'bg-[#080808] text-white' : 'bg-[#fafafa] text-neutral-900'
    } ${isShaking ? 'animate-hud-shake' : ''}`}>
      {/* Custom Mouse Cursor Trail */}
      <GoldCursorTrail />

      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Top Sticky Navigation */}
          <Navbar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
          />

          {/* 1. HERO SECTION */}
          <section
            id="home"
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
            className="section-container relative min-h-screen flex items-center justify-center py-[80px] lg:py-[120px] px-6 overflow-hidden bg-[#080808] select-none"
          >
            <div className="section-shutter-line" />
            <div className="section-bg-reveal" />
            {/* Ambient Background & Particles with horizontal shifting grid */}
            <HeroBackground
              mouseX={mouseX}
              mouseY={mouseY}
              scrollY={scrollY}
              introFinished={!isLoading}
            />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Hero Contents (Left column) */}
              <motion.div
                style={{ x: combinedTextX, y: combinedTextY }}
                className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left z-20"
              >
                {/* Visual Status Badges stacked cleanly */}
                <div className="section-label flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
                  <AvailableBadge />
                  <ClientsBadge />
                </div>

                {/* Massive Bold Full Name - Letter by letter rise with blur-to-sharp & reflection */}
                <h1 className="section-heading font-display font-black text-5xl sm:text-8xl xl:text-[6.5rem] 2xl:text-[7.5rem] tracking-tighter text-white leading-[0.85] mb-4 uppercase">
                  {"CHANDAN".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ y: "45%", opacity: 0, filter: "blur(8px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{
                        delay: 2.5 + index * 0.08,
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                  <br/>
                  <motion.span
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 3.4, duration: 1.0, ease: "easeOut" }}
                    className="text-[#e63946] relative inline-block"
                    style={{ textShadow: "0 0 25px rgba(230, 57, 70, 0.15)" }}
                  >
                    MAHANTY
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ delay: 4.2, duration: 1.6, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none mix-blend-overlay"
                    />
                  </motion.span>
                </h1>

                {/* Aesthetic Divider Line */}
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 3.8, duration: 0.8, ease: "easeOut" }}
                  className="h-[2px] w-24 bg-[#e63946] my-6 mx-auto lg:mx-0 shadow-[0_0_8px_#e63946]"
                />

                {/* Profession & Budget Badge */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
                  <ProfessionTyper />
                  <BudgetBadge />
                </div>

                {/* Short Intro bio with soft blur fade-up */}
                <motion.p
                  initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 4.6, duration: 1.0, ease: "easeOut" }}
                  className="section-body font-sans text-base sm:text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed italic"
                >
                  &ldquo;{personalInfo.shortBio}&rdquo;
                </motion.p>

                {/* Action Buttons with Magnet Spotlight and Parallax */}
                <motion.div
                  style={{ x: combinedButtonsX, y: combinedButtonsY }}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                >
                  {/* View my work */}
                  <motion.a
                    href="#campaigns"
                    onClick={triggerFeedback}
                    initial={{ y: 20, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: 5.0, type: "spring", stiffness: 85, damping: 14 }}
                    onMouseMove={handleBtn1MouseMove}
                    onMouseEnter={() => setIsBtn1Hovered(true)}
                    onMouseLeave={() => { setIsBtn1Hovered(false); setBtn1Magnet({ x: 0, y: 0 }); }}
                    style={{
                      transform: isBtn1Hovered ? `translate(${btn1Magnet.x}px, ${btn1Magnet.y}px) scale(1.02)` : 'translate(0px, 0px) scale(1)',
                      transition: isBtn1Hovered ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className="relative overflow-hidden w-full sm:w-auto px-8 py-4 bg-[#e63946] text-white font-display text-xs tracking-widest font-bold rounded uppercase flex items-center justify-center gap-2 group transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(230,57,70,0.5)] active:scale-95"
                  >
                    {clickShockwaves.map(sw => (
                      <span
                        key={sw.id}
                        className="shockwave-ring"
                        style={{ left: sw.x, top: sw.y }}
                      />
                    ))}
                    VIEW MY WORK
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight size={13} />
                    </motion.span>

                    {/* Continuous glossy light sweep every few seconds */}
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        repeat: Infinity,
                        repeatDelay: 3.5,
                        duration: 1.5,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                    />

                    {/* Magnet spotlight cursor follower overlay */}
                    {isBtn1Hovered && (
                      <span
                        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_40px_at_var(--x)_var(--y),rgba(255,255,255,0.2),transparent_100%)]"
                        style={{
                          '--x': `${btnCoords1.x}px`,
                          '--y': `${btnCoords1.y}px`,
                        } as any}
                      />
                    )}
                  </motion.a>

                  {/* WhatsApp me */}
                  <motion.a
                    href={`https://wa.me/91${personalInfo.whatsappNumber}?text=Hi%20Chandan,%20I'd%20love%20to%20collaborate%20on%20digital%20marketing%2521`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={triggerFeedback}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 5.2, duration: 0.6 }}
                    onMouseMove={handleBtn2MouseMove}
                    onMouseEnter={() => setIsBtn2Hovered(true)}
                    onMouseLeave={() => { setIsBtn2Hovered(false); setBtn2Magnet({ x: 0, y: 0 }); }}
                    style={{
                      transform: isBtn2Hovered ? `translate(${btn2Magnet.x}px, ${btn2Magnet.y}px) scale(1.02)` : 'translate(0px, 0px) scale(1)',
                      transition: isBtn2Hovered ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className="relative overflow-hidden w-full sm:w-auto px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-display text-xs tracking-widest font-bold rounded uppercase flex items-center justify-center gap-2 transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                  >
                    {clickShockwaves.map(sw => (
                      <span
                        key={sw.id}
                        className="shockwave-ring"
                        style={{ left: sw.x, top: sw.y }}
                      />
                    ))}
                    💬 WHATSAPP ME

                    {/* Magnet spotlight cursor follower overlay */}
                    {isBtn2Hovered && (
                      <span
                        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_40px_at_var(--x)_var(--y),rgba(255,255,255,0.15),transparent_100%)]"
                        style={{
                          '--x': `${btnCoords2.x}px`,
                          '--y': `${btnCoords2.y}px`,
                        } as any}
                      />
                    )}
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Profile Photo with Glow & Orbits (Right column) */}
              <div className="lg:col-span-5 flex justify-center relative z-20">
                <ProfileHero
                  profileImage={profileImage}
                  onError={handleProfileImageError}
                  isHovered={isProfileHovered}
                  setIsHovered={setIsProfileHovered}
                  scrollY={scrollY}
                  portraitX={combinedPortraitX}
                  portraitY={combinedPortraitY}
                />
              </div>

            </div>

            {/* Scroll down indicator at bottom center */}
            <ScrollIndicator />
          </section>

          <SectionDivider />

          {/* 2. ABOUT SECTION */}
          <AboutSection personalInfo={personalInfo} skillProgress={skillProgress} />

          <SectionDivider />

          {/* 3. VISION STATEMENT SECTION (Manifesto) */}
          <section
            className="section-container py-[80px] lg:py-[120px] px-6 bg-[#080808] relative overflow-hidden text-center flex flex-col items-center justify-center border-y border-white/10"
          >
            <div className="section-shutter-line" />
            <div className="section-bg-reveal" />
            {/* Glowing Red Background Backdrop */}
            <div className="absolute w-[450px] h-[450px] bg-[#e63946]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="section-label inline-flex items-center space-x-2 bg-[#e63946]/10 border border-[#e63946]/20 px-4 py-1.5 rounded-full mb-6"
              >
                <Award size={13} className="text-[#e63946]" />
                <span className="font-mono text-[9px] font-bold text-[#e63946] tracking-widest uppercase">
                  VISION MANIFESTO
                </span>
              </motion.div>

              {/* Interactive 3D rotating quote display for the Vision Manifesto section */}
              <Vision3DCube />

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="w-20 h-[2px] bg-[#e63946] mx-auto"
              />
            </div>
          </section>

          <SectionDivider />

          {/* 4. STATS & ACHIEVEMENTS SECTION */}
          <section
            id="stats"
            className="section-container py-[80px] lg:py-[120px] px-6 md:px-8 relative overflow-hidden bg-[#0d0d0d]"
          >
            <div className="section-shutter-line" />
            <div className="section-bg-reveal" />
            {/* Background luxury technology atmosphere */}
            <div 
              className="absolute inset-0 overflow-hidden pointer-events-none z-0"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(230, 57, 70, 0.08) 0%, #000000 70%)'
              }}
            >
              {/* Luxury ambient glow & Low-opacity animated gradient (meshSlowAnim & meshMediumAnim) */}
              <div className="absolute top-1/4 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#e63946]/5 rounded-full blur-[120px] pointer-events-none animate-mesh-slow" />
              <div className="absolute bottom-1/4 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none animate-mesh-medium" />

              {/* Moving soft light rays */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#e63946]/2 to-transparent opacity-35 animate-pulse" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              {/* Glowing Accent Line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-24 h-[2px] bg-[#e63946] mx-auto mb-8 origin-center shadow-[0_0_12px_rgba(230,57,70,0.85)] relative z-10"
              />

              <div className="text-center max-w-3xl mx-auto mb-[64px] px-4">
                {/* Subtitle "PERFORMANCE IN NUMBERS" centered & styled */}
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className="section-label font-mono text-xs font-bold text-[#e63946] tracking-[0.25em] uppercase block mb-5 text-center"
                >
                  PERFORMANCE IN NUMBERS
                </motion.span>

                {/* Heading "MILESTONES OF SUCCESS" with clamp size & word-split wrapping fix */}
                <div className="relative inline-block overflow-hidden py-1 mb-5">
                  <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.04,
                          delayChildren: 0.25
                        }
                      }
                    }}
                    style={{ fontSize: 'clamp(32px, 6vw, 80px)', wordBreak: 'keep-all' }}
                    className="section-heading font-display font-black text-white tracking-tight uppercase leading-none text-center text-3xl sm:text-5xl md:text-7xl lg:text-8xl"
                  >
                    {"MILESTONES OF SUCCESS".split(" ").map((word, wIdx) => (
                      <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.3em] last:mr-0">
                        {word.split("").map((char, index) => (
                          <motion.span
                            key={index}
                            variants={{
                              hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
                              visible: {
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                              }
                            }}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    ))}
                  </motion.h2>

                  {/* Soft white glow briefly passing across */}
                  <motion.div
                    initial={{ left: "-100%" }}
                    whileInView={{ left: "200%" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 1.1, duration: 1.5, ease: "easeInOut" }}
                    className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none mix-blend-overlay"
                  />
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.7 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="section-body font-sans text-[18px] text-neutral-300 leading-[1.8] max-w-[560px] mx-auto text-center"
                >
                  A high-level view of audited, conversion-verified results achieved for clients over 3 years.
                </motion.p>
              </div>

              {/* Stats Grid with 28px gap */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[28px] mt-0">
                {stats.map((stat, index) => (
                  <CountUpStat
                    key={stat.id}
                    id={stat.id}
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    description={stat.description}
                    accent={stat.accent}
                    iconName={stat.iconName}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* 5. SERVICES SECTION */}
          <section
            id="services"
            className="section-container py-[80px] lg:py-[120px] px-6 md:px-8 relative bg-[#080808]"
          >
            <div className="section-shutter-line" />
            <div className="section-bg-reveal" />
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-[64px] px-4">
                <span className="section-label font-mono text-xs font-bold text-[#e63946] tracking-[0.25em] uppercase block mb-5 text-center">
                  ADS / MARKETING CAPABILITIES
                </span>
                <h2 
                  style={{ fontSize: 'clamp(32px, 6vw, 80px)', wordBreak: 'keep-all', textAlign: 'center', textWrap: 'balance', whiteSpace: 'normal' }}
                  className="section-heading font-display font-black text-white tracking-tight leading-[1.1] mb-5 text-center uppercase text-3xl sm:text-5xl md:text-7xl lg:text-8xl"
                >
                  <span className="whitespace-nowrap">HIGH-PERFORMANCE</span>
                  <br className="sm:hidden" />{" "}
                  <span className="whitespace-nowrap">SOLUTIONS</span>
                </h2>
                <p className="section-body font-sans text-[18px] text-neutral-300 leading-[1.8] max-w-[560px] mx-auto text-center">
                  Each service is designed and scaled as a direct revenue builder, never a passive marketing cost.
                </p>
              </div>

              {/* Services Grid with 3D Interaction & 28px Gap */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[28px] mt-0">
                {services.map((service, index) => (
                  <div key={service.id} className="grid-card-item">
                    <ServiceCard
                      service={service}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5.5 INFINITE HORIZONTAL MARQUEE TICKER (Brutalist Swiss Marketing Accent) */}
          <div className="py-8 bg-[#0d0d0d] border-y border-white/5 overflow-hidden relative pointer-events-none select-none">
            {/* Forward Marquee */}
            <div className="flex whitespace-nowrap overflow-hidden mb-4">
              <div className="animate-marquee flex space-x-12 text-xs sm:text-sm font-mono tracking-[0.3em] font-extrabold uppercase text-white/40">
                <span>META ADS PARTNER •</span>
                <span className="text-[#e63946]">GOOGLE ADS CERTIFIED •</span>
                <span>ROAS MAXIMIZATION •</span>
                <span>AUDITED CONVERSIONS •</span>
                <span className="text-[#e63946]">LANDING PAGE OPTIMIZATION •</span>
                <span>ADVANCED FUNNEL DESIGN •</span>
                <span>GROWTH HACKING •</span>
                <span className="text-[#e63946]">DATA-DRIVEN STRATEGY •</span>
                <span>LEAD GENERATION •</span>
                <span>CONVERSION RATE OPTIMIZATION •</span>
              </div>
              <div className="animate-marquee flex space-x-12 text-xs sm:text-sm font-mono tracking-[0.3em] font-extrabold uppercase text-white/40" aria-hidden="true">
                <span>META ADS PARTNER •</span>
                <span className="text-[#e63946]">GOOGLE ADS CERTIFIED •</span>
                <span>ROAS MAXIMIZATION •</span>
                <span>AUDITED CONVERSIONS •</span>
                <span className="text-[#e63946]">LANDING PAGE OPTIMIZATION •</span>
                <span>ADVANCED FUNNEL DESIGN •</span>
                <span>GROWTH HACKING •</span>
                <span className="text-[#e63946]">DATA-DRIVEN STRATEGY •</span>
                <span>LEAD GENERATION •</span>
                <span>CONVERSION RATE OPTIMIZATION •</span>
              </div>
            </div>

            {/* Reverse Marquee */}
            <div className="flex whitespace-nowrap overflow-hidden">
              <div className="animate-marquee-reverse flex space-x-12 text-xs sm:text-sm font-mono tracking-[0.3em] font-extrabold uppercase text-white/20">
                <span>SCALING REVENUE •</span>
                <span className="text-blue-500">ROAS DRIVEN •</span>
                <span>AUDITED CASE STUDIES •</span>
                <span>HIGH INTENT LEADS •</span>
                <span className="text-blue-500">CONVERSION EXPERT •</span>
                <span>CREATIVE STRATEGY •</span>
                <span>BUDGET EFFICIENCY •</span>
                <span className="text-blue-500">A/B TESTING CHAMPION •</span>
                <span>FRACTAL SCALE ENGINE •</span>
                <span>METRICS AUDITED •</span>
              </div>
              <div className="animate-marquee-reverse flex space-x-12 text-xs sm:text-sm font-mono tracking-[0.3em] font-extrabold uppercase text-white/20" aria-hidden="true">
                <span>SCALING REVENUE •</span>
                <span className="text-blue-500">ROAS DRIVEN •</span>
                <span>AUDITED CASE STUDIES •</span>
                <span>HIGH INTENT LEADS •</span>
                <span className="text-blue-500">CONVERSION EXPERT •</span>
                <span>CREATIVE STRATEGY •</span>
                <span>BUDGET EFFICIENCY •</span>
                <span className="text-blue-500">A/B TESTING CHAMPION •</span>
                <span>FRACTAL SCALE ENGINE •</span>
                <span>METRICS AUDITED •</span>
              </div>
            </div>
          </div>

          <SectionDivider />

          {/* 6. FEATURED CAMPAIGNS (PORTFOLIO) */}
          <section
            id="campaigns"
            className="section-container py-[80px] lg:py-[120px] lg:px-[60px] px-6 relative bg-[#0d0d0d] overflow-hidden"
          >
            <div className="section-shutter-line" />
            <div className="section-bg-reveal" />
            <CampaignsBackground />
            <div className="max-w-7xl mx-auto">
              
              {/* Heading */}
              <div className="flex flex-col gap-12 mb-12">
                <div>
                  {/* Subtitle with typewriter reveal */}
                  <span className="section-label font-mono text-xs font-bold text-[#e63946] tracking-[0.25em] uppercase block mb-3">
                    {"04 / PROVEN HISTORY".split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.1 + i * 0.03,
                          ease: "easeOut"
                        }}
                        className="inline-block"
                        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  
                  {/* Word-by-Word Slide Up Heading with 120ms stagger & blur reveal */}
                  <div className="relative py-1">
                    <h2 className="section-heading font-display font-black text-4xl sm:text-6xl md:text-[80px] text-white tracking-tight leading-[1.0] flex flex-wrap gap-x-4">
                      {["Featured", "Campaigns"].map((word, idx) => (
                        <span key={idx} className="relative overflow-hidden inline-block py-1">
                          <motion.span
                            initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
                            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                              duration: 0.8,
                              delay: idx * 0.12,
                              ease: [0.23, 1, 0.32, 1]
                            }}
                            className="inline-block"
                          >
                            {word}
                          </motion.span>
                        </span>
                      ))}
                    </h2>
                  </div>

                  {/* Elegant Subheading */}
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 0.6, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="section-body font-sans text-base md:text-[18px] text-white/60 mt-4 max-w-2xl"
                  >
                    A curated selection of real campaigns, real strategies, and real results.
                  </motion.p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                  {(['All', 'Meta Ads', 'Google Ads', 'SEO', 'Branding'] as const).map((cat, i) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <motion.button
                        key={cat}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.3 + i * 0.08,
                          ease: "easeOut"
                        }}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2.5 rounded-full text-[14px] font-mono tracking-[2px] uppercase transition-all duration-300 relative border ${
                          isSelected
                            ? 'bg-[#e63946] border-[#e63946] text-white font-bold shadow-[0_0_20px_rgba(230,57,70,0.4)]'
                            : 'bg-transparent border-white/20 hover:border-[#e63946] hover:text-[#e63946] text-white/60'
                        }`}
                      >
                        {cat}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Masonry-style Grid with 3D Perspective */}
              <div style={{ perspective: '1000px' }}>
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[28px]"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredCaseStudies.map((cs, idx) => (
                      <CampaignCard
                        key={cs.id}
                        cs={cs}
                        index={idx}
                        onClick={() => setActiveCaseStudy(cs)}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Lightbox / Case Study Modal */}
              <AnimatePresence>
                {activeCaseStudy && (
                  <CaseStudyModal
                    campaign={activeCaseStudy}
                    onClose={() => setActiveCaseStudy(null)}
                  />
                )}
              </AnimatePresence>

            </div>
          </section>

          {/* 7. TOOLS & TECH SECTION */}
          <TechStackSection tools={tools} />

          <SectionDivider />

          {/* 8. CERTIFICATIONS / KNOWLEDGE VAULT */}
          <KnowledgeVault certifications={certifications} />

          <SectionDivider />

          {/* 9. CONTACT SECTION */}
          <section
            id="contact"
            className="relative py-[100px] lg:py-[140px] px-6 overflow-hidden bg-[#0a0a0a]"
          >
            {/* Subtle radial red glow in the center */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.15)_0%,transparent_70%)] pointer-events-none z-0" />
            
            {/* Grid-dot background layer (subtle, very low opacity) */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
              style={{
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative max-w-7xl mx-auto z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                {/* Section label in spaced uppercase red small caps */}
                <span className="text-[#e63946] text-xs font-bold tracking-[0.3em] uppercase block mb-4 font-mono">
                  06 / COLLABORATE
                </span>
                
                {/* Giant bold heading: 72-96px on desktop, extra-bold with text shadow */}
                <h2 
                  className="font-display font-black text-4xl sm:text-6xl lg:text-[80px] text-white tracking-tight leading-[1.1] mb-6"
                  style={{ textShadow: '0 4px 30px rgba(230, 57, 70, 0.3)' }}
                >
                  Let's Grow Your Brand
                </h2>

                {/* 3D Floating Rocket */}
                <div className="flex justify-center mb-6">
                  <span className="text-6xl sm:text-7xl select-none animate-rocket-float block">🚀</span>
                </div>

                {/* Subtext paragraph */}
                <p className="font-sans text-sm sm:text-base text-neutral-400 max-w-[600px] mx-auto leading-relaxed">
                  Reach out directly to organize a discovery session, audit existing campaign layouts, or schedule high-impact Meta/Google Ads setups.
                </p>
              </div>

              {/* 3D Contact Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <Contact3DCard
                  type="phone"
                  label="Phone Direct"
                  value={`+91 ${personalInfo.phone}`}
                  href={`tel:+91${personalInfo.phone}`}
                  index={0}
                />
                <Contact3DCard
                  type="email"
                  label="Email Address"
                  value={personalInfo.email}
                  href={`mailto:${personalInfo.email}`}
                  index={1}
                />
                <Contact3DCard
                  type="linkedin"
                  label="LinkedIn Connect"
                  value="chandan-mahanty"
                  href={personalInfo.linkedin}
                  index={2}
                />
                <Contact3DCard
                  type="location"
                  label="Location Base"
                  value={personalInfo.location}
                  index={3}
                />
              </div>

              {/* Social row */}
              <div className="flex items-center justify-center space-x-3 pt-14">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:border-red-500 hover:text-red-500 hover:scale-105 transition-all duration-300 bg-neutral-950 text-neutral-400"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="py-12 px-6 border-t border-white/5 bg-[#080808] text-center relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Branding */}
              <div className="text-left">
                <p className="font-display font-extrabold text-sm tracking-widest text-white">
                  CM PORTFOLIO
                </p>
                <p className="font-mono text-[9px] text-neutral-500 mt-1">
                  &copy; {new Date().getFullYear()} Chandan Mahanty • All Campaign Rights Reserved.
                </p>
              </div>

              {/* Quick links to anchors */}
              <div className="flex items-center space-x-6">
                <a href="#home" className="font-mono text-[9px] text-neutral-400 hover:text-white uppercase tracking-wider">TOP</a>
                <a href="#about" className="font-mono text-[9px] text-neutral-400 hover:text-white uppercase tracking-wider">ABOUT</a>
                <a href="#services" className="font-mono text-[9px] text-neutral-400 hover:text-white uppercase tracking-wider">SERVICES</a>
                <a href="#campaigns" className="font-mono text-[9px] text-neutral-400 hover:text-white uppercase tracking-wider">PORTFOLIO</a>
                <a href="#contact" className="font-mono text-[9px] text-neutral-400 hover:text-white uppercase tracking-wider">CONTACT</a>
              </div>

            </div>
          </footer>

          {/* Always Visible Floating Sticky WhatsApp Chat Button */}
          <WhatsAppButton />
        </>
      )}
    </div>
  );
}
