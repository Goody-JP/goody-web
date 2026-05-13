"use client";

import { Reveal } from "./reveal";

const POINTS = [
  {
    n: "01",
    title: "初心者だけのための案件設計",
    desc: "クラウドソーシングのように経験者と競う必要はありません。すべての案件は初心者の挑戦を想定して設計されています。",
  },
  {
    n: "02",
    title: "専属メンター制度",
    desc: "現役クリエイターがあなたに寄り添い、技術面・コミュニケーション面の両方でサポートします。一人で抱え込まないために。",
  },
  {
    n: "03",
    title: "段階的なステップアップ",
    desc: "最初の案件、二件目、三件目と、難易度を段階的に上げていく仕組み。実力に合わせて挑戦できます。",
  },
  {
    n: "04",
    title: "実績の見える化",
    desc: "完了した案件はGoodyのプロフィールに自動で蓄積。次のクライアントに対する説得力ある実績へと変わります。",
  },
];

export function Why() {
  return (
    <section className="bg-paper-soft section-pad">
      <div className="container-page">
        <div className="grid-12 items-end mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-7">
            <Reveal className="flex items-center gap-3 mb-8">
              <span className="inline-block h-px w-9 bg-coral" />
              <span className="label-en text-ink-mute">Why Goody</span>
            </Reveal>
            <Reveal>
              <h2 className="font-jp-display font-medium text-ink leading-[1.04] tracking-[-0.02em] text-[clamp(40px,7vw,108px)]">
                他にない、
                <br />
                <span
                  className="font-display italic text-coral font-normal"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
                >
                  初心者
                </span>
                ファースト。
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-5 md:pl-8">
            <Reveal delay={0.15}>
              <p className="font-jp-sans text-[15px] md:text-[16px] leading-[1.95] text-ink-soft">
                クラウドソーシングでは埋もれてしまう。エージェントには相手にされない。Goodyは、初心者のためだけに設計された場所です。
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="border-t border-line-strong">
          {POINTS.map((p, i) => (
            <Reveal key={p.n} delay={0.05 * i}>
              <li className="grid grid-cols-12 gap-6 py-9 md:py-12 border-b border-line-strong">
                <div className="col-span-2 md:col-span-1">
                  <span className="num-display text-[32px] md:text-[44px] leading-none text-coral">
                    {p.n}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-6">
                  <h3 className="font-jp-display text-[22px] md:text-[28px] font-medium text-ink leading-[1.35]">
                    {p.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-5 font-jp-sans text-[14px] md:text-[15px] leading-[1.9] text-ink-soft">
                  {p.desc}
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
