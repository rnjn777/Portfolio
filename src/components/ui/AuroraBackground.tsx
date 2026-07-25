"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function AuroraBackground() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Very slow, organic damping
  const springConfig = { damping: 50, stiffness: 100, mass: 2 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize between -0.5 and 0.5
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      
      // Move by a max of 200px in either direction
      cursorX.set(x * 200);
      cursorY.set(y * 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[var(--bg-void)]">
      {/* Primary Aurora */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[var(--accent-glow)] blur-[150px] opacity-30 mix-blend-screen"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Secondary Aurora */}
      <motion.div
        style={{ 
          x: useSpring(useMotionValue(0), { ...springConfig, mass: 4 }), // even slower
          y: useSpring(useMotionValue(0), { ...springConfig, mass: 4 })
        }}
        className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] rounded-full bg-[var(--accent-purple)] blur-[150px] opacity-20 mix-blend-screen"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
