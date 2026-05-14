"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Points,
  PointMaterial,
  Environment,
  Html,
  MeshDistortMaterial,
} from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useScrollProgress } from "./scroll-context";

/* ───────── Constants ───────── */

const RING_RADIUS = 4.0;
const SPHERE_RADIUS = 1.6;
const PANEL_W = 2.4;
const PANEL_H = 1.4;

/* ───────── Section panel data — 6 business divisions ───────── */

type PanelData = {
  num: string;
  label: string;
  jpTitle: string;
  enTitle: string;
  body: string;
};

const PANELS: PanelData[] = [
  {
    num: "01",
    label: "CREATIVE",
    jpTitle: "クリエイティブ事業",
    enTitle: "Creative",
    body: "動画・グラフィック・ブランディング・Web制作。企業の表現を支える総合クリエイティブ。",
  },
  {
    num: "02",
    label: "GLOBAL TALENT",
    jpTitle: "グローバル人材育成事業",
    enTitle: "Global Talent Development",
    body: "海外で活躍する人材を育てるプログラムと、現地キャリアまで伴走する一気通貫の支援。",
  },
  {
    num: "03",
    label: "PERSONNEL",
    jpTitle: "人材サービス事業",
    enTitle: "Personnel Services",
    body: "採用支援、人材紹介、業務委託まで。企業の人材戦略を、必要な形で、必要なときに。",
  },
  {
    num: "04",
    label: "BPO",
    jpTitle: "BPO事業",
    enTitle: "Business Process Outsourcing",
    body: "バックオフィスを中心に、企業のノンコア業務を一括受託。コア業務に集中できる環境を。",
  },
  {
    num: "05",
    label: "F&B",
    jpTitle: "海外飲食事業",
    enTitle: "Overseas F&B",
    body: "海外マーケットでの飲食店運営とブランド展開。日本発の食体験を、現地に根を張った形で世界へ。",
  },
  {
    num: "06",
    label: "BEVERAGE",
    jpTitle: "酒類マーケティング・クリエイティブ事業",
    enTitle: "Beverage Marketing & Creative",
    body: "酒類ブランドのマーケティング戦略から、ビジュアル・コピー・体験設計まで一気通貫で。",
  },
];

/* ───────── Central iridescent sphere with visible morphing motion ───────── */

function Centerpiece() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.45;
      ref.current.rotation.x = Math.sin(t * 0.4) * 0.35;
      ref.current.rotation.z = Math.cos(t * 0.3) * 0.18;
      // Subtle scale pulse
      const pulse = 1 + Math.sin(t * 1.4) * 0.05;
      ref.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={ref}>
      {/* Liquid-metal iridescent sphere — visibly morphs while rotating */}
      <mesh>
        <icosahedronGeometry args={[SPHERE_RADIUS, 64]} />
        <MeshDistortMaterial
          color="#0c0c0c"
          roughness={0.04}
          metalness={1}
          distort={0.35}
          speed={2.4}
          // Iridescent props (passed through to MeshPhysicalMaterial)
          iridescence={1}
          iridescenceIOR={1.7}
          iridescenceThicknessRange={[120, 700]}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Inner coral light source — gives the sphere its warm interior glow */}
      <pointLight color="#ff5a3c" intensity={4} distance={10} decay={1.4} />
    </group>
  );
}

/* ───────── Single panel ───────── */

