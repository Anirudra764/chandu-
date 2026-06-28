import React, { useEffect, useRef } from 'react';

export default function CampaignsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
      isSpark: boolean;
      pulseSpeed: number;
      pulseTime: number;

      constructor(isSpark = false) {
        this.isSpark = isSpark;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        
        if (isSpark) {
          this.vx = (Math.random() - 0.5) * 1.5;
          this.vy = -Math.random() * 2 - 0.5; // Sparks rise
          this.size = Math.random() * 2 + 1;
          this.color = Math.random() > 0.4 ? '230, 57, 70' : '255, 215, 0'; // Red or gold
          this.alpha = Math.random() * 0.8 + 0.2;
          this.decay = Math.random() * 0.01 + 0.005;
        } else {
          this.vx = (Math.random() - 0.5) * 0.4;
          this.vy = (Math.random() - 0.5) * 0.4;
          this.size = Math.random() * 3 + 1;
          this.color = Math.random() > 0.5 ? '59, 130, 246' : '230, 57, 70'; // Blue or red
          this.alpha = Math.random() * 0.3 + 0.1;
          this.decay = 0;
        }
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseTime = Math.random() * Math.PI;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.isSpark) {
          this.alpha -= this.decay;
          if (this.alpha <= 0) {
            this.resetSpark();
          }
        } else {
          this.pulseTime += this.pulseSpeed;
          this.alpha = 0.1 + Math.sin(this.pulseTime) * 0.15;

          // Wrap around edges
          if (this.x < 0) this.x = width;
          if (this.x > width) this.x = 0;
          if (this.y < 0) this.y = height;
          if (this.y > height) this.y = 0;
        }
      }

      resetSpark() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = -Math.random() * 2 - 1.0;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.size = Math.random() * 2 + 1;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        
        if (this.isSpark) {
          // Glow effect for sparks
          c.shadowBlur = 8;
          c.shadowColor = `rgba(${this.color}, 0.8)`;
        } else {
          c.shadowBlur = 4;
          c.shadowColor = `rgba(${this.color}, 0.3)`;
        }
        
        c.fill();
        c.restore();
      }
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));
    const sparkCount = 15;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(false));
    }
    for (let i = 0; i < sparkCount; i++) {
      particles.push(new Particle(true));
    }

    // Handle Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw digital grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      
      // Vertical grid lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal grid lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw soft volumetric light rays (faint lines from top)
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.01)';
      ctx.lineWidth = 3;
      for (let i = 0; i < 5; i++) {
        const xStart = (width / 5) * i + (width / 10);
        ctx.beginPath();
        ctx.moveTo(xStart, 0);
        ctx.lineTo(xStart + Math.sin(Date.now() * 0.0005 + i) * 100, height);
        ctx.stroke();
      }

      // 3. Update and Draw Particles & Sparks
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Slow moving ambient gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-red-600/5 blur-[120px] mix-blend-screen animate-[pulse_8s_infinite_alternate]" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[140px] mix-blend-screen animate-[pulse_10s_infinite_alternate]" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-500/[0.02] blur-[160px] pointer-events-none" />

      {/* Actual canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
    </div>
  );
}
