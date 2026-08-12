import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import RtLibraryShowcase from "@/components/RtLibraryShowcase";
import ModeText from "@/components/ModeText";

export const metadata = {
  title: "Lab · Matthew Thomas-Wicher",
};

type Screen = {
  src: string;
  alt: string;
  caption: string;
};

const PLUGIN_URL =
  "https://www.figma.com/community/plugin/1393007160057387991/quick-screenshot-to-code";

// The plugin's actual Community listing slides, pulled from the live page.
const PLUGIN_SLIDES: Screen[] = [
  {
    src: "/lab/screenshot-to-code/carousel-1.png",
    alt: "Quick Screenshot to Code listing slide: eight output targets across web and mobile, from HTML and Tailwind to SwiftUI and Jetpack Compose",
    caption: "Eight targets, web and mobile.",
  },
  {
    src: "/lab/screenshot-to-code/carousel-2.png",
    alt: "Quick Screenshot to Code listing slide: three steps, select a layer, pick a stack, read the code, in about twenty seconds",
    caption: "Three steps, about twenty seconds.",
  },
  {
    src: "/lab/screenshot-to-code/carousel-3.png",
    alt: "Quick Screenshot to Code listing slide: the generated code appears on the canvas next to the design",
    caption: "Code lands next to the design.",
  },
];

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
          <ModeText
            scenic={
              <div
                className="font-pixel text-[10px] tracking-widest text-ink-mute mb-3"
                aria-hidden="true"
              >
                ░ B-SIDES ░
              </div>
            }
            basic={
              <div
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute mb-3"
                aria-hidden="true"
              >
                Side projects
              </div>
            }
          />
          <h1 className="font-display text-[clamp(2.25rem,10vw,3rem)] sm:text-[56px] md:text-[80px] leading-[1.05] sm:leading-none text-glow-amber mb-8">
            The Lab
            <ModeText
              scenic={<span className="caret" aria-hidden="true" />}
              basic={null}
            />
          </h1>

          <p className="font-mono text-[15px] text-ink-dim mb-12 sm:mb-16 max-w-xl leading-relaxed">
            Experiments, small tools, and weekend builds. None of it warrants a
            full case study. I like it anyway.
          </p>

          <section aria-labelledby="exhibit-screenshot-to-code">
            <header className="mb-6 flex flex-wrap items-baseline gap-x-4 sm:gap-x-6 gap-y-2">
              <span className="font-pixel text-[10px] tracking-widest text-ink-mute">
                EXHIBIT 01
              </span>
              <h2
                id="exhibit-screenshot-to-code"
                className="font-display text-[26px] sm:text-[36px] md:text-[44px] leading-[1.05] sm:leading-none text-glow-lime"
              >
                Quick Screenshot to Code
              </h2>
              <span className="font-pixel text-[9px] tracking-widest text-glow-lime">
                LIVE · 1,700+ DESIGNERS
              </span>
            </header>

            <a
              href={PLUGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Install Quick Screenshot to Code on Figma Community"
              className="cartridge group block relative overflow-hidden mb-10 aspect-video"
            >
              <Image
                src="/lab/screenshot-to-code/cover.png"
                alt="Quick Screenshot to Code cover art: the frame you drew, in the stack you ship, a wireframe card converting into React code"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-void/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 font-pixel text-[10px] tracking-widest text-glow-lime">
                INSTALL ON FIGMA COMMUNITY ↗
              </div>
            </a>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-10 gap-y-6 mb-10">
              <p className="font-mono text-[14px] text-ink-dim leading-relaxed max-w-xl">
                A Figma plugin that turns a frame or screenshot on your canvas
                into working code. Select a layer, pick one of eight stacks,
                from Tailwind to SwiftUI, and the code lands on the board next
                to the design about twenty seconds later. I designed and built
                the whole thing solo: plugin, prompts, and listing. 1,700+
                designers have used it.
              </p>
              <dl className="grid grid-cols-[68px_1fr] gap-y-1.5 font-mono text-[11.5px] text-ink-dim self-start">
                <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">Role</dt>
                <dd>Design + all the code</dd>
                <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">Tools</dt>
                <dd>Figma Plugin API · TypeScript · OpenAI</dd>
                <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">When</dt>
                <dd>2024&ndash;now · 18 releases</dd>
                <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">Users</dt>
                <dd>1,700+ designers</dd>
              </dl>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-7">
              {PLUGIN_SLIDES.map((slide) => (
                <figure key={slide.src} className="group">
                  <div className="cartridge relative overflow-hidden aspect-video bg-bg-deep">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="mt-3 font-pixel text-[9px] tracking-widest text-ink-mute uppercase">
                    {slide.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <hr className="border-0 border-t border-ink-ghost my-16 sm:my-20" />

          <section aria-labelledby="exhibit-money-magnet">
            <header className="mb-6 flex flex-wrap items-baseline gap-x-4 sm:gap-x-6 gap-y-2">
              <span className="font-pixel text-[10px] tracking-widest text-ink-mute">
                EXHIBIT 02
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

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-10 gap-y-6 mb-10">
              <p className="font-mono text-[14px] text-ink-dim leading-relaxed max-w-xl">
                A personal finance app built in 19 days for a hackathon. It won.
                The idea was to stop guilt-tripping people about coffee and
                organize spending around what they are actually saving for. Four
                screens, from empty state to a dashboard with something in it.
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
                EXHIBIT 03
              </span>
              <h2
                id="exhibit-rt-library"
                className="font-display text-[32px] sm:text-[36px] md:text-[44px] leading-none text-glow-cyan"
              >
                Roundtable Design Library
              </h2>
              <span className="font-pixel text-[9px] tracking-widest text-glow-cyan">
                BRG · 2023&ndash;2025
              </span>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-10 gap-y-6 mb-10">
              <p className="font-mono text-[14px] text-ink-dim leading-relaxed max-w-xl">
                A 3-tier token system for Berkeley Research Group&apos;s Roundtable
                platform. Splitting the library into Primitives, Semantic, and
                Component layers cleared out a pile of engineering complaints and
                made front-end delivery about 25% faster.
              </p>
              <dl className="grid grid-cols-[68px_1fr] gap-y-1.5 font-mono text-[11.5px] text-ink-dim self-start">
                <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">Role</dt>
                <dd>Sr. Product Designer</dd>
                <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">Tools</dt>
                <dd>Figma · Tokens Studio</dd>
                <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">When</dt>
                <dd>2023&ndash;2025</dd>
                <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">Impact</dt>
                <dd>25% delivery velocity</dd>
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
