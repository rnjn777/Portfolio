"use client";

import { Terminal } from "lucide-react";
import { useSciFiSound } from "@/hooks/useSciFiSound";

export default function MobileTerminalButton() {
  const { playHover, playClick } = useSciFiSound();

  const handleOpenTerminal = () => {
    playClick();
    // Simulate the ~ keypress which TerminalOverlay listens for
    document.dispatchEvent(new KeyboardEvent('keydown', { key: '~' }));
  };

  return (
    <button
      onClick={handleOpenTerminal}
      onMouseEnter={playHover}
      className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300 backdrop-blur-md md:hidden flex items-center justify-center cursor-pointer active:scale-95"
      aria-label="Open Terminal"
    >
      <Terminal className="w-5 h-5" />
      <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded border border-[var(--accent-cyan)] bg-[var(--bg-void)]/90 text-[var(--accent-cyan)] text-xs uppercase tracking-widest font-mono opacity-0 transition-opacity pointer-events-none group-active:opacity-100">
        INIT_TERMINAL
      </span>
    </button>
  );
}
