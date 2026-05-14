"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Points, PointMaterial, Environment, Html } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* ───────── Constants ───────── */

const RING_RADIUS = 4.0; // distance from center to panel
const SPHERE_RADIUS = 1.4;
const PANEL_W = 2.4;
const PANEL_H = 1.4;

/* ───────── Section panel data ───────── */

type PanelData = {
  num: string;
  label: string;
  jpTitle: string;
  enTitle: string;
  body: string;
};

const PANELS: PanelData[] = [
  {
    num: "00",
    label: "INTRO",
    jpTitle: "未経験でも、つくる側へ。",
    enTitle: "Even with zero experience.",
    body: "3D・動画・UI/UX・アプリ・グラフィック・AI。スキルを学び始めたばかりのあなたへ。Goodyは、本物のクライアントワークを通じて成長できる場所です。",
  },
  {
    num: "01",
    label: "ABOUT",
    jpTitle: "才能はある。きっかけがない。",
    enTitle: "Talent exists. Opportunity doesn't.",
    body: "クリエイティブの学校を卒業しても、独学でスキルを磨いても、「実績がないから仕事がもらえない」という壁の前で立ち止まる才能を、Goodyが解放します。",
  },
  {
    num: "02",
    label: "BUSINESS",
    jpTitle: "6つの事業領域。",
    enTitle: "Six business divisions.",
    body: "クリエイティブ、グローバル人材育成、人材サービス、BPO、海外飲食、酒類マーケティング。企業の課題に応える6つの事業領域で社会と産業をつなぎます。",
  },
  {
    num: "03",
    label: "SERVICES",
    jpTitle: "6つのスキル、無限の可能性。",
    enTitle: "Six disciplines, infinite paths.",
    body: "3D、動画、UI/UX、アプリ開発、グラフィック、AIクリエイティブ。あなたが学んだスキルは、Goodyのどこかで必ず仕事になります。",
  },
  {
    num: "04",
    label: "PROCESS",
    jpTitle: "最初の案件まで、4ステップ。",
    enTitle: "From zero to your first job in 4 steps.",
    body: "プロフィール登録 → メンター面談 → 案件参加 → 実績獲得。3分の登録から、本物のクライアントワークまで。専属メンターが伴走します。",
  },
  {
    num: "05",
    label: "WHY",
    jpTitle: "他にない、初心者ファースト。",
    enTitle: "Beginner-first, by design.",
    body: "クラウドソーシングでは埋もれる。エージェントには相手にされない。Goodyは、初心者のためだけに設計された場所です。",
  },
  {
    num: "06",
    label: "VOICE",
    jpTitle: "最初の一歩を踏み出した人たち。",
    enTitle: "Stories from those who took the first step.",
    body: "「メンターのフィードバックがなければ今の自分はない」「Blenderの実案件がポートフォリオの中心になった」— Goodyから始まったキャリアたち。",
  },
  {
    num: "07",
    label: "JOIN",
    jpTitle: "才能の入り口は、ここにある。",
    enTitle: "Your gateway is right here.",
    body: "登録は3分。あなたのスキルに合った最初の案件を、専属メンターと一緒に選びます。今すぐ、つくる側へ。",
  },
];

/* ───────── Central iridescent sphere (the brand object) ───────── */

function Centerpiece({ theme }: { theme: "night" | "day" }) {
  const ref = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.18;
      ref.current.rotation.x = Math.sin(t * 0.22) * 0.15;
    }
  });

  // In day mode the sphere is a softer chrome that picks up the sky/Fuji.
  const dayMode = theme === "day";

  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[SPHERE_RADIUS, 6]} />
        <meshPhysicalMaterial
          ref={matRef}
          color={dayMode ? "#fafaf7" : "#0c0c0c"}
          roughness={dayMode ? 0.08 : 0.04}
          metalness={1}
          iridescence={dayMode ? 0.4 : 1}
          iridescenceIOR={1.7}
          iridescenceThicknessRange={[120, 700]}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Inner coral light — gives the sphere its warm interior glow */}
      <pointLight
        color={dayMode ? "#ffae8a" : "#ff5a3c"}
        intensity={dayMode ? 2 : 4}
        distance={10}
        decay={1.4}
      />
    </group>
  );
}

/* ───────── Single panel (3D with Html content), positioned in ring ───────── */

