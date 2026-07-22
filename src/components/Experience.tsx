"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { experience } from "@/lib/data";
import { Briefcase, Users, ArrowUpRight, Minus, Plus } from "lucide-react";
import CyberText from "@/components/CyberText";

export default function Experience() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Giant background number that shifts on scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);

  const toggle = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="relative bg-[var(--bg-void)] overflow-hidden py-32 sm:py-48"
    >
      {/* Giant scrolling background text for depth */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute -right-10 top-0 text-[30vw] font-extrabold text-[var(--bg-surface)] opacity-50 leading-none select-none pointer-events-none tracking-tighter uppercase whitespace-nowrap"
      >
        EXP
      </motion.div>

      <div className="relative z-10 px-6 sm:px-12 lg:px-20">
        
        {/* Header */}
        <div className="mb-20 sm:mb-32 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
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
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm text-[var(--text-muted)] font-[family-name:var(--font-mono)] uppercase tracking-widest max-w-xs text-right"
          >
            {experience.length} entries logged
          </motion.p>
        </div>

        {/* Accordion Items */}
        <div className="max-w-6xl mx-auto">
          {experience.map((item, index) => {
            const isExpanded = expandedIdx === index;
            const isWork = item.type === "work";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group"
              >
                {/* Separator */}
                <div className={`h-px transition-colors duration-500 ${
                  isExpanded ? "bg-[var(--accent-cyan)]" : "bg-[var(--border-glass)] group-hover:bg-[var(--text-muted)]"
                }`} />

                {/* Clickable Header Row */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left py-8 sm:py-10 flex items-start sm:items-center gap-4 sm:gap-8 cursor-pointer"
                >
                  {/* Index Number */}
                  <span className={`font-[family-name:var(--font-mono)] text-xs sm:text-sm tracking-widest transition-colors duration-500 shrink-0 w-10 ${
                    isExpanded ? "text-[var(--accent-cyan)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
                  }`}>
                    0{index + 1}
                  </span>

                  {/* Role Title — the star of each row */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight transition-all duration-500 leading-tight ${
                      isExpanded 
                        ? "text-[var(--accent-cyan)]" 
                        : "text-[var(--text-primary)] group-hover:translate-x-2"
                    }`}>
                      {item.role}
                    </h3>
                  </div>

                  {/* Type Badge */}
                  <div className={`hidden sm:flex items-center gap-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest transition-colors duration-500 shrink-0 ${
                    isExpanded ? "text-[var(--accent-cyan)]" : "text-[var(--text-muted)]"
                  }`}>
                    {isWork ? <Briefcase size={12} /> : <Users size={12} />}
                    {isWork ? "WORK" : "LEAD"}
                  </div>

                  {/* Expand/Collapse Icon */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${
                    isExpanded 
                      ? "border-[var(--accent-cyan)] text-[var(--accent-cyan)] rotate-0" 
                      : "border-[var(--border-glass)] text-[var(--text-muted)] group-hover:border-[var(--text-secondary)] group-hover:text-[var(--text-secondary)]"
                  }`}>
                    {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {/* Expandable Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 sm:pb-14 pl-14 sm:pl-[4.5rem] flex flex-col lg:flex-row gap-8 lg:gap-16">
                        
                        {/* Left: Meta info */}
                        <div className="lg:w-64 shrink-0 flex flex-col gap-4">
                          <div>
                            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                              Organization
                            </span>
                            <span className="text-lg sm:text-xl font-semibold text-[var(--accent-cyan)] uppercase tracking-wide">
                              {item.company}
                            </span>
                          </div>
                          <div>
                            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                              Duration
                            </span>
                            <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--text-secondary)]">
                              {item.period}
                            </span>
                          </div>
                          <div>
                            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                              Classification
                            </span>
                            <span className={`inline-flex items-center gap-2 text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest px-3 py-1 border rounded-full ${
                              isWork 
                                ? "border-[var(--accent-cyan)] text-[var(--accent-cyan)]" 
                                : "border-[var(--accent-purple)] text-[var(--accent-purple)]"
                            }`}>
                              {isWork ? <Briefcase size={10} /> : <Users size={10} />}
                              {isWork ? "Employment" : "Leadership"}
                            </span>
                          </div>
                        </div>

                        {/* Right: Description */}
                        <div className="flex-1">
                          <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-3">
                            Mission Brief
                          </span>
                          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl">
                            {item.description}
                          </p>
                          
                          {/* Decorative terminal line */}
                          <div className="mt-6 font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-muted)]">
                            <span className="text-[var(--accent-cyan)]">&gt;</span> status: {isWork ? "COMPLETED" : "ACTIVE"} 
                            <span className="ml-2 inline-block w-1.5 h-3 bg-[var(--accent-cyan)] animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          
          {/* Final separator */}
          <div className="h-px bg-[var(--border-glass)]" />
        </div>
      </div>
    </section>
  );
}
