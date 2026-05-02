import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { projects } from "@/lib/projects";

/**
 * Basic-mode home: a plain editorial portfolio. No arcade copy, no
 * cartridges, no neon. Same content (projects), neutral framing.
 */
export default function BasicHome() {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main id="main" className="flex-1 min-w-0">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 md:px-10 pt-20 md:pt-24 pb-16 md:pb-24">
          <header className="mb-14 md:mb-20">
            <div
              className="text-[11px] uppercase tracking-[0.18em] text-ink-mute mb-4 font-mono"
              aria-hidden="true"
            >
              Sr. Product Designer · Washington, D.C.
            </div>
            <h1
              className="text-[clamp(1.625rem,6vw,3.25rem)] leading-[1.05] text-ink mb-5 break-words"
              style={{ fontFamily: "var(--font-garamond)", fontWeight: 500 }}
            >
              Matthew Thomas-Wicher
            </h1>
            <p
              className="text-[clamp(1rem,2vw,1.25rem)] leading-[1.55] text-ink-dim max-w-2xl"
              style={{ fontFamily: "var(--font-garamond)" }}
            >
              I design data-informed software for highly regulated, large-scale
              environments. Currently shipping at Capital One; previously at
              Berkeley Research Group, Oportun, and Demex.
            </p>
          </header>

          <section aria-labelledby="work-heading" className="mb-16 md:mb-20">
            <div className="flex items-baseline justify-between mb-6 md:mb-8 border-b border-ink-ghost pb-3">
              <h2
                id="work-heading"
                className="text-[15px] sm:text-[16px] uppercase tracking-[0.18em] text-ink font-mono"
              >
                Selected Work
              </h2>
              <span className="text-[12px] text-ink-mute font-mono">
                {projects.length} projects
              </span>
            </div>

            <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
              {projects.map((p) => (
                <li key={p.no} className="m-0">
                  <BasicProjectCard project={p} />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="more-heading" className="mb-16 md:mb-20">
            <div className="flex items-baseline justify-between mb-6 border-b border-ink-ghost pb-3">
              <h2
                id="more-heading"
                className="text-[15px] sm:text-[16px] uppercase tracking-[0.18em] text-ink font-mono"
              >
                Elsewhere
              </h2>
            </div>
            <ul className="list-none p-0 m-0 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[14px] font-mono">
              {[
                { label: "About", href: "/about" },
                { label: "Experience", href: "/experience" },
                { label: "Lab", href: "/lab" },
                { label: "Guestbook", href: "/guestbook" },
              ].map((l) => (
                <li key={l.href} className="m-0">
                  <Link
                    href={l.href}
                    className="block py-2 text-ink hover:text-ink-mute underline-offset-4 hover:underline transition-colors"
                  >
                    {l.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="contact-heading">
            <div className="flex items-baseline justify-between mb-6 border-b border-ink-ghost pb-3">
              <h2
                id="contact-heading"
                className="text-[15px] sm:text-[16px] uppercase tracking-[0.18em] text-ink font-mono"
              >
                Contact
              </h2>
            </div>
            <ul className="list-none p-0 m-0 grid grid-cols-2 gap-y-2 text-[14px] font-mono text-ink">
              {[
                { label: "Email", href: "mailto:mthomaswicher@gmail.com", external: false },
                { label: "LinkedIn", href: "https://linkedin.com/in/mthomaswicher", external: true },
                { label: "GitHub", href: "https://github.com/Mthomaswicher", external: true },
                { label: "Dribbble", href: "https://dribbble.com/mthomaswicher", external: true },
              ].map((s) => (
                <li key={s.href} className="m-0">
                  <a
                    href={s.href}
                    target={s.external ? "_blank" : undefined}
                    rel={s.external ? "noreferrer" : undefined}
                    className="inline-block py-2 underline-offset-4 hover:underline hover:text-ink-mute transition-colors"
                  >
                    {s.label}
                    {s.external && <span className="sr-only"> (opens in new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <p className="mt-16 md:mt-20 text-[12px] text-ink-mute font-mono">
            © {new Date().getFullYear()} Matthew Thomas-Wicher · Built in
            Washington, D.C.
          </p>
        </div>
      </main>
    </div>
  );
}

function BasicProjectCard({ project: p }: { project: (typeof projects)[number] }) {
  const isExternal = !!p.external;
  const Wrapper: React.ElementType = isExternal ? "a" : Link;
  const wrapperProps = isExternal
    ? { href: p.href, target: "_blank", rel: "noreferrer" }
    : { href: p.href };
  return (
    <article>
      <Wrapper
        {...wrapperProps}
        className="block group focus:outline-none"
      >
        {p.hero && (
          <div className="relative aspect-[16/10] overflow-hidden border border-ink-ghost bg-bg-deep mb-3">
            <Image
              src={p.hero}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        )}
        <h3
          className="text-[18px] sm:text-[20px] leading-snug text-ink group-hover:underline underline-offset-4 mb-1"
          style={{ fontFamily: "var(--font-garamond)", fontWeight: 500 }}
        >
          {p.title}
        </h3>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2 text-[12px] font-mono">
          <span className="text-ink-mute">{p.org}</span>
          <span
            aria-hidden="true"
            className="hidden sm:inline text-ink-ghost"
          >
            ·
          </span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-ink-mute">
            {p.status}
          </span>
        </div>
        <p
          className="text-[15px] leading-relaxed text-ink-dim"
          style={{ fontFamily: "var(--font-garamond)" }}
        >
          {p.blurb}
        </p>
      </Wrapper>
    </article>
  );
}
