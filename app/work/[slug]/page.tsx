import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import HoloDisplay from "@/components/HoloDisplay";
import CaseStudyVideo from "@/components/CaseStudyVideo";
import DevNavHubBanner from "@/components/DevNavHubBanner";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import type { Block } from "@/lib/caseStudies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = getCaseStudy(params.slug);
  if (!c) return {};
  return {
    title: `${c.title} · MTW.ARCADE`,
    description: c.tagline,
  };
}

const ACCENT_TEXT = {
  cyan: "text-glow-cyan",
  magenta: "text-glow-magenta",
  lime: "text-glow-lime",
  amber: "text-glow-amber",
  rose: "text-glow-magenta",
} as const;

const STATUS_TEXT = {
  SHIPPED: "text-glow-lime",
  "IN PROGRESS": "text-glow-amber",
  WON: "text-glow-magenta",
  RESEARCH: "text-glow-cyan",
} as const;

function CaseStudyImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-2">
      <div className="cartridge p-1 bg-bg-deep">
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          sizes="(max-width: 768px) 100vw, 800px"
          className="w-full h-auto block"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 font-mono text-[11.5px] text-ink-mute uppercase tracking-widest">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function renderBlock(b: Block, key: number, accent: keyof typeof ACCENT_TEXT) {
  switch (b.kind) {
    case "p":
      return (
        <p
          key={key}
          className="font-mono text-[14.5px] leading-relaxed text-ink-dim"
        >
          {b.text}
        </p>
      );
    case "h":
      return (
        <h3
          key={key}
          className="font-pixel text-[12px] tracking-widest text-glow-cyan mt-6"
        >
          {b.text}
        </h3>
      );
    case "list":
      return (
        <ul key={key} className="space-y-2 list-none pl-0">
          {b.items.map((it, k) => (
            <li
              key={k}
              className="font-mono text-[14px] text-ink-dim leading-relaxed flex gap-3"
            >
              <span className="text-neon-cyan mt-0.5 shrink-0">▸</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "img":
      return (
        <CaseStudyImage key={key} src={b.src} alt={b.alt} caption={b.caption} />
      );
    case "imgGrid":
      return (
        <div
          key={key}
          className={`grid gap-3 my-2 ${
            b.items.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {b.items.map((it, k) => (
            <CaseStudyImage key={k} src={it.src} alt={it.alt} caption={it.caption} />
          ))}
        </div>
      );
    case "video":
      return (
        <CaseStudyVideo
          key={key}
          src={b.src}
          poster={b.poster}
          alt={b.alt}
          caption={b.caption}
        />
      );
    case "quote":
      return (
        <blockquote
          key={key}
          className="border-l-2 border-neon-cyan pl-4 my-3 font-display text-[24px] leading-tight text-glow-cyan"
        >
          &ldquo;{b.text}&rdquo;
          {b.speaker && (
            <cite className="block mt-2 font-mono text-[11px] not-italic text-ink-mute uppercase tracking-widest">
              {b.speaker}
            </cite>
          )}
        </blockquote>
      );
    case "features":
      return (
        <div key={key} className="grid gap-3 md:grid-cols-3 my-3">
          {b.items.map((it, k) => (
            <div key={k} className="cartridge p-4">
              <div
                className={`font-pixel text-[10px] tracking-widest mb-2 ${ACCENT_TEXT[accent]}`}
              >
                {it.title}
              </div>
              <p className="font-mono text-[12.5px] text-ink-dim leading-relaxed">
                {it.body}
              </p>
            </div>
          ))}
        </div>
      );
    case "callout": {
      const color =
        b.tone === "plus"
          ? "text-glow-lime"
          : b.tone === "minus"
            ? "text-glow-magenta"
            : "text-glow-cyan";
      const sigil = b.tone === "plus" ? "+" : b.tone === "minus" ? "−" : "▸";
      return (
        <div
          key={key}
          className="cartridge p-3 my-2 font-mono text-[13px] text-ink-dim flex gap-3"
        >
          <span className={`font-pixel text-[14px] ${color}`}>{sigil}</span>
          <span>{b.text}</span>
        </div>
      );
    }
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  return (
    <main id="main" className="min-h-screen">
      {study.slug === "idp-release-plugin" && <DevNavHubBanner />}

      <div className="mx-auto max-w-6xl px-6 md:px-10 py-10">
        <Link
          href="/home"
          className="font-pixel text-[10px] tracking-widest text-ink-mute hover:text-glow-cyan focus-visible:text-glow-cyan"
        >
          <span aria-hidden="true">← </span>BACK TO CABINET
        </Link>
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-[220px_1fr] gap-10">
        <aside className="md:sticky md:top-6 self-start" aria-labelledby="toc-heading">
          <h2
            id="toc-heading"
            className="font-pixel text-[10px] tracking-widest text-ink-mute mb-4"
          >
            CONTENTS
          </h2>
          <nav aria-label="Sections in this case study">
            <ul className="space-y-1 list-none p-0">
              {study.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block group font-mono text-[12px] text-ink-dim hover:text-glow-cyan focus-visible:text-glow-cyan py-1"
                  >
                    <span className="text-ink-mute mr-2" aria-hidden="true">
                      {s.no}.
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
              {study.results && (
                <li>
                  <a
                    href="#results"
                    className="block font-mono text-[12px] text-ink-dim hover:text-glow-magenta focus-visible:text-glow-magenta py-1"
                  >
                    <span className="text-ink-mute mr-2" aria-hidden="true">
                      ★
                    </span>
                    Results
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </aside>

        <article className="min-w-0">
          <header className="mb-12">
            <div className="flex flex-wrap items-baseline gap-3 mb-4">
              <span className={`font-pixel text-[10px] tracking-widest ${STATUS_TEXT[study.status]}`}>
                {study.status}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink-mute">
                {study.org}
              </span>
            </div>
            <h1
              className={`font-display text-[64px] md:text-[96px] leading-none mb-5 ${ACCENT_TEXT[study.accent]}`}
            >
              {study.title}
            </h1>
            <p className="font-mono text-[16px] md:text-[18px] leading-relaxed text-ink-dim max-w-2xl">
              {study.tagline}
            </p>

            <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 cartridge p-5">
              {[
                { label: "Role", value: study.role },
                { label: "Team", value: study.team },
                { label: "When", value: study.timeframe },
                { label: "Tools", value: study.tools },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-1">
                    {row.label}
                  </dt>
                  <dd className="font-mono text-[12.5px] text-ink-dim leading-snug">{row.value}</dd>
                </div>
              ))}
            </dl>

            {(study.heroScreens?.length || study.hero) && (
              <div className="mt-10">
                <div className="cartridge p-1 bg-bg-deep relative aspect-[16/9]">
                  <HoloDisplay
                    screens={study.heroScreens ?? (study.hero ? [study.hero] : [])}
                    alt={`${study.title} screens`}
                    accent={
                      study.accent === "rose"
                        ? "magenta"
                        : (study.accent as "cyan" | "magenta" | "lime" | "amber")
                    }
                    fit="cover"
                    showCounter
                    priority
                  />
                </div>
              </div>
            )}
          </header>

          {study.sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="mb-14 scroll-mt-10"
              aria-labelledby={`${s.id}-heading`}
            >
              <div
                className="font-pixel text-[10px] tracking-widest text-ink-mute mb-2"
                aria-hidden="true"
              >
                {s.no} ░ {s.title.toUpperCase()}
              </div>
              <h2
                id={`${s.id}-heading`}
                className={`font-display text-[36px] md:text-[44px] leading-none mb-5 ${ACCENT_TEXT[study.accent]}`}
              >
                {s.title}
              </h2>
              <div className="space-y-4 max-w-3xl">
                {s.body.map((b, i) => renderBlock(b, i, study.accent))}
              </div>
            </section>
          ))}

          {study.results && (
            <section id="results" className="mb-14 scroll-mt-10" aria-labelledby="results-heading">
              <div
                className="font-pixel text-[10px] tracking-widest text-ink-mute mb-2"
                aria-hidden="true"
              >
                ★ RESULTS
              </div>
              <h2
                id="results-heading"
                className="font-display text-[36px] md:text-[44px] leading-none mb-6 text-glow-amber"
              >
                High score.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {study.results.map((r) => (
                  <div key={r.label} className="cartridge p-5">
                    <div className="font-display text-[56px] leading-none text-glow-amber">
                      {r.stat}
                    </div>
                    <div className="font-mono text-[12.5px] text-ink-dim mt-2 leading-snug">
                      {r.label}
                    </div>
                    {r.sub && (
                      <div className="font-mono text-[10.5px] text-ink-mute uppercase tracking-widest mt-1">
                        {r.sub}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="dash-divider mt-12 mb-8" aria-hidden="true" />
          <Link
            href="/home"
            className="font-pixel text-[12px] tracking-widest text-ink hover:text-glow-cyan focus-visible:text-glow-cyan"
          >
            <span aria-hidden="true">← </span>MORE CARTRIDGES
          </Link>

          <Footer />
        </article>
      </div>
    </main>
  );
}
