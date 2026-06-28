import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Facebook, 
  TrendingUp, 
  BarChart3, 
  Sparkles, 
  Cloud, 
  FileSpreadsheet, 
  FileText,
  Laptop
} from 'lucide-react';

interface Tool {
  name: string;
  category: string;
}

interface TechStackSectionProps {
  tools: Tool[];
}

const toolMeta: Record<string, { icon: React.ComponentType<any>; categoryLabel: string; proficiency: number; label: string }> = {
  "Canva": {
    icon: Palette,
    categoryLabel: "DESIGN",
    proficiency: 95,
    label: "Canva"
  },
  "Meta Ads Manager": {
    icon: Facebook,
    categoryLabel: "PAID ADS",
    proficiency: 90,
    label: "Meta Ads"
  },
  "Google Ads": {
    icon: TrendingUp,
    categoryLabel: "PAID ADS",
    proficiency: 85,
    label: "Google Ads"
  },
  "Google Analytics": {
    icon: BarChart3,
    categoryLabel: "ANALYTICS",
    proficiency: 80,
    label: "Analytics"
  },
  "AI & Automation Tools": {
    icon: Sparkles,
    categoryLabel: "AI",
    proficiency: 88,
    label: "AI Tools"
  },
  "Google Workspace": {
    icon: Cloud,
    categoryLabel: "PRODUCTIVITY",
    proficiency: 92,
    label: "Workspace"
  },
  "Google Sheets": {
    icon: FileSpreadsheet,
    categoryLabel: "ANALYTICS",
    proficiency: 85,
    label: "Sheets"
  },
  "Notion": {
    icon: FileText,
    categoryLabel: "PRODUCTIVITY",
    proficiency: 78,
    label: "Notion"
  },
  "Professional Web Designing": {
    icon: Laptop,
    categoryLabel: "WEB DESIGN",
    proficiency: 90,
    label: "Web Design"
  }
};

const getToolMeta = (name: string) => {
  const matched = toolMeta[name];
  if (matched) return matched;
  
  const lowerName = name.toLowerCase();
  if (lowerName.includes("canva")) return { icon: Palette, categoryLabel: "DESIGN", proficiency: 95, label: name };
  if (lowerName.includes("meta") || lowerName.includes("facebook")) return { icon: Facebook, categoryLabel: "PAID ADS", proficiency: 90, label: "Meta Ads" };
  if (lowerName.includes("google ads")) return { icon: TrendingUp, categoryLabel: "PAID ADS", proficiency: 85, label: "Google Ads" };
  if (lowerName.includes("analytics")) return { icon: BarChart3, categoryLabel: "ANALYTICS", proficiency: 80, label: "Analytics" };
  if (lowerName.includes("ai") || lowerName.includes("automation")) return { icon: Sparkles, categoryLabel: "AI", proficiency: 88, label: "AI Tools" };
  if (lowerName.includes("workspace")) return { icon: Cloud, categoryLabel: "PRODUCTIVITY", proficiency: 92, label: "Workspace" };
  if (lowerName.includes("sheets")) return { icon: FileSpreadsheet, categoryLabel: "ANALYTICS", proficiency: 85, label: "Sheets" };
  if (lowerName.includes("notion")) return { icon: FileText, categoryLabel: "PRODUCTIVITY", proficiency: 78, label: "Notion" };
  if (lowerName.includes("web design") || lowerName.includes("web designing")) return { icon: Laptop, categoryLabel: "WEB DESIGN", proficiency: 90, label: "Web Design" };
  
  return { icon: Sparkles, categoryLabel: "TECH", proficiency: 80, label: name };
};

