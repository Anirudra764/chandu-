import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function ClientsBadge() {
  const [count, setCount] = useState(0);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    // Starts counting when badge appears (2.2s after load)
    const startTimer = setTimeout(() => {
      let current = 0;
      const target = 120;
      const step = 4;
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
          setBlink(true);
        } else {
          setCount(current);
        }
      }, 20);
      return () => clearInterval(interval);
    }, 2200);

    return () => clearTimeout(startTimer);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.2, type: "spring", stiffness: 95, damping: 15 }}
      className="inline-flex items-center space-x-2.5 bg-neutral-950/80 border border-white/5 px-4 py-2 rounded-2xl shadow-[0_0_20px_rgba(230,57,70,0.06)] backdrop-blur-md select-none w-fit"
    >
      <div className="relative w-2.5 h-2.5 flex items-center justify-center">
        <motion.div
          animate={blink ? { opacity: [1, 0, 1] } : { opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#e63946]"
        />
      </div>
      <span className="font-display font-bold text-xs tracking-wider text-white">
        {count}+ GLOBAL CLIENTS
      </span>
    </motion.div>
  );
}
