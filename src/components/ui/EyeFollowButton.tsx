"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function EyeFollowButton({
  label = "START A PROJECT",
  href = "#contact"
}: {
  label?: string;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      
      // Center of the eye
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      // Calculate angle and distance
      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      
      // Max distance the pupil can move from the center
      const maxDistance = 3; 
      
      // The further the mouse, the closer to maxDistance the pupil gets
      const distance = Math.min(
        Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 20,
        maxDistance 
      );

      setMousePos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <a 
      href={href}
      className="magnetic group relative flex items-center justify-center gap-3 px-6 py-3 border border-[var(--border-glass)] hover:border-[var(--accent-cyan)] transition-colors rounded-full overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--text-primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      {/* Label */}
      <span className="text-[10px] font-mono tracking-widest text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors z-10 pointer-events-none">
        {label}
      </span>

      {/* The Eye Sclera (White part) */}
      <div 
        ref={ref}
        className="w-5 h-5 rounded-full bg-[var(--text-primary)] flex items-center justify-center relative z-10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-none"
      >
        {/* The Pupil (Black dot) */}
        <motion.div
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.2 }}
          className="w-2.5 h-2.5 rounded-full bg-[var(--bg-void)] relative flex items-center justify-center"
        >
          {/* Eye shine reflection */}
          <div className="absolute top-[2px] right-[2px] w-[2px] h-[2px] bg-[var(--text-primary)]/80 rounded-full" />
        </motion.div>
      </div>
    </a>
  );
}
