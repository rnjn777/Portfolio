"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function SpotlightProfile() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hasMoved, setHasMoved] = useState(false);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!hasMoved) setHasMoved(true);
    };
    
    // Set initial center position before mouse moves
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, hasMoved]);

  const maskImage = useMotionTemplate`radial-gradient(circle ${hasMoved ? "400px" : "200px"} at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      
      {/* Base Layer: Dimmed, grayscale, deeply blended with the background */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[80vh] sm:inset-0 sm:h-auto bg-contain sm:bg-cover bg-bottom sm:bg-center bg-no-repeat opacity-10 mix-blend-luminosity grayscale blur-sm"
        style={{ backgroundImage: "url('/profile.jpg')" }}
      />

      {/* Reveal Layer: Full color spotlight masked by cursor */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[80vh] sm:inset-0 sm:h-auto bg-contain sm:bg-cover bg-bottom sm:bg-center bg-no-repeat mix-blend-screen transition-opacity duration-1000"
        style={{
          backgroundImage: "url('/profile.jpg')",
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          opacity: hasMoved ? 0.6 : 0.2,
        }}
      />
    </div>
  );
}
