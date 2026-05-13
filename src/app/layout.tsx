import type { Metadata } from "next";
import {
  Fraunces,
  Onest,
  IBM_Plex_Mono,
  Shippori_Mincho_B1,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const shippori = Shippori_Mincho_B1({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-shippori",
  display: "swap",
});

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-zen-kaku",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Goody — 未経験でも、つくる側へ。",
  description:
    "3D・動画・UI/UX・アプリ・グラフィック・AI。経験ゼロから本物のクライアントワークへ。Goodyは初心者クリエイターのための案件マッチングプラットフォームです。",
  metadataBase: new URL("https://goody-jp.github.io"),
  openGraph: {
    title: "Goody — 未経験でも、つくる側へ。",
    description:
      "経験ゼロから、プロの現場へ。初心者クリエイターのためのキャリアプラットフォーム。",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${fraunces.variable} ${onest.variable} ${plexMono.variable} ${shippori.variable} ${zenKaku.variable}`}
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
