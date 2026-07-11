"use client";

import { useEffect, useRef } from "react";

interface Dot {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function InteractiveDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dotsRef = useRef<Dot[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const spacing = 32;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cols = Math.ceil(w / spacing) + 2;
    const rows = Math.ceil(h / spacing) + 2;
    dotsRef.current = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ox = c * spacing + (r % 2 === 0 ? 0 : spacing / 2);
        const oy = r * spacing;
        dotsRef.current.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 });
      }
    }

    const move = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const leave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);

    const radius = 100;
    const force = 0.1;
    const friction = 0.88;

    const animate = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const dots = dotsRef.current;

      for (const d of dots) {
        const dx = mx - d.ox;
        const dy = my - d.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius && dist > 0) {
          const pull = (1 - dist / radius) * force;
          d.vx += dx * pull;
          d.vy += dy * pull;
        }

        d.vx += (d.ox - d.x) * 0.02;
        d.vy += (d.oy - d.y) * 0.02;
        d.vx *= friction;
        d.vy *= friction;
        d.x += d.vx;
        d.y += d.vy;
      }

      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

      for (const d of dots) {
        const distToMouse = Math.hypot(d.x - mx, d.y - my);
        const baseAlpha = 0.2;
        const glow = Math.max(0, 1 - distToMouse / 150) * 0.5;
        const alpha = Math.min(0.7, baseAlpha + glow);

        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.8, 0, Math.PI * 2);

        if (distToMouse < 150) {
          ctx.fillStyle = `rgba(0, 102, 177, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
}
