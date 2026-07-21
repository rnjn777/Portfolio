"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[var(--border-glass)] relative bg-[var(--bg-void)]">
      <div className="section-container">
        
        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 mt-12"
        >
          <p className="font-[family-name:var(--font-mono)] text-sm sm:text-base text-[var(--text-secondary)] uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
            &quot;Great software isn&apos;t just written — it&apos;s engineered with curiosity, creativity, and purpose.&quot;
          </p>
        </motion.div>

        {/* Huge Name text */}
        <div className="flex justify-center items-center overflow-hidden w-full select-none pointer-events-none opacity-20 mb-12">
           <h2 className="text-[15vw] font-extrabold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] to-transparent">
              RANJAN
           </h2>
        </div>

        {/* Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-[family-name:var(--font-mono)] uppercase tracking-widest border-t border-[var(--border-glass)] pt-8">
          <div className="flex items-center gap-4">
            <span className="text-[var(--text-primary)] font-bold">
              RANJAN KUMAR
            </span>
            <span>CREATIVE ENGINEER</span>
          </div>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()}</span>
            <span>//</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
