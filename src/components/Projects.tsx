"use client";

import { useRef } from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";
import { projects } from "@/lib/data";
import { ExternalLink, GitBranch } from "lucide-react";
import CyberText from "@/components/CyberText";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. Get raw scroll progress
  const { scrollY } = useScroll();
  
  // 2. Extract scroll velocity
  const scrollVelocity = useVelocity(scrollY);
  
  // 3. Smooth out the velocity to avoid jittering
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // 4. Transform the smoothed velocity into a skew degree.
  // When the user scrolls fast, it skews up to 3 degrees. 
  // When scrolling stops, velocity is 0, so it snaps back to 0 degrees.
  const skewY = useTransform(smoothVelocity, [-1000, 0, 1000], [-3, 0, 3]);

  return (
    <section id="projects" ref={containerRef} className="py-32 sm:py-48 relative bg-[var(--bg-void)] overflow-hidden">
      <div className="section-container">
        
        {/* Header */}
        <div className="mb-32 sm:mb-48 flex flex-col items-start">
          <div className="text-mask mb-2">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter text-[var(--text-muted)]"
            >
              <CyberText text="SELECTED" />
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
              <CyberText text="WORKS" /> <span className="text-sm font-[family-name:var(--font-mono)] font-normal tracking-widest align-top text-[var(--accent-cyan)]">0{projects.length}</span>
            </motion.h2>
          </div>
        </div>

        {/* Vertical Project List with Velocity Skew */}
        <div className="flex flex-col gap-32 sm:gap-64">
          {projects.map((project, i) => (
            <motion.div 
              key={project.title}
              style={{ skewY }}
              className="flex flex-col relative group origin-center"
            >
              {/* Massive Number Overlay for depth */}
              <div className="absolute -top-16 sm:-top-32 left-0 sm:-left-12 text-[8rem] sm:text-[15rem] font-bold text-[var(--bg-surface)] opacity-80 font-[family-name:var(--font-mono)] leading-none select-none z-0 pointer-events-none transition-transform duration-700 group-hover:-translate-y-10">
                0{i + 1}
              </div>

              <div className="relative z-10 w-full">
                
                {/* Ricardo Chance Inspired Massive Image Container */}
                <div className="w-full h-[50vh] sm:h-[75vh] min-h-[400px] relative overflow-hidden bg-[var(--bg-surface)] rounded-sm group-hover:scale-[0.98] transition-transform duration-700 ease-out border border-[var(--border-glass)] group-hover:border-[var(--accent-cyan)]">
                  
                  {/* Abstract Background Glows */}
                  <motion.div 
                    className={`absolute inset-[-50%] opacity-40 mix-blend-screen transition-transform duration-1000 group-hover:scale-110 ${
                      i % 2 === 0 ? "bg-gradient-to-tr from-[var(--accent-cyan)] to-[var(--bg-void)]" : "bg-gradient-to-bl from-[var(--accent-purple)] to-[var(--bg-void)]"
                    }`} 
                  />
                  <div className="absolute inset-0 noise-overlay opacity-50" />
                  
                  {/* Centered Massive Typography (Simulating the Flixxo style text) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <motion.div 
                      className="text-[15vw] leading-none font-extrabold tracking-tighter uppercase text-white/5 mix-blend-overlay group-hover:scale-110 group-hover:text-white/20 transition-all duration-1000 text-center"
                    >
                      {project.title}
                    </motion.div>
                  </div>
                </div>

                {/* Project Details Below Image */}
                <div className="flex flex-col lg:flex-row justify-between items-start pt-8 sm:pt-12 gap-8 lg:gap-12">
                  <div className="flex-1 max-w-2xl">
                    <h3 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[var(--text-primary)] mb-6 group-hover:text-[var(--accent-cyan)] transition-colors duration-500">
                      {project.title}
                    </h3>
                    <p className="text-lg sm:text-xl text-[var(--text-secondary)] font-light leading-relaxed mb-8">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {project.techStack.map(tech => (
                        <span key={tech} className="text-xs font-[family-name:var(--font-mono)] text-[var(--text-muted)] uppercase border border-[var(--border-glass)] px-4 py-2 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links / Call To Actions */}
                  <div className="flex flex-col gap-4 font-[family-name:var(--font-mono)] text-sm uppercase tracking-widest shrink-0 w-full lg:w-auto">
                    <a 
                      href={project.liveUrl} 
                      target="_blank"
                      rel="noreferrer"
                      className="magnetic group/btn flex items-center justify-between lg:justify-start gap-4 text-[var(--text-primary)] hover:text-[var(--accent-cyan)] transition-colors border-b lg:border-none border-[var(--border-glass)] pb-4 lg:pb-0"
                    >
                      <span className="flex items-center gap-4">
                        <span className="w-10 h-10 rounded-full border border-[var(--border-glass)] flex items-center justify-center group-hover/btn:border-[var(--accent-cyan)] transition-colors">
                          <ExternalLink size={14} />
                        </span>
                        LIVE_DEPLOYMENT
                      </span>
                    </a>
                    <a 
                      href={project.githubUrl} 
                      target="_blank"
                      rel="noreferrer"
                      className="magnetic group/btn flex items-center justify-between lg:justify-start gap-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors border-b lg:border-none border-[var(--border-glass)] pb-4 lg:pb-0"
                    >
                      <span className="flex items-center gap-4">
                        <span className="w-10 h-10 rounded-full border border-[var(--border-glass)] flex items-center justify-center group-hover/btn:border-[var(--text-primary)] transition-colors">
                          <GitBranch size={14} />
                        </span>
                        SOURCE_CODE
                      </span>
                    </a>
                  </div>
                </div>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
