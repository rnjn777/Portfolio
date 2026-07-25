"use client";

import { memo } from "react";

const Noise = memo(() => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1000] h-full w-full opacity-[0.03]">
      <svg className="absolute inset-0 h-full w-full">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0 1" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg-void)_150%)]" />
    </div>
  );
});

Noise.displayName = "Noise";

export default Noise;
