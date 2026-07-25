"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { currentlyBuilding } from "@/lib/data";

export default function CurrentlyBuilding() {
  const [displayedLines, setDisplayedLines] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayedLines((prev) => {
        if (prev >= currentlyBuilding.length) return prev;
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(timer);
  }, []);

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
              SEC 08 // ACTIVE_PROCESSES
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
              CURRENTLY <span className="text-[var(--text-muted)]">BUILDING</span>
            </h2>
          </div>
          <div className="hidden md:block font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-muted)] text-right">
            <div>TASK_QUEUE: {currentlyBuilding.length}</div>
            <div>RUNTIME: CONTINUOUS</div>
          </div>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-surface)] border border-[var(--border-glass)] max-w-2xl font-[family-name:var(--font-mono)] relative overflow-hidden flex flex-col"
        >
          <div className="absolute inset-0 dither-bg opacity-20 pointer-events-none" />

          {/* Terminal header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--border-glass)] bg-[var(--bg-void)] relative z-10">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-none bg-[var(--text-muted)]" />
                <div className="w-2 h-2 rounded-none bg-[var(--text-muted)]" />
                <div className="w-2 h-2 rounded-none bg-[var(--text-muted)]" />
              </div>
              <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                RK_SYS_TERMINAL_V2
              </span>
            </div>
            <span className="text-[10px] text-[var(--accent-cyan)] animate-pulse">
              SYS_ACTIVE
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-6 sm:p-8 space-y-4 text-sm relative z-10">
            <div className="text-[var(--text-muted)]">
              &gt; EXECUTING SCRIPT: fetch_active_processes.sh...
            </div>

            <div className="mt-4 space-y-3">
              {currentlyBuilding.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: i < displayedLines ? 1 : 0.2, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.3 }}
                  className="flex items-start sm:items-center flex-col sm:flex-row gap-2 sm:gap-4 group"
                >
                  <span className="text-[10px] text-[var(--text-muted)] w-16">
                    [{String(i + 1).padStart(2, '0')}]
                  </span>
                  
                  <div className="flex items-center gap-3 flex-1">
                    <span
                      className={
                        item.status === "complete"
                          ? "text-[var(--accent-cyan)]"
                          : "text-[var(--accent-red)]"
                      }
                    >
                      {item.status === "complete" ? "[ OK ]" : "[WAIT]"}
                    </span>
                    <span className={`uppercase tracking-wide ${item.status === "complete" ? "text-[var(--text-secondary)]" : "text-[var(--text-primary)]"}`}>
                      {item.name}
                    </span>
                  </div>
                  
                  {item.status === "active" && (
                    <span className="text-[10px] px-2 py-1 border border-[var(--accent-red)] text-[var(--accent-red)] bg-[var(--accent-red)]/10 animate-pulse mt-2 sm:mt-0">
                      IN_PROGRESS
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex items-center">
              <span className="text-[var(--text-muted)] mr-2">&gt;</span>
              <span className="w-2.5 h-4 bg-[var(--text-primary)] animate-[pulse_1s_step-end_infinite]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
