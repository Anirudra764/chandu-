import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Facebook, Search, Layout, Cpu, Sparkles, MessageSquare, Youtube } from 'lucide-react';
import { Service } from '../types';
import { personalInfo } from '../data';

interface ServiceCardProps {
  key?: any;
  service: Service;
  index: number;
}

// Icon mapper
const iconMap: Record<string, React.ComponentType<any>> = {
  Facebook,
  Search,
  Layout,
  Cpu,
  Sparkles,
  MessageSquare,
  Youtube
};

export default function ServiceCard({ service, index }: ServiceCardProps): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // Trigger scroll entrance with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Relative mouse position from card center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Rotate bounds: max 15 degrees
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 15; // Left-Right tilt, max 15
    const rotateX = -((y - centerY) / centerY) * 15; // Up-Down tilt, max 15

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const IconComponent = iconMap[service.iconName] || Sparkles;

  // Row calculations (Row 1 is indexes 0-2, Row 2 is 3-5)
  const isRow1 = index < 3;
  const initialY = isRow1 ? -100 : 100; // Row 1 comes from top, Row 2 from bottom
  const initialRotateY = index % 2 === 0 ? 30 : -30; // Alternating angles

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(${isHovered ? -8 : 0}px) translateZ(${isHovered ? 20 : 0}px)`
      : `perspective(800px) scale(0.7) translateY(${initialY}px) rotateY(${initialRotateY}deg)`,
    boxShadow: isHovered 
      ? '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(230,57,70,0.3)' 
      : '0 10px 30px rgba(0,0,0,0.3), 0 0 15px rgba(230,57,70,0.05)',
    transition: !isVisible
      ? 'none'
      : isHovered 
        ? 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease' 
        : `opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 80}ms, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 80}ms, box-shadow 0.5s ease`,
    transformStyle: 'preserve-3d',
    willChange: 'transform, opacity'
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="relative p-[1.5px] rounded-xl overflow-hidden group cursor-default min-h-[380px] bg-neutral-950 flex flex-col"
    >
      {/* Continuous Border-spin conic-gradient */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] animate-[spin_5s_linear_infinite]"
          style={{
            background: 'conic-gradient(from 0deg, #e63946, transparent 35%, #e63946, transparent 70%, #e63946)',
            opacity: isHovered ? 1.0 : 0.45,
            transition: 'opacity 0.3s ease'
          }}
        />
      </div>

      {/* Internal Content card body */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full bg-[#070707] rounded-[11px] p-8 grow overflow-hidden">
        
        {/* Dynamic Cursor Spotlight sheen */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-0 rounded-[11px]"
            style={{
              background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(230, 57, 70, 0.18), transparent 85%)`,
              mixBlendMode: 'screen'
            }}
          />
        )}

        {/* Foreground Content */}
        <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
          {/* Header row with Icon and Badge */}
          <div className="flex items-center justify-between mb-6">
            <div className={`p-4 rounded-lg relative ${
              service.isPrimary 
                ? 'bg-[#e63946]/10 text-[#e63946] shadow-[0_0_15px_rgba(230,57,70,0.15)] border border-[#e63946]/20' 
                : 'bg-neutral-900 text-neutral-400 border border-white/5'
            } transition-colors duration-300 group-hover:text-[#e63946]`}>
              <div className="absolute inset-0 rounded-lg border-2 border-[#e63946]/50 opacity-0 group-hover:opacity-100 group-hover:animate-icon-glow-ring pointer-events-none" />
              <IconComponent size={24} className="relative z-10" />
            </div>

            {service.isPrimary && (
              <span className="font-mono text-[9px] font-bold text-[#e63946] bg-[#e63946]/10 border border-[#e63946]/20 px-2.5 py-1 rounded tracking-widest uppercase animate-pulse shadow-[0_0_12px_rgba(230,57,70,0.4)]">
                ⭐ Primary Specialization
              </span>
            )}
          </div>

          {/* Service Image Segment with 3D Parallax Tilt */}
          {service.imageUrl && (
            <div 
              className="relative h-44 rounded-lg overflow-hidden mb-6 border border-white/5 bg-neutral-950/85 transition-all duration-500 shadow-inner z-0"
              style={{ transform: 'translateZ(20px)' }}
            >
              {/* Glossy / red gradient overlays */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 transition-opacity duration-500"
                style={{ opacity: isHovered ? 0.3 : 0.75 }}
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-[#e63946]/60 to-transparent z-10 transition-opacity duration-500 pointer-events-none"
                style={{ opacity: isHovered ? 1 : 0 }}
              />
              
              {/* Image element with Ken Burns effect and hover zoom */}
              <img
                src={service.imageUrl}
                alt={service.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-linear ${
                  isHovered ? 'scale-115 duration-500' : 'animate-ken-burns'
                }`}
              />

              {/* Light glow sweep line */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-out z-20 pointer-events-none" />
            </div>
          )}

          {/* Service Title (Floats closest to user) */}
          <h3 
            className="font-display font-black text-xl md:text-2xl text-white mb-3 group-hover:text-[#e63946] transition-colors duration-300"
            style={{ transform: 'translateZ(35px)' }}
          >
            {service.title}
          </h3>

          {/* Service Description */}
          <p className="font-sans text-sm text-neutral-400 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Footer Category Tag and Call to Action */}
        <div 
          className="mt-8 flex items-center justify-between border-t border-white/5 pt-4 relative z-10"
          style={{ transform: 'translateZ(15px)' }}
        >
          {/* Pill style category tag with blinking dot */}
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#e63946]/40 bg-[#e63946]/5 font-mono text-[10px] text-neutral-300 uppercase tracking-widest relative">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e63946] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e63946]" />
            </span>
            {service.category}
          </span>
        </div>
      </div>
    </div>
  );
}
