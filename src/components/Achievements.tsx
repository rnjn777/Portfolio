"use client";

import { motion } from "framer-motion";
import { achievements } from "@/lib/data";
import CyberText from "@/components/CyberText";

export default function Achievements() {
  return (
    <section id="achievements" className="py-32 sm:py-48 relative bg-[var(--bg-void)] border-t border-[var(--border-glass)] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-1/4 left-0 w-[50vw] h-[50vh] bg-gradient-to-r from-[var(--text-muted)] to-transparent blur-[120px] opacity-5 pointer-events-none" />

      <div className="section-container relative z-10">
        
        {/* Header */}
        <div className="mb-24 flex flex-col items-end text-right">
          <div className="text-mask mb-2">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter text-[var(--text-muted)]"
            >
              <CyberText text="PROVEN" />
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
              <CyberText text="MILESTONES" />
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`neural-glass p-8 sm:p-12 rounded-sm relative group overflow-hidden transition-all duration-500 hover:-translate-y-2 ${item.highlight ? 'border-[var(--accent-cyan)]/30 shadow-[0_0_30px_rgba(0,255,255,0.05)]' : ''}`}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.05)] to-transparent group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
              
              <div className="text-4xl mb-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all origin-left">
                {item.icon}
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-4 tracking-tight leading-snug group-hover:text-[var(--accent-cyan)] transition-colors">
                {item.title}
              </h3>
              
              <p className="text-[var(--text-secondary)] font-light leading-relaxed">
                {item.description}
              </p>
              
              {item.highlight && (
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute transform rotate-45 bg-[var(--accent-cyan)] text-[var(--bg-void)] font-[family-name:var(--font-mono)] text-[8px] font-bold py-1 w-24 text-center top-3 -right-6 shadow-sm">
                    TOP
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
