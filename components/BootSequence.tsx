"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PathChooser from "./PathChooser";
import { useMode } from "./ModeProvider";
import { useSound } from "./SoundProvider";
import { projects } from "@/lib/projects";

const LINES = [
  "MTW BIOS v0.1 · © 2026 mthomaswicher",
  "MEM TEST .... 65,536K OK",
  "DETECTING DESIGN SYSTEMS .... [OK]",
  "MOUNTING /portfolio .... [OK]",
  `LOADING CARTRIDGES .... ${projects.length} FOUND`,
  "NETWORK STATUS: ONLINE",
  "READY.",
];

// Module-level flag: flips to false after the first time BootSequence mounts
// in this JS environment. Survives client-side navigation, resets on full
// document reload (because the JS bundle reloads with the new document).
let isFirstBootMount = true;

export default function BootSequence() {
  // Start with one line shown so first paint isn't blank
  const [shown, setShown] = useState(1);
  const [done, setDone] = useState(false);
  const { play } = useSound();
  const { reset } = useMode();
  const router = useRouter();
  const searchParams = useSearchParams();
  const restart = searchParams?.get("restart") === "1";

  // Intro routing rules:
  // 1. Fresh external arrival at / (typed URL, link from another site, or a
  //    reload) — always show the intro, even for returning visitors.
  // 2. Internal client-side nav to / from elsewhere in the app (Footer's
  //    "INSERT COIN" link from /home, etc.) — skip the intro and go to /home.
  // 3. Already saw the intro this document session and bouncing back to / —
  //    skip the intro.
  //
  // Detection:
  // - performance.getEntriesByType("navigation")[0].name reflects the URL
  //   the document was originally loaded at. It does NOT update on
  //   client-side navigation, so it lets us distinguish "we loaded fresh
  //   at /" from "we loaded fresh elsewhere and client-navved to /".
  // - sessionStorage["mtw.intro.completed"], set by PathChooser the moment
  //   it pushes to the destination, marks "intro is done for this tab".
  //   We clear it on the *first* BootSequence mount of the JS environment
  //   if the navigation type is reload/navigate, so reloads restart the
  //   intro instead of being treated as bounce-backs.
  useEffect(() => {
    if (restart) {
      reset();
      return;
    }

    const navEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const initialPath = navEntry
      ? new URL(navEntry.name).pathname
      : window.location.pathname;
    const arrivedFreshAtRoot =
      initialPath === "/" || initialPath === "" || initialPath === "/index.html";

    // Only on the first BootSequence mount of this JS environment do we
    // treat reload/navigate as "fresh" and clear the intro-completed flag.
    // Subsequent client-side nav re-mounts MUST keep the flag intact so
    // the user isn't shown the intro twice in the same tab.
    if (isFirstBootMount) {
      isFirstBootMount = false;
      const navType = navEntry?.type;
      if (navType === "reload" || navType === "navigate") {
        try {
          sessionStorage.removeItem("mtw.intro.completed");
        } catch {
          /* ignore */
        }
      }
    }

    if (!arrivedFreshAtRoot) {
      router.replace("/home");
      return;
    }

    let introCompleted = false;
    try {
      introCompleted = sessionStorage.getItem("mtw.intro.completed") === "1";
    } catch {
      /* ignore */
    }
    if (introCompleted) {
      router.replace("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shown >= LINES.length) {
      const t = window.setTimeout(() => setDone(true), 220);
      return () => window.clearTimeout(t);
    }
    // Each new boot line gets a tiny blip. feels like a real BIOS
    play("pop");
    const id = window.setTimeout(() => setShown((s) => s + 1), 240);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  return (
    <main id="main" className="min-h-[100dvh] flex items-center justify-center px-5 sm:px-6 py-10 sm:py-12">
      <div className="w-full max-w-2xl">
        <div
          className="font-mono text-[13px] leading-relaxed text-ink-dim space-y-1 mb-10"
          role="log"
          aria-live="polite"
          aria-atomic="false"
        >
          {LINES.slice(0, shown).map((line, i) => (
            <div key={i} className="opacity-90">
              <span className="text-ink-mute" aria-hidden="true">
                {">"}{" "}
              </span>
              {line}
            </div>
          ))}
          {shown < LINES.length && (
            <div className="opacity-90" aria-hidden="true">
              <span className="text-ink-mute">{">"} </span>
              <span className="caret" />
            </div>
          )}
        </div>

        <div
          className={`transition-opacity duration-700 mb-10 ${
            done ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!done}
          // @ts-expect-error inert is valid HTML; TS lib types may lag
          inert={!done ? "" : undefined}
        >
          <h1
            className="font-pixel text-[20px] sm:text-[28px] leading-tight tracking-widest text-glow-cyan mb-2"
          >
            MTW.ARCADE
          </h1>
          <div
            className="font-pixel text-[10px] sm:text-[12px] tracking-widest text-glow-magenta"
            aria-hidden="true"
          >
            ░ A PORTFOLIO BY MATTHEW THOMAS-WICHER ░
          </div>
          <div className="sr-only">A portfolio by Matthew Thomas-Wicher.</div>
        </div>

        <PathChooser active={done} destination="/home" />
      </div>
    </main>
  );
}
