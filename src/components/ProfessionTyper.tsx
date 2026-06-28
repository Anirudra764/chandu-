import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProfessionTyper() {
  const [text, setText] = useState("");
  const targetText = "META ADS EXPERT";
  const [isDone, setIsDone] = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);

  useEffect(() => {
    // Wait for the sequential reveal time (4.0 seconds after load)
    const delayTimer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < targetText.length) {
          setText(targetText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsDone(true);
          // Wait briefly, then hide cursor and draw underline
          setTimeout(() => {
            setShowUnderline(true);
          }, 350);
        }
      }, 75); // Professional typing speed

      return () => clearInterval(interval);
    }, 4000);

    return () => clearTimeout(delayTimer);
  }, []);

  return (
    <div className="relative inline-block select-none py-1">
      <div className="flex items-center justify-center lg:justify-start h-10 sm:h-12">
        <span className="font-display font-black text-lg sm:text-2xl text-[#e63946] tracking-widest glow-text-red uppercase">
          {text}
        </span>
        
        {/* Blinking red cursor, disappears after done */}
        <AnimatePresence>
          {!showUnderline && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, repeatType: "reverse", ease: "easeInOut" }}
              exit={{ opacity: 0 }}
              className="w-[3px] h-6 bg-[#e63946] ml-2 self-center"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Red underline that grows underneath */}
      <div className="relative w-full h-[3px] mt-1 bg-neutral-900/40 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={showUnderline ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-[#e63946] shadow-[0_0_8px_#e63946]"
        />
      </div>
    </div>
  );
}