function Panel({
  data,
  index,
  total,
  ringRotationRef,
  theme,
}: {
  data: PanelData;
  index: number;
  total: number;
  ringRotationRef: { current: number };
  theme: "night" | "day";
}) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const htmlContentRef = useRef<HTMLDivElement>(null);

  // Base angle so panel 0 sits at +Z (in front of camera at scroll=0)
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

    // Active state: panel closest to camera. Use the same atan2(z, x)
    // convention as the panel's `angle` (computed from cos/sin above).
    const camDir = Math.atan2(camPos.z, camPos.x);
    let angleDiff = ((angle - camDir + Math.PI) % (Math.PI * 2)) - Math.PI;
    angleDiff = Math.abs(angleDiff);
    // angleDiff is 0 when panel is directly toward camera, π when opposite
    const closeness = 1 - angleDiff / Math.PI; // 1 = front, 0 = back

    // Active = sharp falloff for front. Back panel gets a small "ghost" boost
    // so the user can see it across the sphere as a silhouette.
    const frontWeight = Math.pow(closeness, 4); // sharp peak at front
    const backWeight = Math.pow(1 - closeness, 6) * 0.3; // tiny peak at back
    const active = Math.max(frontWeight, backWeight);

    // Scale: front large, back small, sides smallest
    const scale = 0.35 + frontWeight * 0.7 + backWeight * 0.3;
    groupRef.current.scale.setScalar(scale);

    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.05 + active * 0.55;
      matRef.current.opacity = 0.15 + active * 0.7;
    }
    if (htmlContentRef.current) {
      // Hide content entirely on side panels — only front (and faintly back) shows text
      htmlContentRef.current.style.opacity = String(
        Math.max(frontWeight, backWeight * 0.5)
      );
    }

    // Position lift: active (front) panel sits slightly higher
    groupRef.current.position.y += frontWeight * 0.15;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[PANEL_W, PANEL_H]} />
        <meshStandardMaterial
          ref={matRef}
          color={theme === "day" ? "#f5f1e8" : "#0a0a0a"}
          emissive="#ff5a3c"
          emissiveIntensity={0.15}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          metalness={theme === "day" ? 0.3 : 0.7}
          roughness={theme === "day" ? 0.6 : 0.3}
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
          className={`size-full backdrop-blur-md border border-coral/40 px-10 py-8 flex flex-col gap-4 transition-opacity duration-200 ${
            theme === "day" ? "bg-paper/85 text-ink" : "bg-bg/85 text-fg"
          }`}
          style={{ opacity: 0 }}
        >
          <div className={`flex items-center justify-between label-mono ${theme === "day" ? "text-ink-mute" : "text-fg-mute"}`}>
            <span className="text-coral">→ {data.num}</span>
            <span>[ {data.label} ]</span>
          </div>
          <h3 className="font-jp-display text-[44px] leading-[1.05] font-medium">
            {data.jpTitle}
          </h3>
          <div className={`label-mono ${theme === "day" ? "text-ink-mute" : "text-fg-mute"}`}>→ {data.enTitle}</div>
          <p className={`font-jp-sans text-[13px] leading-[1.7] mt-auto ${theme === "day" ? "text-ink-soft" : "text-fg-soft"}`}>
            {data.body}
          </p>
        </div>
      </Html>
    </group>
  );
}

/* ───────── Particles around the scene ───────── */

function Particles({
  count = 2400,
  theme = "night",
}: {
  count?: number;
  theme?: "night" | "day";
}) {
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
        color={theme === "day" ? "#ffffff" : "#ff7a5c"}
        opacity={theme === "day" ? 0.55 : 0.85}
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

export function World({
  progressRef,
  theme = "night",
}: {
  progressRef: { current: number };
  theme?: "night" | "day";
}) {
  // Smoothed ring rotation that reads scroll progress
  const ringRotationRef = useRef(0);

  const dayMode = theme === "day";

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.6, 8.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={[dayMode ? "#e7d9c0" : "#050505"]} />
        <fog
          attach="fog"
          args={[dayMode ? "#e7d9c0" : "#050505", 9, 22]}
        />

        <ambientLight intensity={dayMode ? 0.45 : 0.18} />
        <directionalLight
          position={[3, 5, 4]}
          intensity={dayMode ? 0.9 : 0.55}
          color={dayMode ? "#ffeacc" : "#ffe1d6"}
        />
        <directionalLight
          position={[-4, -2, -3]}
          intensity={dayMode ? 0.25 : 0.4}
          color={dayMode ? "#a8c8ff" : "#b566ff"}
        />

        <RingDriver progressRef={progressRef} ringRotationRef={ringRotationRef} />

        <MouseParallax>
          <Float speed={0.8} rotationIntensity={0.06} floatIntensity={0.15}>
            <Centerpiece theme={theme} />
            {PANELS.map((p, i) => (
              <Panel
                key={p.num}
                data={p}
                index={i}
                total={PANELS.length}
                ringRotationRef={ringRotationRef}
                theme={theme}
              />
            ))}
          </Float>
          <Particles count={2400} theme={theme} />
        </MouseParallax>

        {/* Environment provides the reflection map on the sphere. "city" for night
            (densely lit urban skyline ≈ Tokyo at night), "park" for day (sky +
            distant landscape ≈ Fuji feel). For an authentic Tokyo Tower / Fuji
            reflection we'd swap to a custom HDRI via <Environment files="..."/>. */}
        <Environment preset={dayMode ? "park" : "city"} />
      </Canvas>
    </div>
  );
}

/* Smoothly drives ring rotation from scroll progress.
   Total scroll = exactly one full revolution (2π) so each of the 8 panels
   passes through the front of the camera once during the scroll. */
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
