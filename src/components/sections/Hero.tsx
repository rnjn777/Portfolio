"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { personalInfo } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";
import TextScramble from "@/components/ui/TextScramble";
import dynamic from 'next/dynamic';

const NeuralNetwork3D = dynamic(() => import("@/components/3d/NeuralNetwork3D"), { ssr: false });
const FloatingPhone = dynamic(() => import("@/components/3d/FloatingPhone"), { ssr: false });

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

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    
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

    return () => { if (unsubX) unsubX(); };
  }, [mouseX, mouseY, x, y, rotateX, rotateY, shouldReduceMotion]);

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
      style={shouldReduceMotion ? {} : {
        x: springX,
        y: springY,
        rotateX: springRotateX,
        rotateY: springRotateY,
        perspective: 800,
      }}
      className={`inline-block cursor-default select-none transition-colors duration-300 hover:text-[var(--accent-cyan)] ${isFirstName
          ? "text-transparent [-webkit-text-stroke:1.5px_var(--text-primary)] sm:[-webkit-text-stroke:2px_var(--text-primary)] hover:[-webkit-text-stroke:2px_var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
          : "text-[var(--text-primary)]"
        }`}
    >
      {char}
    </motion.span>
  );
}

import { TextHoverEffect } from "@/components/ui/TextHoverEffect";
import SystemHUD from "@/components/ui/SystemHUD";

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
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-void)] pt-20 pb-6 sm:pt-24 sm:pb-8 lg:pt-24 lg:pb-10"
      onMouseMove={handleMouseMove}
    >
      {/* Absolute Background Text Effect */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
        <TextHoverEffect text="RANJAN" />
      </div>

      <NeuralNetwork3D />

      {/* Decorative corner brackets — sci-fi framing */}
      <div className="absolute top-24 left-8 w-12 h-12 border-l border-t border-[var(--accent-cyan)]/20 pointer-events-none z-10" />
      <div className="absolute top-24 right-8 w-12 h-12 border-r border-t border-[var(--accent-cyan)]/20 pointer-events-none z-10" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-[var(--accent-cyan)]/20 pointer-events-none z-10" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-[var(--accent-cyan)]/20 pointer-events-none z-10" />

      {/* Subtle horizontal scan line */}
      <motion.div
        animate={{ y: ["-100vh", "100vh"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/15 to-transparent pointer-events-none z-5"
      />

      {/* Scroll Parallax Container */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full px-6 sm:px-12 lg:px-20 flex flex-col items-center"
      >
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12">
          {/* Main Hero Text Content */}
          <div className="flex-1 flex flex-col items-start w-full lg:pl-10 lg:translate-x-6">
            
            <SystemHUD />

            {/* Kinetic Name — THE STAR */}
            <div className="w-fit flex flex-col items-start relative mt-16 lg:mt-24" style={{ perspective: "1200px" }}>
              
              {/* Micro-typography / HUD framing around the name */}
              <div className="absolute -top-4 -left-4 w-4 h-4 border-t border-l border-[var(--text-muted)] opacity-30" />
              <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b border-r border-[var(--text-muted)] opacity-30" />
              <div className="absolute -top-3 left-0 font-mono text-[8px] tracking-widest text-[var(--accent-cyan)] opacity-70">
                [ID: RNJN-01] // SYS.OP
              </div>
              <div className="absolute -bottom-3 right-0 font-mono text-[8px] tracking-widest text-[var(--accent-cyan)] opacity-70">
                LAT: 28.6083° N, LONG: 77.0350° E
              </div>

              {/* First name — outlined/stroke style with subtle glow on hover handled in KineticLetter */}
              <div className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[7.5vw] xl:text-[8vw] font-extrabold tracking-tighter leading-[0.85] uppercase drop-shadow-[0_0_15px_rgba(0,240,255,0.1)]">
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
              
              {/* Last name — solid filled with vertical spacing and metallic gradient */}
              <div className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[7.5vw] xl:text-[8vw] font-extrabold tracking-tighter leading-[0.85] uppercase mt-2 sm:mt-4 md:mt-5 bg-gradient-to-b from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--text-muted)] bg-clip-text text-transparent drop-shadow-2xl">
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
          </div>

          {/* Right: 3D Floating Phone showcase */}
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex shrink-0 items-center justify-center py-2 mt-8 lg:mt-12 lg:-ml-48 lg:-translate-x-12 lg:mr-12"
          >
            <FloatingPhone />
          </motion.div>
        </div>

        {/* Bottom Row: AI & Full-Stack Engineer block (bottom-left) + CTAs (bottom-right) */}
        <div className="w-full max-w-7xl mt-3 sm:mt-4 lg:mt-5 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          
          {/* Bottom Left: Role badge + Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="max-w-md"
          >
            {/* Accent line before badge */}
            <div className="w-8 h-[2px] bg-[var(--accent-cyan)] mb-4" />
            <div className="inline-block bg-[var(--text-primary)] text-[var(--bg-void)] px-3 py-1.5 sm:px-4 sm:py-2 font-[family-name:var(--font-mono)] font-bold tracking-widest text-[10px] sm:text-xs uppercase mb-2">
              {personalInfo.title}
            </div>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
              {personalInfo.tagline}
            </p>
          </motion.div>

          {/* Bottom Right: View Work & Resume Buttons */}
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
                className="group relative px-6 py-3 border border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-void)] transition-all duration-300 font-mono tracking-widest text-xs uppercase overflow-hidden inline-flex items-center justify-center"
              >
                {/* Hover sweep effect */}
                <span className="absolute inset-0 bg-[var(--text-primary)] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative z-10"><TextScramble>View Work</TextScramble></span>
              </Link>
            </Magnetic>
            
            <Magnetic strength={0.2}>
              <button 
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  document.dispatchEvent(new KeyboardEvent('keydown', { key: '~' }));
                }}
                className="group px-6 py-3 border border-[var(--border-glass)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-colors duration-300 font-mono tracking-widest text-xs uppercase flex items-center gap-3 hover:shadow-[0_0_20px_rgba(8,145,178,0.15)]"
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
          className="mt-6 sm:mt-8 flex flex-col items-center gap-2"
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
