import React, { useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

interface HeroBackgroundProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollY: MotionValue<number>;
  introFinished: boolean;
}

export default function HeroBackground({ mouseX, mouseY, scrollY, introFinished }: HeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ambientAlpha, setAmbientAlpha] = useState(0);

  // Background grid independent scroll parallax
  const bgScrollY = useTransform(scrollY, [0, 1000], [0, 150]);

  useEffect(() => {
    // Fade in soft ambient glow slowly over 3 seconds
    const timer = setTimeout(() => {
      setAmbientAlpha(0.12);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle system configuration
    const particleCount = 45;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
      pulseTime: number;
    }> = [];

    // Initialize tiny red, blue, and white particles
    const colors = [
      '230, 57, 70',   // Premium Red
      '59, 130, 246',  // Premium Blue
      '255, 255, 255', // Pure White
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.2 + 0.05), // Slowly drift upwards like dust
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.3 + 0.05,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseTime: Math.random() * Math.PI,
      });
    }

    let gridOffsetX = 0;
    const gridSpeed = 0.08; // Impeccably slow horizontal shift

    const draw = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // 1. Subtle horizontal shifting technical grid
      gridOffsetX = (gridOffsetX + gridSpeed) % 64;
      const scrollOffset = bgScrollY.get();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.012)';
      ctx.lineWidth = 1;

      // Vertical lines shifted horizontally
      for (let x = gridOffsetX; x < width; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines shifted vertically by scroll
      const gridOffsetY = scrollOffset % 64;
      for (let y = gridOffsetY; y < height; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Cinematic Volumetric Lighting
      // Subtle background ambient red lighting
      const gradX = width * 0.5 + mouseX.get() * -20;
      const gradY = height * 0.5 + mouseY.get() * -20;

      const radialGrad = ctx.createRadialGradient(
        gradX, gradY, 10,
        gradX, gradY, Math.max(width, height) * 0.8
      );
      radialGrad.addColorStop(0, `rgba(230, 57, 70, ${ambientAlpha})`);
      radialGrad.addColorStop(0.5, 'rgba(30, 10, 15, 0.02)');
      radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle blue secondary volumetric light
      const blueGrad = ctx.createRadialGradient(
        width * 0.8 + mouseX.get() * -10, height * 0.3 + mouseY.get() * -10, 5,
        width * 0.8, height * 0.3, Math.max(width, height) * 0.4
      );
      blueGrad.addColorStop(0, 'rgba(59, 130, 246, 0.03)');
      blueGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = blueGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Floating Dust & Occasional Glowing Particles
      particles.forEach((p) => {
        // Apply extremely subtle parallax based on mouse
        const px = p.x + mouseX.get() * -12;
        const py = p.y + mouseY.get() * -12 + scrollOffset;

        // Wrap around borders
        const wrappedX = ((px % width) + width) % width;
        const wrappedY = ((py % height) + height) % height;

        p.pulseTime += p.pulseSpeed;
        const activeAlpha = p.alpha + Math.sin(p.pulseTime) * 0.08;

        ctx.beginPath();
        ctx.arc(wrappedX, wrappedY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.02, Math.min(activeAlpha, 0.6))})`;
        
        // Add tiny bloom shadow to glowing particles
        if (p.size > 1.2) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = `rgba(${p.color}, 0.5)`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();

        // Update physics
        p.x += p.vx;
        p.y += p.vy;

        // Respawn if moved completely out of bounds vertically
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
      });

      // Reset shadow for next draw cycle
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY, bgScrollY, ambientAlpha]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full -z-10 bg-black overflow-hidden pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
      {/* Starting Black Mask Overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        className="absolute inset-0 bg-black pointer-events-none"
      />
    </div>
  );
}
