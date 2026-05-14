const ITEMS = [
  { en: "3D Design", jp: "三次元設計" },
  { en: "Video Editing", jp: "映像編集" },
  { en: "UI / UX", jp: "体験設計" },
  { en: "App Development", jp: "アプリ開発" },
  { en: "Graphic Design", jp: "意匠" },
  { en: "AI Creative", jp: "AI クリエイティブ" },
];

export function Marquee() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="relative bg-bg/60 backdrop-blur-md border-y border-line-strong overflow-hidden">
      <div className="marquee py-7">
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-9 shrink-0">
            <span className="font-jp-display text-[28px] md:text-[36px] text-fg font-medium">
              {item.jp}
            </span>
            <span className="label-mono text-fg-mute">→ {item.en}</span>
            <span className="size-[5px] rounded-full bg-coral inline-block" />
          </div>
        ))}
      </div>
    </div>
  );
}
