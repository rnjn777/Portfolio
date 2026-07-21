"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/lib/data";
import { useSciFiSound } from "@/hooks/useSciFiSound";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { playHover, playClick } = useSciFiSound();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-500 ${scrolled ? 'bg-[var(--bg-void)]/80 backdrop-blur-xl border-b border-[var(--border-glass)]' : 'bg-transparent'}`}
    >
      <div className="flex items-center justify-between h-20 px-6 sm:px-12 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--text-secondary)]">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-4">
          <a
            href="#hero"
            onMouseEnter={playHover}
            onClick={playClick}
            className="magnetic text-[var(--text-primary)] font-bold tracking-[0.3em] hover:text-[var(--accent-cyan)] transition-colors"
          >
            RANJAN
          </a>
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onMouseEnter={playHover}
              onClick={playClick}
              className="magnetic hover:text-[var(--text-primary)] transition-colors relative group py-4 flex items-center gap-2"
            >
              <span className="text-[10px] text-[var(--accent-cyan)] opacity-0 group-hover:opacity-100 transition-opacity">
                0{i + 1}
              </span>
              {item.label}
            </a>
          ))}
        </div>

        {/* Right: CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a href="#contact" className="magnetic px-6 py-3 border border-[var(--border-glass)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-colors rounded-full text-[10px]">
            START A PROJECT
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[var(--text-primary)]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? "CLOSE" : "MENU"}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="lg:hidden bg-[var(--bg-void)] absolute top-20 left-0 w-full flex flex-col justify-center items-center gap-8 overflow-hidden"
          >
            {navItems.map((item, i) => (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-4xl font-[family-name:var(--font-display)] font-bold text-[var(--text-primary)] uppercase tracking-tighter"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
              href="#contact" 
              onClick={() => setMobileOpen(false)}
              className="mt-8 font-[family-name:var(--font-mono)] text-xs text-[var(--accent-cyan)] border border-[var(--accent-cyan)] px-8 py-4 rounded-full uppercase tracking-widest"
            >
              START A PROJECT
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
