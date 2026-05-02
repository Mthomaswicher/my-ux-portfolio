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
    body: "Military spouse advocate. Supporting veteran and military family associates across 15 local chapters.",
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

const REVIEWS: Array<{
  name: string;
  role: string;
  org: string;
  relationship: string;
  quote: string;
}> = [
  {
    name: "Allison Phillips",
    role: "Lead Software Engineer",
    org: "BRG",
    relationship: "Engineering lead on a product Matt designed",
    quote: `I watched Matthew grow a lot as a designer in the year+ he was the lead designer on one of the products I led engineering for. When I initially took over the team, there was friction (at least from the engineers toward the designers) that was rooted in process gaps, misunderstandings, and the engineers not having the tools they needed to be successful (or not knowing how to ask for them… or not knowing what to ask for).

In seeking to bridge the gap between our teams, I gave the designers a lot of critical feedback pushing for what we needed to improve our process and create successful products as a broader cohesive team. Matthew truly took that feedback and consistently ran with it. He structured his designs in a logical, ordered way that made them a sustainable, living reference for ongoing development. He configured a style library and connected it to reusable components in his designs; this kept changes to overlapping variants of designs in sync and allowed us to codify which style patterns were reused across different components. He uploaded and organized assets in such a way that we could refer back to them and download other variants as needed. He refactored his work to standardize the aspect ratios for images to make rendering variants consistent across different views. He versioned his designs, so I had receipts to push back on my engineers and say 'the design has not changed since before this ticket was created' when they insisted their work didn't match the design because the designer must have made changes while they were mid-development. At least once a month I would come across some technical refinement he'd done to improve the integration of his designs with our design tools that made my life easier, like connecting reusable things together under a single name (which helps us build better, cleaner components much faster), experimenting with additional features of our design tools, and polishing the overall design management of his product.

The effort Matthew put into growing and expanding his skills better equipped my team to deliver higher-quality front-end implementations in less time, and enabled me to hold them accountable for not following the designs. I really appreciate and respect his commitment to growth and maximizing the utility of integrated design tools, and I hold his work up as an example of the kind of design support that fosters successful partnerships between engineering and design teams.`,
  },
  {
    name: "Kate Peksa",
    role: "Product Design Manager",
    org: "BRG",
    relationship: "Design manager at BRG",
    quote: `Matt was a valuable member of the BRG Design Team, bringing his skills and enthusiasm as a UI/UX designer. He contributed to multiple products and collaborated effectively with colleagues to drive key initiatives forward. Always professional and supportive, he provided thoughtful feedback and maintained a positive attitude.

Matt had a keen eye for creating intuitive, engaging designs that enhanced the user experience. He clearly communicated design decisions to align the team on UX goals and was highly proficient in tools like Figma and Zeplin. His work on design systems helped maintain consistency across products.

Matt's positivity and willingness to collaborate made him a pleasure to work with. I appreciate his impact on the team and wish him all the best in his future endeavors.`,
  },
  {
    name: "Stephen Bennett",
    role: "Chief Product Officer",
    org: "The Demex Group",
    relationship: "CPO at The Demex Group",
    quote: `Matt and I worked together at The Demex Group. Matt's optimism and positive attitude are infectious. He approaches each project and each task with a sense of unbounded ability. He also works well under ambiguity and in situations where the requirements for a project are not well defined and he works well in situations where he is not receiving day-to-day direction at the task level.

Matt is simply a joy to work with and a great addition to any team looking to level up on both capabilities and attitude.`,
  },
  {
    name: "Luke Fillipos",
    role: "Product Manager",
    org: "The Demex Group",
    relationship: "PM on the Demex Climate Center",
    quote: `I worked directly with Matt during my tenure at The Demex Group, on the Demex Climate Center project, which was instrumental in helping Demex secure its Series A round of funding. Matt's excellent work ethic was only matched by his aptitude for fast learning and picking up new skills quickly. I was very fortunate to have him on my team, as we developed a strong working relationship and together were able to navigate the rollercoaster that is product development within a startup.`,
  },
  {
    name: "Emiola Taiwo",
    role: "Founder",
    org: "N-vest Partners",
    relationship: "Hired Matt as a design consultant",
    quote: `I had the opportunity to hire Matt as a consultant, as I needed a quality designer to complete my design needs for the N-Vest Africa platform. From the first conversation, I could tell that he is bright, eager to learn and willing to take on any challenges thrown at him. He is an asset to any team that he joins.`,
  },
  {
    name: "Kaushik Andra",
    role: "Founder",
    org: "Client project, Flatiron School",
    relationship: "Client on a Flatiron School research project",
    quote: `Matt is one of the first people I would call if I was trying to launch a new product and I needed a deep understanding of my users and how to design a digital product for them.

Matt was part of a team of UX researchers that helped me conduct user research on a new product I was testing out. He asked great questions to clarify the problem statement, provided out-of-the-box thinking on tough design problems, and communicated his thinking in a very clear way to someone without knowledge of UX/UI terminology.

I'm looking forward to working with Matt on a future project! He would be a great asset to any UX/UI team.`,
  },
];

