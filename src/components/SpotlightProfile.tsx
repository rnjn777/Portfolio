"use client";

import { useEffect, useRef, useCallback } from "react";

export default function SpotlightProfile() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const particlesRef = useRef<Array<{ angle: number; radius: number; speed: number; size: number; opacity: number }>>([]); 
  const rafRef = useRef<number>(0);
  const hasMovedRef = useRef(false);

  const initParticles = useCallback((count: number) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 140 + Math.random() * 40, // orbit radius around the circle edge
        speed: 0.002 + Math.random() * 0.008,
        size: 0.5 + Math.random() * 2,
        opacity: 0.2 + Math.random() * 0.8,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load image
    const img = new Image();
    img.src = "/profile.png";
    img.onload = () => {
      imgRef.current = img;
    };
    
    // Init particles
    particlesRef.current = initParticles(120);

    // Set initial mouse to center-right of viewport
    mouseRef.current.x = window.innerWidth * 0.65;
    mouseRef.current.y = window.innerHeight * 0.45;
    mouseRef.current.targetX = mouseRef.current.x;
    mouseRef.current.targetY = mouseRef.current.y;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      // Get position relative to the hero section
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      hasMovedRef.current = true;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      const { width, height } = canvas;
      
      // Smooth cursor follow (lerp)
      const lerp = 0.08;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * lerp;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * lerp;
      
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const circleRadius = Math.min(width, height) * 0.18; // responsive circle size

      // Clear everything
      ctx.clearRect(0, 0, width, height);

      // --- Draw the profile image ONLY inside the circle ---
      if (imgRef.current) {
        ctx.save();
        
        // Create circular clipping path
        ctx.beginPath();
        ctx.arc(mx, my, circleRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Draw the image to cover the canvas, centered
        const imgAspect = imgRef.current.width / imgRef.current.height;
        const canvasAspect = width / height;
        let drawW: number, drawH: number, drawX: number, drawY: number;
        
        if (imgAspect > canvasAspect) {
          drawH = height;
          drawW = height * imgAspect;
          drawX = (width - drawW) / 2;
          drawY = 0;
        } else {
          drawW = width;
          drawH = width / imgAspect;
          drawX = 0;
          drawY = (height - drawH) / 2;
        }
        
        ctx.drawImage(imgRef.current, drawX, drawY, drawW, drawH);
        ctx.restore();
      }

      // --- Glowing ring around the circle ---
      ctx.save();
      ctx.beginPath();
      ctx.arc(mx, my, circleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 255, 255, 0.15)";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Outer glow
      ctx.beginPath();
      ctx.arc(mx, my, circleRadius + 4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 255, 255, 0.06)";
      ctx.lineWidth = 8;
      ctx.stroke();
      ctx.restore();

      // --- Orbiting particles around the circle edge ---
      particlesRef.current.forEach((p) => {
        p.angle += p.speed;
        const px = mx + Math.cos(p.angle) * (circleRadius + p.radius - 140);
        const py = my + Math.sin(p.angle) * (circleRadius + p.radius - 140);
        
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${p.opacity * 0.5})`;
        ctx.fill();
      });

      // --- Scattered static stars/dust in the background ---
      // Use a seeded approach based on frame for twinkling
      const time = Date.now() * 0.001;
      for (let i = 0; i < 60; i++) {
        const sx = ((i * 137.5) % width);
        const sy = ((i * 97.3 + 50) % height);
        const twinkle = Math.sin(time * 0.5 + i * 1.7) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.5 + twinkle * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 210, 230, ${twinkle * 0.4})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
