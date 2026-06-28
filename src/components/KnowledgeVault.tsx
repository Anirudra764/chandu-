import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Award, 
  Cpu, 
  Terminal, 
  Binary, 
  Eye, 
  Activity, 
  Network 
} from 'lucide-react';
import { Certification } from '../types';

interface KnowledgeVaultProps {
  certifications: Certification[];
}

export default function KnowledgeVault({ certifications }: KnowledgeVaultProps): React.JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeFace, setActiveFace] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Spawning particles for the hovered capsule
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    if (hoveredIndex !== null) {
      // Create fresh floating mini sparks
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 80 - 40, // offset from center
        y: Math.random() * 20,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 0.5
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [hoveredIndex]);

  return (
    <section
      id="certificates"
      ref={containerRef}
      className="relative py-[120px] lg:py-[160px] px-6 bg-[#080808] overflow-hidden select-none"
    >
      {/* 1. Custom CSS keyframe injections for high-performance 3D rendering */}
      <style>{`
        /* Scanline scan-beam effect across title */
        @keyframes vault-scan {
          0% { transform: translateX(-150%) skewX(-25deg); }
          50%, 100% { transform: translateX(150%) skewX(-25deg); }
        }
        .animate-vault-scan {
          animation: vault-scan 4s infinite cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* Slowly rotate the main orbital ring */
        @keyframes orbit-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-orbit-rotate {
          animation: orbit-rotate 24s linear infinite;
        }
        .animate-orbit-rotate-pause:hover {
          animation-play-state: paused;
        }

        /* Pulsing energy rings outward */
        @keyframes energy-pulse {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 0.35;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        .animate-energy-pulse-1 {
          animation: energy-pulse 6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .animate-energy-pulse-2 {
          animation: energy-pulse 6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          animation-delay: 3s;
        }

        /* Floating particles up the glass capsules */
        @keyframes particle-up {
          0% {
            transform: translateY(20px) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-80px) scale(1);
            opacity: 0;
          }
        }
        .animate-particle-up {
          animation: particle-up 1.8s ease-out infinite;
        }

        /* Radar scan background sweep */
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-radar-sweep {
          animation: radar-sweep 20s linear infinite;
        }
      `}</style>

      {/* 2. BACKGROUND ARCHIVE GRAPHICS & GRID */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle grid pattern fading to black at margins */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.25) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 80%)'
          }}
        />

        {/* Central glowing Vault Door structure */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[600px] h-[600px] md:w-[750px] md:h-[750px] pointer-events-none">
          {/* Tech Radial Guide lines */}
          <div className="absolute w-[85%] h-[85%] rounded-full border border-red-500/5" />
          <div className="absolute w-[65%] h-[65%] rounded-full border border-dashed border-red-500/10 animate-radar-sweep" />
          <div className="absolute w-[45%] h-[45%] rounded-full border border-[#e63946]/10" />
          <div className="absolute w-[25%] h-[25%] rounded-full bg-[radial-gradient(circle,rgba(230,57,70,0.08)_0%,transparent_70%)]" />

          {/* Glowing Vault center circle */}
          <div className="absolute w-24 h-24 rounded-full border-2 border-red-500/20 bg-neutral-950 flex items-center justify-center shadow-[0_0_40px_rgba(230,57,70,0.1)]">
            <Cpu className="text-red-500/40 animate-pulse" size={28} />
          </div>

          {/* Soft red energy rings slowly pulsing outward every 6 seconds */}
          <div className="absolute w-[350px] h-[350px] rounded-full border border-[#e63946]/30 animate-energy-pulse-1 pointer-events-none" />
          <div className="absolute w-[350px] h-[350px] rounded-full border border-[#e63946]/30 animate-energy-pulse-2 pointer-events-none" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10 flex flex-col items-center">
        {/* 3. TOP BADGE HEADER */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e63946]/20 bg-[#121212]/80 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(230,57,70,0.1)]"
        >
          <Shield className="text-[#e63946]" size={13} />
          <span className="font-mono text-[10px] tracking-[0.25em] font-bold text-white/90">
            DIGITAL VAULT • VERIFIED KNOWLEDGE
          </span>
        </div>

        {/* 4. TITLE & SUBTITLE */}
        <div className="text-center max-w-3xl mb-16 px-4">
          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white leading-none">
            Knowledge{' '}
            <span className="relative inline-block overflow-hidden px-2 py-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-red-500 to-white">
              Vault
              {/* Scan beam overlay across Vault */}
              <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-red-500/65 to-transparent animate-vault-scan" />
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-400 max-w-[580px] mx-auto mt-6 leading-relaxed">
            Every certification represents verified expertise, practical execution, and continuous professional evolution.
          </p>
        </div>

        {/* 5. MAIN HOLOGRAPHIC VAULT ORBIT DISPLAY (Desktop/Tablet) */}
        <div className="hidden sm:flex relative w-full min-h-[500px] items-center justify-center py-10 px-4">
          
          {/* Orbital viewport boundary with glow */}
          <div className="absolute w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] rounded-full border border-red-500/10 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,57,70,0.03)_0%,transparent_60%)]" />
          </div>

          {/* Central encrypted lock panel */}
          <div className="absolute z-20 flex flex-col items-center text-center p-6 rounded-full bg-[#0d0d0d]/90 border border-red-500/20 backdrop-blur-xl w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] justify-center shadow-[0_0_30px_rgba(230,57,70,0.15)] pointer-events-none">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1a0505] border border-[#3d1515] text-[#e63946] mb-2">
              {hoveredIndex !== null ? (
                <Unlock size={18} className="animate-pulse text-green-500" />
              ) : (
                <Lock size={18} className="animate-pulse" />
              )}
            </div>
            <span className="font-mono text-[9px] tracking-widest text-[#666] uppercase">SYS_LOCK</span>
            <span className="text-[11px] font-bold text-white tracking-widest mt-1 font-mono">
              {hoveredIndex !== null ? 'DECRYPTING...' : 'PROTECTED'}
            </span>
          </div>

          {/* Rotating Data Container */}
          <div className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] animate-orbit-rotate animate-orbit-rotate-pause flex items-center justify-center">
            
            {/* Glass capsule 1: Meta Certification */}
            <div 
              style={{
                position: 'absolute',
                top: '0%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              className="z-30 pointer-events-auto"
            >
              {/* Neutralizing inverse rotation to keep capsule upright */}
              <div className="animate-orbit-rotate [animation-direction:reverse] animate-orbit-rotate-pause">
                <CapsuleCard
                  cert={certifications[0]}
                  index={0}
                  isHovered={hoveredIndex === 0}
                  onHoverChange={(h) => setHoveredIndex(h ? 0 : null)}
                  particles={hoveredIndex === 0 ? particles : []}
                />
              </div>
            </div>

            {/* Glass capsule 2: Google Certification */}
            <div 
              style={{
                position: 'absolute',
                bottom: '0%',
                left: '50%',
                transform: 'translate(-50%, 50%)',
              }}
              className="z-30 pointer-events-auto"
            >
              <div className="animate-orbit-rotate [animation-direction:reverse] animate-orbit-rotate-pause">
                <CapsuleCard
                  cert={certifications[1]}
                  index={1}
                  isHovered={hoveredIndex === 1}
                  onHoverChange={(h) => setHoveredIndex(h ? 1 : null)}
                  particles={hoveredIndex === 1 ? particles : []}
                />
              </div>
            </div>

            {/* Decorative holographic nodes 3 & 4 (to make the orbit look fully populated) */}
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '0%',
                transform: 'translate(-50%, -50%)',
              }}
              className="pointer-events-none opacity-40 hidden sm:block"
            >
              <div className="animate-orbit-rotate [animation-direction:reverse] animate-orbit-rotate-pause">
                <div className="w-[110px] h-[110px] rounded-full border border-dashed border-[#e63946]/30 bg-[#0e0e0e]/95 flex flex-col items-center justify-center p-3 text-center">
                  <Activity size={14} className="text-[#e63946]/60 mb-1" />
                  <span className="font-mono text-[8px] text-[#666] tracking-widest">SYS_DUMP</span>
                  <span className="font-mono text-[9px] text-white/50 tracking-wider font-semibold mt-1">META_KPI</span>
                </div>
              </div>
            </div>

            <div 
              style={{
                position: 'absolute',
                top: '50%',
                right: '0%',
                transform: 'translate(50%, -50%)',
              }}
              className="pointer-events-none opacity-40 hidden sm:block"
            >
              <div className="animate-orbit-rotate [animation-direction:reverse] animate-orbit-rotate-pause">
                <div className="w-[110px] h-[110px] rounded-full border border-dashed border-[#e63946]/30 bg-[#0e0e0e]/95 flex flex-col items-center justify-center p-3 text-center">
                  <Network size={14} className="text-[#e63946]/60 mb-1" />
                  <span className="font-mono text-[8px] text-[#666] tracking-widest">SECURE_CH</span>
                  <span className="font-mono text-[9px] text-white/50 tracking-wider font-semibold mt-1">ROAS_LOCK</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 5. MOBILE KNOWLEDGE LIST DISPLAY (Mobile Only) */}
        <div className="flex sm:hidden flex-col gap-6 w-full max-w-sm px-4 py-4 items-center justify-center relative">
          <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#0d0d0d]/90 border border-red-500/20 backdrop-blur-xl w-full mb-2 shadow-[0_0_20px_rgba(230,57,70,0.1)]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1a0505] border border-[#3d1515] text-[#e63946] mb-2">
              <Lock size={16} className="animate-pulse" />
            </div>
            <span className="font-mono text-[8px] tracking-widest text-[#666] uppercase">SYS_LOCK</span>
            <span className="text-[10px] font-bold text-white tracking-widest mt-1 font-mono">
              VERIFIED KNOWLEDGE ASSETS
            </span>
          </div>
          <CapsuleCard
            cert={certifications[0]}
            index={0}
            isHovered={hoveredIndex === 0}
            onHoverChange={(h) => setHoveredIndex(h ? 0 : null)}
            particles={hoveredIndex === 0 ? particles : []}
          />
          <CapsuleCard
            cert={certifications[1]}
            index={1}
            isHovered={hoveredIndex === 1}
            onHoverChange={(h) => setHoveredIndex(h ? 1 : null)}
            particles={hoveredIndex === 1 ? particles : []}
          />
        </div>

        {/* 6. BOTTOM TRUST BADGES ROW */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 w-full max-w-4xl px-4">
          <Badge item="Verified Skills" />
          <Badge item="Industry Trusted" />
          <Badge item="Continuous Learning" />
        </div>

      </div>
    </section>
  );
}

