"use client";

import { motion } from "framer-motion";
import { aboutText } from "@/lib/data";
import { useTheme } from "next-themes";

import { DiaTextReveal } from "@/components/ui/DiaTextReveal";
import { FlickeringGrid } from "@/components/ui/FlickeringGrid";

export default function About() {
  const { theme } = useTheme();
  
  return (
    <section id="about" className="py-32 sm:py-48 relative bg-[var(--bg-void)] overflow-hidden">
      {/* Background Flickering Grid */}
      <FlickeringGrid
        className="inset-0 z-0 size-full"
        squareSize={4}
        gridGap={6}
        color={theme === "light" ? "#E5E7EB" : "#3F3F46"}
        maxOpacity={theme === "light" ? 0.35 : 0.5}
        flickerChance={0.1}
      />
      
      <div className="section-container relative z-10">
        
        {/* Massive Section Title */}
        <div className="mb-24 flex flex-wrap gap-x-6 gap-y-2">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
          >
            <DiaTextReveal
              className="text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter block"
              text="ENGINEERING INTELLIGENCE"
              colors={["#06B6D4", "var(--text-primary)", "#8B5CF6"]}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Main Bio */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-[var(--text-primary)] font-normal leading-relaxed">
              {aboutText.intro}
            </p>
            
            <div className="pt-8 border-t border-[var(--border-glass)] grid sm:grid-cols-2 gap-8">
              {aboutText.highlights.map((point, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-[family-name:var(--font-mono)] text-[var(--accent-cyan)] mt-1">0{i+1}</span>
                  <span className="text-[var(--text-secondary)] font-normal leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Specs & Focus */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 space-y-16"
          >
            {/* Specs */}
            <div>
              <h3 className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)] tracking-widest uppercase mb-6 pb-4 border-b border-[var(--border-glass)]">
                SYSTEM_SPECS
              </h3>
              <ul className="space-y-4">
                {[
                  { label: "LOCATION", value: "NEW DELHI, INDIA" },
                  { label: "BASE", value: "NSUT DELHI" },
                  { label: "DEGREE", value: "B.TECH CSE (AI)" },
                  { label: "ROLE", value: "AI ENGINEER / CREATIVE DEV" }
                ].map((fact) => (
                  <li key={fact.label} className="flex justify-between items-end">
                    <span className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--text-muted)] font-medium">{fact.label}</span>
                    <span className="text-sm font-[family-name:var(--font-mono)] text-[var(--text-secondary)] uppercase font-medium">{fact.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Focus */}
            <div>
              <h3 className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)] tracking-widest uppercase mb-6 pb-4 border-b border-[var(--border-glass)]">
                COMPUTE_TARGETS
              </h3>
              <div className="flex flex-wrap gap-2">
                {aboutText.currentlyLearning.map((tech, i) => (
                  <span
                    key={i}
                    className="magnetic inline-flex items-center px-4 py-2 rounded-full border border-[var(--border-glass)] text-[10px] font-[family-name:var(--font-mono)] text-[var(--text-secondary)] uppercase hover:border-[var(--accent-cyan)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
