"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Quick cinematic counter
    const duration = 800; // Decreased from 2000
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 200); // slight pause at 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="fixed inset-0 z-[999] pointer-events-none flex flex-col">
          {/* Top Blast Door */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="flex-1 bg-[var(--bg-void)]"
          />
          {/* Bottom Blast Door */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="flex-1 bg-[var(--bg-void)]"
          />

          {/* Content Overlay */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text-primary)]"
          >
            <div className="absolute inset-0 dither-bg opacity-20 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="text-[10vw] font-extrabold tracking-tighter leading-none mb-4 font-[family-name:var(--font-display)] text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-muted)]">
                {progress.toString().padStart(3, '0')}
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] sm:text-xs text-[var(--accent-cyan)] tracking-[0.2em] uppercase animate-pulse">
                INITIALIZING NEURAL INTERFACE...
              </div>

              {/* Terminal Logs */}
              <div className="mt-8 font-[family-name:var(--font-mono)] text-[9px] sm:text-[10px] text-[var(--accent-cyan)] flex flex-col items-start w-64 text-left p-3 border border-[var(--accent-cyan)]/20 bg-[var(--bg-void)]/60 relative">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[var(--accent-cyan)]/50" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[var(--accent-cyan)]/50" />
                
                <span className="mb-1 opacity-70">{">"} SYS_INIT...</span>
                {progress > 10 && <span className="mb-1 opacity-80">{">"} FINDING_USER...</span>}
                {progress > 50 && <span className="mb-1 text-[var(--text-primary)] drop-shadow-[0_0_8px_var(--text-primary)]">{">"} USER_FOUND: RANJAN_K</span>}
                {progress > 80 && <span className="mb-1 opacity-90">{">"} ACCESS_GRANTED</span>}
              </div>

              {/* Progress Bar */}
              <div className="w-64 h-[1px] bg-[var(--text-primary)]/10 mt-6 relative overflow-hidden">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-[var(--accent-cyan)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
