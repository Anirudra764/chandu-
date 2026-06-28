import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
  decay: number;
}

export default function GoldCursorTrail(): React.JSX.Element | null {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const prevMousePos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const tiltAngle = useRef(0);
  const isMoving = useRef(false);
  const historyRef = useRef<{ x: number; y: number }[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lastHoveredElementRef = useRef<Element | null>(null);
  const isHoveringRef = useRef(false);
  const [isSupportedDevice, setIsSupportedDevice] = useState(false);

  useEffect(() => {
    // Prevent rendering on mobile/tablet touchscreens by checking fine pointer media query
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsSupportedDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsSupportedDevice(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!isSupportedDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Hide standard browser cursor on the body
    document.documentElement.classList.add('cursor-none');
    document.body.classList.add('cursor-none');

    // Handle Resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resizeCanvas, 100);
    };
    window.addEventListener('resize', handleResize);

    // Initialize history with dots
    const initialPos = { x: -100, y: -100 };
    historyRef.current = Array.from({ length: 14 }, () => ({ ...initialPos }));

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      if (prevMousePos.current.x === -100) {
        prevMousePos.current = { x: e.clientX, y: e.clientY };
      } else {
        prevMousePos.current = { ...mousePos.current };
      }
      mousePos.current = { x: e.clientX, y: e.clientY };
      isMoving.current = true;
    };

    // Cyan-holographic color palette
    const colors = [
      'rgba(6, 182, 212, ',   // Cyan 500
      'rgba(34, 211, 238, ',  // Cyan 400
      'rgba(103, 232, 249, ', // Cyan 300
      'rgba(165, 243, 252, ', // Cyan 200
      'rgba(255, 255, 255, ', // Pure White
    ];

    // Burst Generator Utility
    const createBurst = (x: number, y: number, count: number) => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.5 + 1.2;
        const colorIndex = Math.floor(Math.random() * colors.length);
        
        newParticles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          size: Math.random() * 2.0 + 1.0,
          color: colors[colorIndex],
          decay: Math.random() * 0.025 + 0.015
        });
      }
      particlesRef.current = [...particlesRef.current, ...newParticles].slice(-180);
    };

    // Click trigger - 32-particle cyan radial explosion
    const handleMouseDown = (e: MouseEvent) => {
      createBurst(e.clientX, e.clientY, 32);
    };

    // Hover trigger - 18-particle burst on entering interactive element
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const interactiveEl = target.closest(
        'a, button, input, select, textarea, [role="button"], .interactive-hover, .cursor-pointer, [href]'
      );
      
      isHoveringRef.current = !!interactiveEl;
      
      if (interactiveEl && interactiveEl !== lastHoveredElementRef.current) {
        lastHoveredElementRef.current = interactiveEl;
        createBurst(e.clientX, e.clientY, 18);
      } else if (!interactiveEl) {
        lastHoveredElementRef.current = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseover', handleMouseOver);

    // Frame update loop (60 FPS)
    let animationFrameId: number;
    let lastTime = performance.now();

    const updateFrame = (currentTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const timeSec = currentTime / 1000;
      const history = historyRef.current;
      
      // Calculate velocity and tilt angle based on mouse movement
      const targetVx = mousePos.current.x - prevMousePos.current.x;
      const targetVy = mousePos.current.y - prevMousePos.current.y;
      
      velocity.current.x += (targetVx - velocity.current.x) * 0.2;
      velocity.current.y += (targetVy - velocity.current.y) * 0.2;
      
      // Tilt pointer slightly based on horizontal movement
      const targetTilt = Math.max(-0.4, Math.min(0.4, velocity.current.x * 0.015));
      tiltAngle.current += (targetTilt - tiltAngle.current) * 0.15;

      // Update leading dot
      if (history.length > 0) {
        history[0].x = mousePos.current.x;
        history[0].y = mousePos.current.y;
      }

      // Smooth interpolation for lagging trail dots
      for (let i = 1; i < history.length; i++) {
        history[i].x += (history[i - 1].x - history[i].x) * 0.22;
        history[i].y += (history[i - 1].y - history[i].y) * 0.22;
      }

      // Constrain history size (14 dots)
      if (history.length > 14) {
        history.pop();
      }

      // Spawn subtle particle trail during movement
      const speedMagnitude = Math.sqrt(velocity.current.x * velocity.current.x + velocity.current.y * velocity.current.y);
      if (speedMagnitude > 1.5 && mousePos.current.x >= 0 && mousePos.current.y >= 0) {
        const colorIndex = Math.floor(Math.random() * colors.length);
        particlesRef.current.push({
          x: mousePos.current.x + (Math.random() - 0.5) * 8,
          y: mousePos.current.y + (Math.random() - 0.5) * 8,
          vx: -velocity.current.x * 0.25 + (Math.random() - 0.5) * 1.5,
          vy: -velocity.current.y * 0.25 + (Math.random() - 0.5) * 1.5,
          alpha: 0.8,
          size: Math.random() * 2.2 + 0.8,
          color: colors[colorIndex],
          decay: Math.random() * 0.03 + 0.02
        });
      }

      // Slowly spawn faint floating particles even when idle to keep it looking "alive"
      if (currentTime - lastTime > 60 && mousePos.current.x >= 0 && mousePos.current.y >= 0) {
        lastTime = currentTime;
        const colorIndex = Math.floor(Math.random() * colors.length);
        particlesRef.current.push({
          x: mousePos.current.x + (Math.random() - 0.5) * 12,
          y: mousePos.current.y + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.4, // float upwards slightly
          alpha: 0.6,
          size: Math.random() * 1.8 + 0.6,
          color: colors[colorIndex],
          decay: Math.random() * 0.02 + 0.015
        });
      }

      // 1. Draw lagging glowing circular trail dots
      for (let i = history.length - 1; i > 0; i--) {
        const pt = history[i];
        if (pt.x < 0 || pt.y < 0) continue;

        const size = Math.max(0.8, 4.0 * (1 - i / history.length));
        const alpha = Math.max(0.05, 0.45 * (1 - i / history.length));

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#06b6d4';
        ctx.fill();
      }

      // 2. Draw Classic Arrow Pointer (Holographic Glass with rotation & floating effect)
      if (mousePos.current.x >= 0 && mousePos.current.y >= 0) {
        const x = mousePos.current.x;
        const y = mousePos.current.y;

        ctx.save();
        
        // Translate context to pointer location
        ctx.translate(x, y);

        // Combined tilt (inertia) and a very slow floating rotation effect
        const baseFloatRotation = Math.sin(timeSec * 2.0) * 0.08; // subtle floating oscillation
        const hoverRotationScale = isHoveringRef.current ? 1.5 : 1.0;
        ctx.rotate(tiltAngle.current + baseFloatRotation * hoverRotationScale);

        // Holographic Glass properties
        ctx.shadowBlur = isHoveringRef.current ? 22 : 12;
        ctx.shadowColor = '#06b6d4'; // Cyan neon glow

        // Gradient for glass fill
        const grad = ctx.createLinearGradient(0, 0, 15, 20);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
        grad.addColorStop(0.5, 'rgba(6, 182, 212, 0.35)');
        grad.addColorStop(1, 'rgba(34, 211, 238, 0.15)');

        // Draw classic arrow pointer outline starting from (0,0) tip
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(16, 16);
        ctx.lineTo(8, 16);
        ctx.lineTo(11, 22);
        ctx.lineTo(7.5, 23.5);
        ctx.lineTo(4.5, 17);
        ctx.lineTo(0, 20);
        ctx.closePath();

        // Fill glass background
        ctx.fillStyle = grad;
        ctx.fill();

        // Draw glowing cyan glass edge stroke
        ctx.strokeStyle = isHoveringRef.current ? 'rgba(34, 211, 238, 0.95)' : 'rgba(34, 211, 238, 0.75)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.restore();
      }

      // Reset shadow blur before drawing general particles
      ctx.shadowBlur = 0;

      // Update and draw general glowing particles
      const activeParticles = particlesRef.current;
      for (let i = activeParticles.length - 1; i >= 0; i--) {
        const p = activeParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        
        // Friction / drag
        p.vx *= 0.96;
        p.vy *= 0.96;
        
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          activeParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
        
        // Apply neon cyan glow to individual particles
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#06b6d4';
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();
        ctx.restore();
      }

      // Reset coordinates for velocity calculation
      prevMousePos.current = { ...mousePos.current };

      animationFrameId = requestAnimationFrame(updateFrame);
    };

    animationFrameId = requestAnimationFrame(updateFrame);

    return () => {
      // Re-enable browser cursor
      document.documentElement.classList.remove('cursor-none');
      document.body.classList.remove('cursor-none');

      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
    };
  }, [isSupportedDevice]);

  if (!isSupportedDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] mix-blend-screen"
    />
  );
}

