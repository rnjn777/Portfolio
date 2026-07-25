"use client";

import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Github() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="github" className="py-32 relative bg-[var(--bg-void)] border-t border-[var(--border-glass)] overflow-hidden">
      
      <div className="absolute top-0 left-[50%] -translate-x-1/2 w-[80vw] h-[30vh] bg-gradient-to-b from-[var(--accent-cyan)] to-transparent blur-[150px] opacity-5 pointer-events-none" />

      <div className="section-container relative z-10 flex flex-col items-center">
        
        <div className="mb-16 text-center">
          <p className="text-[10px] sm:text-xs font-[family-name:var(--font-mono)] tracking-[0.3em] uppercase text-[var(--text-primary)]/50 mb-4">
            Open Source & Commits
          </p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-[var(--text-primary)]"
          >
            GITHUB ACTIVITY
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="neural-glass p-8 sm:p-12 rounded-3xl w-full max-w-5xl overflow-x-auto shadow-2xl flex justify-center"
        >
          {mounted && (
            <div className="min-w-[800px] flex justify-center overflow-visible">
              <GitHubCalendar 
                username="rnjn777" 
                colorScheme={theme === "light" ? "light" : "dark"}
                blockSize={14}
                blockMargin={6}
                fontSize={14}
                theme={{
                  light: ['#e5e7eb', '#99f6e4', '#2dd4bf', '#0f766e', '#042f2e'],
                  dark: ['#18181b', '#064e3b', '#059669', '#10b981', '#06b6d4'],
                }}
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
