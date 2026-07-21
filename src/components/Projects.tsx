"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/data";
import { ExternalLink, GitBranch } from "lucide-react";
import CyberText from "@/components/CyberText";

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress into horizontal movement
  // Move by a percentage that leaves exactly one project in view at the end
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((projects.length - 1) * 100) / projects.length}%`]);
  
  // Parallax effect for the background images/gradients
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section id="projects" ref={scrollRef} className="relative h-[400vh] bg-[var(--bg-void)]">
      
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Header */}
        <div className="absolute top-28 sm:top-32 left-4 sm:left-12 z-20 pointer-events-none">
          <div className="text-mask">
            <motion.h2 
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
              className="text-4xl sm:text-6xl font-bold uppercase tracking-tighter text-[var(--text-primary)]"
            >
              <CyberText text="SELECTED" />
            </motion.h2>
          </div>
          <div className="text-mask">
            <motion.h2 
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0], delay: 0.1 }}
              className="text-4xl sm:text-6xl font-bold uppercase tracking-tighter text-[var(--text-muted)]"
            >
              <CyberText text="WORKS" /> <span className="text-sm font-[family-name:var(--font-mono)] font-normal tracking-widest align-top">0{projects.length}</span>
            </motion.h2>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <motion.div 
          style={{ x }} 
          className="flex gap-12 sm:gap-24 px-4 sm:px-[10vw] w-[fit-content] items-center h-full pt-20"
        >
          {projects.map((project, i) => (
            <div 
              key={project.title}
              className="w-[85vw] max-w-[1200px] flex-shrink-0 h-[70vh] min-h-[500px] flex flex-col relative group"
            >
              
              {/* Abstract Visual Presentation */}
              <div className="w-full h-[60%] sm:h-[70%] relative overflow-hidden bg-[var(--bg-surface)] rounded-sm group-hover:scale-[0.98] transition-transform duration-700 ease-out">
                {/* Simulated Image / Neural Glow */}
                <motion.div 
                  style={{ x: bgX }}
                  className={`absolute inset-[-50%] opacity-40 mix-blend-screen transition-transform duration-1000 group-hover:scale-110 ${
                    i % 2 === 0 ? "bg-gradient-to-tr from-[var(--accent-cyan)] to-[var(--bg-void)]" : "bg-gradient-to-bl from-[var(--accent-purple)] to-[var(--bg-void)]"
                  }`} 
                />
                <div className="absolute inset-0 noise-overlay opacity-50" />
                
                {/* Giant Number */}
                <div className="absolute -bottom-10 -right-4 text-[15rem] font-bold text-[var(--bg-void)] opacity-50 font-[family-name:var(--font-mono)] leading-none select-none">
                  0{i + 1}
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-2xl sm:text-4xl font-bold tracking-widest uppercase text-white/10 mix-blend-overlay">
                    {project.title}
                  </div>
                </div>
              </div>

              {/* Project Data */}
              <div className="flex flex-col sm:flex-row justify-between items-start pt-8 gap-8 sm:gap-12 flex-1">
                <div className="flex-1 max-w-xl">
                  <h3 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[var(--text-primary)] mb-4">
                    {project.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] font-light leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--text-muted)] uppercase border border-[var(--border-glass)] px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest shrink-0">
                  <a 
                    href={project.liveUrl} 
                    target="_blank"
                    rel="noreferrer"
                    className="magnetic group/btn flex items-center gap-4 text-[var(--text-primary)] hover:text-[var(--accent-cyan)] transition-colors"
                  >
                    <span className="w-8 h-8 rounded-full border border-[var(--border-glass)] flex items-center justify-center group-hover/btn:border-[var(--accent-cyan)] transition-colors">
                      <ExternalLink size={12} />
                    </span>
                    LIVE_DEPLOYMENT
                  </a>
                  <a 
                    href={project.githubUrl} 
                    target="_blank"
                    rel="noreferrer"
                    className="magnetic group/btn flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <span className="w-8 h-8 rounded-full border border-[var(--border-glass)] flex items-center justify-center group-hover/btn:border-[var(--text-primary)] transition-colors">
                      <GitBranch size={12} />
                    </span>
                    SOURCE_CODE
                  </a>
                </div>
              </div>

            </div>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <div className="absolute bottom-8 left-4 right-4 sm:left-12 sm:right-12 h-[1px] bg-[var(--border-glass)]">
          <motion.div 
            className="h-full bg-[var(--text-primary)] origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  );
}
