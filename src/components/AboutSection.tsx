import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Zap } from 'lucide-react';

interface Skill {
  name: string;
  percent: number;
  level: string;
}

interface PersonalInfo {
  detailedBio: string;
}

interface AboutSectionProps {
  personalInfo: PersonalInfo;
  skillProgress: Skill[];
}

// Counts up percentages synchronously with progress bars
function ProgressPercent({ value, trigger, duration = 1.8, delay = 0 }: { value: number; trigger: boolean; duration?: number; delay?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setDisplayValue(0);
      return;
    }

    let startTimestamp: number | null = null;
    const totalDuration = duration * 1000;
    const delayMs = delay * 1000;

    const run = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percentage = Math.min(progress / totalDuration, 1);
      
      // easeOutQuart formula
      const ease = 1 - Math.pow(1 - percentage, 4);
      setDisplayValue(Math.floor(ease * value));

      if (percentage < 1) {
        requestAnimationFrame(run);
      } else {
        setDisplayValue(value);
      }
    };

    const timeout = setTimeout(() => {
      requestAnimationFrame(run);
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [trigger, value, duration, delay]);

  return <span>{displayValue}%</span>;
}

// Counts up from 0 to 428,500 with commas
function CountUpTraffic({ trigger, onComplete }: { trigger: boolean; onComplete: () => void }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setDisplayValue(0);
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 2000;

    const run = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percentage = Math.min(progress / duration, 1);
      
      // easeOutQuart
      const ease = 1 - Math.pow(1 - percentage, 4);
      setDisplayValue(Math.floor(ease * 428500));

      if (percentage < 1) {
        requestAnimationFrame(run);
      } else {
        setDisplayValue(428500);
        onComplete();
      }
    };

    const timeout = setTimeout(() => {
      requestAnimationFrame(run);
    }, 800);

    return () => clearTimeout(timeout);
  }, [trigger]);

  return <span className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">{displayValue.toLocaleString('en-US')}</span>;
}

