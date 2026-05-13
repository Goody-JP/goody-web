"use client";

import { Reveal } from "./reveal";
import { motion } from "motion/react";

export function CTA() {
  return (
    <section id="cta" className="bg-ink text-paper section-pad relative overflow-hidden">
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -right-[15%] -bottom-[25%] size-[800px] pointer-events-none"
      >
        <div
          className="size-full rounded-full opacity-[0.18]"
          style={{
            background:
              "conic-gradient(from 90deg at 50% 50%, transparent 0deg, #ff5a3c 60deg, transparent 120deg, #ff5a3c 200deg, transparent 260deg)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      <div className="container-page relative">
        <Reveal className="flex items-center gap-3 mb-10 md:mb-16 justify-center">
          <span className="inline-block h-px w-9 bg-coral" />
          <span className="label-en text-paper/55">Get Started · 登録は無料</span>
        </Reveal>

        <Reveal>
          <h2 className="font-jp-display font-medium text-paper text-center leading-[1.04] tracking-[-0.02em] text-[clamp(48px,9vw,144px)]">
            才能の入り口は、
            <br />
            <span
              className="font-display italic text-coral font-normal"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
            >
              ここ
            </span>
            にある。
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 font-jp-sans text-[15px] md:text-[17px] leading-[1.95] text-paper/70 max-w-[52ch] mx-auto text-center">
            登録は3分。あなたのスキルに合った最初の案件を、専属メンターと一緒に選びます。
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#"
              className="group inline-flex items-center gap-3 bg-coral text-paper rounded-full pl-8 pr-3 py-3 text-[15px] hover:bg-paper hover:text-ink transition-colors"
            >
              <span>無料で登録する</span>
              <span className="grid place-items-center size-9 rounded-full bg-paper text-ink transition-transform group-hover:translate-x-0.5 group-hover:bg-ink group-hover:text-paper">
                →
              </span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-paper/80 hover:text-coral transition-colors text-[14px]"
            >
              <span className="label-en">企業の方はこちら</span>
              <span className="inline-block h-px w-6 bg-current" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
