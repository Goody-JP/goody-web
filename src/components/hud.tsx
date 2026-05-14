"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const SECTIONS = [
  { i: 0, label: "INTRO" },
  { i: 1, label: "ABOUT" },
  { i: 2, label: "BUSINESS" },
  { i: 3, label: "SERVICES" },
  { i: 4, label: "PROCESS" },
  { i: 5, label: "WHY" },
  { i: 6, label: "VOICE" },
  { i: 7, label: "JOIN" },
];

export function Hud() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(p);
      setActive(Math.min(SECTIONS.length - 1, Math.floor(p * SECTIONS.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top-left identity HUD */}
      <div className="fixed top-[88px] left-[clamp(20px,4vw,56px)] z-40 pointer-events-none">
        <div className="label-mono text-coral">→ GOODY.JP / WORLD-01</div>
        <div className="label-mono text-fg-faint mt-1">SCROLL TO DESCEND HELIX</div>
      </div>

      {/* Top-right meta HUD */}
      <div className="hidden md:block fixed top-[88px] right-[clamp(20px,4vw,56px)] z-40 text-right pointer-events-none">
        <div className="label-mono text-fg-mute">MMXXVI · 東京</div>
        <div className="label-mono text-fg-faint mt-1">35.6762° N · 139.6503° E</div>
      </div>

      {/* Bottom-left progress + section index */}
      <div className="fixed bottom-7 left-[clamp(20px,4vw,56px)] z-40 pointer-events-none">
        <div className="flex items-center gap-3 label-mono text-fg-mute mb-2">
          <span className="text-coral">{String(active + 1).padStart(2, "0")}</span>
          <span>/</span>
          <span>{String(SECTIONS.length).padStart(2, "0")}</span>
          <span className="text-coral ml-2">[ {SECTIONS[active].label} ]</span>
        </div>
        <div className="w-[200px] h-px bg-line-strong relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-coral"
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Bottom-right scroll cue (only at top) */}
      {progress < 0.02 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 1.4 },
            y: { duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
          }}
          className="fixed bottom-7 right-[clamp(20px,4vw,56px)] z-40 flex flex-col items-end gap-2 label-mono text-fg-mute pointer-events-none"
        >
          <span>SCROLL</span>
          <span className="inline-block h-9 w-px bg-coral" />
        </motion.div>
      )}

      {/* Bottom-center CTA when near end */}
      {progress > 0.85 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed bottom-7 left-1/2 -translate-x-1/2 z-40"
        >
          <a
            href="https://github.com/Goody-JP"
            className="group inline-flex items-center gap-3 bg-coral text-bg rounded-full pl-7 pr-3 py-3 text-[15px] hover:bg-fg transition-colors"
          >
            <span>無料で登録する</span>
            <span className="grid place-items-center size-8 rounded-full bg-bg text-coral transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </motion.div>
      )}
    </>
  );
}
