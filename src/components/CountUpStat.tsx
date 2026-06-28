import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Users, TrendingUp, Target, Percent, GraduationCap } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Briefcase,
  Users,
  TrendingUp,
  Target,
  Percent,
  GraduationCap
};

interface CountUpStatProps {
  key?: any;
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  accent: string;
  iconName?: string;
  index: number;
}

export default function CountUpStat({ id, value, suffix, label, description, accent, iconName, index }: CountUpStatProps): React.JSX.Element {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [suffixVisible, setSuffixVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const isIITB = id === "stat-6" || label.toLowerCase().includes("iit");
  const [typewriterText, setTypewriterText] = useState("");

  // IntersectionObserver to trigger scroll entrance and count-up
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typewriter for IIT BOMBAY division
  useEffect(() => {
    if (!hasStarted || !isIITB) return;
    const fullText = "IIT BOMBAY";
    let currentText = "";
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        currentText += fullText[i];
        setTypewriterText(currentText);
        i++;
      } else {
        clearInterval(timer);
        setSuffixVisible(true);
      }
    }, 120);
    return () => clearInterval(timer);
  }, [hasStarted, isIITB]);

  // CountUp animation with premium easeOutExpo (duration 2.5 seconds)
  useEffect(() => {
    if (!hasStarted || isIITB) return;

    let startTime: number | null = null;
    const duration = 2500; // 2.5 seconds count-up duration

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // easeOutExpo: 1 - Math.pow(2, -10 * progress)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
        setSuffixVisible(true);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, value, isIITB]);

  // Real-time 3D Mouse Tracking Tilt Mechanics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Normalised coordinate mapping (-0.5 to 0.5)
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    // Mouse left rotates right (rotateY positive), Mouse up rotates down (rotateX positive/negative based on mapping)
    setTilt({
      rotateX: normY * 15,
      rotateY: normX * -15
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const isRed = accent === 'red';
  const IconComponent = iconName ? iconMap[iconName] : null;

  // Compute alternating entrance fanning angles
  const initialRotateY = index % 2 === 0 ? 15 : -15;

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isHovered ? 1.05 : 1})`
      : `perspective(1000px) translateY(80px) rotateX(25deg) rotateY(${initialRotateY}deg) scale(0.85)`,
    background: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: isHovered 
      ? '1px solid rgba(230, 57, 70, 0.8)' 
      : '1px solid rgba(230, 57, 70, 0.4)',
    boxShadow: isHovered 
      ? '0 0 60px rgba(230, 57, 70, 0.5)' 
      : '0 0 30px rgba(230, 57, 70, 0.15)',
    transition: !isVisible
      ? 'none'
      : isHovered 
        ? 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease, border-color 0.3s ease' 
        : `opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${index * 100}ms, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 100}ms, box-shadow 0.5s ease, border-color 0.5s ease`,
    transformStyle: 'preserve-3d',
    willChange: 'transform, opacity'
  };

  return (
    <div
      ref={cardRef}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col justify-between p-9 rounded-xl overflow-hidden group cursor-default z-10 min-h-[220px]"
    >
      {/* Dynamic Cursor Spotlight sheen */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-0 rounded-xl"
          style={{
            background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(230, 57, 70, 0.22), transparent 80%)`,
            mixBlendMode: 'screen'
          }}
        />
      )}

      {/* Floating 3D Icon Container */}
      {IconComponent && (
        <div 
          className="relative w-14 h-14 flex items-center justify-center rounded-xl bg-[#e63946]/10 text-[#e63946] mb-6 border border-[#e63946]/20 transition-all duration-300"
          style={{ 
            transform: `translateZ(30px) ${isHovered ? 'scale(1.3)' : 'scale(1)'}`,
            boxShadow: isHovered ? '0 0 20px rgba(230, 57, 70, 0.5)' : 'none',
            zIndex: 10
          }}
        >
          {/* Pulsing ring on view trigger */}
          {hasStarted && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.95 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 rounded-xl border border-[#e63946] pointer-events-none"
            />
          )}

          {/* Continuous slow pulse & rotation */}
          <div className="animate-pulse-slow">
            <IconComponent size={26} />
          </div>
        </div>
      )}

      {/* Numerical Core Area */}
      <div className="relative z-10 mb-2" style={{ transform: 'translateZ(15px)' }}>
        <div className="flex items-baseline mb-3">
          {isIITB ? (
            <span 
              className="font-oswald font-bold text-4xl sm:text-5xl text-white tracking-tight leading-none drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] select-none"
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}
            >
              {typewriterText}
              {!suffixVisible && <span className="animate-pulse text-[#e63946] ml-0.5">|</span>}
            </span>
          ) : (
            <>
              <span
                className="font-oswald font-bold text-6xl sm:text-7xl lg:text-[72px] tracking-tight leading-none select-none transition-all duration-300 text-[#e63946]"
                style={{ textShadow: '0 0 20px rgba(230,57,70,0.8)' }}
              >
                {id === "stat-3" ? "₹" : ""}{count}
              </span>
              <span 
                className={`inline-block font-oswald font-black text-3xl sm:text-4xl text-white/90 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  suffixVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
                style={{ transformOrigin: 'left bottom', marginLeft: '6px' }}
              >
                {suffix}
              </span>
            </>
          )}
        </div>

        {/* Card Title Label */}
        <h4 className="font-display font-black text-xs text-white/80 tracking-widest uppercase mb-2">
          {label}
        </h4>
      </div>

      {/* Description */}
      <p className="font-sans text-sm text-white/50 leading-relaxed relative z-10 mt-auto" style={{ transform: 'translateZ(10px)' }}>
        {description}
      </p>

      {/* Interactive visual line on bottom edge */}
      <div className="absolute bottom-0 left-5 right-5 h-[1px] bg-gradient-to-r from-transparent via-[#e63946]/0 to-transparent group-hover:via-[#e63946]/50 transition-all duration-700 pointer-events-none" />
    </div>
  );
}
