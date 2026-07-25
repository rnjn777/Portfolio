"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import { projects } from "@/lib/data";

const projectGradients = [
  "linear-gradient(to bottom right, #094738, #031d16)", // Dark teal / green
  "linear-gradient(to bottom right, #4c2770, #251238)", // Purple
  "linear-gradient(to bottom right, #133e59, #091f2c)", // Blue
  "linear-gradient(to bottom right, #612c21, #301610)", // Rust/Orange
  "linear-gradient(to bottom right, #0d0d0d, #050505)", // Dark
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress of the entire stack
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      id="projects" 
      className="relative bg-[var(--bg-void)] pt-32 pb-[10vh]"
    >
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 mb-24 max-w-4xl mx-auto">
        <p className="text-[10px] sm:text-xs font-[family-name:var(--font-mono)] tracking-[0.3em] uppercase text-[var(--text-primary)]/50 mb-8">
          Featured Work
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[3.5rem] leading-[1.1] font-serif text-[var(--text-primary)] tracking-tight">
          Creating experiences that people love to use because we start from the starting point of those people.
        </h2>
      </div>

      {/* Stacked Cards Container */}
      <div 
        ref={containerRef} 
        className="relative w-full"
        style={{
          // Container height = (number of projects) * 100vh
          height: `${projects.length * 100}vh`
        }}
      >
        {projects.map((project, index) => {
          return (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index} 
              total={projects.length}
              progress={scrollYProgress}
            />
          );
        })}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, total, progress }: { project: any, index: number, total: number, progress: any }) {
  // Calculate the progress thresholds for this specific card.
  const step = total > 1 ? 1 / (total - 1) : 1;
  const startScroll = index * step;
  const isLast = index === total - 1;

  // Scale down slightly as the next card covers it
  const scale = useTransform(progress, (p: number) => {
    if (isLast) return 1;
    if (p <= startScroll) return 1;
    if (p >= startScroll + step) return 0.9;
    const pInStep = (p - startScroll) / step;
    return 1 - (0.1 * pInStep);
  });
  
  // Fade to black slightly for depth
  const filter = useTransform(progress, (p: number) => {
    if (isLast) return "brightness(1)";
    if (p <= startScroll) return "brightness(1)";
    if (p >= startScroll + step) return "brightness(0.4)";
    const pInStep = (p - startScroll) / step;
    const brightness = 1 - (0.6 * pInStep);
    return `brightness(${brightness})`;
  });

  // Fade out completely so side texts don't overlap messily
  const opacity = useTransform(progress, (p: number) => {
    if (isLast) return 1;
    if (p <= startScroll) return 1;
    if (p >= startScroll + step) return 0;
    const pInStep = (p - startScroll) / step;
    return 1 - pInStep;
  });

  // Foolproof way to prevent overlapping: physically hide when fully covered
  const display = useTransform(progress, (p: number) => {
    if (isLast) return "flex";
    if (p >= startScroll + step) return "none";
    return "flex";
  });

  const shortName = project.title.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  const displayName = shortName;
  const capitalizedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
  const gradient = projectGradients[index % projectGradients.length];

  // Tilt Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden" style={{ perspective: "1000px" }}>
      
      {/* The Main Card */}
      <motion.div 
        className="relative w-[90vw] sm:w-[75vw] lg:w-[65vw] h-[65vh] sm:h-[75vh] rounded-[2rem] sm:rounded-[3rem] overflow-hidden flex flex-col shadow-2xl transition-shadow duration-300 hover:shadow-[0_0_40px_var(--accent-cyan)]/30 cursor-pointer"
        style={{ scale, filter, rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Inner Content */}
        <div 
          className="w-full h-full flex items-center justify-center relative"
          style={{ background: gradient }}
        >
          <div className="absolute inset-0 noise-overlay opacity-40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none"></div>

          {project.image && (
            <Image 
              src={project.image}
              alt={project.title}
              fill
              className="object-cover mix-blend-overlay opacity-60 pointer-events-none"
              sizes="(max-width: 768px) 90vw, 75vw"
            />
          )}

          <h3 
            className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-[var(--text-primary)] z-10 drop-shadow-lg mix-blend-overlay opacity-90 uppercase pointer-events-none"
            style={{ transform: "translateZ(50px)" }}
          >
            {displayName}
          </h3>
        </div>
      </motion.div>
      
      {/* Side Links */}
      <motion.div 
        className="absolute right-4 sm:right-8 lg:right-16 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-[var(--text-primary)] hover:text-[var(--accent-cyan)] transition-colors z-[100]"
        style={{ opacity, display }}
      >
        <a href={project.liveUrl !== "#" ? project.liveUrl : project.githubUrl} target="_blank" rel="noreferrer" className="text-xs sm:text-sm font-serif italic tracking-wide">
          See live
        </a>
      </motion.div>
      
      <motion.div 
        className="absolute left-4 sm:left-8 lg:left-16 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-[var(--text-primary)] z-[100]"
        style={{ opacity, display }}
      >
        <span className="text-xs sm:text-sm font-serif italic tracking-wide text-[var(--text-primary)]/70">
          {capitalizedName}
        </span>
      </motion.div>
    </div>
  );
}