/* ==========================================================================
   Helper Sub-Component: CapsuleCard
   ========================================================================== */
interface CapsuleCardProps {
  cert: Certification;
  index: number;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
  particles: { id: number; x: number; y: number; size: number; delay: number }[];
}

function CapsuleCard({ cert, index, isHovered, onHoverChange, particles }: CapsuleCardProps) {
  if (!cert) return null;

  return (
    <div
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      style={{
        background: isHovered ? 'rgba(24, 12, 12, 0.88)' : 'rgba(18, 18, 18, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: isHovered
          ? 'inset 0 1px 0 rgba(255,255,255,0.1), 0 12px 36px rgba(230, 57, 70, 0.25)'
          : 'inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.5)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        perspective: '1000px',
      }}
      className={`relative w-[260px] sm:w-[310px] p-6 sm:p-7 rounded-2xl border ${
        isHovered ? 'border-[#e63946]/50' : 'border-red-500/10'
      } cursor-pointer group`}
    >
      {/* Red vertical scanning border sweep on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#e63946] shadow-[0_0_8px_#e63946] animate-pulse" />
        </div>
      )}

      {/* Sparks float escape simulation on hover */}
      {isHovered && particles.map((p) => (
        <div
          key={p.id}
          style={{
            left: `calc(50% + ${p.x}px)`,
            bottom: '10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
          }}
          className="absolute rounded-full bg-[#e63946]/80 animate-particle-up pointer-events-none"
        />
      ))}

      <div className="flex items-start space-x-4">
        {/* Animated Certificate Icon */}
        <div 
          style={{
            transform: isHovered ? 'rotate(20deg) scale(1.1)' : 'rotate(0deg) scale(1)',
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          className={`p-3 rounded-xl transition-colors duration-300 ${
            isHovered ? 'bg-[#e63946]/20 text-[#e63946]' : 'bg-red-500/10 text-red-500'
          }`}
        >
          <Award size={24} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Top category label / meta */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="font-mono text-[9px] text-[#666] tracking-widest block uppercase">
              CREDENTIAL ID {index + 1}
            </span>
            <span className="font-mono text-[9px] text-neutral-400 font-semibold uppercase tracking-wider block">
              {cert.year}
            </span>
          </div>

          {/* Certificate Name */}
          <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-wide leading-snug line-clamp-2">
            {cert.title}
          </h3>

          {/* Issued By info */}
          <p className="font-sans text-[11px] text-neutral-400 mt-2">
            Issued by <strong className="text-neutral-200 font-medium">{cert.issuer}</strong>
          </p>

          {/* Verification Status */}
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/5">
            <CheckCircle2 size={11} className="text-green-500 animate-pulse" />
            <span className="font-mono text-[8px] tracking-[0.15em] text-green-500/90 uppercase font-bold">
              VERIFIED SECURE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Helper Sub-Component: Badge
   ========================================================================== */
function Badge({ item }: { item: string }): React.JSX.Element {
  return (
    <div 
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-500/15 bg-neutral-950/80 backdrop-blur-md hover:border-red-500/30 hover:shadow-[0_0_15px_rgba(230,57,70,0.1)] transition-all duration-300"
    >
      <div className="w-2 h-2 rounded-full bg-[#e63946] shadow-[0_0_6px_#e63946]" />
      <span className="font-mono text-[10px] text-white/80 font-bold uppercase tracking-wider">
        {item}
      </span>
    </div>
  );
}
