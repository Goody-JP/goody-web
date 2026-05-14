"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function LoadingScreen({ done }: { done: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const target = done ? 100 : 90;
    const tick = (now: number) => {
      const elapsed = (now - start) / (done ? 400 : 1100);
      const next = Math.min(target, elapsed * 100);
      setProgress(next);
      if (next < target) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: "inset(50% 0 50% 0)",
          }}
          transition={{ duration: 1.0, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[2000] bg-bg flex items-center justify-center pointer-events-auto"
        >
          {/* Coral grid backdrop */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#ff5a3c 1px, transparent 1px), linear-gradient(90deg, #ff5a3c 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative flex flex-col items-center gap-10">
            <div className="font-display italic font-medium text-[88px] md:text-[140px] leading-none holo">
              Goody.
            </div>

            <div className="w-[280px] flex flex-col gap-3">
              <div className="flex justify-between label-mono text-fg-mute">
                <span>LOADING WORLD</span>
                <span className="text-coral">{Math.floor(progress)}%</span>
              </div>
              <div className="h-px bg-line-strong relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-coral"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="label-mono text-fg-faint mt-1">
                ⟶ INITIALIZING WEBGL · PARTICLES · SHADERS
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
