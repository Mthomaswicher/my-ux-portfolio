"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { BONUS_TRACK, CAREER_STAGES, type CareerStage } from "@/lib/career";

/**
 * Basic-mode experience: editorial timeline with scroll-driven interactivity.
 * Same data as the scenic Journey, but with quiet, paper-portfolio energy
 * instead of arcade flourish. Interactions are subtle and reading-focused —
 * a top progress bar, count-up stats, a rail that draws as you scroll, and
 * a sticky period indicator.
 */
export default function BasicExperience() {
  const reduce = useReducedMotion();

  // Most-recent-first reading order — readers usually want the current role
  // up top in a CV.
  const stages = CAREER_STAGES.slice().reverse();

  // Page-level scroll progress for the thin top bar.
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main id="main" className="flex-1 min-w-0 relative">
        {/* Top progress bar — anchored to the viewport, scales with scroll. */}
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 h-px bg-ink origin-left z-30"
          style={{ scaleX: reduce ? 1 : progressX }}
        />

        <div className="mx-auto max-w-3xl px-5 sm:px-6 md:px-10 pt-20 md:pt-24 pb-16 md:pb-24">
          <Hero stages={stages} />

          <Roles stages={stages} reduce={!!reduce} />


          <EducationSection />

          <nav
            aria-label="More"
            className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-mono text-ink"
          >
            <Link
              href="/home"
              className="py-2 underline-offset-4 hover:underline hover:text-ink-mute"
            >
              ← Selected work
            </Link>
            <Link
              href="/about"
              className="py-2 underline-offset-4 hover:underline hover:text-ink-mute"
            >
              About →
            </Link>
          </nav>

          <Footer />
        </div>
      </main>
    </div>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */

function Hero({ stages }: { stages: CareerStage[] }) {
  const reduce = useReducedMotion();
  const cities = new Set(stages.map((s) => s.location)).size;

  return (
    <header className="mb-16 md:mb-24">
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="text-[11px] uppercase tracking-[0.18em] text-ink-mute mb-4 font-mono"
        aria-hidden="true"
      >
        2014 — Today
      </motion.div>

      <motion.h1
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
        className="text-[clamp(2rem,6.5vw,3.25rem)] leading-[1.05] text-ink mb-5 break-words"
        style={{ fontFamily: "var(--font-garamond)", fontWeight: 500 }}
      >
        Nine years,{" "}
        <em className="not-italic text-ink-dim">three cities</em>, one
        thread.
      </motion.h1>

      <motion.p
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
        className="text-[clamp(1rem,2vw,1.2rem)] leading-[1.55] text-ink-dim max-w-2xl mb-10"
        style={{ fontFamily: "var(--font-garamond)" }}
      >
        Litigation taught me to read complex systems. Engineering taught me
        to build them. Product design is where those two habits finally met.
        Below is the long way I got here.
      </motion.p>

      <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md border-t border-ink-ghost pt-6">
        <Counter label="Years" value={9} />
        <Counter label="Cities" value={cities} />
        <Counter label="Roles" value={stages.length} />
      </div>
    </header>
  );
}

function Counter({ label, value }: { label: string; value: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const dur = 1100;
    const t0 = performance.now();
    let raf = 0;
    const step = () => {
      const t = Math.min(1, (performance.now() - t0) / dur);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <div ref={ref}>
      <div className="text-[11px] uppercase tracking-[0.18em] text-ink-mute font-mono">
        {label}
      </div>
      <div
        className="text-[clamp(2rem,5vw,3rem)] leading-none mt-1 text-ink tabular-nums"
        style={{ fontFamily: "var(--font-garamond)", fontWeight: 500 }}
      >
        {String(n).padStart(label === "Cities" ? 1 : 2, "0")}
      </div>
    </div>
  );
}

/* ─── Roles section with drawn rail ────────────────────────────────────── */

function Roles({
  stages,
  reduce,
}: {
  stages: CareerStage[];
  reduce: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 80%"],
  });
  // The rail is rendered as an absolutely positioned line; we scale its Y
  // axis as the user scrolls through the section.
  const railScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 180, damping: 32, mass: 0.5 },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="roles-heading"
      className="relative mb-16 md:mb-24"
    >
      <div className="flex items-baseline justify-between mb-8 border-b border-ink-ghost pb-3">
        <h2
          id="roles-heading"
          className="text-[15px] sm:text-[16px] uppercase tracking-[0.18em] text-ink font-mono"
        >
          Roles
        </h2>
        <span className="text-[12px] text-ink-mute font-mono">
          {stages.length} positions · most recent first
        </span>
      </div>

      <div className="relative pl-6">
        {/* Static rail (background): always there, very faint. */}
        <div
          aria-hidden="true"
          className="absolute left-2 top-2 bottom-2 w-px bg-ink-ghost"
        />
        {/* Drawn rail: scales as user scrolls through the section. */}
        <motion.div
          aria-hidden="true"
          className="absolute left-2 top-2 bottom-2 w-px bg-ink origin-top"
          style={{ scaleY: reduce ? 1 : railScale }}
        />

        <ol className="list-none p-0 m-0 space-y-14 sm:space-y-16">
          {stages.map((stage) => (
            <li key={stage.no} className="m-0 relative">
              <RoleEntry stage={stage} reduce={reduce} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function RoleEntry({
  stage,
  reduce,
}: {
  stage: CareerStage;
  reduce: boolean;
}) {
  return (
    <motion.article
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
      className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3 sm:gap-8"
    >
      {/* Dot on the rail. Positioned so its center sits on the rail line
          (8px from the timeline-section's left edge), regardless of the
          li's pl-6/pl-8 indent. */}
      <span
        aria-hidden="true"
        className="absolute top-2 w-[9px] h-[9px] -translate-x-1/2 rounded-full bg-bg-void border border-ink"
        style={{ left: "-16px", boxShadow: "0 0 0 2px rgb(var(--bg-void))" }}
      />

      <div className="text-[13px] font-mono text-ink-mute pt-1">
        {stage.period}
      </div>

      <div className="group">
        <h3
          className="text-[20px] sm:text-[22px] leading-snug text-ink relative inline-block"
          style={{ fontFamily: "var(--font-garamond)", fontWeight: 500 }}
        >
          {stage.role}
          {/* Underline that grows from the left on hover. */}
          <span
            aria-hidden="true"
            className="absolute left-0 bottom-0 h-px bg-ink scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
            style={{ width: "100%" }}
          />
        </h3>
        <div className="text-[13px] font-mono text-ink-dim mt-1">
          {stage.company} · {stage.location}
        </div>

        {stage.bullets.length > 0 && (
          <ul className="list-none p-0 mt-4 space-y-2">
            {stage.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.5,
                  delay: 0.08 + i * 0.06,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="text-[15px] leading-relaxed text-ink-dim relative pl-4"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.55em] w-2 h-px bg-ink-mute"
                />
                {b}
              </motion.li>
            ))}
          </ul>
        )}

        {stage.tools && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {stage.tools.split("·").map((t, i) => (
              <span
                key={i}
                className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-ink-mute border border-ink-ghost px-2 py-1 hover:border-ink-dim hover:text-ink transition-colors"
              >
                {t.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* ─── Education ────────────────────────────────────────────────────────── */

function EducationSection() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="education-heading" className="mb-16 md:mb-24">
      <div className="flex items-baseline justify-between mb-6 border-b border-ink-ghost pb-3">
        <h2
          id="education-heading"
          className="text-[15px] sm:text-[16px] uppercase tracking-[0.18em] text-ink font-mono"
        >
          Education & Recognition
        </h2>
      </div>
      <ul className="list-none p-0 m-0 space-y-7">
        {BONUS_TRACK.map((item, i) => (
          <motion.li
            key={`${item.year}-${item.title}`}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.55,
              delay: i * 0.06,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="m-0 grid grid-cols-[80px_1fr] gap-4 sm:gap-6 group"
          >
            <div className="text-[13px] font-mono text-ink-mute pt-1">
              {item.year}
            </div>
            <div>
              <div
                className="text-[17px] leading-snug text-ink relative inline-block"
                style={{ fontFamily: "var(--font-garamond)", fontWeight: 500 }}
              >
                {item.title}
                <span
                  aria-hidden="true"
                  className="absolute left-0 bottom-0 h-px w-full bg-ink scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                />
              </div>
              <div className="text-[12px] font-mono text-ink-mute mt-0.5">
                {item.org}
              </div>
              <p
                className="text-[14px] leading-relaxed text-ink-dim mt-2"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                {item.body}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
