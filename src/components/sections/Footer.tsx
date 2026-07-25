"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

export default function Footer() {
  const [history, setHistory] = useState<{cmd: string, resp: string}[]>([{
    cmd: "init", resp: "Agent initialized. Type 'help' for commands."
  }]);
  const [input, setInput] = useState("");
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    
    let resp = "";
    switch(cmd) {
      case "help": resp = "Available commands: help, whoami, projects, contact, clear"; break;
      case "whoami": resp = "Ranjan Kumar - AI & Full-Stack Engineer"; break;
      case "projects": resp = "1. Hanyura 2. Urban Green Corridor 3. KrishiQuest"; break;
      case "contact": resp = "Email: ranjan777work@gmail.com"; break;
      case "clear": setHistory([]); setInput(""); return;
      default: resp = `Command not found: ${cmd}`; break;
    }
    
    setHistory([...history, {cmd, resp}]);
    setInput("");
  }

  return (
    <footer className="py-12 border-t border-[var(--border-glass)] relative bg-[var(--bg-void)]">
      <div className="section-container">
        
        {/* Agentic Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 mt-12 max-w-2xl mx-auto"
        >
          <div className="neural-glass rounded-xl overflow-hidden border border-[var(--border-glass)]">
            <div className="bg-[var(--bg-void)]/80 px-4 py-2 border-b border-[var(--border-glass)] flex items-center gap-2">
              <TerminalIcon size={14} className="text-[var(--text-muted)]" />
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">NK.AGENT // TERMINAL</span>
            </div>
            <div ref={terminalContainerRef} className="p-4 sm:p-6 font-mono text-xs sm:text-sm h-[200px] overflow-y-auto custom-scrollbar flex flex-col">
              <div className="flex-1">
                {history.map((entry, i) => (
                  <div key={i} className="mb-4">
                    <div className="text-[var(--accent-cyan)] mb-1">
                      <span className="text-[var(--text-muted)] opacity-50 mr-2">{">"}</span>
                      {entry.cmd}
                    </div>
                    <div className="text-[var(--text-secondary)] leading-relaxed">
                      {entry.resp}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleCommand} className="mt-2 flex items-center gap-2">
                <span className="text-[var(--text-muted)] opacity-50">{">"}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/30"
                  placeholder="Type a command..."
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </div>
        </motion.div>

        {/* Huge Name text */}
        <div className="flex justify-center items-center overflow-hidden w-full select-none pointer-events-none opacity-20 mb-12">
           <h2 className="text-[15vw] font-extrabold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] to-transparent">
              RANJAN
           </h2>
        </div>

        {/* Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-[family-name:var(--font-mono)] uppercase tracking-widest border-t border-[var(--border-glass)] pt-8">
          <div className="flex items-center gap-4">
            <span className="text-[var(--text-primary)] font-bold">
              RANJAN KUMAR
            </span>
            <span>CREATIVE ENGINEER</span>
          </div>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()}</span>
            <span>//</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
