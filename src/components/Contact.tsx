"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-32 sm:py-48 relative bg-[var(--bg-void)] border-t border-[var(--border-glass)] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-[-20%] left-[50%] -translate-x-1/2 w-[80vw] h-[50vh] bg-gradient-to-t from-[var(--accent-cyan)] to-transparent blur-[150px] opacity-10 pointer-events-none" />

      <div className="section-container relative z-10">
        
        {/* Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <div className="text-mask mb-4">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
              className="text-5xl sm:text-7xl md:text-9xl font-extrabold uppercase tracking-tighter text-[var(--text-primary)]"
            >
              INITIATE
            </motion.h2>
          </div>
          <div className="text-mask">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0], delay: 0.1 }}
              className="text-5xl sm:text-7xl md:text-9xl font-extrabold uppercase tracking-tighter text-[var(--text-muted)]"
            >
              CONTACT
            </motion.h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto">
          
          {/* Left — Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between"
          >
            <div>
              <p className="text-xl sm:text-2xl text-[var(--text-secondary)] font-light leading-relaxed mb-12">
                Whether you have a question, a project, or just want to say hi, my inbox is open. I always try my best to get back to you!
              </p>

              <div className="flex flex-col gap-6">
                {[
                  { label: "EMAIL", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { label: "LINKEDIN", value: "RANJAN KUMAR", href: personalInfo.linkedin },
                  { label: "GITHUB", value: "GITHUB/RANJAN", href: personalInfo.github },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic group flex items-center justify-between py-4 border-b border-[var(--border-glass)] hover:border-[var(--accent-cyan)] transition-colors"
                  >
                    <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--text-primary)] tracking-widest uppercase">
                      {link.label}
                    </span>
                    <span className="flex items-center gap-4 text-sm font-[family-name:var(--font-mono)] text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)] transition-colors uppercase">
                      {link.value} 
                      <ArrowRight size={14} className="-rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="neural-glass p-8 sm:p-12 rounded-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-8 flex flex-col h-full justify-between">
              <div className="space-y-8">
                <div className="relative group/input">
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--border-glass)] py-4 text-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-cyan)] transition-colors peer"
                    placeholder="WHAT'S YOUR NAME?"
                    required
                  />
                  <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-[var(--accent-cyan)] transition-all duration-300 peer-focus:w-full" />
                </div>
                
                <div className="relative group/input">
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--border-glass)] py-4 text-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-cyan)] transition-colors peer"
                    placeholder="YOUR EMAIL ADDRESS"
                    required
                  />
                  <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-[var(--accent-cyan)] transition-all duration-300 peer-focus:w-full" />
                </div>
                
                <div className="relative group/input">
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--border-glass)] py-4 text-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-cyan)] transition-colors resize-none peer"
                    placeholder="TELL ME ABOUT YOUR PROJECT..."
                    required
                  />
                  <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-[var(--accent-cyan)] transition-all duration-300 peer-focus:w-full" />
                </div>
              </div>

              <button
                type="submit"
                className="magnetic mt-12 w-full py-6 bg-[var(--text-primary)] text-[var(--bg-void)] font-[family-name:var(--font-mono)] font-bold tracking-widest uppercase hover:bg-[var(--accent-cyan)] transition-colors flex justify-center items-center gap-4 group"
              >
                {submitted ? "MESSAGE RECEIVED" : "SEND MESSAGE"}
                {!submitted && <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
