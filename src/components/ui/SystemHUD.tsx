"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Terminal, Cpu, Network, Activity } from "lucide-react";

export default function SystemHUD() {
  const [typedText, setTypedText] = useState("");
  const fullText = "> SYS.INIT...\n> AUTHENTICATED\n>";

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
    <div className="w-fit min-w-[150px] mb-4 border border-[var(--accent-cyan)]/20 bg-[var(--bg-void)]/40 backdrop-blur-md p-2 relative overflow-hidden group">
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
        <div className="flex-1 font-[family-name:var(--font-mono)] text-[8px] text-[var(--accent-cyan)] whitespace-pre-line leading-tight drop-shadow-none tracking-wide hud-glow">
          <div className="min-h-[30px]">
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-1 h-2 inline-block bg-[var(--accent-cyan)] align-middle ml-1 shadow-none hud-shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
