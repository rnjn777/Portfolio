"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useSciFiSound } from "@/hooks/useSciFiSound";

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { toggleAmbient, playClick, playHover } = useSciFiSound();

  const handleToggle = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    playClick(); // Feedback for clicking the button
    toggleAmbient(newState);
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={playHover}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300 backdrop-blur-md group cursor-pointer"
      aria-label={isPlaying ? "Mute ambient audio" : "Play ambient audio"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
      ) : (
        <VolumeX className="w-5 h-5 group-hover:scale-110 transition-transform" />
      )}
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded border border-[var(--accent-cyan)] bg-[var(--bg-void)]/90 text-[var(--accent-cyan)] text-xs uppercase tracking-widest font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {isPlaying ? "SYSTEM_AUDIO_OFF" : "INIT_AUDIO_SYSTEM"}
      </span>
      
      {/* Pulse effect when off to draw attention */}
      {!isPlaying && (
        <span className="absolute inset-0 rounded-full border border-[var(--accent-cyan)] animate-ping opacity-20"></span>
      )}
    </button>
  );
}
