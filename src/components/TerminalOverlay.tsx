"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSciFiSound } from "@/hooks/useSciFiSound";

const commands = {
  help: "AVAILABLE COMMANDS:\\n- help: Show this message\\n- skills: List technical capabilities\\n- contact: Initialize secure comms\\n- clear: Clear terminal\\n- exit: Close terminal overlay",
  skills: "SYSTEM CAPABILITIES:\\n> Frontend: Next.js, React, WebGL\\n> Styling: Tailwind, Framer Motion\\n> AI/ML: Python, TensorFlow, PyTorch",
  contact: "SECURE COMMS PROTOCOL INITIATED.\\n> ping: contact@ranjankumar.dev\\n> github.com/ranjankumar",
};

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { playType } = useSciFiSound();
  const [history, setHistory] = useState<string[]>(["SYSTEM BOOT...", "PRESS ~ TO CLOSE TERMINAL OVERLAY", "TYPE 'help' FOR COMMANDS."]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "~" || e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    playType();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `> ${input}`];

    if (cmd === "clear") {
      setHistory([]);
    } else if (cmd === "exit") {
      setIsOpen(false);
      setHistory(["SYSTEM BOOT..."]);
    } else if (commands[cmd as keyof typeof commands]) {
      newHistory.push(...commands[cmd as keyof typeof commands].split("\\n"));
      setHistory(newHistory);
    } else {
      newHistory.push(`COMMAND NOT RECOGNIZED: ${cmd}`);
      setHistory(newHistory);
    }

    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-4 z-[9999] pointer-events-auto"
        >
          {/* Glass background */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl border border-[var(--accent-cyan)]/30 rounded-lg shadow-[0_0_50px_rgba(0,255,255,0.1)] overflow-hidden flex flex-col font-[family-name:var(--font-mono)] text-sm">
            
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[var(--accent-cyan)]/10 border-b border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)]">
              <span className="tracking-widest">SECURE_TERMINAL_v1.0</span>
              <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
                [X]
              </button>
            </div>

            {/* Output */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 text-[var(--text-secondary)]">
              {history.map((line, i) => (
                <div key={i} className={line.startsWith(">") ? "text-[var(--text-primary)]" : ""}>
                  {line}
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--accent-cyan)]/30 flex gap-2 text-[var(--accent-cyan)]">
              <span>root@ranjan:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] caret-[var(--accent-cyan)]"
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
