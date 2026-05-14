"use client";

import { motion } from "motion/react";
import { Reveal } from "./reveal";

const BUSINESS = [
  { n: "01", title: "クリエイティブ事業", en: "Creative", desc: "動画・グラフィック・ブランディング・Web制作。企業の表現を支える総合クリエイティブ。" },
  { n: "02", title: "グローバル人材育成事業", en: "Global Talent Development", desc: "海外で活躍する人材を育てるプログラムと、現地キャリアまで伴走する一気通貫の支援。" },
  { n: "03", title: "人材サービス事業", en: "Personnel Services", desc: "採用支援、人材紹介、業務委託まで。企業の人材戦略を、必要な形で、必要なときに。" },
  { n: "04", title: "BPO事業", en: "Business Process Outsourcing", desc: "バックオフィスを中心に、企業のノンコア業務を一括受託。コア業務に集中できる環境を。" },
  { n: "05", title: "海外飲食事業", en: "Overseas F&B", desc: "海外マーケットでの飲食店運営とブランド展開。日本発の食体験を、現地に根を張った形で世界へ。" },
  { n: "06", title: "酒類マーケティング・クリエイティブ事業", en: "Beverage Marketing & Creative", desc: "酒類ブランドのマーケティング戦略から、ビジュアル・コピー・体験設計まで一気通貫で。" },
];

export function Business() {
  return (
    <section id="business" className="relative section-pad">
      <div className="absolute inset-0 bg-gradient-to-b from-bg/0 via-bg/80 to-bg/0 pointer-events-none" />

      <div className="container-page relative">
        <div className="grid-12 mb-16 md:mb-24">
          <Reveal className="col-span-12 md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="inline-block h-px w-9 bg-coral" />
              <span className="label-mono text-fg-mute">[ BUSINESS ]</span>
            </div>
          </Reveal>
          <div className="col-span-12 md:col-span-10 mt-6 md:mt-0">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-jp-display font-medium text-fg leading-[1.04] tracking-[-0.02em] text-[clamp(40px,7vw,108px)]"
            >
              事業
              <span
                className="font-display italic text-coral font-normal"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
              >
                内容
              </span>
              。
            </motion.h2>
            <Reveal delay={0.15}>
              <p className="mt-8 font-jp-sans text-[15px] md:text-[17px] leading-[1.95] text-fg-soft max-w-[58ch]">
                クリエイティブから人材育成、BPO、海外飲食まで。
                <br />
                企業の課題に応える6つの事業領域で、Goodyは社会と産業をつなぎます。
              </p>
            </Reveal>
          </div>
        </div>

        <div className="border-t border-line-strong">
          {BUSINESS.map((b, i) => (
            <motion.a
              key={b.n}
              href="#cta"
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, rotateY: i % 2 === 0 ? -15 : 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d", perspective: 1200 }}
              className="group block border-b border-line-strong"
            >
              <div className="grid-12 items-center py-8 md:py-12 transition-colors hover:bg-bg-soft/40 -mx-[clamp(20px,4vw,56px)] px-[clamp(20px,4vw,56px)]">
                <div className="col-span-3 md:col-span-1">
                  <span className="num-display text-[44px] md:text-[64px] leading-none text-fg-mute group-hover:text-coral transition-colors">
                    {b.n}
                  </span>
                </div>
                <div className="col-span-9 md:col-span-5">
                  <h3 className="font-jp-display text-[24px] md:text-[34px] font-medium text-fg leading-[1.25] group-hover:text-coral transition-colors">
                    {b.title}
                  </h3>
                  <div className="label-mono text-fg-mute mt-2">→ {b.en}</div>
                </div>
                <div className="col-span-12 md:col-span-5 mt-4 md:mt-0 font-jp-sans text-[14px] md:text-[15px] leading-[1.9] text-fg-soft">
                  {b.desc}
                </div>
                <div className="hidden md:flex md:col-span-1 justify-end">
                  <span className="grid place-items-center size-10 rounded-full border border-line-strong text-fg-mute group-hover:bg-coral group-hover:text-bg group-hover:border-coral transition-all group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