// Types in character by character in green with text glow
function TypingText({ text, active }: { text: string; active: boolean }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayedText("");
      return;
    }

    let currentText = "";
    let i = 0;
    
    const interval = setInterval(() => {
      if (i < text.length) {
        currentText += text[i];
        setDisplayedText(currentText);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [active, text]);

  return (
    <span 
      className="font-mono text-[11px] text-emerald-400 font-bold block" 
      style={{ textShadow: '0 0 10px rgba(16,185,129,0.5)' }}
    >
      {displayedText}
    </span>
  );
}

// Individual Skill Row with Hover highlighting
function SkillRow({ skill, index, trigger }: { key?: React.Key; skill: Skill; index: number; trigger: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const fillDelay = 1.1 + index * 0.15;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-3 -mx-3 rounded-xl transition-all duration-300 flex flex-col gap-2.5"
      style={{
        background: isHovered ? 'rgba(230, 57, 70, 0.05)' : 'transparent'
      }}
    >
      <div className="flex justify-between items-center">
        <span className="text-[16px] font-bold text-white transition-colors duration-300">
          {skill.name}
        </span>
        <span className="font-mono text-[14px] text-[#e63946] font-bold">
          {skill.level} · <ProgressPercent value={skill.percent} trigger={trigger} delay={fillDelay} duration={1.8} />
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="h-[6px] bg-white/8 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={trigger ? { width: `${skill.percent}%` } : { width: 0 }}
          transition={{
            duration: 1.8,
            delay: fillDelay,
            ease: [0.25, 1, 0.5, 1] // easeOutQuart
          }}
          className="h-full relative rounded-full"
          style={{
            background: 'linear-gradient(90deg, #a4161a, #e63946, #ff6b6b)'
          }}
        >
          {/* Glowing tip leading edge */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full bg-white transition-all duration-300"
            style={{
              boxShadow: isHovered 
                ? '0 0 24px rgba(230, 57, 70, 1), 0 0 12px rgba(255, 255, 255, 1)' 
                : '0 0 16px rgba(230, 57, 70, 0.9)'
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function AboutSection({ personalInfo, skillProgress }: AboutSectionProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasInView, setHasInView] = useState(false);
  const [trafficCountComplete, setTrafficCountComplete] = useState(false);

  // IntersectionObserver setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 3D Tilt Card State
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch.current) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const cardCenterX = rect.width / 2;
    const cardCenterY = rect.height / 2;

    const rotateY = ((mouseX - cardCenterX) / rect.width) * 18;
    const rotateX = -((mouseY - cardCenterY) / rect.height) * 18;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsCardHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const words = [
    { text: "Data-Driven", highlight: true },
    { text: "Strategy", highlight: false },
    { text: "for", highlight: false },
    { text: "Real", highlight: true },
    { text: "Campaign", highlight: false },
    { text: "Growth", highlight: false }
  ];

  const barHeights = [25, 45, 38, 60, 75, 92];

  const cardTransformStyle = isCardHovered && !isTouch.current
    ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-8px) translateZ(30px)`
    : `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0px)`;

  return (
    <section
      ref={containerRef}
      id="about"
      className="section-container py-[80px] lg:py-[120px] px-6 relative bg-[#0d0d0d] overflow-hidden"
    >
      <div className="section-shutter-line" />
      <div className="section-bg-reveal" />
      <style>{`
        @keyframes greenBadgePulse {
          0%, 100% { box-shadow: 0 0 4px rgba(16, 185, 129, 0.2); border-color: rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 16px rgba(16, 185, 129, 0.65); border-color: rgba(16, 185, 129, 0.8); }
        }
        @keyframes radarScan {
          0% { top: 0%; opacity: 0.1; }
          50% { opacity: 0.4; }
          100% { top: 100%; opacity: 0.1; }
        }
        .animate-radar-scan {
          animation: radarScan 3s linear infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-[80px] items-center">
          
          {/* Left Column: 3D HUD Analytics Dashboard Card */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1 relative">
            <motion.div
              ref={cardRef}
              initial={{ x: -100, rotateY: -30, opacity: 0, scale: 0.9 }}
              animate={hasInView ? { x: 0, rotateY: 0, opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 1.0,
                ease: [0.34, 1.56, 0.64, 1] // overshoot bounce feel
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="w-full max-w-md p-6 rounded-2xl relative overflow-hidden transition-all duration-500"
              style={{
                transform: cardTransformStyle,
                transformStyle: 'preserve-3d',
                transition: isCardHovered ? 'none' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease, border-color 0.3s ease',
                willChange: 'transform',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderWidth: '1px',
                borderColor: isCardHovered ? 'rgba(230, 57, 70, 0.5)' : 'rgba(230, 57, 70, 0.3)',
                boxShadow: isCardHovered
                  ? '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(230,57,70,0.2)'
                  : '0 12px 30px rgba(0,0,0,0.35)'
              }}
            >
              {/* Radar Sweep Scanning Line */}
              <div 
                className="absolute left-0 right-0 h-[2px] bg-[#e63946] pointer-events-none animate-radar-scan"
                style={{
                  boxShadow: '0 0 8px #e63946'
                }}
              />

              {/* Background faint red glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-[40px] pointer-events-none" />

              {/* Card Header (Depth: translateZ(10px)) */}
              <div 
                className="flex items-center justify-between mb-6 pb-3 border-b border-white/5"
                style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center space-x-2">
                  <Flame size={14} className="text-red-500 animate-pulse" />
                  <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                    PERFORMANCE MAP
                  </span>
                </div>
                <span 
                  className="font-mono text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded uppercase transition-all duration-300"
                  style={{
                    animation: 'greenBadgePulse 2s infinite ease-in-out',
                    borderWidth: '1px'
                  }}
                >
                  Active 2026
                </span>
              </div>

              {/* Stats Visual Panel */}
              <div className="space-y-4">
                {/* Interactive Visual Graph Box (Depth: translateZ(25px)) */}
                <div 
                  className="p-4 bg-black/40 rounded-xl border border-white/5"
                  style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
                >
                  <span className="font-mono text-[8px] text-neutral-500 block uppercase mb-1">
                    AUDIENCE TRAFFIC ACQUISITION
                  </span>
                  
                  <div className="flex items-baseline space-x-1.5 mb-3 h-10">
                    {/* Count Up large number */}
                    <CountUpTraffic trigger={hasInView} onComplete={() => setTrafficCountComplete(true)} />
                    {/* Typwriter text */}
                    <TypingText text="▲ +85.2% Conversions" active={trafficCountComplete} />
                  </div>

                  {/* CSS-drawn high-end graph (Depth: translateZ(15px)) */}
                  <div 
                    className="h-16 flex items-end space-x-1.5 relative mt-2" 
                    style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}
                  >
                    <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/5 pointer-events-none" />
                    {barHeights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={hasInView ? { height: `${h}%` } : { height: 0 }}
                        transition={{
                          duration: 1.2,
                          delay: 0.8 + i * 0.1, // Stagger 100ms
                          ease: [0.25, 1, 0.5, 1]
                        }}
                        className="w-full bg-gradient-to-t from-[#a4161a] via-[#e63946] to-[#ff6b6b] rounded-sm"
                        style={{
                          boxShadow: '0 0 10px rgba(230, 57, 70, 0.25)'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Info grid (Depth: translateZ(20px)) */}
                <div 
                  className="grid grid-cols-2 gap-3"
                  style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
                >
                  <div className="p-3 bg-neutral-900/40 rounded border border-white/5">
                    <span className="font-mono text-[8px] text-neutral-500 block uppercase">CONVERSION ROAS</span>
                    <span className="font-mono font-bold text-xs text-white">4.8 Average</span>
                  </div>
                  <div className="p-3 bg-neutral-900/40 rounded border border-white/5">
                    <span className="font-mono text-[8px] text-neutral-500 block uppercase">ACQUISITION CHANNELS</span>
                    <span className="font-mono font-bold text-xs text-white">Meta / Google</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio & Animated Skills */}
          <div className="lg:col-span-7 max-w-[600px] w-full order-1 lg:order-2 flex flex-col justify-center">
            
            {/* Section Label */}
            <div className="flex items-center gap-3 overflow-hidden mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={hasInView ? { width: 32 } : { width: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-[2px] bg-[#e63946]"
              />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={hasInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-mono text-[13px] font-bold text-[#e63946] tracking-[6px] uppercase"
              >
                01 / PERFORMANCE PROFILE
              </motion.span>
            </div>

            {/* Main Title Word-by-Word Animation */}
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-[64px] text-white tracking-tight leading-[1.1] flex flex-wrap gap-x-3 mb-8">
              {words.map((w, idx) => (
                <span key={idx} className="relative overflow-hidden inline-block py-1">
                  <motion.span
                    initial={{ y: "100%", opacity: 0 }}
                    animate={hasInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + idx * 0.08,
                      ease: [0.23, 1, 0.32, 1] // cubic-bezier
                    }}
                    className={`inline-block ${
                      w.highlight 
                        ? 'text-[#e63946]' 
                        : 'text-white'
                    }`}
                    style={w.highlight ? { textShadow: '0 0 30px rgba(230,57,70,0.6)' } : {}}
                  >
                    {w.text}
                  </motion.span>
                </span>
              ))}
            </h2>

            {/* Bio Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={hasInView ? { opacity: 0.75, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="font-sans text-[19px] leading-[1.9] text-white/75 mb-[48px]"
            >
              {personalInfo.detailedBio}
            </motion.p>

            {/* Core Competencies Header */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={hasInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="inline-block"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={16} className="text-[#e63946] fill-[#e63946]/20 animate-pulse" />
                  <h3 className="font-display font-bold text-[14px] tracking-[4px] text-white uppercase">
                    CORE MARKETING COMPETENCIES
                  </h3>
                </div>
                <div className="h-[1px] bg-[#e63946] w-full" />
              </motion.div>

              {/* Staggered Skill Rows */}
              <div className="space-y-3">
                {skillProgress.map((skill, index) => (
                  <SkillRow 
                    key={index} 
                    skill={skill} 
                    index={index} 
                    trigger={hasInView} 
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
