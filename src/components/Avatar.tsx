"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export const Avatar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Framer Motion mouse tracking for 3D card tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out spring physics
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Normalize coordinates from -0.5 to 0.5
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Canvas-based neural network background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Particle[] = [];
    const particleCount = 28;
    const maxDistance = 75;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Low velocity for subtle breathing effect
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on borders
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(6, 182, 212, 0.4)"; // Cyan
        context.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Gradient lines between purple and cyan
            const grad = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            grad.addColorStop(0, `rgba(168, 85, 247, ${alpha})`); // Purple
            grad.addColorStop(1, `rgba(6, 182, 212, ${alpha})`); // Cyan
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-[250px] h-[250px] min-[360px]:w-[280px] min-[360px]:h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] flex items-center justify-center cursor-pointer select-none"
    >
      {/* Background canvas for neural particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none rounded-full"
      />

      {/* Layered Glow Rings */}
      <div className="absolute inset-4 rounded-full border border-primary/10 animate-spin-slow scale-105 pointer-events-none" />
      <div className="absolute inset-8 rounded-full border border-secondary/15 animate-spin-slow-reverse scale-100 pointer-events-none" />
      
      {/* Ambient background glows */}
      <div className="absolute w-[200px] h-[200px] bg-primary/20 rounded-full blur-[70px] -top-5 -left-5 animate-pulse-slow pointer-events-none" />
      <div className="absolute w-[200px] h-[200px] bg-secondary/15 rounded-full blur-[70px] -bottom-5 -right-5 animate-pulse-slow pointer-events-none" />

      {/* Outer rotating ring */}
      <div className="absolute inset-0 border-[2px] border-dashed border-white/5 rounded-full animate-spin-slow" />

      {/* 3D Tilt Container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[190px] h-[190px] min-[360px]:w-[220px] min-[360px]:h-[220px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] rounded-full z-10 flex items-center justify-center"
      >
        {/* Glow Ring Border Wrapper */}
        <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-primary via-white/10 to-secondary shadow-2xl overflow-hidden shadow-black/80 flex items-center justify-center">
          <div className="absolute inset-[2px] rounded-full bg-dark-bg z-0" />
          
          {/* Portrait Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden z-10 animate-float">
            <Image
              src="/images/kartik-shukla.png"
              alt="Kartik Shukla portrait"
              fill
              priority
              className="object-cover scale-[1.08] hover:scale-[1.12] transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        {/* Dynamic Card Depth Shadows */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </motion.div>

      {/* Subtle indicator beacon */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-white/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] sm:text-xs font-semibold text-white/80 uppercase tracking-widest">
          AI ACTIVE
        </span>
      </div>
    </div>
  );
};
