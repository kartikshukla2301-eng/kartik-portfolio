"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState, memo } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const mousePosition = new THREE.Vector2(0, 0);

const AbstractShape = memo(function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.12 + mousePosition.y * 0.1;
    meshRef.current.rotation.y = t * 0.08 + mousePosition.x * 0.1;
    meshRef.current.rotation.z = t * 0.04;

    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.1;
      wireRef.current.rotation.y = t * 0.06;
      wireRef.current.rotation.z = t * 0.02;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
      <mesh ref={meshRef} scale={2.1}>
        <icosahedronGeometry args={[1, 3]} />
        <MeshDistortMaterial
          color="#7C5CFF"
          roughness={0.2}
          metalness={0.8}
          distort={0.25}
          speed={1.5}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh ref={wireRef} scale={2.4} position={[0, 0, -0.4]}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#22D3EE"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
});

function generatePositions(count: number) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    pos[i] = (Math.random() - 0.5) * 18;
    pos[i + 1] = (Math.random() - 0.5) * 18;
    pos[i + 2] = (Math.random() - 0.5) * 18;
  }
  return pos;
}

let cachedPositions: Float32Array | null = null;

function initPositions(count: number) {
  if (!cachedPositions) {
    cachedPositions = generatePositions(count);
  }
  return cachedPositions;
}

const Particles = memo(function Particles() {
  const count = 120;
  const [positions] = useState(() => initPositions(count));
  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      ref.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#7C5CFF"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
});

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#ffffff" />
      <pointLight position={[-3, 2, 4]} intensity={1} color="#7C5CFF" />
      <pointLight position={[3, -2, 2]} intensity={0.6} color="#22D3EE" />
      <AbstractShape />
      <Particles />
    </>
  );
}

export function HeroScene() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Pause Three.js rendering completely when Hero is scrolled out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || reducedMotion) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible, reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-64 w-64 rounded-full bg-accent-violet/20 blur-3xl" />
        <div className="absolute h-48 w-48 rounded-full bg-accent-cyan/10 blur-3xl" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.25]}
        frameloop={isVisible ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
