import React from 'react';
import { BarChart3, TrendingUp, Target, Sparkles, Award } from 'lucide-react';

export default function Vision3DCube(): React.JSX.Element {
  return (
    <div className="relative w-full flex flex-col items-center justify-center py-12 select-none">
      {/* Scope Style Block to handle clean responsive 3D animations and variables */}
      <style>{`
        .cube-scene {
          perspective: 1200px;
        }
        
        .cube-wrapper {
          width: 280px;
          height: 280px;
          position: relative;
          transform-style: preserve-3d;
          animation: rotate-cube 14s linear infinite;
          transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
          --translate-z: 140px;
        }

        @media (min-width: 640px) {
          .cube-wrapper {
            width: 400px;
            height: 400px;
            --translate-z: 200px;
          }
        }

        @keyframes rotate-cube {
          0% {
            transform: rotateX(-15deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(-15deg) rotateY(360deg);
          }
        }

        .cube-scene:hover .cube-wrapper {
          animation-play-state: paused;
        }

        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: visible;
          border: 1px solid rgba(230, 57, 70, 0.15);
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          flex-col: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          box-shadow: inset 0 0 30px rgba(230, 57, 70, 0.05), 0 10px 40px rgba(0, 0, 0, 0.8);
          transition: border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease;
        }

        @media (min-width: 640px) {
          .cube-face {
            padding: 40px;
          }
        }

        .cube-scene:hover .cube-face {
          border-color: rgba(230, 57, 70, 0.4);
          box-shadow: inset 0 0 40px rgba(230, 57, 70, 0.12), 0 15px 50px rgba(230, 57, 70, 0.15);
          background: rgba(14, 14, 14, 0.85);
        }

        /* 3D Transform positioning for each face */
        .face-front {
          transform: rotateY(0deg) translateZ(var(--translate-z));
        }
        .face-back {
          transform: rotateY(180deg) translateZ(var(--translate-z));
        }
        .face-right {
          transform: rotateY(90deg) translateZ(var(--translate-z));
        }
        .face-left {
          transform: rotateY(-90deg) translateZ(var(--translate-z));
        }
        .face-top {
          transform: rotateX(90deg) translateZ(var(--translate-z));
        }
        .face-bottom {
          transform: rotateX(-90deg) translateZ(var(--translate-z));
        }
      `}</style>

      {/* 3D Scene viewport */}
      <div className="cube-scene w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
        <div className="cube-wrapper">
          
          {/* 1. FRONT FACE: Full quote in white serif italic */}
          <div className="cube-face face-front rounded-2xl flex flex-col justify-between text-left">
            <div className="flex items-center justify-between w-full opacity-65 font-mono text-[10px] tracking-widest text-[#e63946]">
              <span>01 / MISSION</span>
              <Award size={14} />
            </div>
            <blockquote className="font-serif italic text-base sm:text-xl md:text-2xl text-white/95 leading-relaxed tracking-tight my-auto">
              &ldquo;Turning attention into real results through high-performance digital advertising and creative growth strategy.&rdquo;
            </blockquote>
            <div className="w-12 h-[1px] bg-[#e63946] opacity-60" />
          </div>

          {/* 2. BACK FACE: Brand Statement / Target */}
          <div className="cube-face face-back rounded-2xl flex flex-col justify-between text-left">
            <div className="flex items-center justify-between w-full opacity-65 font-mono text-[10px] tracking-widest text-[#e63946]">
              <span>02 / RESULT</span>
              <Target size={14} />
            </div>
            <div className="my-auto">
              <h4 className="text-white font-display font-black text-2xl sm:text-3xl tracking-tight leading-tight uppercase mb-2">
                Attention to Value
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                We craft high-performance systems designed to maximize return on ad spend and build real authority.
              </p>
            </div>
            <div className="w-12 h-[1px] bg-[#e63946] opacity-60" />
          </div>

          {/* 3. RIGHT FACE: "High-Performance" in red, huge 72px */}
          <div className="cube-face face-right rounded-2xl flex flex-col justify-between text-center">
            <div className="flex items-center justify-between w-full opacity-65 font-mono text-[10px] tracking-widest text-[#e63946]">
              <span>03 / POWER</span>
              <Sparkles size={14} />
            </div>
            <div className="my-auto flex flex-col items-center">
              <span className="text-[#e63946] font-display font-black text-3xl sm:text-5xl md:text-[54px] tracking-tighter leading-none uppercase break-words max-w-full drop-shadow-[0_4px_12px_rgba(230,57,70,0.3)]">
                High
              </span>
              <span className="text-white font-display font-black text-2xl sm:text-4xl md:text-[44px] tracking-tighter leading-none uppercase break-words max-w-full">
                Performance
              </span>
            </div>
            <div className="w-12 h-[1px] bg-[#e63946] mx-auto opacity-60" />
          </div>

          {/* 4. LEFT FACE: "Creative Growth" with an upward arrow */}
          <div className="cube-face face-left rounded-2xl flex flex-col justify-between text-center">
            <div className="flex items-center justify-between w-full opacity-65 font-mono text-[10px] tracking-widest text-[#e63946]">
              <span>04 / CREATIVE</span>
              <TrendingUp size={14} />
            </div>
            <div className="my-auto flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#1a0505] border border-[#3d1515] text-[#e63946]">
                <TrendingUp size={22} />
              </div>
              <div>
                <h4 className="text-white font-display font-black text-xl sm:text-2xl uppercase tracking-wider">
                  Creative Growth
                </h4>
                <p className="text-[#e63946] font-mono text-[10px] tracking-widest mt-1 uppercase">
                  Scaling Safely
                </p>
              </div>
            </div>
            <div className="w-12 h-[1px] bg-[#e63946] mx-auto opacity-60" />
          </div>

          {/* 5. TOP FACE: "Digital Advertising" with a bar chart icon */}
          <div className="cube-face face-top rounded-2xl flex flex-col justify-between text-center">
            <div className="flex items-center justify-between w-full opacity-65 font-mono text-[10px] tracking-widest text-[#e63946]">
              <span>05 / ACQUISITION</span>
              <BarChart3 size={14} />
            </div>
            <div className="my-auto flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#1a0505] border border-[#3d1515] text-[#e63946]">
                <BarChart3 size={22} />
              </div>
              <h4 className="text-white font-display font-black text-xl sm:text-2xl uppercase tracking-wider max-w-[200px]">
                Digital Advertising
              </h4>
            </div>
            <div className="w-12 h-[1px] bg-[#e63946] mx-auto opacity-60" />
          </div>

          {/* 6. BOTTOM FACE: Brand signature */}
          <div className="cube-face face-bottom rounded-2xl flex flex-col justify-between text-center">
            <div className="flex items-center justify-between w-full opacity-65 font-mono text-[10px] tracking-widest text-[#e63946]">
              <span>06 / MANIFESTO</span>
              <Award size={14} />
            </div>
            <div className="my-auto">
              <span className="text-neutral-500 font-mono text-[10px] tracking-[0.3em] uppercase block mb-1">
                CHANDAN MAHANTY
              </span>
              <span className="text-white/80 font-serif italic text-sm">
                "Vision of Scale"
              </span>
            </div>
            <div className="w-12 h-[1px] bg-[#e63946] mx-auto opacity-60" />
          </div>

        </div>
      </div>
    </div>
  );
}
