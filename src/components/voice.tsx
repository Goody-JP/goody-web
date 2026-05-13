"use client";

import { Reveal } from "./reveal";

const VOICES = [
  {
    quote:
      "独学でFigmaを触り始めて半年。Goodyで初めて本物のクライアントワークを経験できました。メンターのフィードバックがなければ今の自分はないと思います。",
    name: "佐藤 美咲",
    role: "UI/UX デザイナー（25歳）",
    field: "UI / UX",
  },
  {
    quote:
      "Blenderを学校で習っていましたが、実案件はゼロ。Goody経由で参加した3D案件が、いま転職活動のポートフォリオの中心になっています。",
    name: "田中 翔太",
    role: "3D デザイナー（23歳）",
    field: "3D",
  },
  {
    quote:
      "YouTube動画を友達向けに編集していたのが、気づけば企業案件の動画編集者として副業ができるレベルに。最初の一歩がここにあった。",
    name: "中村 さくら",
    role: "動画クリエイター（27歳）",
    field: "Video",
  },
];

export function Voice() {
  return (
    <section id="voice" className="bg-paper section-pad">
      <div className="container-page">
        <div className="grid-12 mb-16 md:mb-24">
          <Reveal className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3">
              <span className="inline-block h-px w-9 bg-coral" />
              <span className="label-en text-ink-mute">Voice</span>
            </div>
          </Reveal>
          <div className="col-span-12 md:col-span-9 mt-6 md:mt-0">
            <Reveal>
              <h2 className="font-jp-display font-medium text-ink leading-[1.04] tracking-[-0.02em] text-[clamp(40px,7vw,108px)]">
                最初の一歩を、
                <br />
                <span
                  className="font-display italic text-coral font-normal"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
                >
                  踏み出した
                </span>
                人たち。
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line-strong border border-line-strong">
          {VOICES.map((v, i) => (
            <Reveal key={v.name} delay={0.07 * i}>
              <article className="bg-paper p-9 md:p-10 h-full flex flex-col gap-7">
                <div className="flex items-center justify-between">
                  <span className="num-display text-[40px] leading-none text-coral">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="label-en text-ink-mute">{v.field}</span>
                </div>

                <blockquote className="font-jp-display text-[20px] md:text-[22px] leading-[1.65] text-ink font-medium relative pl-5">
                  <span className="absolute left-0 top-1 text-coral text-[28px] leading-none font-display italic">
                    "
                  </span>
                  {v.quote}
                </blockquote>

                <footer className="mt-auto pt-6 border-t border-line">
                  <div className="font-jp-display text-[16px] font-medium text-ink">
                    {v.name}
                  </div>
                  <div className="font-jp-sans text-[13px] text-ink-mute mt-1">
                    {v.role}
                  </div>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
