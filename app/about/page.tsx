import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ResumeDisk from "@/components/ResumeDisk";

export const metadata = {
  title: "Player Profile · MTW.ARCADE",
};

const STATS = [
  { label: "YEARS XP", value: "9" },
  { label: "CITY", value: "WASHINGTON, D.C." },
  { label: "CURRENT QUEST", value: "CAPITAL ONE" },
  { label: "CLASS", value: "SR. PRODUCT DESIGNER" },
];

const COMMUNITIES = [
  {
    name: "Capital One Social Impact",
    role: "Pro Bono Team Lead",
    body: "Led a cross-functional pro bono team optimizing onboarding for Carver Federal Savings Bank, with measurable community impact.",
  },
  {
    name: "Salute Military BRG",
    role: "Active Member",
    body: "Military spouse advocate. Supporting veteran and military family associates across 15+ local chapters.",
  },
  {
    name: "Flatiron Alumni · Hackonomics",
    role: "Team Lead, 2024 Winner",
    body: "Led product, design, and engineering to a hackathon win, shipping an AI-powered personal finance app in 19 days.",
  },
];

const FAVES = [
  { tag: "GAME", name: "NBA 2K '26", note: "MyCareer marathons. Late-night ranked." },
  { tag: "BOARD", name: "My offset smoker", note: "Sundays. Brisket. The whole thing." },
  { tag: "GEAR", name: "Sony A7Rii", note: "San Diego skies. Long walks with Micah." },
  { tag: "HOMIE", name: "Micah, the pup", note: "Energy-packed pandemic chaos engine." },
];

export default function About() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main id="main" className="flex-1 min-w-0">
        <div className="mx-auto max-w-4xl px-6 md:px-10 py-12 md:py-16">
          <div
            className="font-pixel text-[10px] tracking-widest text-ink-mute mb-3"
            aria-hidden="true"
          >
            ░ PLAYER PROFILE ░
          </div>
          <h1 className="font-display text-[56px] md:text-[80px] leading-none text-glow-magenta mb-8">
            Player 1: Matt
            <span className="caret" aria-hidden="true" />
          </h1>

          <section className="grid md:grid-cols-[200px_1fr] gap-8 mb-14">
            <div className="cartridge p-1 w-[200px] self-start">
              <Image
                src="/about-photo.jpg"
                alt="Matthew Thomas-Wicher portrait"
                width={400}
                height={533}
                className="block w-full h-auto"
              />
            </div>
            <div className="space-y-4 font-mono text-[14px] leading-relaxed text-ink-dim">
              <p>
                I&apos;m a Sr. Product Designer with{" "}
                <span className="text-glow-cyan">9 years</span> building complex SaaS and
                fintech products in highly regulated, large-scale environments. Currently
                designing at <span className="text-glow-cyan">Capital One</span>, with a
                full-stack engineering background that anchors strong systems thinking and
                cross-functional collaboration.
              </p>
              <p>
                I get pulled to the scalable, data-informed end of design, balancing user
                and business needs without rounding off either one. Before Capital One I was
                at Berkeley Research Group, Oportun, and Demex.
              </p>
              <p>
                I live in D.C. with my wife{" "}
                <span className="text-glow-magenta">Rebecca</span> and our pup{" "}
                <span className="text-glow-magenta">Micah</span>. When I&apos;m not designing,
                I&apos;m on the smoker, in the kitchen, or out shooting on a Sony A7Rii.
              </p>
            </div>
          </section>

          <ResumeDisk />

          <section className="mb-14" aria-labelledby="stats-heading">
            <h2
              id="stats-heading"
              className="font-pixel text-[12px] tracking-widest text-glow-cyan mb-4"
            >
              <span aria-hidden="true">▌</span>STATS
            </h2>
            <div className="cartridge grid grid-cols-2 md:grid-cols-4 divide-x divide-ink-ghost">
              {STATS.map((s) => (
                <div key={s.label} className="p-4">
                  <div className="font-mono text-[10px] tracking-widest text-ink-mute uppercase">
                    {s.label}
                  </div>
                  <div className="font-display text-[28px] leading-none text-glow-amber mt-1">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14" aria-labelledby="guilds-heading">
            <h2
              id="guilds-heading"
              className="font-pixel text-[12px] tracking-widest text-glow-lime mb-4"
            >
              <span aria-hidden="true">▌</span>GUILDS
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {COMMUNITIES.map((c) => (
                <div key={c.name} className="cartridge p-4 space-y-2">
                  <div className="font-pixel text-[10px] tracking-widest text-glow-cyan">
                    {c.name}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-ink-mute">
                    {c.role}
                  </div>
                  <p className="font-mono text-[12.5px] text-ink-dim leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14" aria-labelledby="faves-heading">
            <h2
              id="faves-heading"
              className="font-pixel text-[12px] tracking-widest text-glow-magenta mb-4"
            >
              <span aria-hidden="true">▌</span>FAVES
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {FAVES.map((f) => (
                <div
                  key={f.name}
                  className="cartridge p-3 hover:shadow-neon-magenta transition-shadow"
                >
                  <div className="font-pixel text-[8px] tracking-widest text-ink-mute mb-2">
                    [{f.tag}]
                  </div>
                  <div className="font-display text-[20px] leading-none text-glow-cyan mb-1">
                    {f.name}
                  </div>
                  <div className="font-mono text-[11px] text-ink-dim leading-relaxed">{f.note}</div>
                </div>
              ))}
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
}
