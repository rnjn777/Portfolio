"use client";

import { useEffect, useRef, useCallback } from "react";

export default function SpotlightProfile() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const particlesRef = useRef<Array<{ angle: number; dist: number; speed: number; size: number; opacity: number; drift: number }>>([]); 
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  const initParticles = useCallback((count: number) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        dist: -10 + Math.random() * 30, // distance from circle edge (-10 to +20)
        speed: 0.001 + Math.random() * 0.006,
        size: 0.3 + Math.random() * 1.8,
        opacity: 0.1 + Math.random() * 0.7,
        drift: Math.random() * 0.5, // slight radial oscillation
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
    particlesRef.current = initParticles(150);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Set initial mouse to right-center (like Surendar's site)
    mouseRef.current.x = window.innerWidth * 0.62;
    mouseRef.current.y = window.innerHeight * 0.42;
    mouseRef.current.targetX = mouseRef.current.x;
    mouseRef.current.targetY = mouseRef.current.y;

    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Simplex-like noise function for liquid edge distortion
    const noise = (x: number, y: number): number => {
      const sin = Math.sin;
      return (sin(x * 1.3 + y * 0.7) * sin(y * 1.1 - x * 0.6) + sin(x * 2.1 + y * 1.7) * 0.5) * 0.5;
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      timeRef.current += 0.012;
      const t = timeRef.current;

      // Smooth cursor follow with lerp
      const lerp = 0.06;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * lerp;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * lerp;
      
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      
      // Circle size — smaller, like the reference (~150px radius)
      const circleRadius = Math.min(width, height) * 0.14;

      ctx.clearRect(0, 0, width, height);

      // --- Draw the profile image ONLY inside a liquid-distorted circle ---
      if (imgRef.current) {
        ctx.save();

        // Build a distorted circular path (liquid edge effect)
        ctx.beginPath();
        const segments = 120;
        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          // Add noise-based distortion to the radius
          const distortion = noise(
            Math.cos(angle) * 3 + t * 0.8,
            Math.sin(angle) * 3 + t * 0.6
          ) * circleRadius * 0.08;
          const r = circleRadius + distortion;
          const px = mx + Math.cos(angle) * r;
          const py = my + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.clip();

        // Draw the image — STATIC position on the right side, NOT following cursor
        // Image is positioned at ~60% from left, vertically centered
        const imgW = imgRef.current.width;
        const imgH = imgRef.current.height;
        const imgAspect = imgW / imgH;
        
        // The image should cover a fixed area on the right side
        const imgDisplayH = height * 0.85;
        const imgDisplayW = imgDisplayH * imgAspect;
        const imgX = width * 0.5 - imgDisplayW * 0.35; // offset to right
        const imgY = (height - imgDisplayH) / 2 + height * 0.05;
        
        ctx.drawImage(imgRef.current, imgX, imgY, imgDisplayW, imgDisplayH);

        // Vignette overlay INSIDE the clip — dark edges for seamless blending
        const vignetteGrad = ctx.createRadialGradient(mx, my, circleRadius * 0.3, mx, my, circleRadius);
        vignetteGrad.addColorStop(0, "rgba(0,0,0,0)");
        vignetteGrad.addColorStop(0.7, "rgba(0,0,0,0.1)");
        vignetteGrad.addColorStop(1, "rgba(0,0,0,0.6)");
        ctx.fillStyle = vignetteGrad;
        ctx.fillRect(mx - circleRadius * 1.5, my - circleRadius * 1.5, circleRadius * 3, circleRadius * 3);

        ctx.restore();
      }

      // --- Glowing ring (double layer) ---
      ctx.save();
      // Inner ring
      ctx.beginPath();
      const ringSegments = 120;
      for (let i = 0; i <= ringSegments; i++) {
        const angle = (i / ringSegments) * Math.PI * 2;
        const distortion = noise(
          Math.cos(angle) * 3 + t * 0.8,
          Math.sin(angle) * 3 + t * 0.6
        ) * circleRadius * 0.08;
        const r = circleRadius + distortion;
        const px = mx + Math.cos(angle) * r;
        const py = my + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(0, 255, 255, 0.12)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Outer glow ring
      ctx.beginPath();
      for (let i = 0; i <= ringSegments; i++) {
        const angle = (i / ringSegments) * Math.PI * 2;
        const distortion = noise(
          Math.cos(angle) * 3 + t * 0.8,
          Math.sin(angle) * 3 + t * 0.6
        ) * circleRadius * 0.08;
        const r = circleRadius + distortion + 5;
        const px = mx + Math.cos(angle) * r;
        const py = my + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(0, 255, 255, 0.04)";
      ctx.lineWidth = 10;
      ctx.stroke();
      ctx.restore();

      // --- Orbiting particles around the portal edge ---
      particlesRef.current.forEach((p) => {
        p.angle += p.speed;
        const driftOffset = Math.sin(t * 2 + p.angle * 3) * p.drift * 10;
        const distortion = noise(
          Math.cos(p.angle) * 3 + t * 0.8,
          Math.sin(p.angle) * 3 + t * 0.6
        ) * circleRadius * 0.08;
        const r = circleRadius + distortion + p.dist + driftOffset;
        const px = mx + Math.cos(p.angle) * r;
        const py = my + Math.sin(p.angle) * r;
        
        // Fade particles that are far from the circle
        const fadeFactor = Math.max(0, 1 - Math.abs(p.dist + driftOffset) / 30);
        
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 210, 240, ${p.opacity * fadeFactor * 0.6})`;
        ctx.fill();
      });

      // --- Scattered ambient stars/dust ---
      for (let i = 0; i < 50; i++) {
        const sx = ((i * 137.5 + 23) % width);
        const sy = ((i * 97.3 + 50) % height);
        const twinkle = Math.sin(t * 0.4 + i * 2.3) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.4 + twinkle * 1.0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 220, ${twinkle * 0.3})`;
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
    />
  );
}
