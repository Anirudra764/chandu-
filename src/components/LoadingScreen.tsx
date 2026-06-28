import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingTexts = [
  "OPTIMIZING BUDGETS...",
  "AUDITING META ADS...",
  "RANKING SEO KEYWORDS...",
  "BUILDING FUNNELS...",
  "SCALING CAMPAIGNS...",
  "CONVERTING ATTENTION..."
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentText, setCurrentText] = useState(loadingTexts[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Text cycle
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % loadingTexts.length;
      setCurrentText(loadingTexts[textIndex]);
    }, 400);

    // Progress counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(onComplete, 400); // Small delay for fadeout
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      id="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col items-center justify-center p-4"
    >
      {/* Background neon dust glow */}
      <div className="absolute w-[300px] h-[300px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative flex flex-col items-center">
        {/* Glowing CM Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-28 h-28 flex items-center justify-center rounded-full border border-red-500/25 glow-red bg-[#121212] mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute inset-1 border-t border-r border-red-500 rounded-full"
          />
          <span className="font-display font-bold text-3xl tracking-widest text-white glow-text-red">
            CM
          </span>
        </motion.div>

        {/* Brand name */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display font-bold text-lg text-white tracking-[0.25em] text-center mb-2"
        >
          CHANDAN MAHANTY
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.3 }}
          className="font-mono text-xs text-neutral-400 tracking-wider text-center h-4 mb-8"
        >
          {currentText}
        </motion.p>

        {/* Progress Bar Container */}
        <div className="w-48 h-[2px] bg-neutral-900 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-red-500 shadow-[0_0_8px_#e63946]"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.span
          className="font-mono text-[10px] text-red-500/80 mt-2 tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {Math.min(progress, 100)}%
        </motion.span>
      </div>
    </motion.div>
  );
}
