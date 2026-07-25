"use client";

import { motion } from "framer-motion";
import { techStack } from "@/lib/data";
import CyberText from "@/components/ui/CyberText";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/ScrollVelocity";

export default function TechStack() {
  return (
    <section id="tech" className="py-32 relative bg-[var(--bg-void)] border-t border-[var(--border-glass)]">
      <div className="section-container">
        
        {/* Header */}
        <div className="mb-24 relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
          <ScrollVelocityContainer className="text-5xl sm:text-7xl md:text-9xl font-bold uppercase tracking-tighter">
            <ScrollVelocityRow baseVelocity={2} direction={1} className="text-[var(--text-muted)] opacity-50 mb-4">
              TECHNICAL&nbsp;&nbsp;&nbsp;&nbsp;
            </ScrollVelocityRow>
            <ScrollVelocityRow baseVelocity={2} direction={-1} className="text-[var(--text-primary)]">
              ARSENAL&nbsp;&nbsp;&nbsp;&nbsp;
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--bg-void)] to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--bg-void)] to-transparent z-10"></div>
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
