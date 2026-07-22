"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { personalInfo } from "@/lib/data";
import Magnetic from "@/components/Magnetic";
import TextScramble from "@/components/TextScramble";
import NeuralNetwork3D from "@/components/NeuralNetwork3D";
import { useSciFiSound } from "@/hooks/useSciFiSound";

// Individual letter component with mouse-reactive 3D transform
function KineticLetter({ 
  char, 
  index, 
  mouseX, 
  mouseY,
  isFirstName 
}: { 
  char: string; 
  index: number; 
  mouseX: ReturnType<typeof useMotionValue<number>>; 
  mouseY: ReturnType<typeof useMotionValue<number>>;
  isFirstName: boolean;
}) {
  const letterRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const unsubX = mouseX.on("change", (mx) => {
      if (!letterRef.current) return;
      const rect = letterRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const my = mouseY.get();
      
      const distX = mx - centerX;
      const distY = my - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDist = 400;
      
      if (distance < maxDist) {
        const force = (1 - distance / maxDist) * 0.6;
        // Push letters away from cursor (magnetic repulsion)
        x.set(-distX * force * 0.15);
        y.set(-distY * force * 0.15);
        // Tilt towards cursor (3D perspective)
        rotateY.set(distX * force * 0.08);
        rotateX.set(-distY * force * 0.08);
      } else {
        x.set(0);
        y.set(0);
        rotateX.set(0);
        rotateY.set(0);
      }
    });

    return () => unsubX();
  }, [mouseX, mouseY, x, y, rotateX, rotateY]);

  if (char === " ") {
    return <span className="inline-block w-[0.3em]" />;
  }

  return (
    <motion.span
      ref={letterRef}
      initial={{ opacity: 0, y: 80, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.05 + 0.6,
        ease: [0.19, 1.0, 0.22, 1.0]
      }}
      style={{ 
        x: springX, 
        y: springY, 
        rotateX: springRotateX, 
        rotateY: springRotateY,
        perspective: 800,
      }}
      className={`inline-block cursor-default select-none transition-colors duration-300 hover:text-[var(--accent-cyan)] ${
        isFirstName 
          ? "text-transparent [-webkit-text-stroke:1.5px_var(--text-primary)] sm:[-webkit-text-stroke:2px_var(--text-primary)] hover:[-webkit-text-stroke:2px_var(--accent-cyan)] hover:text-[var(--accent-cyan)]" 
          : "text-[var(--text-primary)]"
      }`}
    >
      {char}
    </motion.span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { playHover, playClick } = useSciFiSound();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Global mouse tracking for kinetic letters
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  // Terminal typing effect
  const [typedText, setTypedText] = useState("");
  const fullText = "INITIALIZING SYSTEM...\nLOADING MODULES [OK]\nUSER AUTHENTICATED: RANJAN_K\n>";
  
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(typing);
    }, 50);
    return () => clearInterval(typing);
  }, []);

  const firstName = "RANJAN";
  const lastName = "KUMAR";

  return (
    <section 
      id="hero"
      ref={ref} 
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-void)]"
      onMouseMove={handleMouseMove}
    >
      <NeuralNetwork3D />
      
      {/* Scroll Parallax Container */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full px-6 sm:px-12 lg:px-20 flex flex-col items-center"
      >
        
        {/* Terminal Boot Sequence — top left */}
        <div className="w-full max-w-7xl mb-6 sm:mb-10">
          <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--accent-cyan)] whitespace-pre-line min-h-[50px]">
            {typedText}
            <span className="w-2 h-3 inline-block bg-[var(--accent-cyan)] animate-pulse ml-1" />
          </div>
        </div>

        {/* Kinetic Name — THE STAR */}
        <div className="w-full max-w-7xl flex flex-col items-start" style={{ perspective: "1200px" }}>
          {/* First name — outlined/stroke style */}
          <div className="text-[15vw] sm:text-[13vw] md:text-[12vw] lg:text-[11vw] font-extrabold tracking-tighter leading-[0.85] uppercase">
            {firstName.split("").map((char, i) => (
              <KineticLetter 
                key={`first-${i}`} 
                char={char} 
                index={i} 
                mouseX={mouseX} 
                mouseY={mouseY}
                isFirstName={true}
              />
            ))}
          </div>
          
          {/* Last name — solid filled */}
          <div className="text-[15vw] sm:text-[13vw] md:text-[12vw] lg:text-[11vw] font-extrabold tracking-tighter leading-[0.85] uppercase -mt-2 sm:-mt-4">
            {lastName.split("").map((char, i) => (
              <KineticLetter 
                key={`last-${i}`} 
                char={char} 
                index={i + firstName.length} 
                mouseX={mouseX} 
                mouseY={mouseY}
                isFirstName={false}
              />
            ))}
          </div>
        </div>

        {/* Subtitle + CTA row */}
        <div className="w-full max-w-7xl mt-10 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          
          {/* Left: role + description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="max-w-md"
          >
            <div className="inline-block bg-[var(--text-primary)] text-[var(--bg-void)] px-3 py-1.5 sm:px-4 sm:py-2 font-[family-name:var(--font-mono)] font-bold tracking-widest text-[10px] sm:text-xs uppercase mb-4">
              {personalInfo.title}
            </div>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
              {personalInfo.tagline}
            </p>
          </motion.div>

          {/* Right: CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Magnetic strength={0.2}>
              <Link 
                href="#projects"
                onMouseEnter={playHover}
                onClick={playClick}
                className="group relative px-6 py-3 border border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-void)] transition-all duration-300 font-mono tracking-widest text-xs uppercase overflow-hidden"
              >
                <TextScramble>View Work</TextScramble>
              </Link>
            </Magnetic>
            
            <Magnetic strength={0.2}>
              <button 
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  document.dispatchEvent(new KeyboardEvent('keydown', { key: '~' }));
                }}
                className="group px-6 py-3 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-colors duration-300 font-mono tracking-widest text-xs uppercase flex items-center gap-3"
              >
                <FileText size={12} />
                <TextScramble>Resume</TextScramble>
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity }}
          className="mt-12 sm:mt-20 flex flex-col items-center gap-2"
        >
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
            Scroll_Down
          </span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-[var(--text-muted)]"
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
