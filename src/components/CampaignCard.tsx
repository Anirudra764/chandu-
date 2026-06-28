import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'motion/react';
import { CaseStudy } from '../types';

interface CampaignCardProps {
  cs: CaseStudy;
  index: number;
  onClick: () => void;
  key?: React.Key;
}

interface ParsedMetric {
  prefix: string;
  value: number;
  suffix: string;
  label: string;
  isWhole: boolean;
  isRank: boolean;
}

function parseMetric(item: string): ParsedMetric {
  const str = item.trim();
  
  if (str.startsWith("Rank")) {
    return {
      prefix: "Rank #1-",
      value: 3,
      suffix: "",
      label: "Google Position",
      isWhole: true,
      isRank: true
    };
  }

  const firstSpace = str.indexOf(' ');
  let metricPart = str;
  let label = '';
  if (firstSpace !== -1) {
    metricPart = str.slice(0, firstSpace);
    label = str.slice(firstSpace + 1);
  }

  const numRegex = /([+-]?\d+(?:\.\d+)?)/;
  const match = metricPart.match(numRegex);
  if (match) {
    const numStr = match[1];
    const value = parseFloat(numStr);
    const numIdx = metricPart.indexOf(numStr);
    const prefix = metricPart.slice(0, numIdx);
    const suffix = metricPart.slice(numIdx + numStr.length);
    const isWhole = !numStr.includes('.');
    
    if (value < 0) {
      return {
        prefix: '-',
        value: Math.abs(value),
        suffix,
        label,
        isWhole,
        isRank: false
      };
    }
    
    return {
      prefix,
      value,
      suffix,
      label,
      isWhole,
      isRank: false
    };
  }
  
  return {
    prefix: '',
    value: 0,
    suffix: metricPart,
    label,
    isWhole: true,
    isRank: false
  };
}

function MetricCounter({ metricStr, trigger }: { metricStr: string; trigger: boolean }) {
  const parsed = parseMetric(metricStr);
  const [displayVal, setDisplayVal] = useState(parsed.isRank ? '1' : '0');

  useEffect(() => {
    if (!trigger) {
      setDisplayVal(parsed.isRank ? '1' : '0');
      return;
    }

    if (parsed.value === 0) {
      setDisplayVal(parsed.suffix);
      return;
    }

    let start = parsed.isRank ? 1 : 0;
    let end = parsed.value;

    const controls = animate(start, end, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate: (latest) => {
        if (parsed.isWhole) {
          setDisplayVal(Math.round(latest).toString());
        } else {
          setDisplayVal(latest.toFixed(1));
        }
      }
    });

    return () => controls.stop();
  }, [parsed.value, parsed.isWhole, parsed.isRank, trigger]);

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 flex-1">
      <span className="text-white font-display font-bold text-[22px] leading-tight">
        {parsed.prefix}{displayVal}{parsed.suffix}
      </span>
      <span className="text-white/80 font-mono text-[11px] uppercase tracking-[2px] mt-1 whitespace-nowrap">
        {parsed.label}
      </span>
    </div>
  );
}

export default function CampaignCard({ cs, index, onClick }: CampaignCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(true);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches;
  }, []);

  // IntersectionObserver to trigger animation & count-ups
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch.current) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const cardCenterX = rect.width / 2;
    const cardCenterY = rect.height / 2;

    // Subtle tilt: max 10 degrees
    const rotateY = ((x - cardCenterX) / rect.width) * 10;
    const rotateX = -((y - cardCenterY) / rect.height) * 10;

    setTilt({ rotateX, rotateY });
    setMousePos({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const metrics = cs.resultSummary.split(' | ');

  // Calculate entrance delay based on row staggering
  // Row 1 (idx 0,1,2): 100ms stagger
  // Row 2 (idx 3,4,5): starts after Row 1
  const isRow2 = index >= 3;
  const entranceDelay = isRow2 ? 0.3 + (index - 3) * 0.1 : index * 0.1;

  const cardTransformStyle = isHovered && !isTouch.current
    ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-8px) translateZ(0px)`
    : `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0px)`;

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={hasEnteredViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.7,
        delay: entranceDelay,
        ease: [0.23, 1, 0.32, 1] // smooth deceleration
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer rounded-[20px] overflow-hidden flex flex-col transition-all duration-500 relative bg-[#111111]"
      style={{
        transform: cardTransformStyle,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        boxShadow: isHovered
          ? '0 20px 50px rgba(0,0,0,0.4), 0 0 25px rgba(230,57,70,0.12), inset 0 1px 0 rgba(255,255,255,0.06)'
          : '0 8px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
        borderWidth: '1px',
        borderColor: isHovered ? 'rgba(230, 57, 70, 0.5)' : 'rgba(255, 255, 255, 0.08)',
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      {/* Subtle red shimmer light following mouse */}
      {!isTouch.current && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, rgba(230, 57, 70, 0.15), transparent 80%)`
          }}
        />
      )}

      {/* Image Container with Parallax Layer */}
      <div 
        className="relative h-[220px] overflow-hidden rounded-t-[19px] bg-neutral-900"
        style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }}
      >
        {/* Shimmer Placeholder before image appears */}
        <div 
          className={`absolute inset-0 bg-neutral-950 transition-opacity duration-500 z-0 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[pulse_1.5s_infinite]" />
        </div>

        <motion.img
          src={cs.thumbnailUrl}
          alt={cs.title}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          animate={{
            scale: isHovered ? 1.08 : 1.0
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />

        {/* Always visible dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

        {/* Red frosted-glass stats bar */}
        <div
          className="absolute bottom-4 left-4 right-4 bg-[#e63946]/92 backdrop-blur-[8px] rounded-xl py-2.5 px-3 flex items-center justify-around border border-white/20 transition-all duration-300 z-20"
          style={{
            transform: isHovered && !isTouch.current ? 'translateZ(15px) translateY(-4px)' : 'translateZ(15px) translateY(4px)',
            transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        >
          {metrics.map((metric, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <div className="w-[1px] h-6 bg-white/30 self-center" />}
              <MetricCounter metricStr={metric} trigger={hasEnteredViewport} />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Card Info/Content Area with Depth */}
      <div 
        className="p-6 flex flex-col justify-between flex-1 relative z-20"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div style={{ transformStyle: 'preserve-3d' }}>
          {/* Category Tag & Platform */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-[11px] text-[#e63946] font-mono font-bold tracking-[3px] uppercase">
              <span className="w-1.5 h-1.5 bg-[#e63946] rounded-full inline-block" />
              {cs.category}
            </div>
            <span className="font-mono text-[11px] text-white/45 uppercase tracking-wider">
              {cs.platform}
            </span>
          </div>

          {/* Campaign Title (Z Depth: 20px) */}
          <h3 
            className="font-display font-bold text-[22px] leading-[1.3] text-white group-hover:text-[#e63946] transition-colors duration-300 mb-3"
            style={{ transform: 'translateZ(20px)' }}
          >
            {cs.title}
          </h3>

          {/* Subtitle / Description Text */}
          <p className="font-sans text-[15px] text-white/60 leading-[1.7] mb-4">
            {cs.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
