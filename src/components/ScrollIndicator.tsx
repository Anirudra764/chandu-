import React from 'react';
import { motion } from 'motion/react';

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none z-20">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="font-mono text-[8px] text-white tracking-[0.25em] uppercase mb-2"
      >
        Scroll Down
      </motion.div>
      <div className="w-[1.5px] h-14 bg-white/10 rounded-full overflow-hidden relative shadow-[0_0_8px_rgba(255,255,255,0.1)]">
        <motion.div
          animate={{
            y: [-10, 60],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-full h-3.5 bg-gradient-to-b from-red-500 to-[#e63946] rounded-full shadow-[0_0_10px_#e63946]"
        />
      </div>
    </div>
  );
}
