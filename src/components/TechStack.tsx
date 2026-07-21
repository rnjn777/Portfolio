"use client";

import { motion } from "framer-motion";
import { techStack } from "@/lib/data";
import CyberText from "@/components/CyberText";

export default function TechStack() {
  return (
    <section id="skills" className="py-32 sm:py-48 relative bg-[var(--bg-void)] border-t border-[var(--border-glass)] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-gradient-to-b from-[var(--text-muted)] to-transparent blur-[150px] opacity-5 pointer-events-none" />

      <div className="section-container relative z-10">
        
        {/* Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <div className="text-mask mb-2">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter text-[var(--text-muted)]"
            >
              <CyberText text="TECHNICAL" />
            </motion.h2>
          </div>
          <div className="text-mask">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0], delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter text-[var(--text-primary)]"
            >
              <CyberText text="ARSENAL" />
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-glass)] border border-[var(--border-glass)]">
          {techStack.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[var(--bg-void)] p-8 sm:p-12 hover:bg-[var(--bg-surface)] transition-colors group relative overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-cyan)] to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              
              <h3 className="font-[family-name:var(--font-mono)] text-sm text-[var(--accent-cyan)] mb-8 uppercase tracking-widest flex items-center justify-between">
                {category.category}
                <span className="text-[10px] text-[var(--text-muted)] opacity-50 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
              </h3>
              
              <ul className="space-y-4">
                {category.techs.map((tech) => (
                  <li key={tech} className="magnetic w-fit text-xl sm:text-2xl font-bold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors tracking-tight">
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
