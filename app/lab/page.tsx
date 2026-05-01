import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import RtLibraryShowcase from "@/components/RtLibraryShowcase";

export const metadata = {
  title: "Lab · MTW.ARCADE",
};

type Screen = {
  src: string;
  alt: string;
  caption: string;
};

const MONEY_MAGNET_SCREENS: Screen[] = [
  {
    src: "/lab/money-magnet/signup.png",
    alt: "Money Magnet welcome screen with the tagline Your money, your goals",
    caption: "01 · Welcome",
  },
  {
    src: "/lab/money-magnet/home.png",
    alt: "Money Magnet home dashboard, empty state",
    caption: "02 · Home (empty)",
  },
  {
    src: "/lab/money-magnet/goals.png",
    alt: "Money Magnet home dashboard, first goal added",
    caption: "03 · First goal",
  },
  {
    src: "/lab/money-magnet/insights.png",
    alt: "Money Magnet insights screen showing spending breakdown and cash flow",
    caption: "04 · Insights",
  },
];

function PhoneMockup({ screen }: { screen: Screen }) {
  return (
    <figure className="group">
      <div className="cartridge p-2 bg-bg-deep">
        <div className="aspect-[430/932] relative overflow-hidden rounded-[8px] bg-white">
          <Image
            src={screen.src}
            alt={screen.alt}
            fill
            sizes="(max-width: 768px) 50vw, 280px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>
      <figcaption className="mt-3 font-pixel text-[9px] tracking-widest text-ink-mute uppercase">
        {screen.caption}
      </figcaption>
    </figure>
  );
}

export default function Lab() {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main id="main" className="flex-1 min-w-0">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 md:px-10 pt-20 md:pt-16 pb-12 md:pb-16">
          <div
            className="font-pixel text-[10px] tracking-widest text-ink-mute mb-3"
            aria-hidden="true"
          >
            ░ B-SIDES ░
          </div>
          <h1 className="font-display text-[clamp(2.25rem,10vw,3rem)] sm:text-[56px] md:text-[80px] leading-[1.05] sm:leading-none text-glow-amber mb-8">
            The Lab
            <span className="caret" aria-hidden="true" />
          </h1>

          <p className="font-mono text-[15px] text-ink-dim mb-12 sm:mb-16 max-w-xl leading-relaxed">
            A drawer for design experiments, micro-tools, and weekend builds. Most of these
            don&apos;t deserve a case study, but they earn their keep.
          </p>

          <section aria-labelledby="exhibit-money-magnet">
            <header className="mb-6 flex flex-wrap items-baseline gap-x-4 sm:gap-x-6 gap-y-2">
              <span className="font-pixel text-[10px] tracking-widest text-ink-mute">
                EXHIBIT 01
              </span>
              <h2
                id="exhibit-money-magnet"
                className="font-display text-[32px] sm:text-[36px] md:text-[44px] leading-none text-glow-magenta"
              >
                Money Magnet
              </h2>
              <span className="font-pixel text-[9px] tracking-widest text-glow-magenta">
                WON · HACKATHON
              </span>
            </header>

            <a
              href="https://www.youtube.com/watch?v=UKPrZR3LCIU"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch the Money Magnet demo on YouTube"
              className="cartridge group block relative overflow-hidden mb-10 aspect-video"
            >
              <Image
                src="/lab/money-magnet/demo-thumb.jpg"
                alt="Money Magnet hackathon demo, winning application"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-void/80 via-transparent to-transparent pointer-events-none" />
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="font-display text-[28px] sm:text-[32px] leading-none text-glow-cyan bg-bg-void/70 border border-neon-cyan/60 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center pl-1 sm:pl-2 transition-transform duration-300 group-hover:scale-110">
                  ▶
                </span>
              </div>
              <div className="absolute bottom-3 left-3 font-pixel text-[10px] tracking-widest text-glow-cyan">
                WATCH DEMO ↗
              </div>
            </a>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-10 gap-y-6 mb-10">
              <p className="font-mono text-[14px] text-ink-dim leading-relaxed max-w-xl">
                A personal-finance app concept built for a 19-day hackathon, and the
                winning entry. The premise: instead of guilt-tripping users about every
                latte, frame spending around the goals they&apos;re actually saving toward.
                Four screens trace the empty-state onboarding through to a populated
                dashboard with insights.
              </p>
              <dl className="grid grid-cols-[68px_1fr] gap-y-1.5 font-mono text-[11.5px] text-ink-dim self-start">
                <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">Role</dt>
                <dd>Design</dd>
                <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">Tools</dt>
                <dd>Figma</dd>
                <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">When</dt>
                <dd>19-day sprint</dd>
              </dl>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-7">
              {MONEY_MAGNET_SCREENS.map((screen) => (
                <PhoneMockup key={screen.src} screen={screen} />
              ))}
            </div>
          </section>

          <hr className="border-0 border-t border-ink-ghost my-16 sm:my-20" />

          <section aria-labelledby="exhibit-rt-library">
            <header className="mb-6 flex flex-wrap items-baseline gap-x-4 sm:gap-x-6 gap-y-2">
              <span className="font-pixel text-[10px] tracking-widest text-ink-mute">
                EXHIBIT 02
              </span>
              <h2
                id="exhibit-rt-library"
                className="font-display text-[32px] sm:text-[36px] md:text-[44px] leading-none text-glow-cyan"
              >
                RT Library
              </h2>
              <span className="font-pixel text-[9px] tracking-widest text-glow-cyan">
                BRG · 2023&ndash;2025
              </span>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-10 gap-y-6 mb-10">
              <p className="font-mono text-[14px] text-ink-dim leading-relaxed max-w-xl">
                A 3-tier token system for Berkeley Research Group&apos;s Roundtable
                research platform. Refactoring the design library into Primitives,
                Semantic, and Component layers untangled engineering pain-points
                and accelerated front-end delivery by ~25%. Every token name and
                hex below was pulled directly from the live Figma file (Color/*,
                Header/*, Body/*); the components are stamped against those tokens
                in EB Garamond + Roboto, the system&apos;s real typefaces.
              </p>
              <dl className="grid grid-cols-[68px_1fr] gap-y-1.5 font-mono text-[11.5px] text-ink-dim self-start">
                <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">Role</dt>
                <dd>Sr. Product Designer</dd>
                <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">Tools</dt>
                <dd>Figma · Tokens Studio</dd>
                <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">When</dt>
                <dd>2023&ndash;2025</dd>
                <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">Impact</dt>
                <dd>+25% delivery velocity</dd>
              </dl>
            </div>

            <RtLibraryShowcase />
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
}
