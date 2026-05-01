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
        <div className="mx-auto max-w-5xl px-5 sm:px-6 md:px-10 pt-20 md:pt-16 pb-12 md:pb-16">
          <header className="mb-8 md:mb-12">
            <div
              className="font-pixel text-[10px] tracking-widest text-ink-mute mb-3"
              aria-hidden="true"
            >
              ░ ░ ░ NOW PLAYING ░ ░ ░
            </div>
            <h1 className="font-display text-[clamp(1.75rem,8vw,2.5rem)] sm:text-[56px] md:text-[88px] leading-[1.05] sm:leading-none text-glow-cyan mb-3 sm:mb-4">
              Hello, player.
              <span className="caret" aria-hidden="true" />
            </h1>
            <p className="font-mono text-[14.5px] sm:text-[15px] md:text-[16px] leading-relaxed text-ink-dim max-w-2xl">
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

          <div className="dash-divider mb-6 md:mb-8" aria-hidden="true" />

          <div id="cabinet" className="scroll-mt-24">
            <Cabinet />
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}
