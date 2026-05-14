"use client";

import { motion } from "motion/react";
import { Reveal } from "./reveal";

const SERVICES = [
  { n: "01", title: "3D デザイン", en: "3D Design", desc: "Blender / Cinema 4D / Spline。プロダクトビジュアル、CG広告、Web 3D まで。", tags: ["Blender", "C4D", "Spline"] },
  { n: "02", title: "動画編集", en: "Video Editing", desc: "Premiere / After Effects。SNS縦動画、YouTube、企業VPまで幅広く。", tags: ["Premiere", "AE", "DaVinci"] },
  { n: "03", title: "UI / UX デザイン", en: "UI / UX", desc: "Figma を中心に、Webサイト・アプリのUI/UX設計とプロトタイピング。", tags: ["Figma", "Framer", "Webflow"] },
  { n: "04", title: "アプリ開発", en: "App Development", desc: "React / Next.js / Swift。MVP開発から本番運用まで、初心者にも開かれた現場。", tags: ["Next.js", "Swift", "Flutter"] },
  { n: "05", title: "グラフィック", en: "Graphic Design", desc: "Illustrator / Photoshop。ロゴ、ブランディング、SNSビジュアル、印刷物。", tags: ["Illustrator", "Photoshop", "InDesign"] },
  { n: "06", title: "AI クリエイティブ", en: "AI Creative", desc: "ComfyUI / Midjourney / Runway。AIを使いこなす次世代のクリエイティブ。", tags: ["ComfyUI", "Midjourney", "Runway"] },
];

export function Services() {
  return (
    <section id="services" className="relative section-pad">
      <div className="absolute inset-0 bg-gradient-to-b from-bg/0 via-bg/85 to-bg/0 pointer-events-none" />

      <div className="container-page relative">
        <div className="grid-12 mb-16 md:mb-24">
          <Reveal className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3">
              <span className="inline-block h-px w-9 bg-coral" />
              <span className="label-mono text-fg-mute">[ SERVICES ]</span>
            </div>
          </Reveal>
          <div className="col-span-12 md:col-span-9 mt-6 md:mt-0">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-jp-display font-medium text-fg leading-[1.04] tracking-[-0.02em] text-[clamp(40px,7vw,108px)]"
            >
              6つの
              <span
                className="font-display italic text-coral font-normal"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
              >
                スキル
              </span>
              。
              <br />
              無限の可能性。
            </motion.h2>
            <Reveal delay={0.2}>
              <p className="mt-8 font-jp-sans text-[15px] md:text-[17px] leading-[1.95] text-fg-soft max-w-[58ch]">
                あなたが学んだスキルは、Goodyのどこかで必ず仕事になります。経験レベルに合わせた案件を、専属メンターと一緒に選びます。
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-strong border border-line-strong">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 60, rotateX: 18 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              style={{ transformStyle: "preserve-3d", perspective: 1200 }}
              className="group relative bg-bg-soft/85 backdrop-blur-xl p-8 md:p-10 min-h-[340px] flex flex-col gap-6 transition-colors hover:bg-bg-mid/90"
            >
              <div className="flex items-baseline justify-between">
                <span className="num-display text-[44px] leading-none text-fg-mute group-hover:text-coral transition-colors">
                  {s.n}
                </span>
                <span className="label-mono text-fg-mute">→ {s.en}</span>
              </div>

              <h3 className="font-jp-display text-[28px] md:text-[32px] font-medium leading-[1.25] text-fg mt-auto">
                {s.title}
              </h3>

              <p className="font-jp-sans text-[14px] leading-[1.85] text-fg-soft">
                {s.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="label-mono text-fg-mute border border-line-strong rounded-full px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <span className="absolute left-0 bottom-0 h-px w-0 bg-coral transition-[width] duration-700 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
