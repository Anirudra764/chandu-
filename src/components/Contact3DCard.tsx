import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Linkedin, MapPin, LucideIcon } from 'lucide-react';

interface Contact3DCardProps {
  type: 'phone' | 'email' | 'linkedin' | 'location';
  label: string;
  value: string;
  href?: string;
  index: number;
}

const iconMap: Record<string, LucideIcon> = {
  phone: Phone,
  email: Mail,
  linkedin: Linkedin,
  location: MapPin,
};

export default function Contact3DCard({ type, label, value, href, index }: Contact3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 4, y: -4 }); // default deep 3D tilt
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device to prevent mouse tracking issues
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Rotate bounds: max 12 degrees
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 12; // Left-Right tilt
    const rotateX = -((y - centerY) / centerY) * 12; // Up-Down tilt

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 4, y: -4 }); // Reset to the beautiful default perspective tilt
  };

  const IconComponent = iconMap[type] || Phone;

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    transform: `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(${isHovered ? -8 : 0}px)`,
    boxShadow: isHovered
      ? 'inset 0 1px 0 rgba(255,255,255,0.1), 0 24px 60px rgba(230, 57, 70, 0.25)'
      : 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.6)',
    transition: isHovered 
      ? 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s ease, box-shadow 0.3s ease'
      : 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s ease, box-shadow 0.3s ease',
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  };

  const innerContent = (
    <div className="relative z-10 flex flex-col items-center text-center p-8 rounded-2xl h-full w-full">
      {/* 3D Cursor Tracking Spotlight reflection shimmer */}
      {isHovered && !isTouch && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl z-0"
          style={{
            background: `radial-gradient(circle 120px at ${coords.x}px ${coords.y}px, rgba(230, 57, 70, 0.12), transparent 75%)`
          }}
        />
      )}

      {/* Glow pulse overlay on hover */}
      <div 
        className={`absolute inset-0 border rounded-2xl transition-all duration-300 pointer-events-none z-10 ${
          isHovered 
            ? 'border-[#e63946]/50 shadow-[0_0_20px_rgba(230,57,70,0.2)]' 
            : 'border-red-500/20'
        }`}
      />

      {/* Icon container */}
      <div 
        className="w-11 h-11 rounded-full flex items-center justify-center bg-[#1a0505] border border-[#3d1515] text-[#e63946] mb-5 relative transition-transform duration-300"
        style={{ transform: 'translateZ(30px)' }}
      >
        <IconComponent size={20} className="transition-transform duration-300 group-hover:scale-110" />
      </div>

      {/* Label: 11px uppercase tracking-widest in #666 */}
      <span 
        className="text-[#666] text-[11px] uppercase tracking-widest font-mono font-medium mb-2 block select-none"
        style={{ transform: 'translateZ(15px)' }}
      >
        {label}
      </span>

      {/* Value: 15px bold white or near-white */}
      <span 
        className="text-[15px] font-bold text-white tracking-wide break-all block"
        style={{ transform: 'translateZ(20px)' }}
      >
        {value}
      </span>
    </div>
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1], // premium custom ease
        delay: index * 0.1 
      }}
      className="relative rounded-2xl overflow-hidden group cursor-pointer h-full border border-transparent"
    >
      {href ? (
        type === 'linkedin' || type === 'phone' || type === 'email' ? (
          // Security: all external/protocol links get noopener noreferrer to prevent reverse tabnapping
          <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
            {innerContent}
          </a>
        ) : (
          <a href={href} className="block h-full w-full">
            {innerContent}
          </a>
        )
      ) : (
        <div className="h-full w-full">{innerContent}</div>
      )}
    </motion.div>
  );
}
