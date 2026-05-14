export function Footer() {
  return (
    <footer className="relative bg-bg text-fg border-t border-line-strong overflow-hidden">
      <div className="container-page pt-20 pb-12 relative">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <a href="#top" className="flex items-baseline gap-2">
              <span className="font-display text-[40px] leading-none font-medium tracking-[-0.04em] text-fg">
                Goody
              </span>
              <span className="size-[10px] rounded-full bg-coral inline-block translate-y-[-6px]" />
            </a>
            <p className="mt-6 font-jp-sans text-[14px] leading-[1.9] text-fg-soft max-w-[36ch]">
              未経験でも、つくる側へ。初心者クリエイターのためのキャリアプラットフォーム。
            </p>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="label-mono text-fg-mute mb-5">→ NAVIGATE</div>
            <ul className="space-y-3 font-jp-sans text-[14px]">
              <li><a href="#about" className="hover:text-coral transition-colors">私たちについて</a></li>
              <li><a href="#business" className="hover:text-coral transition-colors">事業内容</a></li>
              <li><a href="#services" className="hover:text-coral transition-colors">スキル領域</a></li>
              <li><a href="#how" className="hover:text-coral transition-colors">案件まで</a></li>
              <li><a href="#voice" className="hover:text-coral transition-colors">クリエイターの声</a></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="label-mono text-fg-mute mb-5">→ COMPANY</div>
            <ul className="space-y-3 font-jp-sans text-[14px]">
              <li><a href="#" className="hover:text-coral transition-colors">会社概要</a></li>
              <li><a href="#" className="hover:text-coral transition-colors">採用情報</a></li>
              <li><a href="#" className="hover:text-coral transition-colors">プレスリリース</a></li>
              <li><a href="#" className="hover:text-coral transition-colors">お問い合わせ</a></li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <div className="label-mono text-fg-mute mb-5">→ CONNECT</div>
            <ul className="space-y-3 font-jp-sans text-[14px]">
              <li><a href="https://github.com/Goody-JP" className="hover:text-coral transition-colors">GitHub →</a></li>
              <li><a href="#" className="hover:text-coral transition-colors">X (Twitter) →</a></li>
              <li><a href="#" className="hover:text-coral transition-colors">Instagram →</a></li>
              <li><a href="#" className="hover:text-coral transition-colors">note →</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-7 border-t border-line-strong flex flex-col md:flex-row justify-between gap-4 label-mono text-fg-mute">
          <span>© MMXXVI Goody Inc. — All rights reserved.</span>
          <span>東京・大阪・福岡 · Tokyo / Osaka / Fukuoka</span>
        </div>
      </div>

      {/* Oversized brand mark */}
      <div
        aria-hidden
        className="font-display font-medium text-coral/20 leading-[0.8] tracking-[-0.05em] text-[clamp(140px,30vw,420px)] whitespace-nowrap select-none pointer-events-none px-[clamp(20px,4vw,56px)]"
        style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
      >
        <span className="italic holo">Goody.</span>
      </div>
    </footer>
  );
}
