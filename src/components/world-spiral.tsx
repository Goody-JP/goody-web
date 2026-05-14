"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Points, PointMaterial, Environment, Html } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import Link from "next/link";
import { useScrollProgress } from "./scroll-context";

/* ───────── Spiral curve (shared between geometry + panel placement) ───────── */

const SPIRAL_TURNS = 4.5;
const SPIRAL_HEIGHT = 24;
const SPIRAL_RADIUS_TOP = 2.2;
const SPIRAL_RADIUS_BOT = 1.4;

class SpiralCurve extends THREE.Curve<THREE.Vector3> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = SPIRAL_TURNS * Math.PI * 2 * t;
    const radius = SPIRAL_RADIUS_TOP - (SPIRAL_RADIUS_TOP - SPIRAL_RADIUS_BOT) * t;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = SPIRAL_HEIGHT * (0.5 - t);
    return target.set(x, y, z);
  }
}

const sampleSpiral = (t: number) => new SpiralCurve().getPoint(t);

/* ───────── 3D Panel (rung on the helix) ───────── */

type PanelData = {
  num: string;
  label: string;
  jpTitle: string;
  enTitle: string;
  body: string;
  href?: string;
};

function Panel({
  data,
  t,
  progressRef,
}: {
  data: PanelData;
  t: number; // 0..1 position along spiral
  progressRef: { current: number };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  const position = useMemo(() => sampleSpiral(t), [t]);
  const tmpVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const distance = Math.abs(progressRef.current - t);
    const active = Math.max(0, 1 - distance * 5);
    const baseScale = 0.55 + active * 0.5;
    groupRef.current.scale.setScalar(baseScale);
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.05 + active * 0.45;
      matRef.current.opacity = 0.4 + active * 0.55;
    }
    const bob = Math.sin(state.clock.getElapsedTime() * 1.2 + t * 10) * 0.04;
    groupRef.current.position.y = position.y + bob;
    // Billboard toward camera
    state.camera.getWorldPosition(tmpVec);
    groupRef.current.lookAt(tmpVec);
  });

  return (
    <group ref={groupRef} position={position}>
      <group>
        {/* Panel surface */}
        <mesh>
          <planeGeometry args={[2.4, 1.4]} />
          <meshStandardMaterial
            ref={matRef}
            color="#0a0a0a"
            emissive="#ff5a3c"
            emissiveIntensity={0.15}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        {/* Coral border frame */}
        <lineSegments position={[0, 0, 0.002]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(2.4, 1.4)]} />
          <lineBasicMaterial color="#ff5a3c" transparent opacity={0.9} />
        </lineSegments>
        {/* Panel content (drei Html transform-mode) */}
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
          <div className="size-full bg-bg/85 backdrop-blur-md border border-coral/40 px-10 py-8 flex flex-col gap-4 text-fg">
            <div className="flex items-center justify-between label-mono text-fg-mute">
              <span className="text-coral">→ {data.num}</span>
              <span>[ {data.label} ]</span>
            </div>
            <h3 className="font-jp-display text-[44px] leading-[1.05] font-medium">
              {data.jpTitle}
            </h3>
            <div className="label-mono text-fg-mute">→ {data.enTitle}</div>
            <p className="font-jp-sans text-[13px] leading-[1.7] text-fg-soft mt-auto">
              {data.body}
            </p>
            {data.href && (
              <Link
                href={data.href}
                className="self-start inline-flex items-center gap-2 mt-2 bg-coral text-bg rounded-full pl-4 pr-2 py-1.5 text-[12px] hover:bg-fg transition-colors"
                style={{ pointerEvents: "auto" }}
              >
                <span className="label-mono">ENTER ORBIT</span>
                <span className="grid place-items-center size-5 rounded-full bg-bg text-coral text-[10px]">→</span>
              </Link>
            )}
          </div>
        </Html>
      </group>
    </group>
  );
}

/* ───────── Helix geometry mesh ───────── */

function Spiral({ progress }: { progress: { current: number } }) {
  const ref = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(new SpiralCurve(), 800, 0.06, 14, false);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    // Spiral rotates slowly on its own (camera follows active panel for scroll)
    ref.current.rotation.y = t * 0.06;
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

      {/* Inner core sphere with iridescence — sits at top of spiral */}
      <mesh position={[0, SPIRAL_HEIGHT * 0.45, 0]}>
        <icosahedronGeometry args={[0.5, 4]} />
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

      {/* Coral glow halos — distributed along spiral */}
      <pointLight position={[0, SPIRAL_HEIGHT * 0.4, 0]} color="#ff5a3c" intensity={5} distance={10} decay={1.2} />
      <pointLight position={[0, 0, 0]} color="#ff5a3c" intensity={4} distance={10} decay={1.2} />
      <pointLight position={[0, -SPIRAL_HEIGHT * 0.4, 0]} color="#ff5a3c" intensity={4} distance={10} decay={1.2} />
    </group>
  );
}

/* ───────── Particle field ───────── */

function Particles({ count = 2400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * SPIRAL_HEIGHT * 1.4;
      arr[i * 3] = r * Math.cos(theta);
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = r * Math.sin(theta);
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
        size={0.014}
        sizeAttenuation
        transparent
        depthWrite={false}
        color="#ff7a5c"
        opacity={0.85}
      />
    </Points>
  );
}

/* ───────── Camera descends Y based on scroll progress ───────── */

function ScrollCamera({ progress }: { progress: { current: number } }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, SPIRAL_HEIGHT * 0.5, 0));
  const lookTarget = useRef(new THREE.Vector3(0, SPIRAL_HEIGHT * 0.5, 0));

  useFrame(() => {
    const p = progress.current;

    // Active panel position based on scroll
    const panelT = p; // active panel parametric position
    const activePanel = sampleSpiral(panelT);

    // Camera in front of the panel (panel + offset along its outward direction)
    const angle = Math.atan2(activePanel.x, activePanel.z);
    const standOff = 4.2; // distance from panel to camera
    targetPos.current.set(
      activePanel.x + Math.sin(angle) * standOff,
      activePanel.y + 0.2,
      activePanel.z + Math.cos(angle) * standOff
    );

    // LookAt: directly at the panel
    lookTarget.current.copy(activePanel);

    // Smooth interpolation
    camera.position.lerp(targetPos.current, 0.12);
    camera.lookAt(lookTarget.current);
  });
  return null;
}

/* ───────── Mouse parallax ───────── */

function MouseParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.18;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.12;
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

/* ───────── Section panel data ───────── */

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
    href: "/business",
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

/* ───────── Public component ───────── */

export function WorldSpiral() {
  const progressRef = useScrollProgress();
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 12, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 8, 24]} />

        <ambientLight intensity={0.18} />
        <directionalLight position={[3, 5, 4]} intensity={0.6} color="#ffe1d6" />
        <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#b566ff" />

        <MouseParallax>
          <Float speed={0.8} rotationIntensity={0.06} floatIntensity={0.15}>
            <Spiral progress={progressRef} />
            {PANELS.map((p, i) => (
              <Panel
                key={p.num}
                data={p}
                t={(i + 0.5) / PANELS.length}
                progressRef={progressRef}
              />
            ))}
          </Float>
          <Particles count={2800} />
        </MouseParallax>

        <ScrollCamera progress={progressRef} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
