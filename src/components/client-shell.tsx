"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { World } from "./world";
import { Cursor } from "./cursor";
import { LoadingScreen } from "./loading";

export type Theme = "night" | "day";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const progressRef = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState<Theme>("night");

  // Apply / remove .day class on <html> so CSS can react globally
  useEffect(() => {
    document.documentElement.classList.toggle("day", theme === "day");
  }, [theme]);

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
      <World progressRef={progressRef} theme={theme} />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <div className="relative z-10">{children}</div>
    </>
  );
}

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  return (
    <button
      onClick={() => setTheme(theme === "day" ? "night" : "day")}
      aria-label={`Switch to ${theme === "day" ? "night" : "day"} mode`}
      className="fixed top-[88px] right-[clamp(20px,4vw,56px)] z-50 group"
    >
      <span className="sr-only">Theme</span>
      <div className="flex items-center gap-2 label-mono px-3 py-2 border border-line-strong rounded-full backdrop-blur-md hover:border-coral transition-colors">
        <span className={theme === "night" ? "text-coral" : "text-fg-mute"}>
          NIGHT
        </span>
        <span className="text-fg-faint">/</span>
        <span className={theme === "day" ? "text-coral" : "text-fg-mute"}>
          DAY
        </span>
      </div>
    </button>
  );
}
