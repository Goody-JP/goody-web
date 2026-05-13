"use client";

import { motion } from "motion/react";

const STATS = [
  { num: "1,200", suf: "+", label: "登録クリエイター", en: "Creators" },
  { num: "340", suf: "+", label: "月間マッチング", en: "Matches / mo" },
  { num: "6", suf: "", label: "スキル領域", en: "Disciplines" },
  { num: "98", suf: "%", label: "初仕事獲得率", en: "First-job rate" },
];

export function Hero() {
  return (
    <section id="top" className="relative bg-paper pt-[120px] pb-[112px] overflow-hidden">
      {/* Vertical year marker — far right edge */}
      <div className="hidden lg:flex absolute top-[120px] right-[clamp(20px,4vw,56px)] flex-col items-center gap-3 label-en text-ink-mute">
        <span style={{ writingMode: "vertical-rl" }}>MMXXVI · 東京</span>
        <motion.span
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="text-coral text-[18px] leading-none"
        >
          ✺
        </motion.span>
      </div>

      <div className="container-page">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-3 label-en text-ink-mute mb-12 md:mb-20"
        >
          <span className="inline-block h-px w-9 bg-coral" />
          <span>初心者クリエイター・キャリアプラットフォーム</span>
        </motion.div>

        {/* Display headline — JP Shippori Mincho + accent in Fraunces italic coral */}
        <h1 className="font-jp-display font-medium leading-[0.96] tracking-[-0.02em] text-ink text-[clamp(56px,11vw,176px)]">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="block overflow-hidden"
          >
            <span className="inline-block">未経験でも、</span>
          </motion.span>
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="block overflow-hidden"
          >
            <span className="inline-block">
              <span className="font-display italic text-coral font-normal" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}>
                つくる
              </span>
              側へ。
            </span>
          </motion.span>
        </h1>

        {/* Subhead — two-column grid for asymmetric flow */}
        <div className="mt-12 md:mt-20 grid-12">
          <div className="col-span-12 md:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-jp-sans text-[16px] md:text-[17px] leading-[1.95] text-ink-soft max-w-[44ch]"
            >
              3D、動画、UI/UX、アプリ開発、グラフィック、AI。<br />
              スキルを学び始めたばかりのあなたへ。Goodyは、本物のクライアントワークを通じて成長できる場所です。
            </motion.p>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 mt-8 md:mt-0 flex md:items-end">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col md:items-end gap-4"
            >
              <a
                href="#cta"
                className="group inline-flex items-center gap-3 bg-ink text-paper rounded-full pl-7 pr-3 py-3 text-[15px] hover:bg-coral transition-colors"
              >
                <span>案件を探す</span>
                <span className="grid place-items-center size-8 rounded-full bg-paper text-ink transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
              <a
                href="#about"
                className="group inline-flex items-center gap-2 text-ink-soft hover:text-coral transition-colors text-[14px]"
              >
                <span className="label-en">About Goody</span>
                <span className="inline-block h-px w-6 bg-current transition-[width] group-hover:w-10" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats strip — hairline-divided */}
      <div className="container-page mt-24 md:mt-36">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="border-t border-line-strong"
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="py-7 md:py-9 px-4 md:px-6 first:pl-0 last:pr-0 border-b md:border-b-0 border-line md:border-r md:[&:last-child]:border-r-0"
              >
                <div className="label-en text-ink-mute mb-3">{s.en}</div>
                <div className="flex items-baseline gap-1">
                  <span
                    className="num-display text-[56px] md:text-[72px] leading-none text-ink"
                    style={{ fontVariationSettings: '"opsz" 144, "SOFT" 0' }}
                  >
                    {s.num}
                  </span>
                  {s.suf && (
                    <span className="font-display italic text-coral text-[28px] leading-none">
                      {s.suf}
                    </span>
                  )}
                </div>
                <div className="font-jp-sans text-[13px] text-ink-soft mt-3">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
