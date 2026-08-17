"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Shape {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: "triangle" | "circle" | "diamond";
}

export function FloatingShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 15;
        mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 15;
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let isTabVisible = !document.hidden;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const shapes: Shape[] = Array.from({ length: 8 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 24 + 10,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.035 + 0.01,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.008,
      type: (["triangle", "circle", "diamond"] as const)[
        Math.floor(Math.random() * 3)
      ],
    }));

    const drawShape = (shape: Shape) => {
      ctx.save();
      ctx.translate(
        shape.x + mouseRef.current.x * (shape.size / 40),
        shape.y + mouseRef.current.y * (shape.size / 40)
      );
      ctx.rotate(shape.rotation);
      ctx.strokeStyle = `rgba(124, 92, 255, ${shape.opacity})`;
      ctx.lineWidth = 1;

      if (shape.type === "triangle") {
        ctx.beginPath();
        ctx.moveTo(0, -shape.size / 2);
        ctx.lineTo(-shape.size / 2, shape.size / 2);
        ctx.lineTo(shape.size / 2, shape.size / 2);
        ctx.closePath();
        ctx.stroke();
      } else if (shape.type === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -shape.size / 2);
        ctx.lineTo(shape.size / 2, 0);
        ctx.lineTo(0, shape.size / 2);
        ctx.lineTo(-shape.size / 2, 0);
        ctx.closePath();
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = () => {
      if (!isTabVisible) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const len = shapes.length;
      for (let i = 0; i < len; i++) {
        const shape = shapes[i];
        shape.x += shape.speedX;
        shape.y += shape.speedY;
        shape.rotation += shape.rotationSpeed;

        if (shape.x < -40) shape.x = canvas.width + 40;
        if (shape.x > canvas.width + 40) shape.x = -40;
        if (shape.y < -40) shape.y = canvas.height + 40;
        if (shape.y > canvas.height + 40) shape.y = -40;

        drawShape(shape);
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(resizeTimer);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
