"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LINKS = [
  { href: "#about", label: "About", jp: "私たちについて" },
  { href: "#business", label: "Business", jp: "事業内容" },
  { href: "#services", label: "Services", jp: "領域" },
  { href: "#how", label: "Process", jp: "案件まで" },
  { href: "#voice", label: "Voice", jp: "声" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "bg-bg/70 backdrop-blur-xl border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between h-[68px]">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-display text-[26px] leading-none font-medium tracking-[-0.04em] text-fg">
            Goody
          </span>
          <span className="size-[7px] rounded-full bg-coral inline-block translate-y-[-4px] transition-transform group-hover:scale-125" />
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative label-mono text-fg/70 hover:text-fg transition-colors"
            >
              <span>{l.label}</span>
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-coral transition-[width] duration-500 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#cta"
            className="group inline-flex items-center gap-2 bg-coral text-bg rounded-full pl-5 pr-3 py-2 text-[13px] font-medium hover:bg-fg transition-colors"
          >
            <span>登録する</span>
            <span className="grid place-items-center size-6 rounded-full bg-bg text-coral text-[10px] transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden relative size-10 grid place-items-center"
        >
          <span
            className={`block h-px w-6 bg-fg transition-transform duration-500 ${
              open ? "translate-y-[3px] rotate-45" : "-translate-y-[3px]"
            }`}
          />
          <span
            className={`absolute h-px w-6 bg-fg transition-transform duration-500 ${
              open ? "translate-y-[3px] -rotate-45" : "translate-y-[3px]"
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-[68px] bg-bg border-t border-line"
          >
            <div className="container-page py-12 flex flex-col gap-7">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline justify-between border-b border-line pb-5"
                >
                  <span className="font-jp-display text-[28px] font-medium text-fg">
                    {l.jp}
                  </span>
                  <span className="label-mono text-fg-mute">{l.label}</span>
                </motion.a>
              ))}
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-between bg-coral text-bg rounded-full px-6 py-4 text-base"
              >
                <span>登録する</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
