"use client";

import { Reveal } from "./reveal";

const STEPS = [
  {
    n: "01",
    title: "プロフィール登録",
    en: "Register",
    desc: "スキル、ポートフォリオ、希望する案件の方向性をシンプルなフォームで登録。3分で完了します。",
  },
  {
    n: "02",
    title: "メンター面談",
    en: "Mentor Match",
    desc: "あなたの専属メンターが、現在のスキルに合った最初の案件を一緒に選びます。",
  },
  {
    n: "03",
    title: "案件参加",
    en: "Engage",
    desc: "本物のクライアントワークに参加。メンターのレビューを受けながら、安心して進められます。",
  },
  {
    n: "04",
    title: "実績獲得",
    en: "Build",
    desc: "完成した仕事はそのままあなたのポートフォリオに。次の挑戦が見える状態に。",
  },
];

export function How() {
  return (
    <section id="how" className="bg-paper section-pad">
      <div className="container-page">
        <div className="grid-12 mb-16 md:mb-24">
          <Reveal className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3">
              <span className="inline-block h-px w-9 bg-coral" />
              <span className="label-en text-ink-mute">Process</span>
            </div>
          </Reveal>
          <div className="col-span-12 md:col-span-9 mt-6 md:mt-0">
            <Reveal>
              <h2 className="font-jp-display font-medium text-ink leading-[1.04] tracking-[-0.02em] text-[clamp(40px,7vw,108px)]">
                最初の案件まで、
                <br />
                <span
                  className="font-display italic text-coral font-normal"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
                >
                  4
                </span>
                ステップ。
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-[60px] left-0 right-0 hidden md:block">
            <div className="h-px bg-line-strong" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 md:gap-x-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={0.08 * i}>
                <div className="relative">
                  <div className="hidden md:block absolute -top-[68px] left-0 size-[15px] rounded-full border border-coral bg-paper">
                    <span className="block size-[5px] rounded-full bg-coral absolute inset-0 m-auto" />
                  </div>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="label-en text-coral">STEP / {s.n}</span>
                  </div>
                  <h3 className="font-jp-display text-[26px] md:text-[30px] font-medium text-ink leading-[1.3] mb-4">
                    {s.title}
                  </h3>
                  <div className="label-en text-ink-mute mb-4">{s.en}</div>
                  <p className="font-jp-sans text-[14px] leading-[1.9] text-ink-soft max-w-[36ch]">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
