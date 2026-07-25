"use client";

import { useState, useRef, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#";

export default function HoverGlitchText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered) {
      let iteration = 0;
      
      clearInterval(intervalRef.current as NodeJS.Timeout);
      
      intervalRef.current = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration || letter === " ") {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(intervalRef.current as NodeJS.Timeout);
        }

        iteration += 1 / 3; // Speed of decoding
      }, 30);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      setDisplayText(text);
    }

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isHovered, text]);

  return (
    <span 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
}
