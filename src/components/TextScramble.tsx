"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

export default function TextScramble({ children }: { children: string }) {
  const [text, setText] = useState(children);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setText(
        children
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return children[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= children.length) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }
      
      iteration += 1 / 2; // Scramble speed
    }, 30);
  };

  const reset = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setText(children);
  };

  return (
    <motion.span
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className="inline-block"
    >
      {text}
    </motion.span>
  );
}
