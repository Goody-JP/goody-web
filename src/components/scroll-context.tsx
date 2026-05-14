"use client";

import { createContext, useContext, useRef, type ReactNode, useEffect } from "react";
import Lenis from "lenis";

type ProgressRef = { current: number };

const ScrollContext = createContext<ProgressRef | null>(null);

export function useScrollProgress(): ProgressRef {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScrollProgress must be used inside <ScrollProvider>");
  return ctx;
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const progressRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = prefersReduced
      ? null
      : new Lenis({
          duration: 1.3,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          wheelMultiplier: 1,
          touchMultiplier: 1.2,
          smoothWheel: true,
        });

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = max > 0 ? window.scrollY / max : 0;
    };

    let raf = 0;
    const tick = (time: number) => {
      lenis?.raf(time);
      updateProgress();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <ScrollContext.Provider value={progressRef}>{children}</ScrollContext.Provider>
  );
}
