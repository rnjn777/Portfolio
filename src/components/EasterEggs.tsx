"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function EasterEggs() {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>(["Welcome to RK-OS. Type 'help' for commands."]);

  useEffect(() => {
    // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Konami code
      if (e.key === konamiCode[konamiIndex] || e.key.toLowerCase() === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setKonamiActivated(true);
          konamiIndex = 0;
          setTimeout(() => setKonamiActivated(false), 5000); // Disable after 5s
        }
      } else {
        konamiIndex = 0;
      }

      // Handle 'T' for terminal
      if (e.key.toLowerCase() === "t" && !e.ctrlKey && !e.metaKey && e.target === document.body) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }

      // Handle 'G' for GitHub
      if (e.key.toLowerCase() === "g" && !e.ctrlKey && !e.metaKey && e.target === document.body) {
        window.open(personalInfo.github, "_blank");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    let output = "";

    switch (cmd) {
      case "help":
        output = "Commands: help, about, skills, contact, clear, sudo";
        break;
      case "about":
        output = personalInfo.tagline;
        break;
      case "skills":
        output = "AI Engineering, Full Stack Development, Next.js, Python, TypeScript";
        break;
      case "contact":
        output = `Email me at: ${personalInfo.email}`;
        break;
      case "clear":
        setTerminalOutput([]);
        setTerminalInput("");
        return;
      case "sudo":
        output = "Nice try. Incident logged.";
        break;
      default:
        output = `Command not found: ${cmd}`;
    }

    setTerminalOutput((prev) => [...prev, `> ${terminalInput}`, output]);
    setTerminalInput("");
  };

  return (
    <>
      {/* Konami Effect Layer */}
      <AnimatePresence>
        {konamiActivated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[9999] mix-blend-color-dodge"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                rgba(0, 212, 255, 0.1) 0px,
                rgba(0, 212, 255, 0.1) 1px,
                transparent 1px,
                transparent 2px
              )`,
            }}
          >
            <motion.div
              animate={{ y: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-32 bg-gradient-to-b from-transparent to-[var(--accent-cyan)] opacity-20"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Layer */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-96 h-80 glass z-[9998] flex flex-col font-[family-name:var(--font-mono)] text-sm shadow-2xl shadow-[var(--accent-cyan)]/20"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between p-3 border-b border-[var(--border-glass)] bg-[rgba(0,0,0,0.5)] rounded-t-xl">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)]">Terminal</span>
              </div>
              <button
                onClick={() => setTerminalOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2 scrollbar-thin scrollbar-thumb-[var(--accent-cyan)] scrollbar-track-transparent">
              {terminalOutput.map((line, i) => (
                <div key={i} className={`${line.startsWith(">") ? "text-[var(--text-muted)]" : "text-[var(--accent-cyan)]"}`}>
                  {line}
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleTerminalSubmit} className="p-3 border-t border-[var(--border-glass)] flex items-center gap-2">
              <span className="text-[var(--text-muted)]">{">"}</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="flex-1 bg-transparent border-none text-[var(--text-primary)] focus:outline-none placeholder:text-[var(--text-muted)]/30"
                placeholder="Type a command..."
                autoFocus
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