export default function About() {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main id="main" className="flex-1 min-w-0">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 md:px-10 pt-20 md:pt-16 pb-12 md:pb-16">
          <div
            className="font-pixel text-[10px] tracking-widest text-ink-mute mb-3"
            aria-hidden="true"
          >
            ░ PLAYER PROFILE ░
          </div>
          <h1 className="font-display text-[clamp(1.75rem,8vw,2.5rem)] sm:text-[56px] md:text-[80px] leading-[1.05] sm:leading-none text-glow-magenta mb-8">
            Player 1: Matt
            <span className="caret" aria-hidden="true" />
          </h1>

          <section className="grid lg:grid-cols-[200px_1fr] gap-6 sm:gap-8 mb-14">
            <div className="cartridge p-1 w-[160px] sm:w-[200px] self-start">
              <Image
                src="/about-photo.jpg"
                alt="Matthew Thomas-Wicher portrait"
                width={400}
                height={533}
                sizes="(max-width: 640px) 160px, 200px"
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
            <div className="cartridge grid grid-cols-2 lg:grid-cols-4 border-ink-ghost">
              {STATS.map((s, i) => {
                const mobileLeft = i % 2 === 1 ? "border-l" : "";
                const mobileTop = i >= 2 ? "border-t" : "";
                const desktopLeft = i >= 1 ? "md:border-l" : "";
                const desktopTop = "md:border-t-0";
                return (
                  <div
                    key={s.label}
                    className={`p-4 border-ink-ghost ${mobileLeft} ${mobileTop} ${desktopLeft} ${desktopTop}`}
                  >
                    <div className="font-mono text-[10px] tracking-widest text-ink-mute uppercase">
                      {s.label}
                    </div>
                    <div className="font-display text-[22px] sm:text-[28px] leading-tight text-glow-amber mt-1 break-words">
                      {s.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mb-14" aria-labelledby="guilds-heading">
            <h2
              id="guilds-heading"
              className="font-pixel text-[12px] tracking-widest text-glow-lime mb-4"
            >
              <span aria-hidden="true">▌</span>GUILDS
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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

          <section className="mb-14" aria-labelledby="press-heading">
            <h2
              id="press-heading"
              className="font-pixel text-[12px] tracking-widest text-glow-cyan mb-4"
            >
              <span aria-hidden="true">▌</span>PRESS
            </h2>
            <a
              href="https://flatironschool.com/blog/matthew-thomas-wicher-law-to-design/"
              target="_blank"
              rel="noopener noreferrer"
              className="cartridge block p-6 sm:p-7 group hover:shadow-neon-cyan transition-shadow"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                <span className="font-pixel text-[10px] tracking-widest text-glow-magenta">
                  Flatiron School Blog
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-widest text-ink-mute"
                  aria-hidden="true"
                >
                  ░
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-ink-mute">
                  March 29, 2023
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-widest text-ink-mute"
                  aria-hidden="true"
                >
                  ░
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-glow-amber">
                  Alumni Feature
                </span>
              </div>
              <h3 className="font-display text-[clamp(1.5rem,4.5vw,2rem)] leading-tight text-glow-cyan mb-3 group-hover:text-glow-magenta transition-colors">
                Matthew Thomas-Wicher: Law to Design
              </h3>
              <p className="font-mono text-[13px] text-ink-dim leading-relaxed mb-5 max-w-2xl">
                A career switcher shares his journey from five years in corporate
                law to becoming a UX/UI Product Designer, the path through
                Flatiron's full-time UX program, and why he never looked back.
              </p>
              <blockquote className="font-mono text-[13px] italic text-ink-dim border-l-2 border-neon-cyan/60 pl-4 py-1 mb-5 max-w-2xl">
                &ldquo;I absolutely love it! It definitely matches up to the
                dream, and I am so happy I made the switch.&rdquo;
              </blockquote>
              <span className="inline-flex items-center gap-2 font-pixel text-[11px] tracking-widest text-glow-cyan">
                READ THE FEATURE
                <span aria-hidden="true">→</span>
              </span>
            </a>
          </section>

          <section className="mb-14" aria-labelledby="reviews-heading">
            <h2
              id="reviews-heading"
              className="font-pixel text-[12px] tracking-widest text-glow-amber mb-4"
            >
              <span aria-hidden="true">▌</span>FAN MAIL
            </h2>
            <div className="font-mono text-[11.5px] text-ink-mute mb-4 leading-relaxed">
              Verbatim from{" "}
              <a
                href="https://www.linkedin.com/in/mthomaswicher"
                target="_blank"
                rel="noopener noreferrer"
                className="text-glow-cyan underline-offset-2 hover:underline"
              >
                LinkedIn recommendations
              </a>
              .
            </div>
            <div className="columns-1 md:columns-2 gap-4 [column-fill:_balance]">
              {REVIEWS.map((r) => (
                <figure
                  key={r.name}
                  className="cartridge p-5 mb-4 break-inside-avoid"
                >
                  <div
                    className="font-display text-glow-amber text-[28px] leading-none mb-2"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>
                  <blockquote className="font-mono text-[13px] leading-relaxed text-ink-dim space-y-3">
                    {r.quote.split(/\n\n+/).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </blockquote>
                  <figcaption className="mt-4 pt-3 border-t border-ink-mute/20">
                    <div className="font-pixel text-[10px] tracking-widest text-glow-cyan">
                      {r.name}
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-ink-mute mt-1">
                      {r.role} · {r.org}
                    </div>
                    <div className="font-mono text-[11px] text-ink-dim mt-1">
                      {r.relationship}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
}
