"use client";

import { Reveal } from "./reveal";

export function About() {
  return (
    <section id="about" className="bg-paper section-pad relative">
      <div className="container-page">
        <Reveal className="flex items-center gap-3 mb-16 md:mb-24">
          <span className="inline-block h-px w-9 bg-coral" />
          <span className="label-en text-ink-mute">About / 私たちについて</span>
        </Reveal>

        <div className="grid-12 items-start gap-y-12">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <h2 className="font-jp-display font-medium text-ink leading-[1.06] tracking-[-0.02em] text-[clamp(40px,7vw,108px)]">
                才能はある。
                <br />
                ただ、
                <span
                  className="font-display italic text-coral font-normal"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
                >
                  きっかけ
                </span>
                がない。
              </h2>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-5 md:pl-8 lg:pl-16">
            <Reveal delay={0.15} className="space-y-7 font-jp-sans text-[15px] md:text-[16px] leading-[1.95] text-ink-soft">
              <p>
                クリエイティブの学校を卒業しても。独学でスキルを磨いても。
                <span className="text-ink font-medium">「実績がないから仕事がもらえない、仕事がないから実績ができない」</span>
                — この壁の前で、多くの才能ある初心者が立ち止まっています。
              </p>
              <p>
                Goodyは、その<span className="text-coral font-medium">最初の一歩</span>を支えるためにつくられました。小さな案件から始め、メンターのサポートのもとで本物のクライアントワークを経験する。完成した仕事はあなたの実績となり、次の挑戦への扉を開きます。
              </p>
              <p>
                私たちの使命は、<span className="text-ink font-medium">才能の入り口を広げる</span>こと。経験ゼロのあなたが、明日にはプロの現場に立っている。Goodyが目指すのは、そんな未来です。
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
