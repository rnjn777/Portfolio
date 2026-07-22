"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform, MotionValue } from "framer-motion";
import { projects } from "@/lib/data";
import { ExternalLink, GitBranch } from "lucide-react";
import CyberText from "@/components/CyberText";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  // Scroll velocity for global skew
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewY = useTransform(smoothVelocity, [-1000, 0, 1000], [-2, 0, 2]);

  return (
    <section id="projects" ref={containerRef} className="relative bg-[var(--bg-void)] overflow-hidden">
      
      {/* Section Header */}
      <div className="px-6 sm:px-12 lg:px-20 pt-32 sm:pt-48 pb-16 sm:pb-24">
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

      {/* Project Rows — Ricardo Chance Style */}
      <div className="flex flex-col">
        {projects.map((project, i) => (
          <ProjectRow 
            key={project.title} 
            project={project} 
            index={i} 
            skewY={skewY}
            isHovered={hoveredIdx === i}
            onHover={() => setHoveredIdx(i)}
            onLeave={() => setHoveredIdx(null)}
            anyHovered={hoveredIdx !== null}
          />
        ))}
      </div>
    </section>
  );
}

interface ProjectRowProps {
  project: (typeof projects)[number];
  index: number;
  skewY: MotionValue<number>;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  anyHovered: boolean;
}

function ProjectRow({ project, index, skewY, isHovered, onHover, onLeave, anyHovered }: ProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  
  // Per-row scroll progress for parallax on the image
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Dim opacity when another project is hovered
  const dimmed = anyHovered && !isHovered;

  return (
    <motion.div 
      ref={rowRef}
      style={{ skewY }}
      className="origin-center"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Separator line */}
      <div className="h-px bg-[var(--border-glass)] mx-6 sm:mx-12 lg:mx-20" />
      
      {/* Row Content */}
      <a
        href={project.liveUrl !== "#" ? project.liveUrl : project.githubUrl}
        target="_blank"
        rel="noreferrer"
        className="block group cursor-pointer"
      >
        {/* Top bar: project name left, "See live" right */}
        <div className={`flex items-center justify-between px-6 sm:px-12 lg:px-20 py-6 sm:py-8 transition-opacity duration-500 ${dimmed ? "opacity-30" : "opacity-100"}`}>
          <div className="flex items-baseline gap-4 sm:gap-8">
            <span className="font-[family-name:var(--font-mono)] text-[10px] sm:text-xs text-[var(--accent-cyan)] tracking-widest">
              0{index + 1}
            </span>
            <h3 className="text-lg sm:text-2xl lg:text-3xl font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors duration-500 tracking-tight">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[10px] sm:text-xs uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors duration-500">
            <span className="hidden sm:inline">See live</span>
            <ExternalLink size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
        </div>

        {/* Massive Image Container */}
        <div className={`px-6 sm:px-12 lg:px-20 overflow-hidden transition-opacity duration-500 ${dimmed ? "opacity-30" : "opacity-100"}`}>
          <motion.div 
            style={{ y: imageY, scale: imageScale }}
            className="w-full h-[40vh] sm:h-[55vh] lg:h-[70vh] relative overflow-hidden rounded-sm"
          >
            {/* Abstract gradient background (since no real images) */}
            <div className={`absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105 ${
              index % 3 === 0 
                ? "bg-gradient-to-br from-cyan-900/40 via-[var(--bg-surface)] to-emerald-900/30" 
                : index % 3 === 1
                  ? "bg-gradient-to-br from-purple-900/40 via-[var(--bg-surface)] to-blue-900/30"
                  : "bg-gradient-to-br from-amber-900/30 via-[var(--bg-surface)] to-rose-900/30"
            }`} />
            
            {/* Noise texture overlay */}
            <div className="absolute inset-0 noise-overlay opacity-40" />
            
            {/* Giant project name watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <span className="text-[18vw] sm:text-[14vw] font-extrabold tracking-tighter uppercase text-white/[0.03] group-hover:text-white/[0.08] transition-all duration-1000 leading-none whitespace-nowrap select-none">
                {project.title.split(" ")[0]}
              </span>
            </div>

            {/* Tech stack pills floating in the image */}
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 flex flex-wrap gap-2 max-w-[80%]">
              {project.techStack.slice(0, 4).map((tech, ti) => (
                <motion.span 
                  key={tech}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ti * 0.1 + 0.3 }}
                  className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--text-muted)] uppercase border border-[var(--border-glass)] backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-full"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            
            {/* Large number overlay */}
            <div className="absolute top-4 right-6 sm:top-6 sm:right-8 text-[6rem] sm:text-[10rem] font-bold text-white/[0.03] font-[family-name:var(--font-mono)] leading-none select-none pointer-events-none">
              0{index + 1}
            </div>
          </motion.div>
        </div>

        {/* Description row below image */}
        <div className={`px-6 sm:px-12 lg:px-20 py-6 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-opacity duration-500 ${dimmed ? "opacity-30" : "opacity-100"}`}>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light max-w-2xl leading-relaxed">
            {project.description}
          </p>
          <div className="flex items-center gap-4 shrink-0">
            {project.githubUrl !== "#" && (
              <span className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                <GitBranch size={12} /> Source
              </span>
            )}
          </div>
        </div>
      </a>
    </motion.div>
  );
}
