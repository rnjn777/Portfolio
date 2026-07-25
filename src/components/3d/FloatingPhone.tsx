"use client";

import { motion } from "framer-motion";
import { Wifi, BatteryCharging, Signal } from "lucide-react";

export default function FloatingPhone() {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient glow behind phone */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[320px] h-[480px] bg-[var(--accent-cyan)]/8 blur-[80px] rounded-full animate-pulse" />
      </div>

      <div
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(-15deg) rotateX(8deg)",
        }}
        className="rounded-[28px] bg-gradient-to-br from-[var(--accent-cyan)]/20 to-[var(--accent-cyan)]/5 shadow-none phone-glow backdrop-blur-md transition-transform duration-700 hover:scale-[1.03]"
      >
        <motion.div
          initial={{
            transform: "translateZ(8px) translateY(-2px)",
          }}
          animate={{
            transform: "translateZ(32px) translateY(-10px)",
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 3,
            ease: "easeInOut",
          }}
          className="relative h-[420px] w-[245px] rounded-[26px] border-2 border-b-4 border-r-4 border-[var(--accent-cyan)]/40 border-l-white/15 border-t-white/15 bg-[var(--bg-void)]/20 backdrop-blur-xl p-1.5 pl-[4px] pt-[4px] shadow-2xl overflow-hidden"
        >
          {/* Animated edge glow line */}
          <div className="absolute inset-0 rounded-[26px] pointer-events-none z-30">
            <div className="absolute top-0 left-[20%] w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/80 to-transparent" />
            <div className="absolute bottom-0 left-[30%] w-[40%] h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/40 to-transparent" />
          </div>

          <HeaderBar />
          <Screen />
        </motion.div>
      </div>
    </div>
  );
}

function HeaderBar() {
  return (
    <>
      {/* Dynamic island style notch */}
      <div className="absolute left-[50%] top-2.5 z-20 h-[18px] w-[70px] -translate-x-[50%] rounded-full bg-[var(--bg-void)]/80 border border-[var(--border-glass)] backdrop-blur-sm flex items-center justify-center gap-1">
        <div className="w-[6px] h-[6px] rounded-full bg-[var(--accent-cyan)]/60" />
      </div>
      <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5 text-xs">
        <Signal size={10} className="text-[var(--accent-cyan)]/70" />
        <Wifi size={10} className="text-[var(--accent-cyan)]/70" />
        <BatteryCharging size={10} className="text-[var(--accent-cyan)]/70" />
      </div>
      <div className="absolute left-3 top-3 z-20">
        <span className="font-[family-name:var(--font-mono)] text-[8px] text-[var(--accent-cyan)]/50">9:41</span>
      </div>
    </>
  );
}

function Screen() {
  return (
    <div className="relative z-0 flex h-full w-full flex-col justify-end overflow-hidden rounded-[22px] bg-transparent">
      {/* Layered glass background glow inside phone screen */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--text-primary)]/5 via-transparent to-[var(--accent-cyan)]/8 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-cyan)]/5 via-transparent to-transparent pointer-events-none" />

      {/* Profile Image (Proportionate transparent cutout inside screen) */}
      <img
        src="/profile.png"
        alt="Ranjan Kumar"
        className="absolute inset-0 h-full w-full object-cover object-top scale-110 translate-y-2 opacity-100 pointer-events-none"
      />

      {/* Bottom gradient fade for button readability */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-void)]/80 via-[var(--bg-void)]/40 to-transparent pointer-events-none" />

      {/* Sci-fi glow element matching portfolio theme */}
      <div className="absolute -bottom-20 left-[50%] h-48 w-48 -translate-x-[50%] rounded-full bg-[var(--accent-cyan)]/20 blur-3xl pointer-events-none" />

      {/* Call to action button */}
      <button
        onClick={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="relative z-10 mx-3 mb-3 rounded-lg border border-[var(--accent-cyan)]/40 bg-[var(--bg-void)]/60 py-2 font-[family-name:var(--font-mono)] text-[10px] font-semibold tracking-[0.2em] text-[var(--accent-cyan)] uppercase backdrop-blur-xl hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-void)] transition-all duration-300 shadow-none phone-inner-glow cursor-pointer"
      >
        Get In Touch
      </button>
    </div>
  );
}
