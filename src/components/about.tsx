"use client";

import { motion } from "motion/react";
import { Reveal } from "./reveal";

export function About() {
  return (
    <section
      id="about"
      className="relative section-pad"
    >
      {/* dark glass scrim so text is readable over WebGL */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/0 via-bg/70 to-bg/0 pointer-events-none" />

      <div className="container-page relative">
        <Reveal className="flex items-center gap-3 mb-16 md:mb-20">
          <span className="inline-block h-px w-9 bg-coral" />
          <span className="label-mono text-fg-mute">[ ABOUT / 私たちについて ]</span>
        </Reveal>

        <div className="grid-12 items-start gap-y-12">
          <motion.div
            initial={{ opacity: 0, x: -60, rotateY: -25 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d", perspective: 1200 }}
            className="col-span-12 md:col-span-7"
          >
            <h2 className="font-jp-display font-medium text-fg leading-[1.06] tracking-[-0.02em] text-[clamp(40px,7vw,108px)]">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-5 md:pl-8 lg:pl-16"
          >
            <div className="bg-bg-soft/70 backdrop-blur-xl border border-line p-8 rounded-sm space-y-7 font-jp-sans text-[15px] md:text-[16px] leading-[1.95] text-fg-soft">
              <p>
                クリエイティブの学校を卒業しても。独学でスキルを磨いても。
                <span className="text-fg font-medium">「実績がないから仕事がもらえない、仕事がないから実績ができない」</span>
                — この壁の前で、多くの才能ある初心者が立ち止まっています。
              </p>
              <p>
                Goodyは、その<span className="text-coral font-medium">最初の一歩</span>を支えるためにつくられました。小さな案件から始め、メンターのサポートのもとで本物のクライアントワークを経験する。完成した仕事はあなたの実績となり、次の挑戦への扉を開きます。
              </p>
              <p>
                私たちの使命は、<span className="text-fg font-medium">才能の入り口を広げる</span>こと。経験ゼロのあなたが、明日にはプロの現場に立っている。Goodyが目指すのは、そんな未来です。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
