"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for the outer circle
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Center the 32x32 circle
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseEnter);

    // Add magnetic/hover effects for specific classes
    const handleLinkHoverEnter = () => setIsHovering(true);
    const handleLinkHoverLeave = () => setIsHovering(false);

    const attachHoverListeners = () => {
      const interactables = document.querySelectorAll("a, button, input, textarea, select, .magnetic");
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", handleLinkHoverEnter);
        el.addEventListener("mouseleave", handleLinkHoverLeave);
      });
    };

    attachHoverListeners();

    // Re-attach listeners using MutationObserver for dynamically added elements
    const observer = new MutationObserver(() => {
      attachHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseEnter);
      observer.disconnect();
      
      const interactables = document.querySelectorAll("a, button, input, textarea, select, .magnetic");
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverEnter);
        el.removeEventListener("mouseleave", handleLinkHoverLeave);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--text-primary)] pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? "var(--text-primary)" : "transparent",
        }}
      />
    </>
  );
}
