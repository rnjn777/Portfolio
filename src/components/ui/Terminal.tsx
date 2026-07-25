"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Terminal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "z-0 w-full max-w-3xl mx-auto rounded-xl border border-[var(--border-glass)] bg-[var(--bg-void)]/90 backdrop-blur-md shadow-2xl relative overflow-hidden group",
        className,
      )}
    >
      {/* Scanlines effect overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-10" />
      {/* Soft inner glow */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(45,212,191,0.05)] z-10" />
      <div className="flex flex-col border-b border-[var(--border-glass)] p-4 bg-[var(--text-primary)]/[0.02] rounded-t-xl">
        <div className="flex flex-row gap-x-2 items-center">
          <div className="h-3 w-3 rounded-full bg-red-500/80 border border-red-600/20"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500/80 border border-yellow-600/20"></div>
          <div className="h-3 w-3 rounded-full bg-green-500/80 border border-green-600/20"></div>
          <div className="ml-4 text-xs font-mono text-[var(--text-muted)] tracking-widest flex-1 text-center pr-8">
            bash - milestones
          </div>
        </div>
      </div>
      <div className="p-6 overflow-hidden font-[family-name:var(--font-mono)] text-sm sm:text-base text-[var(--text-secondary)] min-h-[300px] relative z-20">
        {children}
      </div>
    </div>
  );
}

export function TypingAnimation({
  children,
  className,
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 40);

    return () => {
      clearInterval(typingEffect);
    };
  }, [children, started]);

  return (
    <div className={cn("mt-3 flex items-start group", className)}>
      <span className="text-[var(--accent-cyan)] mr-2 shrink-0 select-none">➜</span>
      <span>
        <span className="text-[var(--accent-purple)] select-none">~</span> {text}
        {started && text.length < children.length && (
          <span className="animate-pulse ml-1 inline-block w-2 h-4 sm:h-5 bg-[var(--accent-cyan)] align-middle shadow-[0_0_8px_var(--accent-cyan)]" />
        )}
      </span>
    </div>
  );
}

export function AnimatedSpan({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  return (
    <div
      className={cn("mt-2 transition-opacity duration-500 ml-6", className, {
        "opacity-0": !visible,
        "opacity-100": visible,
      })}
    >
      {children}
    </div>
  );
}
