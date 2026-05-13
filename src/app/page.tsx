import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { About } from "@/components/about";
import { Business } from "@/components/business";
import { Services } from "@/components/services";
import { How } from "@/components/how";
import { Why } from "@/components/why";
import { Voice } from "@/components/voice";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Business />
        <Services />
        <How />
        <Why />
        <Voice />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
