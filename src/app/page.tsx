import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hud } from "@/components/hud";
import { WorldSpiral } from "@/components/world-spiral";

const SPIRAL_SECTIONS = [
  { label: "INTRO" },
  { label: "ABOUT" },
  { label: "BUSINESS" },
  { label: "SERVICES" },
  { label: "PROCESS" },
  { label: "WHY" },
  { label: "VOICE" },
  { label: "JOIN" },
];

export default function Home() {
  return (
    <>
      <Nav />
      <Hud
        sections={SPIRAL_SECTIONS}
        contextLabel="GOODY / WORLD-01"
        scrollHint="SCROLL TO DESCEND HELIX"
      />
      <WorldSpiral />

      {/* Scroll spacer — provides scroll height for the camera to descend the helix */}
      <main className="relative" aria-hidden>
        <div className="h-[800vh]" />
      </main>

      {/* SR-only content for SEO + accessibility */}
      <div className="sr-only" aria-label="Page content">
        <h1>Goody — 未経験でも、つくる側へ。</h1>
        <p>3D・動画・UI/UX・アプリ・グラフィック・AI。経験ゼロから本物のクライアントワークへ。Goodyは初心者クリエイターのための案件マッチングプラットフォームです。</p>
        <a href="/business">事業内容 — Business divisions</a>
      </div>

      <Footer />
    </>
  );
}
