"use client";

import { motion } from "framer-motion";
import { certifications, careerGoals } from "@/lib/data";

export function Certifications() {
  return (
    <section className="py-24 relative bg-[var(--bg-void)] border-t border-[var(--border-glass)]">
      <div className="section-container">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-[family-name:var(--font-mono)] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-2 block">
              SEC 09 // KNOWLEDGE_BASE
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
              CERTIFIED <span className="text-[var(--text-muted)]">MODELS</span>
            </h2>
          </div>
          <div className="hidden md:block font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-muted)] text-right">
            <div>ACCREDITATIONS: {certifications.length}</div>
            <div>STATUS: VERIFIED</div>
          </div>
        </motion.div>

        {/* Data Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-glass)] border border-[var(--border-glass)]">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--bg-surface)] p-6 group relative overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-[10px] text-[var(--text-primary)] font-[family-name:var(--font-mono)] bg-[var(--text-primary)]/10 px-2 py-1">
                  {cert.year}
                </div>
                <div className="w-1.5 h-1.5 bg-[var(--text-muted)] group-hover:bg-[var(--accent-cyan)] transition-colors" />
              </div>
              <h3 className="font-[family-name:var(--font-mono)] text-sm font-semibold mb-2 uppercase tracking-wide text-[var(--text-primary)] mt-auto">
                {cert.name}
              </h3>
              <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">
                ISSUER: {cert.issuer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CareerGoals() {
  return (
    <section className="py-24 relative bg-[var(--bg-surface)] border-t border-[var(--border-glass)]">
      <div className="section-container">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <span className="text-[10px] font-[family-name:var(--font-mono)] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-2 block">
              SEC 10 // TARGET_VECTORS
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
              CAREER <span className="text-[var(--text-muted)]">OBJECTIVES</span>
            </h2>
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-secondary)] mt-4 max-w-xl leading-relaxed uppercase">
              SEEKING OPPORTUNITIES IN AI ENGINEERING, FULL-STACK DEVELOPMENT, AND BUILDING INTELLIGENT PRODUCTS THAT SOLVE REAL-WORLD PROBLEMS.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 md:max-w-md justify-end">
            {careerGoals.map((goal, i) => (
              <motion.span
                key={goal}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-3 py-1.5 border border-[var(--border-glass)] text-[10px] font-[family-name:var(--font-mono)] text-[var(--text-secondary)] bg-[var(--bg-void)] uppercase tracking-wider hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-colors"
              >
                TARGET: {goal}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
