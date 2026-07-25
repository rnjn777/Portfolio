"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Terminal, Cpu, Network, Activity } from "lucide-react";

export default function SystemHUD() {
  const [typedText, setTypedText] = useState("");
  const fullText = "> SYS.INIT_SEQUENCE...\n> LOADING_MODULES [OK]\n> USER AUTHENTICATED:\n> RANJAN_K";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(typing);
    }, 40);
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="w-full max-w-[280px] mb-4 border border-[var(--accent-cyan)]/20 bg-[var(--bg-void)]/40 backdrop-blur-md p-2.5 relative overflow-hidden group">
      {/* HUD Crosshairs */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--accent-cyan)]/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--accent-cyan)]/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--accent-cyan)]/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--accent-cyan)]/50" />

      {/* Subtle scanline animation */}
      <motion.div
        animate={{ y: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-cyan)]/10 to-transparent pointer-events-none opacity-50"
      />

      <div className="flex justify-between items-start gap-3">
        {/* Terminal output */}
        <div className="flex-1 font-[family-name:var(--font-mono)] text-[8px] sm:text-[9px] text-[var(--accent-cyan)] whitespace-pre-line leading-tight drop-shadow-none tracking-wide hud-glow">
          <div className="flex items-center gap-1.5 mb-1.5 border-b border-[var(--accent-cyan)]/20 pb-1 w-fit opacity-80">
            <Terminal size={9} />
            <span>TERMINAL_LINK</span>
          </div>
          <div className="min-h-[40px]">
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-1.5 h-2.5 inline-block bg-[var(--accent-cyan)] align-middle ml-1 shadow-none hud-shadow"
            />
          </div>
        </div>

        {/* Live Metrics */}
        <div className="flex flex-col gap-2 border-l border-[var(--accent-cyan)]/20 pl-2 min-w-[60px]">
          <div>
            <div className="flex items-center justify-between text-[7px] font-mono text-[var(--accent-cyan)] uppercase w-full mb-0.5">
              <span className="flex items-center gap-1 opacity-70"><Cpu size={8} /> CPU</span>
            </div>
            <div className="w-full h-[1.5px] bg-[var(--accent-cyan)]/10 rounded overflow-hidden">
              <motion.div animate={{ width: ["60%", "85%", "40%", "90%", "70%"] }} transition={{ repeat: Infinity, duration: 3 }} className="h-full bg-[var(--accent-cyan)] shadow-none hud-shadow-subtle" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-[7px] font-mono text-[var(--accent-cyan)] uppercase w-full mb-0.5">
              <span className="flex items-center gap-1 opacity-70"><Activity size={8} /> MEM</span>
            </div>
            <div className="w-full h-[1.5px] bg-[var(--accent-cyan)]/10 rounded overflow-hidden">
              <motion.div animate={{ width: ["40%", "75%", "55%", "80%", "45%"] }} transition={{ repeat: Infinity, duration: 4 }} className="h-full bg-[var(--accent-cyan)] shadow-none hud-shadow-subtle" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-[7px] font-mono text-[var(--accent-cyan)] uppercase w-full mb-0.5">
              <span className="flex items-center gap-1 opacity-70"><Network size={8} /> NET</span>
            </div>
            <div className="w-full h-[1.5px] bg-[var(--accent-cyan)]/10 rounded overflow-hidden">
              <motion.div animate={{ width: ["95%", "100%", "90%", "98%"] }} transition={{ repeat: Infinity, duration: 1.5 }} className="h-full bg-[var(--accent-cyan)] shadow-none hud-shadow-subtle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
