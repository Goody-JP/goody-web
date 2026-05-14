"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<"default" | "link" | "drag">("default");

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let dx = window.innerWidth / 2;
    let dy = window.innerHeight / 2;
    let rx = dx;
    let ry = dy;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      dx = e.clientX;
      dy = e.clientY;
      const t = e.target as HTMLElement;
      const linkLike = t?.closest("a, button, [role='button']");
      const dragLike = t?.closest("[data-cursor='drag']");
      if (dragLike) setHover("drag");
      else if (linkLike) setHover("link");
      else setHover("default");
    };

    const tick = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[1000] size-[6px] rounded-full bg-coral mix-blend-difference will-change-transform hidden md:block"
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`fixed top-0 left-0 pointer-events-none z-[999] rounded-full border border-coral mix-blend-difference will-change-transform hidden md:block transition-[width,height,opacity] duration-300 ${
          hover === "link"
            ? "size-[64px] opacity-100 border-2"
            : hover === "drag"
            ? "size-[88px] opacity-90"
            : "size-[28px] opacity-70"
        }`}
      >
        {hover === "drag" && (
          <span className="absolute inset-0 grid place-items-center text-[10px] font-mono text-coral mix-blend-difference">
            DRAG
          </span>
        )}
      </div>
    </>
  );
}
