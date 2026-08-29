import React, { useEffect, useRef } from 'react';
import { ThemeMode } from '../types';

interface InteractiveHeroBackgroundProps {
  theme: ThemeMode;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  color: string;
}

export const InteractiveHeroBackground: React.FC<InteractiveHeroBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Initial mouse center
    mouseRef.current.x = width / 2;
    mouseRef.current.y = height / 2;
    mouseRef.current.targetX = width / 2;
    mouseRef.current.targetY = height / 2;

    // Create particles
    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
    let particles: Particle[] = [];

    const colors = isDark 
      ? ['#38bdf8', '#818cf8', '#34d399', '#60a5fa'] 
      : ['#0284c7', '#6366f1', '#059669', '#2563eb'];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          baseAlpha: Math.random() * 0.4 + 0.15,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initParticles();

    // Render loop
    const render = () => {
      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle glow near cursor
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        400
      );
      if (isDark) {
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
        gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.03)');
        gradient.addColorStop(1, 'rgba(10, 14, 20, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.05)');
        gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.02)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles with connecting subtle lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Parallax push from mouse
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 1.5;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distBetween < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - distBetween / 100) * 0.12;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full -z-10 transition-opacity duration-700"
    />
  );
};