function Panel({
  data,
  index,
  total,
  ringRotationRef,
}: {
  data: PanelData;
  index: number;
  total: number;
  ringRotationRef: { current: number };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const htmlContentRef = useRef<HTMLDivElement>(null);

  // Base angle so panel 0 sits at +Z (in front of camera at scroll = 0)
  const baseAngle = (index / total) * Math.PI * 2 + Math.PI / 2;

  const camPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Effective angle = base + ring rotation (driven by scroll)
    const angle = baseAngle + ringRotationRef.current;

    // Position around the ring
    const x = Math.cos(angle) * RING_RADIUS;
    const z = Math.sin(angle) * RING_RADIUS;
    const bob = Math.sin(state.clock.getElapsedTime() * 0.8 + index * 0.7) * 0.06;
    groupRef.current.position.set(x, bob, z);

    // Billboard toward camera
    state.camera.getWorldPosition(camPos);
    groupRef.current.lookAt(camPos);

    // Active state: panel closest to camera
    const camDir = Math.atan2(camPos.z, camPos.x);
    let angleDiff = ((angle - camDir + Math.PI) % (Math.PI * 2)) - Math.PI;
    angleDiff = Math.abs(angleDiff);
    const closeness = 1 - angleDiff / Math.PI;

    const frontWeight = Math.pow(closeness, 4);
    const backWeight = Math.pow(1 - closeness, 6) * 0.3;
    const active = Math.max(frontWeight, backWeight);

    const scale = 0.35 + frontWeight * 0.7 + backWeight * 0.3;
    groupRef.current.scale.setScalar(scale);

    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.05 + active * 0.55;
      matRef.current.opacity = 0.15 + active * 0.7;
    }
    if (htmlContentRef.current) {
      htmlContentRef.current.style.opacity = String(
        Math.max(frontWeight, backWeight * 0.5)
      );
    }

    groupRef.current.position.y += frontWeight * 0.15;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[PANEL_W, PANEL_H]} />
        <meshStandardMaterial
          ref={matRef}
          color="#0a0a0a"
          emissive="#ff5a3c"
          emissiveIntensity={0.15}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      <lineSegments position={[0, 0, 0.002]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(PANEL_W, PANEL_H)]} />
        <lineBasicMaterial color="#ff5a3c" transparent opacity={0.95} />
      </lineSegments>
      <Html
        transform
        distanceFactor={1.6}
        position={[0, 0, 0.01]}
        style={{
          width: "560px",
          height: "320px",
          pointerEvents: "none",
        }}
      >
        <div
          ref={htmlContentRef}
          className="size-full bg-bg/85 backdrop-blur-md border border-coral/40 px-10 py-8 flex flex-col gap-4 text-fg transition-opacity duration-200"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between label-mono text-fg-mute">
            <span className="text-coral">→ {data.num}</span>
            <span>[ {data.label} ]</span>
          </div>
          <h3 className="font-jp-display text-[36px] leading-[1.1] font-medium">
            {data.jpTitle}
          </h3>
          <div className="label-mono text-fg-mute">→ {data.enTitle}</div>
          <p className="font-jp-sans text-[13px] leading-[1.7] text-fg-soft mt-auto">
            {data.body}
          </p>
        </div>
      </Html>
    </group>
  );
}

/* ───────── Particles around the scene ───────── */

function Particles({ count = 2400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 7 + Math.random() * 8;
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
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        size={0.012}
        sizeAttenuation
        transparent
        depthWrite={false}
        color="#ff7a5c"
        opacity={0.85}
      />
    </Points>
  );
}

/* ───────── Mouse parallax wrapper ───────── */

function MouseParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.16;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.10;
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

/* ───────── Public component ───────── */

export function WorldOrbit() {
  const progressRef = useScrollProgress();
  const ringRotationRef = useRef(0);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.6, 8.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 9, 22]} />

        <ambientLight intensity={0.18} />
        <directionalLight position={[3, 5, 4]} intensity={0.55} color="#ffe1d6" />
        <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#b566ff" />

        <RingDriver progressRef={progressRef} ringRotationRef={ringRotationRef} />

        <MouseParallax>
          <Float speed={0.8} rotationIntensity={0.06} floatIntensity={0.15}>
            <Centerpiece />
            {PANELS.map((p, i) => (
              <Panel
                key={p.num}
                data={p}
                index={i}
                total={PANELS.length}
                ringRotationRef={ringRotationRef}
              />
            ))}
          </Float>
          <Particles count={2400} />
        </MouseParallax>

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}

function RingDriver({
  progressRef,
  ringRotationRef,
}: {
  progressRef: { current: number };
  ringRotationRef: { current: number };
}) {
  useFrame(() => {
    const target = -progressRef.current * Math.PI * 2;
    ringRotationRef.current += (target - ringRotationRef.current) * 0.1;
  });
  return null;
}
