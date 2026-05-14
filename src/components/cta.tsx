"use client";

import { motion } from "motion/react";
import { Reveal } from "./reveal";

export function CTA() {
  return (
    <section id="cta" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg/0 via-bg/90 to-bg/100 pointer-events-none" />

      <div className="container-page relative">
        <Reveal className="flex items-center gap-3 mb-10 md:mb-16 justify-center">
          <span className="inline-block h-px w-9 bg-coral" />
          <span className="label-mono text-fg-mute">[ GET STARTED · 登録は無料 ]</span>
        </Reveal>

        <motion.h2
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-jp-display font-medium text-fg text-center leading-[1.04] tracking-[-0.02em] text-[clamp(48px,9vw,144px)]"
        >
          才能の入り口は、
          <br />
          <span
            className="font-display italic text-coral font-normal"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
          >
            ここ
          </span>
          にある。
        </motion.h2>

        <Reveal delay={0.2}>
          <p className="mt-10 font-jp-sans text-[15px] md:text-[17px] leading-[1.95] text-fg-soft max-w-[52ch] mx-auto text-center">
            登録は3分。あなたのスキルに合った最初の案件を、専属メンターと一緒に選びます。
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#"
              className="group inline-flex items-center gap-3 bg-coral text-bg rounded-full pl-8 pr-3 py-3 text-[15px] hover:bg-fg transition-colors"
            >
              <span>無料で登録する</span>
              <span className="grid place-items-center size-9 rounded-full bg-bg text-coral transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-fg-soft hover:text-coral transition-colors text-[14px]"
            >
              <span className="label-mono">企業の方はこちら</span>
              <span className="inline-block h-px w-6 bg-current" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
