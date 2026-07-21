"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, GitBranch, Mail, FileText, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { personalInfo } from "@/lib/data";
import Magnetic from "@/components/Magnetic";
import TextScramble from "@/components/TextScramble";
import NeuralNetwork3D from "@/components/NeuralNetwork3D";
import { useSciFiSound } from "@/hooks/useSciFiSound";

export default function Hero() {
  const ref = useRef(null);
  const { playHover, playClick } = useSciFiSound();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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

  return (
    <section 
      id="hero"
      ref={ref} 
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-void)] pt-24 pb-12"
    >
      <NeuralNetwork3D />
      
      {/* Scroll Parallax Container */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full px-6 flex flex-col items-center text-center"
      >
        
        {/* Terminal Boot Sequence */}
        <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--accent-cyan)] whitespace-pre-line mb-8 min-h-[60px]">
          {typedText}
          <span className="w-2 h-3 inline-block bg-[var(--accent-cyan)] animate-pulse ml-1" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-5xl px-4 sm:px-8 w-full text-center sm:text-left flex flex-col items-center sm:items-start"
        >
          {/* Main Name */}
          <h1 
            className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.9] mb-4 text-[var(--text-primary)] uppercase glitch-effect"
            data-text={personalInfo.name}
          >
            {personalInfo.name}
          </h1>
          
          {/* Brutalist Title Ribbon */}
          <div className="inline-block bg-[var(--text-primary)] text-[var(--bg-void)] px-3 py-1.5 sm:px-4 sm:py-2 font-[family-name:var(--font-mono)] font-bold tracking-widest text-[10px] sm:text-sm uppercase mb-6 sm:mb-8 text-center">
            {personalInfo.title}
          </div>

          <p className="text-sm sm:text-xl text-[var(--text-secondary)] font-light max-w-2xl leading-relaxed mb-8 sm:mb-10 text-center sm:text-left">
            {personalInfo.about}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-6 w-full sm:w-auto">
            <Magnetic strength={0.2}>
              <Link 
                href="#projects"
                onMouseEnter={playHover}
                onClick={playClick}
                className="group relative px-6 py-4 border border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-void)] transition-all duration-300 font-mono tracking-widest text-sm uppercase overflow-hidden"
              >
                <TextScramble>View My Work</TextScramble>
              </Link>
            </Magnetic>
            
            <Magnetic strength={0.2}>
              <button 
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  document.dispatchEvent(new KeyboardEvent('keydown', { key: '~' }));
                }}
                className="group px-6 py-4 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-colors duration-300 font-mono tracking-widest text-sm uppercase flex items-center gap-3"
              >
                <FileText size={14} />
                <TextScramble>SYS_RESUME.PDF</TextScramble>
              </button>
            </Magnetic>
          </div>
        </motion.div>

        {/* Global Stats / Links */}
        <motion.div 
          style={{ opacity }}
          className="absolute right-4 sm:right-8 bottom-0 flex flex-col items-end gap-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-muted)] hidden md:flex"
        >
          <div className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors magnetic">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-2">
              [ GITHUB_ACCESS ] <GitBranch size={12} />
            </a>
          </div>
          <div className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors magnetic">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2">
              [ COMMS_LINK ] <Mail size={12} />
            </a>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--border-glass)] text-right">
            <div>STATUS: ONLINE</div>
            <div className="text-[var(--accent-cyan)] animate-pulse">LOC: NEW DELHI</div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity }}
          className="mt-8 sm:mt-16 flex flex-col items-center gap-2"
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
