"use client";

import React, { useEffect, useRef } from "react";

interface FlickeringGridProps {
  className?: string;
  squareSize?: number;
  gridGap?: number;
  color?: string;
  maxOpacity?: number;
  flickerChance?: number;
}

export function FlickeringGrid({
  className = "",
  squareSize = 4,
  gridGap = 6,
  color = "#6B7280",
  maxOpacity = 0.5,
  flickerChance = 0.1,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let cells: Float32Array;
    let targetOpacities: Float32Array;
    let cols = 0;
    let rows = 0;

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 107, g: 114, b: 128 };
    };

    const rgb = hexToRgb(color);

    const initGrid = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      
      ctx.scale(dpr, dpr);

      cols = Math.ceil(parent.clientWidth / (squareSize + gridGap));
      rows = Math.ceil(parent.clientHeight / (squareSize + gridGap));
      
      cells = new Float32Array(cols * rows).fill(0);
      targetOpacities = new Float32Array(cols * rows).fill(0);
    };

    const updateGrid = () => {
      if (!canvas.parentElement) return;

      for (let i = 0; i < cells.length; i++) {
        if (Math.random() < flickerChance) {
          targetOpacities[i] = Math.random() * maxOpacity;
        }
        // Smooth lerp to target
        cells[i] += (targetOpacities[i] - cells[i]) * 0.1;
      }

      ctx.clearRect(0, 0, canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const index = y * cols + x;
          const opacity = cells[index];
          if (opacity > 0.01) {
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
            ctx.fillRect(
              x * (squareSize + gridGap),
              y * (squareSize + gridGap),
              squareSize,
              squareSize
            );
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateGrid);
    };

    initGrid();
    window.addEventListener("resize", initGrid);
    animationFrameId = requestAnimationFrame(updateGrid);

    return () => {
      window.removeEventListener("resize", initGrid);
      cancelAnimationFrame(animationFrameId);
    };
  }, [squareSize, gridGap, color, maxOpacity, flickerChance]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute pointer-events-none ${className}`}
    />
  );
}
