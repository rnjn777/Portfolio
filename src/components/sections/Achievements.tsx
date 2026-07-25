"use client";

import { motion } from "framer-motion";
import { achievements } from "@/lib/data";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/Terminal";

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 sm:py-32 relative bg-[var(--bg-void)] overflow-hidden">
      <div className="section-container relative z-10">
        
        {/* Header */}
        <div className="mb-16 sm:mb-24 flex items-center justify-between border-b border-[var(--border-glass)] pb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[var(--text-primary)]"
          >
            Milestones
          </motion.h2>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[var(--text-primary)]/40 font-mono text-sm tracking-widest uppercase hidden sm:block"
          >
            [ Terminal Access ]
          </motion.span>
        </div>

        {/* Terminal */}
        <div className="flex justify-center w-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <Terminal className="w-full max-w-4xl text-sm sm:text-base md:text-lg">
              <TypingAnimation delay={0}>fetch-milestones --all</TypingAnimation>
              <AnimatedSpan delay={800} className="text-[var(--text-primary)]/50 mb-8 block">
                <span className="text-[var(--accent-purple)]">[+]</span> Establishing connection to milestone server... <span className="text-green-400">OK</span>
                <br />
                <span className="text-[var(--accent-purple)]">[+]</span> Fetching records... 
              </AnimatedSpan>

              {achievements.map((item, index) => {
                const baseDelay = 1800 + index * 1600;
                return (
                  <div key={item.title} className="mb-6">
                    <TypingAnimation delay={baseDelay}>
                      {`print_record ${index + 1}`}
                    </TypingAnimation>
                    <AnimatedSpan delay={baseDelay + 800} className="text-[var(--accent-cyan)] font-bold">
                      <span className="text-[var(--text-primary)]/30 mr-2">{"=>"}</span> {item.icon} {item.title}
                    </AnimatedSpan>
                    <AnimatedSpan delay={baseDelay + 1200} className="text-[var(--text-primary)]/60 italic border-l-2 border-[var(--border-glass)] ml-4 pl-4 mt-1">
                      {item.description}
                    </AnimatedSpan>
                  </div>
                );
              })}
              
              <TypingAnimation delay={1800 + achievements.length * 1600 + 500}>
                exit
              </TypingAnimation>
            </Terminal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
