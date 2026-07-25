"use client";

import { motion } from "framer-motion";

export function DiaTextReveal({
  text,
  className = "",
  colors = ["#A97CF8", "#F38CB8", "#FDCC92"]
}: {
  text: string;
  className?: string;
  colors?: string[];
}) {
  return (
    <div className="relative inline-block overflow-hidden">
      {/* Background/Shadow text (faint) */}
      <span className={`text-[var(--text-muted)] opacity-20 relative z-0 ${className}`}>
        {text}
      </span>
      
      {/* Animated gradient sweep text */}
      <motion.div
        className={`absolute inset-0 z-10 bg-clip-text text-transparent ${className}`}
        style={{
          backgroundImage: `linear-gradient(90deg, transparent 0%, ${colors[0]} 40%, ${colors[1]} 50%, ${colors[2]} 60%, transparent 100%)`,
          backgroundSize: "200% 100%",
        }}
        initial={{ backgroundPosition: "200% 0%" }}
        whileInView={{ backgroundPosition: "-200% 0%" }}
        viewport={{ once: false, margin: "-10%" }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1
        }}
      >
        {text}
      </motion.div>
    </div>
  );
}
