"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { ExternalLink } from "lucide-react";
import CyberText from "@/components/CyberText";
import { useSciFiSound } from "@/hooks/useSciFiSound";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { playHover } = useSciFiSound();
  
  // Track which project is hovered
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const hoveredProject = hoveredIdx !== null ? projects[hoveredIdx] : null;

  // Global mouse tracking for the 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the mouse values
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform mouse position into 3D rotation degrees (-15 to 15 deg)
  const rotateX = useTransform(smoothMouseY, [-500, 500], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [-500, 500], [-15, 15]);

  // Transform mouse position for subtle translation (-40px to +40px)
  const translateX = useTransform(smoothMouseX, [-500, 500], [-40, 40]);
  const translateY = useTransform(smoothMouseY, [-500, 500], [-40, 40]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the window
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      className="relative bg-[var(--bg-void)] py-32 sm:py-48 min-h-screen"
    >
      {/* 3D Global Image Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
              transition={{ duration: 0.6, ease: [0.19, 1.0, 0.22, 1.0] }}
              style={{
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                perspective: 1200,
                transformStyle: "preserve-3d"
              }}
              className="relative w-[70vw] sm:w-[50vw] md:w-[40vw] h-[60vh] rounded-sm overflow-hidden border border-[var(--border-glass)] shadow-[0_0_50px_rgba(0,255,255,0.1)]"
            >
              {/* Abstract fallback gradient based on index (since images are null) */}
              <div className={`absolute inset-0 transition-colors duration-700 ${
                hoveredIdx! % 3 === 0 
                  ? "bg-gradient-to-br from-cyan-900/60 via-slate-900 to-[var(--bg-void)]" 
                  : hoveredIdx! % 3 === 1
                    ? "bg-gradient-to-br from-purple-900/60 via-slate-900 to-[var(--bg-void)]"
                    : "bg-gradient-to-br from-amber-900/60 via-slate-900 to-[var(--bg-void)]"
              }`} />
              
              <div className="absolute inset-0 noise-overlay opacity-50" />
              
              {/* Large project name inside the card */}
              <div 
                className="absolute inset-0 flex items-center justify-center font-extrabold uppercase text-[12vw] sm:text-[6vw] tracking-tighter text-white/5 whitespace-nowrap"
                style={{ transform: "translateZ(50px)" }} // Pop out in 3D
              >
                {hoveredProject.title.split(" ")[0]}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full flex flex-col">
        {/* Section Header */}
        <div className="px-6 sm:px-12 lg:px-20 mb-24 flex flex-col pointer-events-none">
          <div className="text-mask mb-2">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter text-[var(--text-muted)]"
            >
              <CyberText text="FEATURED" />
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
              <CyberText text="WORK" /> <span className="text-sm font-[family-name:var(--font-mono)] font-normal tracking-widest align-top text-[var(--accent-cyan)]">0{projects.length}</span>
            </motion.h2>
          </div>
        </div>

        {/* Project List */}
        <div className="flex flex-col w-full relative mix-blend-difference text-white">
          {projects.map((project, i) => {
            const isHovered = hoveredIdx === i;
            const anyHovered = hoveredIdx !== null;
            const isDimmed = anyHovered && !isHovered;

            return (
              <a
                key={project.title}
                href={project.liveUrl !== "#" ? project.liveUrl : project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => {
                  setHoveredIdx(i);
                  playHover();
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group block relative border-t border-[var(--border-glass)] hover:border-white/20 transition-colors duration-500 cursor-pointer"
              >
                <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 sm:px-12 lg:px-20 py-10 sm:py-16 transition-all duration-700 ${
                  isDimmed ? "opacity-20 blur-[2px] grayscale" : "opacity-100 blur-0 grayscale-0"
                }`}>
                  
                  {/* Left: Project Title */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8">
                    <span className={`font-[family-name:var(--font-mono)] text-xs tracking-widest transition-colors duration-500 ${
                      isHovered ? "text-cyan-300" : "text-white/40 group-hover:text-white/60"
                    }`}>
                      0{i + 1}
                    </span>
                    <h3 className={`text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tighter transition-all duration-500 ${
                      isHovered 
                        ? "text-cyan-100 translate-x-4 sm:translate-x-8" 
                        : "text-white/80 group-hover:text-white"
                    }`}>
                      {project.title.split(" ")[0]} 
                      {/* Only showing first word huge, rest small */}
                      <span className="block sm:inline text-xl sm:text-2xl font-light tracking-normal text-white/40 ml-0 sm:ml-6 mt-2 sm:mt-0">
                        {project.title.split(" ").slice(1).join(" ")}
                      </span>
                    </h3>
                  </div>

                  {/* Right: See Live */}
                  <div className="mt-8 sm:mt-0 shrink-0">
                    <div className={`flex items-center gap-3 font-[family-name:var(--font-mono)] text-sm uppercase tracking-widest transition-all duration-500 ${
                      isHovered ? "text-cyan-300 translate-x-0" : "text-white/40 -translate-x-4 opacity-0 sm:opacity-100 sm:translate-x-0"
                    }`}>
                      <span>See live</span>
                      <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        isHovered ? "border-cyan-300 bg-cyan-300/10" : "border-white/20"
                      }`}>
                        <ExternalLink size={14} className={isHovered ? "-translate-y-0.5 translate-x-0.5" : ""} />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
          
          {/* Final Border */}
          <div className="border-t border-[var(--border-glass)]" />
        </div>
      </div>
    </section>
  );
}
