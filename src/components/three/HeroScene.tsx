"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const mousePosition = new THREE.Vector2(0, 0);

function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    meshRef.current.rotation.x += mousePosition.y * 0.15;
    meshRef.current.rotation.y += mousePosition.x * 0.15;

    if (wireRef.current) {
      wireRef.current.rotation.x = state.clock.elapsedTime * 0.12;
      wireRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      wireRef.current.rotation.z = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#7C5CFF"
          roughness={0.15}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh ref={wireRef} scale={2.5} position={[0, 0, -0.5]}>
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
}

function generatePositions(count: number) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    pos[i] = (Math.random() - 0.5) * 20;
    pos[i + 1] = (Math.random() - 0.5) * 20;
    pos[i + 2] = (Math.random() - 0.5) * 20;
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

function Particles() {
  const count = 200;
  const [positions] = useState(() => initPositions(count));

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
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
        size={0.02}
        color="#7C5CFF"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, 2, 4]} intensity={1} color="#7C5CFF" />
      <pointLight position={[3, -2, 2]} intensity={0.5} color="#22D3EE" />
      <AbstractShape />
      <Particles />
      <Environment preset="night" />
    </>
  );
}

export function HeroScene() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-accent-violet/20 blur-3xl" />
        <div className="absolute h-48 w-48 rounded-full bg-accent-cyan/10 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "rgba(0, 0, 0, 0)" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
