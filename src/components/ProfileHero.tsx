import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileHeroProps {
  profileImage: string;
  onError: () => void;
  isHovered: boolean;
  setIsHovered: (h: boolean) => void;
  scrollY: any;
  portraitX: any;
  portraitY: any;
}

export default function ProfileHero({
  profileImage,
  onError,
  isHovered,
  setIsHovered,
  scrollY,
  portraitX,
  portraitY
}: ProfileHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ringDrawingComplete, setRingDrawingComplete] = useState(false);

  // Orbit & Sparks Particle System in Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const centerX = width / 2;
    const centerY = height / 2;
    const baseRadius = width * 0.44; // Orbiting just outside the portrait ring

    // Particles array
    const orbitParticles: Array<{
      angle: number;
      speed: number;
      radiusOffset: number;
      size: number;
      alpha: number;
      decay: number;
    }> = [];

    const sparks: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }> = [];

    // Initialize orbiting particles (soft red)
    const particleCount = 28;
    for (let i = 0; i < particleCount; i++) {
      orbitParticles.push({
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.006 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        radiusOffset: (Math.random() - 0.5) * 16,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.4 + 0.2,
        decay: 0,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Determine speeds & spark emission rates based on hover state
      const speedMultiplier = isHovered ? 2.5 : 1.0;
      const sparkChance = isHovered ? 0.15 : 0.03;

      // Draw Orbiting Particles
      orbitParticles.forEach((p) => {
        p.angle += p.speed * speedMultiplier;
        const currentRadius = baseRadius + p.radiusOffset;
        const x = centerX + Math.cos(p.angle) * currentRadius;
        const y = centerY + Math.sin(p.angle) * currentRadius;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 57, 70, ${p.alpha})`;
        ctx.shadowBlur = isHovered ? 6 : 3;
        ctx.shadowColor = 'rgba(230, 57, 70, 0.6)';
        ctx.fill();
      });

      // Occasional digital sparks escape from the orbital ring
      if (Math.random() < sparkChance) {
        const emitAngle = Math.random() * Math.PI * 2;
        const startRad = baseRadius + (Math.random() - 0.5) * 10;
        const startX = centerX + Math.cos(emitAngle) * startRad;
        const startY = centerY + Math.sin(emitAngle) * startRad;
        
        // Push outward velocity
        const force = Math.random() * 2 + 1;
        sparks.push({
          x: startX,
          y: startY,
          vx: Math.cos(emitAngle) * force + (Math.random() - 0.5) * 0.5,
          vy: Math.sin(emitAngle) * force + (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          alpha: 1.0,
          color: Math.random() > 0.3 ? 'rgba(230, 57, 70, 0.9)' : 'rgba(255, 215, 0, 0.9)', // Red or gold sparks
        });
      }

      // Draw and Update Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= isHovered ? 0.03 : 0.02;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color.replace('0.9', s.alpha.toString());
        ctx.shadowBlur = 4;
        ctx.shadowColor = s.color;
        ctx.fill();
      }

      ctx.shadowBlur = 0; // reset
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovered, ringDrawingComplete]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96"
    >
      {/* BACKGROUND NEON RINGS ROTATING AT DIFFERENT SPEEDS */}
      {/* Ring 1 (Pulse & Glow behind) */}
      <motion.div
        animate={{
          scale: isHovered ? [1.02, 1.06, 1.02] : [0.97, 1.03, 0.97],
          opacity: isHovered ? [0.4, 0.8, 0.4] : [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-4 rounded-full border border-[#e63946]/10 glow-red pointer-events-none"
      />

      {/* Ring 2 (Clockwise neon) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: isHovered ? 12 : 32, ease: "linear" }}
        className="absolute -inset-2 border border-[#e63946]/15 rounded-full pointer-events-none"
      />

      {/* Ring 3 (Anti-clockwise transparent blue/white) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: isHovered ? 16 : 42, ease: "linear" }}
        className="absolute -inset-6 border border-blue-500/10 rounded-full pointer-events-none"
      />

      {/* CANVAS ORBITS AND SPARKS OVERLAY */}
      <canvas
        ref={canvasRef}
        className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] pointer-events-none z-10"
      />

      {/* PORTRAIT MAIN FRAME (With smooth parallax translation + floating animation) */}
      <motion.div
        style={{ x: portraitX, y: portraitY }}
        animate={{
          y: [-4, 4, -4],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut"
          }
        }}
        className="absolute inset-4 rounded-full overflow-hidden border border-white/10 bg-neutral-950 z-0 select-none group"
      >
        {/* Profile Image with Blur-to-Sharp loading transition */}
        <motion.img
          initial={{ filter: "blur(20px)", scale: 1.1, opacity: 0 }}
          animate={{ filter: "blur(0px)", scale: isHovered ? 1.05 : 1, opacity: 1 }}
          transition={{
            filter: { delay: 5.4, duration: 1.5, ease: "easeOut" },
            scale: { duration: 0.6, ease: "easeOut" },
            opacity: { delay: 5.4, duration: 1.2 }
          }}
          src={profileImage}
          onError={onError}
          alt="Chandan Mahanty Headshot"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover brightness-100 contrast-[1.03] transition-all duration-700"
        />

        {/* Soft elegant shadow sweep on load */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
      </motion.div>

      {/* THE DRAWING CIRCULAR RING (One segment at a time, then rotates clockwise) */}
      <div className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] pointer-events-none z-20">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="47"
            fill="transparent"
            stroke="#e63946"
            strokeWidth="1.2"
            strokeDasharray="295.3" // 2 * Math.PI * 47
            initial={{ strokeDashoffset: 295.3 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ delay: 5.4, duration: 1.6, ease: "easeInOut" }}
            onAnimationComplete={() => setRingDrawingComplete(true)}
          />
        </svg>
      </div>

    </div>
  );
}
