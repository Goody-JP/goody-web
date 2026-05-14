"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

type HudProps = {
  sections: { label: string }[];
  contextLabel: string; // e.g. "GOODY / WORLD-01" or "ORBIT / 事業内容"
  scrollHint?: string;
  backLink?: { href: string; label: string };
};

export function Hud({ sections, contextLabel, scrollHint, backLink }: HudProps) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(p);
      setActive(Math.min(sections.length - 1, Math.floor(p * sections.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections.length]);

  return (
    <>
      {/* Top-left identity HUD */}
      <div className="fixed top-[88px] left-[clamp(20px,4vw,56px)] z-40 pointer-events-none">
        <div className="label-mono text-coral">→ {contextLabel}</div>
        {scrollHint && (
          <div className="label-mono text-fg-faint mt-1">{scrollHint}</div>
        )}
      </div>

      {/* Top-right meta HUD */}
      <div className="hidden md:block fixed top-[88px] right-[clamp(20px,4vw,56px)] z-40 text-right pointer-events-none">
        <div className="label-mono text-fg-mute">MMXXVI · 東京</div>
        <div className="label-mono text-fg-faint mt-1">35.6762° N · 139.6503° E</div>
      </div>

      {/* Back link if provided (top center) */}
      {backLink && (
        <Link
          href={backLink.href}
          className="fixed top-[88px] left-1/2 -translate-x-1/2 z-40 group label-mono text-fg-mute hover:text-coral transition-colors"
        >
          <span className="inline-flex items-center gap-2 border border-line-strong rounded-full px-4 py-2 backdrop-blur-md hover:border-coral">
            <span>←</span>
            <span>{backLink.label}</span>
          </span>
        </Link>
      )}

      {/* Bottom-left progress + section index */}
      <div className="fixed bottom-7 left-[clamp(20px,4vw,56px)] z-40 pointer-events-none">
        <div className="flex items-center gap-3 label-mono text-fg-mute mb-2">
          <span className="text-coral">{String(active + 1).padStart(2, "0")}</span>
          <span>/</span>
          <span>{String(sections.length).padStart(2, "0")}</span>
          <span className="text-coral ml-2">[ {sections[active].label} ]</span>
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
    </>
  );
}
