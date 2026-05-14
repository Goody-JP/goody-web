"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { World } from "./world";
import { Cursor } from "./cursor";
import { LoadingScreen } from "./loading";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const progressRef = useRef(0);
  const [loaded, setLoaded] = useState(false);

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

    // Allow loading screen for at least 800ms for choreography
    const t = setTimeout(() => setLoaded(true), 1100);

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <LoadingScreen done={loaded} />
      <Cursor />
      <World progressRef={progressRef} />
      <div className="relative z-10">{children}</div>
    </>
  );
}
