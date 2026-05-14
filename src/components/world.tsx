"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Points, PointMaterial, Environment } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* ───────── Procedural spiral mesh (placeholder for Tokyo Tower / SkyTree) ───────── */

class SpiralCurve extends THREE.Curve<THREE.Vector3> {
  scale: number;
  turns: number;
  height: number;
  constructor(scale = 1, turns = 6, height = 6) {
    super();
    this.scale = scale;
    this.turns = turns;
    this.height = height;
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = this.turns * Math.PI * 2 * t;
    const radius = this.scale * (1.4 - t * 1.0);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = this.height * (t - 0.5);
    return target.set(x, y, z);
  }
}

function Spiral({ progress }: { progress: { current: number } }) {
  const ref = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  const geometry = useMemo(() => {
    const curve = new SpiralCurve(1.6, 8, 7);
    return new THREE.TubeGeometry(curve, 600, 0.06, 12, false);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.12 + progress.current * Math.PI * 2;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.08 - progress.current * 0.6;
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.4 + Math.sin(t * 1.2) * 0.15;
    }
  });

  return (
    <group ref={ref}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          ref={matRef}
          color="#ff5a3c"
          emissive="#ff5a3c"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Inner core sphere with iridescence */}
      <mesh>
        <icosahedronGeometry args={[0.45, 4]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          roughness={0.05}
          metalness={1}
          iridescence={1}
          iridescenceIOR={1.6}
          iridescenceThicknessRange={[100, 700]}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Coral glow halo */}
      <pointLight color="#ff5a3c" intensity={6} distance={12} decay={1.2} />
    </group>
  );
}

/* ───────── Particle field ───────── */

function Particles({ count = 1800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.04;
    ref.current.rotation.x = t * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        size={0.012}
        sizeAttenuation
        transparent
        depthWrite={false}
        color="#ff7a5c"
        opacity={0.9}
      />
    </Points>
  );
}

/* ───────── Camera that responds to scroll progress ───────── */

function ScrollCamera({ progress }: { progress: { current: number } }) {
  const { camera } = useThree();
  useFrame(() => {
    const p = progress.current;
    const angle = p * Math.PI * 2;
    const radius = 5.5 - p * 1.8;
    const yOffset = -p * 1.5;
    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;
    camera.position.y = yOffset + 0.6;
    camera.lookAt(0, yOffset * 0.4, 0);
  });
  return null;
}

/* ───────── Mouse parallax that subtly tilts the whole scene ───────── */

function MouseParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.3;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += (target.current.x - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (target.current.y - ref.current.rotation.x) * 0.05;
  });

  return <group ref={ref}>{children}</group>;
}

/* ───────── Public component: full-viewport sticky world ───────── */

export function World({
  progressRef,
}: {
  progressRef: { current: number };
}) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.6, 5.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 6, 14]} />

        <ambientLight intensity={0.18} />
        <directionalLight position={[3, 5, 4]} intensity={0.6} color="#ffe1d6" />
        <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#b566ff" />

        <MouseParallax>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
            <Spiral progress={progressRef} />
          </Float>
          <Particles count={2400} />
        </MouseParallax>

        <ScrollCamera progress={progressRef} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
