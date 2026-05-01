import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Cabinet from "@/components/Cabinet";

export const metadata = {
  title: "Cartridges · MTW.ARCADE",
};

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main id="main" className="flex-1 min-w-0">
        <div className="mx-auto max-w-5xl px-6 md:px-10 py-12 md:py-16">
          <header className="mb-12">
            <div
              className="font-pixel text-[10px] tracking-widest text-ink-mute mb-3"
              aria-hidden="true"
            >
              ░ ░ ░ NOW PLAYING ░ ░ ░
            </div>
            <h1 className="font-display text-[56px] md:text-[88px] leading-none text-glow-cyan mb-4">
              Hello, player.
              <span className="caret" aria-hidden="true" />
            </h1>
            <p className="font-mono text-[15px] md:text-[16px] leading-relaxed text-ink-dim max-w-2xl">
              You found my game cabinet. Sign the{" "}
              <Link href="/guestbook" className="underline hover:text-glow-cyan">
                guestbook
              </Link>{" "}
              on your way in, or skip the intro and head straight to the{" "}
              <a href="#cabinet" className="underline hover:text-glow-cyan">
                cartridges
              </a>
              .
            </p>
          </header>

          <div className="dash-divider mb-8" aria-hidden="true" />

          <div id="cabinet" className="scroll-mt-24">
            <Cabinet />
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}
