import type { Metadata } from "next";
import { WorldOrbit } from "@/components/world-orbit";
import { Hud } from "@/components/hud";

export const metadata: Metadata = {
  title: "事業内容 / Business — Goody",
  description: "Goodyの6つの事業領域。クリエイティブ、グローバル人材育成、人材サービス、BPO、海外飲食、酒類マーケティング。",
};

const ORBIT_SECTIONS = [
  { label: "CREATIVE" },
  { label: "GLOBAL TALENT" },
  { label: "PERSONNEL" },
  { label: "BPO" },
  { label: "F&B" },
  { label: "BEVERAGE" },
];

export default function BusinessPage() {
  return (
    <>
      <Hud
        sections={ORBIT_SECTIONS}
        contextLabel="ORBIT / 事業内容 · BUSINESS"
        scrollHint="SCROLL TO ROTATE THE ORBIT"
        backLink={{ href: "/", label: "BACK TO GOODY" }}
      />
      <WorldOrbit />

      {/* Scroll spacer — provides height for the Orbit ring to make
          one full revolution (6 panels × ~100vh per panel ≈ 600vh) */}
      <main className="relative" aria-hidden>
        <div className="h-[600vh]" />
      </main>

      {/* SR-only content for SEO + accessibility */}
      <div className="sr-only" aria-label="事業内容 — Business divisions">
        <h1>Goody — 事業内容 / Business Divisions</h1>
        <ul>
          <li><strong>01 クリエイティブ事業 (Creative)</strong> — 動画・グラフィック・ブランディング・Web制作。企業の表現を支える総合クリエイティブ。</li>
          <li><strong>02 グローバル人材育成事業 (Global Talent Development)</strong> — 海外で活躍する人材を育てるプログラムと、現地キャリアまで伴走する一気通貫の支援。</li>
          <li><strong>03 人材サービス事業 (Personnel Services)</strong> — 採用支援、人材紹介、業務委託まで。企業の人材戦略を、必要な形で、必要なときに。</li>
          <li><strong>04 BPO事業 (Business Process Outsourcing)</strong> — バックオフィスを中心に、企業のノンコア業務を一括受託。コア業務に集中できる環境を。</li>
          <li><strong>05 海外飲食事業 (Overseas F&B)</strong> — 海外マーケットでの飲食店運営とブランド展開。日本発の食体験を、現地に根を張った形で世界へ。</li>
          <li><strong>06 酒類マーケティング・クリエイティブ事業 (Beverage Marketing & Creative)</strong> — 酒類ブランドのマーケティング戦略から、ビジュアル・コピー・体験設計まで一気通貫で。</li>
        </ul>
      </div>
    </>
  );
}
