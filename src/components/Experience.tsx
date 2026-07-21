"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { Briefcase, Users } from "lucide-react";
import CyberText from "@/components/CyberText";

export default function Experience() {
  return (
    <section id="experience" className="py-32 sm:py-48 relative bg-[var(--bg-void)] border-t border-[var(--border-glass)] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-[50vw] h-[50vh] bg-gradient-to-l from-[var(--accent-cyan)] to-transparent blur-[120px] opacity-10 pointer-events-none" />

      <div className="section-container relative z-10">
        
        {/* Header */}
        <div className="mb-24 flex flex-col items-start">
          <div className="text-mask mb-2">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter text-[var(--text-muted)]"
            >
              <CyberText text="OPERATIONAL" />
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
              <CyberText text="HISTORY" />
            </motion.h2>
          </div>
        </div>

        <div className="max-w-4xl">
          {experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative pl-8 sm:pl-16 py-12 border-l border-[var(--border-glass)] hover:border-[var(--accent-cyan)] transition-colors"
            >
              {/* Timeline Node */}
              <div className="absolute left-[-5px] top-14 w-2.5 h-2.5 rounded-full bg-[var(--border-glass)] group-hover:bg-[var(--accent-cyan)] group-hover:shadow-[0_0_10px_var(--accent-cyan)] transition-all duration-300" />
              <div className="absolute left-[-24px] top-12 p-2 bg-[var(--bg-void)] rounded-full border border-[var(--border-glass)] group-hover:border-[var(--accent-cyan)] group-hover:text-[var(--accent-cyan)] text-[var(--text-muted)] transition-colors opacity-0 sm:opacity-100 hidden sm:block">
                {item.type === "work" ? <Briefcase size={14} /> : <Users size={14} />}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] uppercase tracking-tight">
                  {item.role}
                </h3>
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)] tracking-widest uppercase">
                  {item.period}
                </span>
              </div>
              
              <div className="font-[family-name:var(--font-mono)] text-sm text-[var(--accent-cyan)] mb-6 uppercase tracking-widest">
                {item.company}
              </div>

              <p className="text-lg text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl">
                {item.description}
              </p>
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
