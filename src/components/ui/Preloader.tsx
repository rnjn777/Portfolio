"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Quick cinematic counter
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 500); // slight pause at 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] bg-[var(--bg-void)] flex flex-col items-center justify-center text-[var(--text-primary)]"
        >
          <div className="absolute inset-0 dither-bg opacity-20 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="text-[10vw] font-extrabold tracking-tighter leading-none mb-4 font-[family-name:var(--font-display)] text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-muted)]">
              {progress.toString().padStart(3, '0')}
            </div>
            <div className="font-[family-name:var(--font-mono)] text-xs text-[var(--accent-cyan)] tracking-[0.3em] uppercase animate-pulse">
              INITIALIZING NEURAL INTERFACE...
            </div>
            <div className="w-64 h-[1px] bg-[rgba(255,255,255,0.1)] mt-12 relative overflow-hidden">
              <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-[var(--accent-cyan)]"
                style={{ width: `${progress}%` }}
                layoutId="progress"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
