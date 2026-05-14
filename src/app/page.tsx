import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hud } from "@/components/hud";

export default function Home() {
  return (
    <>
      <Nav />
      <Hud />

      {/* Scroll spacer — provides height for the WebGL camera to descend the helix.
          8 panels × ~100vh per panel ≈ 800vh. */}
      <main className="relative" aria-hidden>
        <div className="h-[800vh]" />
      </main>

      {/* SR-only content for SEO + accessibility */}
      <div className="sr-only" aria-label="Page content">
        <h1>Goody — 未経験でも、つくる側へ。</h1>
        <section>
          <h2>About / 私たちについて</h2>
          <p>才能はある。ただ、きっかけがない。Goodyは、初心者クリエイターのための案件マッチングプラットフォームです。</p>
        </section>
        <section>
          <h2>Business / 事業内容</h2>
          <ul>
            <li>クリエイティブ事業</li>
            <li>グローバル人材育成事業</li>
            <li>人材サービス事業</li>
            <li>BPO事業</li>
            <li>海外飲食事業</li>
            <li>酒類マーケティング・クリエイティブ事業</li>
          </ul>
        </section>
        <section>
          <h2>Services / スキル領域</h2>
          <ul>
            <li>3D デザイン</li>
            <li>動画編集</li>
            <li>UI/UX デザイン</li>
            <li>アプリ開発</li>
            <li>グラフィックデザイン</li>
            <li>AI クリエイティブ</li>
          </ul>
        </section>
        <section>
          <h2>Process / 案件まで</h2>
          <ol>
            <li>プロフィール登録</li>
            <li>メンター面談</li>
            <li>案件参加</li>
            <li>実績獲得</li>
          </ol>
        </section>
      </div>

      <Footer />
    </>
  );
}
