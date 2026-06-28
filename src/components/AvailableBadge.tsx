import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function AvailableBadge() {
  const [showDot, setShowDot] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    // Dot powers on after badge slide-in completes
    const dotTimer = setTimeout(() => {
      setShowDot(true);
    }, 2100);

    // Particle burst slightly after
    const burstTimer = setTimeout(() => {
      setBurst(true);
    }, 2300);

    return () => {
      clearTimeout(dotTimer);
      clearTimeout(burstTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ x: -120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        delay: 1.6,
        type: "spring",
        stiffness: 85,
        damping: 14,
        mass: 0.9
      }}
      className="inline-flex items-center space-x-2.5 bg-[#e63946]/10 border border-[#e63946]/20 px-4 py-1.5 rounded-full w-fit select-none relative"
    >
      <div className="relative flex items-center justify-center w-3 h-3">
        {showDot && (
          <>
            {/* Pulsating Ring */}
            <div className="absolute w-2.5 h-2.5 bg-red-500 rounded-full animate-ping opacity-75" />
            <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_#e63946]" />
          </>
        )}

        {/* Small particle burst */}
        {burst && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(6)].map((_, i) => {
              const angle = (i * 360) / 6;
              const distance = 14;
              return (
                <motion.span
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((angle * Math.PI) / 180) * distance,
                    y: Math.sin((angle * Math.PI) / 180) * distance,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute w-1 h-1 bg-red-500 rounded-full"
                />
              );
            })}
          </div>
        )}
      </div>
      <span className="font-mono text-[9px] font-bold text-[#e63946] tracking-[0.2em] uppercase">
        AVAILABLE FOR HIGH-ROAS CONVERSIONS
      </span>
    </motion.div>
  );
}