export default function TechStackSection({ tools }: TechStackSectionProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasInView, setHasInView] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [animateProficiency, setAnimateProficiency] = useState(false);

  // IntersectionObserver to trigger scroll entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle visibility API to pause animations when tab is inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Sync proficiency bar filling
  useEffect(() => {
    if (hasInView) {
      const timer = setTimeout(() => {
        setAnimateProficiency(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setAnimateProficiency(false);
    }
  }, [hasInView]);

  // Separate tools into row 1 (Primary) and row 2 (Standard)
  const row1Tools = tools.filter(t => {
    const n = t.name.toLowerCase();
    return n.includes("canva") || n.includes("meta") || n.includes("google ads");
  });
  
  const row2Tools = tools.filter(t => !row1Tools.some(r1 => r1.name === t.name));

  const words = "MY TECH ARSENAL".split(" ");

  return (
    <section
      ref={containerRef}
      id="tools"
      className="section-container relative min-h-[100vh] py-[80px] lg:py-[120px] px-6 md:px-8 bg-[#080808] overflow-hidden z-10 flex flex-col justify-center items-center"
    >
      <div className="section-shutter-line" />
      <div className="section-bg-reveal" />
      {/* Dynamic Keyframes Styling Injection */}
      <style>{`
        @keyframes breatheRed {
          0%, 100% {
            transform: translate(-5%, -5%) scale(1);
            opacity: 0.12;
          }
          50% {
            transform: translate(5%, 5%) scale(1.15);
            opacity: 0.16;
          }
        }
        @keyframes breathePurple {
          0%, 100% {
            transform: translate(5%, 5%) scale(1);
            opacity: 0.06;
          }
          50% {
            transform: translate(-5%, -5%) scale(1.12);
            opacity: 0.09;
          }
        }
        @keyframes floatShape {
          0% {
            transform: rotate(0deg) translate(0px, 0px);
          }
          50% {
            transform: rotate(180deg) translate(25px, -15px);
          }
          100% {
            transform: rotate(360deg) translate(0px, 0px);
          }
        }
        @keyframes scanLine {
          0% {
            transform: translateY(-20vh);
          }
          100% {
            transform: translateY(120vh);
          }
        }
        @keyframes dashFlow {
          to {
            stroke-dashoffset: -20;
          }
        }
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-dash-flow {
          stroke-dasharray: 6, 6;
          animation: dashFlow 1.2s linear infinite;
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>

      {/* Background breathing radial gradients */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          background: '#080808',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      >
        {/* Breathing red glow overlay */}
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#e63946] rounded-full blur-[140px]"
          style={{
            animation: 'breatheRed 12s ease-in-out infinite',
            animationPlayState: isTabVisible ? 'running' : 'paused'
          }}
        />
        {/* Breathing purple glow overlay */}
        <div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#6400c8] rounded-full blur-[150px]"
          style={{
            animation: 'breathePurple 15s ease-in-out infinite',
            animationPlayState: isTabVisible ? 'running' : 'paused'
          }}
        />

        {/* 3 or 4 very faint red horizontal scan lines */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#e63946]/5 to-transparent pointer-events-none"
            style={{
              top: `${i * 25}%`,
              animation: `scanLine 8s linear infinite`,
              animationDelay: `${i * 2}s`,
              animationPlayState: isTabVisible ? 'running' : 'paused'
            }}
          />
        ))}

        {/* Floating subtle geometric shapes outlines */}
        <div className="absolute inset-0 opacity-[0.04]">
          {/* Circle Outline */}
          <div 
            className="absolute w-24 h-24 rounded-full border border-[#e63946] top-20 left-12"
            style={{
              animation: 'floatShape 14s ease-in-out infinite',
              animationPlayState: isTabVisible ? 'running' : 'paused'
            }}
          />
          {/* Square Outline */}
          <div 
            className="absolute w-20 h-20 border border-[#e63946] bottom-32 left-1/5"
            style={{
              animation: 'floatShape 18s ease-in-out infinite',
              animationDelay: '2s',
              animationPlayState: isTabVisible ? 'running' : 'paused'
            }}
          />
          {/* Triangle Outline */}
          <svg 
            className="absolute w-16 h-16 top-1/3 right-12 text-[#e63946]" 
            viewBox="0 0 100 100"
            style={{
              animation: 'floatShape 16s ease-in-out infinite',
              animationDelay: '1s',
              animationPlayState: isTabVisible ? 'running' : 'paused'
            }}
          >
            <polygon points="50,15 90,85 10,85" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          {/* Circle Outline Right */}
          <div 
            className="absolute w-28 h-28 rounded-full border border-[#e63946] bottom-20 right-24"
            style={{
              animation: 'floatShape 20s ease-in-out infinite',
              animationDelay: '4s',
              animationPlayState: isTabVisible ? 'running' : 'paused'
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10 w-full flex flex-col items-center">
        
        {/* Section Heading Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          {/* Small label above */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={hasInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-mono text-xs font-bold text-[#e63946] tracking-[0.4em] uppercase block mb-4"
          >
            POWERED BY
          </motion.span>

          {/* Main Title: MY TECH ARSENAL with staggered sliding */}
          <motion.h2 
            className="font-display font-black text-5xl md:text-7xl text-white tracking-tight uppercase leading-none text-center flex flex-wrap justify-center gap-x-4 mb-6"
          >
            {words.map((word, wordIdx) => (
              <div key={wordIdx} className="relative overflow-hidden py-2 inline-block">
                {word === "ARSENAL" ? (
                  <span className="relative inline-block pb-2">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={hasInView ? { y: 0 } : { y: "100%" }}
                      transition={{
                        duration: 0.8,
                        delay: wordIdx * 0.15,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                    {/* Undeline drawing scaleX animation */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={hasInView ? { scaleX: 1 } : { scaleX: 0 }}
                      style={{ originX: 0 }}
                      transition={{
                        delay: 0.85,
                        duration: 0.8,
                        ease: "easeOut"
                      }}
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#e63946] shadow-[0_0_12px_rgba(230,57,70,0.85)]"
                    />
                  </span>
                ) : (
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={hasInView ? { y: 0 } : { y: "100%" }}
                    transition={{
                      duration: 0.8,
                      delay: wordIdx * 0.15,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="inline-block text-white"
                  >
                    {word}
                  </motion.span>
                )}
              </div>
            ))}
          </motion.h2>

          {/* Subheading below */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={hasInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-sans text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl text-center"
          >
            The exact platforms and tools I use to build, launch, and scale campaigns that deliver results.
          </motion.p>
        </div>

        {/* Interactive Constellation / Chart Layout */}
        <div className="relative w-full flex flex-col items-center">
          
          {/* Label Floating Above Primary Row */}
          {hasInView && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="font-mono text-[10px] font-bold text-[#e63946] tracking-[0.3em] uppercase mb-4"
            >
              ★ PRIMARY MARKETING ENGINES
            </motion.span>
          )}

          {/* Row 1 (Primary Tools) — Slightly Larger */}
          <div className="flex flex-wrap justify-center gap-[28px] z-10 w-full max-w-3xl px-4">
            {row1Tools.map((tool, idx) => (
              <ToolCard
                key={tool.name}
                tool={tool}
                index={idx}
                size="primary"
                hasInView={hasInView}
                isTabVisible={isTabVisible}
                animateProficiency={animateProficiency}
              />
            ))}
          </div>

          {/* SVG Tech Diagram Connection Lines (Visible on desktops) */}
          <div className="w-full max-w-5xl h-20 relative pointer-events-none z-0 flex justify-center items-center overflow-visible">
            <svg 
              className="w-full h-full overflow-visible text-[#e63946] hidden lg:block" 
              viewBox="0 0 1000 80" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {[
                "M 500,0 L 500,40 L 100,40 L 100,80",
                "M 500,0 L 500,40 L 300,40 L 300,80",
                "M 500,0 L 500,80",
                "M 500,0 L 500,40 L 700,40 L 700,80",
                "M 500,0 L 500,40 L 900,40 L 900,80"
              ].map((d, pathIdx) => (
                <motion.path
                  key={pathIdx}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={hasInView ? { pathLength: 1, opacity: 0.45 } : { pathLength: 0, opacity: 0 }}
                  transition={{ delay: 0.6, duration: 1.0, ease: "easeInOut" }}
                  d={d}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="6,6"
                  className="animate-dash-flow"
                  style={{ animationPlayState: isTabVisible ? 'running' : 'paused' }}
                />
              ))}
            </svg>
          </div>

          {/* Row 2 (Standard Tools) */}
          <div className="flex flex-wrap justify-center gap-[28px] z-10 w-full max-w-5xl mt-6 lg:mt-0 px-4">
            {row2Tools.map((tool, idx) => (
              <ToolCard
                key={tool.name}
                tool={tool}
                index={idx}
                size="standard"
                hasInView={hasInView}
                isTabVisible={isTabVisible}
                animateProficiency={animateProficiency}
              />
            ))}
          </div>

        </div>

        {/* Bottom of Section — Closing statement */}
        <div className="mt-28 text-center max-w-4xl mx-auto relative z-10 w-full">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display font-black text-2xl md:text-4xl text-white uppercase tracking-wider mb-4"
          >
            <span className="text-[#e63946]">ALWAYS</span> LEARNING. <span className="text-[#e63946]">ALWAYS</span> UPGRADING.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.7, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-sans text-base md:text-lg text-white max-w-2xl mx-auto mb-12"
          >
            New tools added as the industry evolves — because staying current is non-negotiable.
          </motion.p>

          {/* Infinite Scroll Ticker */}
          <div className="py-6 border-y border-[#e63946]/15 bg-black/60 overflow-hidden relative w-full select-none">
            <div 
              className="flex whitespace-nowrap animate-marquee"
              style={{ animationPlayState: isTabVisible ? 'running' : 'paused' }}
            >
              <div className="flex items-center gap-12 text-sm md:text-base font-mono text-white/40 tracking-widest uppercase pr-12">
                <span>Meta Ads</span> <span className="text-[#e63946] font-bold">·</span>
                <span>Google Ads</span> <span className="text-[#e63946] font-bold">·</span>
                <span>AI</span> <span className="text-[#e63946] font-bold">·</span>
                <span>SEO</span> <span className="text-[#e63946] font-bold">·</span>
                <span>Analytics</span> <span className="text-[#e63946] font-bold">·</span>
                <span>Canva</span> <span className="text-[#e63946] font-bold">·</span>
                <span>Automation</span> <span className="text-[#e63946] font-bold">·</span>
                <span>Funnels</span> <span className="text-[#e63946] font-bold">·</span>
                <span>Growth</span> <span className="text-[#e63946] font-bold">·</span>
              </div>
              <div className="flex items-center gap-12 text-sm md:text-base font-mono text-white/40 tracking-widest uppercase pr-12">
                <span>Meta Ads</span> <span className="text-[#e63946] font-bold">·</span>
                <span>Google Ads</span> <span className="text-[#e63946] font-bold">·</span>
                <span>AI</span> <span className="text-[#e63946] font-bold">·</span>
                <span>SEO</span> <span className="text-[#e63946] font-bold">·</span>
                <span>Analytics</span> <span className="text-[#e63946] font-bold">·</span>
                <span>Canva</span> <span className="text-[#e63946] font-bold">·</span>
                <span>Automation</span> <span className="text-[#e63946] font-bold">·</span>
                <span>Funnels</span> <span className="text-[#e63946] font-bold">·</span>
                <span>Growth</span> <span className="text-[#e63946] font-bold">·</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

interface ToolCardProps {
  key?: React.Key;
  tool: Tool;
  index: number;
  size: 'primary' | 'standard';
  hasInView: boolean;
  isTabVisible: boolean;
  animateProficiency: boolean;
}

function ToolCard({ tool, index, size, hasInView, isTabVisible, animateProficiency }: ToolCardProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches;
  }, []);

  const meta = getToolMeta(tool.name);
  const IconComponent = meta.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch.current) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalised coordinate mapping (-0.5 to 0.5)
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    // Maximum 20 degrees rotate on hover
    setTilt({
      rotateX: normY * -20,
      rotateY: normX * 20
    });
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Dimensions
  const cardWidthClass = size === 'primary' 
    ? 'w-[190px] h-[210px]' 
    : 'w-[160px] h-[180px]';

  // Elastic bounce staggering calculations
  const staggerDelay = size === 'primary' 
    ? 0.9 + index * 0.12 
    : 1.3 + index * 0.08;

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: size === 'primary' ? -60 : 60,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 12, // satisfying elastic overshoot bounce
        delay: staggerDelay
      }
    }
  };

  const transformStyle = isHovered && !isTouch.current
    ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-12px) translateZ(30px)`
    : `perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0px)`;

  return (
    <div className="relative">
      {/* Small Tooltip Appearing Above Card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.85 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
          >
            <div className="px-3 py-1 text-[11px] font-mono font-bold text-white bg-[#0e0e0e]/95 border border-[#e63946]/30 backdrop-blur-md rounded-full shadow-[0_4px_12px_rgba(230,57,70,0.25)] whitespace-nowrap">
              Proficiency: {meta.proficiency}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={cardRef}
        initial="hidden"
        animate={hasInView ? "visible" : "hidden"}
        variants={cardVariants}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`relative ${cardWidthClass} rounded-[20px] overflow-hidden group cursor-default select-none flex flex-col justify-between items-center transition-all duration-300`}
        style={{
          transform: transformStyle,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease, border-color 0.3s ease',
          willChange: 'transform',
          borderColor: isHovered ? 'rgba(230, 57, 70, 0.6)' : 'rgba(230, 57, 70, 0.2)',
          borderWidth: '1px',
          boxShadow: isHovered 
            ? '0 12px 30px rgba(0,0,0,0.65), 0 0 25px rgba(230, 57, 70, 0.45)' 
            : '0 4px 12px rgba(0,0,0,0.3)',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {/* Spotlight cursor sheen follow */}
        {isHovered && !isTouch.current && (
          <div
            className="absolute inset-0 pointer-events-none opacity-100 transition-opacity duration-300 z-0 rounded-[20px]"
            style={{
              background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(230, 57, 70, 0.15), transparent 85%)`
            }}
          />
        )}

        {/* Diagonal Light Shimmer Sweep */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px]">
          {isHovered && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e63946]/10 to-transparent skew-x-12"
              style={{
                background: 'linear-gradient(135deg, transparent 30%, rgba(230, 57, 70, 0.15) 50%, transparent 70%)',
                animationPlayState: isTabVisible ? 'running' : 'paused'
              }}
            />
          )}
        </div>

        {/* Card Header — Floating Icon with Dark Red Glow */}
        <div 
          className="relative mt-5 flex items-center justify-center"
          style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
        >
          {/* Circular Red Glow Behind */}
          <div className="absolute w-12 h-12 bg-[#e63946]/10 rounded-full blur-[8px] group-hover:scale-130 transition-transform duration-300" />
          
          <div className="text-[#e63946] group-hover:scale-110 transition-transform duration-300">
            <IconComponent size={38} className="stroke-[1.5]" />
          </div>
        </div>

        {/* Tool Name (Middle) */}
        <div 
          className="text-center px-3 z-10"
          style={{ transform: 'translateZ(25px)' }}
        >
          <h4 className="font-display font-bold text-[13px] md:text-sm text-white uppercase tracking-[0.15em]">
            {meta.label}
          </h4>
        </div>

        {/* Tool Category Tag (Bottom) */}
        <div 
          className="mb-5 z-10"
          style={{ transform: 'translateZ(10px)' }}
        >
          <span className="font-mono text-[9px] font-bold text-[#e63946] tracking-widest uppercase">
            {meta.categoryLabel}
          </span>
        </div>

        {/* Proficiency progress-bar at the very bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-900 overflow-hidden rounded-b-[20px]">
          <motion.div
            initial={{ width: "0%" }}
            animate={animateProficiency ? { width: `${meta.proficiency}%` } : { width: "0%" }}
            transition={{
              duration: 1.2,
              ease: [0.25, 1, 0.5, 1] // easeOutQuart
            }}
            className={`h-full bg-[#e63946] relative ${isHovered ? 'brightness-125' : ''}`}
            style={{
              boxShadow: isHovered ? '0 0 8px #e63946' : 'none'
            }}
          >
            {isHovered && (
              <motion.div
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute inset-0 bg-white/25"
              />
            )}
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
