"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LiveClock from "./LiveClock";
import ModeToggle from "./ModeToggle";
import SoundToggle from "./SoundToggle";
import ThemeToggle from "./ThemeToggle";
import { useMode } from "./ModeProvider";
import { useSound } from "./SoundProvider";
import { log } from "@/lib/log";

const NAV = [
  { no: "01", label: "WORK", href: "/home" },
  { no: "02", label: "JOURNEY", href: "/experience" },
  { no: "03", label: "ABOUT", href: "/about" },
  { no: "04", label: "LAB", href: "/lab" },
  { no: "05", label: "GUESTBOOK", href: "/guestbook" },
];

const SOCIALS = [
  { label: "Email", href: "mailto:mthomaswicher@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mthomaswicher" },
  { label: "GitHub", href: "https://github.com/Mthomaswicher" },
  { label: "Dribbble", href: "https://dribbble.com/mthomaswicher" },
  { label: "Instagram", href: "https://www.instagram.com/urban_voyager" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const latest = log[0];
  const { play } = useSound();
  const { mode } = useMode();
  const isBasic = mode === "basic";
  const firstNavLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Track viewport so we know whether the sidebar is currently off-canvas
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Close on Escape (Nielsen #3 - user control)
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock body scroll while the drawer is open on mobile so the page
  // behind doesn't scroll under the user's finger.
  useEffect(() => {
    if (!isMobile) return;
    const root = document.documentElement;
    if (open) root.setAttribute("data-scroll-locked", "true");
    else root.removeAttribute("data-scroll-locked");
    return () => root.removeAttribute("data-scroll-locked");
  }, [open, isMobile]);

  // Auto-close the drawer when transitioning to desktop so it doesn't
  // come back open on next mobile resize.
  useEffect(() => {
    if (!isMobile && open) setOpen(false);
  }, [isMobile, open]);

  // When the mobile drawer opens, move keyboard focus to the first nav
  // link so screen-reader and keyboard users land inside the drawer.
  useEffect(() => {
    if (isMobile && open) {
      const t = window.setTimeout(() => firstNavLinkRef.current?.focus(), 200);
      return () => window.clearTimeout(t);
    }
  }, [isMobile, open]);

  // Hidden from AT + tab order whenever it's off-canvas on mobile
  const offCanvas = isMobile && !open;

  return (
    <>
      <button
        type="button"
        className="md:hidden fixed top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-50 px-4 py-2.5 min-h-[44px] min-w-[44px] font-pixel text-[10px] tracking-widest text-glow-cyan border border-neon-cyan/70 bg-bg-deep/95 backdrop-blur-sm shadow-neon-cyan"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="primary-sidebar"
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? "× CLOSE" : "▦ MENU"}
      </button>

      {/* Backdrop on mobile when open */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-bg-void/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="primary-sidebar"
        aria-label="Site navigation"
        aria-hidden={offCanvas || undefined}
        // @ts-expect-error inert is valid HTML but TS lib types may lag on older versions
        inert={offCanvas ? "" : undefined}
        className={`${
          open ? "translate-x-0" : "-translate-x-[101%]"
        } md:translate-x-0 fixed md:sticky top-0 left-0 z-40 h-[100dvh] md:h-screen w-[min(85vw,300px)] md:w-[300px] flex-shrink-0 transition-transform duration-200 border-r border-ink-ghost bg-bg-deep/95 backdrop-blur-sm overflow-y-auto overscroll-contain`}
      >
        <div className="flex flex-col gap-6 p-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] min-h-[100dvh]">
          <Link
            href="/home"
            className="flex items-center gap-3 group"
            aria-label="Matthew Thomas-Wicher, go to home"
          >
            <div className={`relative w-12 h-12 ${isBasic ? "rounded-full" : "cartridge"} p-0.5 overflow-hidden`}>
              <Image
                src="/headshot.jpg"
                alt=""
                width={48}
                height={48}
                className={`object-cover w-full h-full ${isBasic ? "rounded-full" : ""}`}
                priority
              />
            </div>
            <div>
              {isBasic ? (
                <>
                  <div
                    className="text-[15px] leading-tight text-ink"
                    style={{ fontFamily: "var(--font-garamond)", fontWeight: 500 }}
                  >
                    Matthew Thomas-Wicher
                  </div>
                  <div className="font-mono text-[11px] text-ink-mute mt-0.5 leading-tight">
                    Sr. Product Designer
                  </div>
                </>
              ) : (
                <>
                  <div className="font-pixel text-[10px] tracking-widest text-glow-cyan leading-tight">
                    MTW
                  </div>
                  <div className="font-mono text-xs text-ink-dim mt-1 leading-tight">
                    Matthew Thomas-Wicher
                  </div>
                </>
              )}
            </div>
          </Link>

          <div className="dash-divider" aria-hidden="true" />

          <div className="space-y-2.5">
            {!isBasic && (
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                SR. PRODUCT DESIGNER
              </div>
            )}
            {isBasic ? (
              <p
                className="text-[14px] leading-relaxed text-ink-dim"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                I design data-informed software for highly regulated, large-scale
                environments. Currently shipping at Capital One; previously at
                Berkeley Research Group, Oportun, and Demex.
              </p>
            ) : (
              <>
                <p className="font-mono text-[13px] leading-relaxed text-ink-dim">
                  I design data-informed software for highly regulated, large-scale environments.
                  Currently shipping at <span className="text-glow-cyan">Capital One</span>.
                </p>
                <p className="font-mono text-[13px] leading-relaxed text-ink-dim">
                  Previously at Berkeley Research Group, Oportun, and Demex.
                </p>
              </>
            )}
          </div>

          <div className="dash-divider" aria-hidden="true" />

          <nav aria-labelledby="explore-heading">
            <div
              id="explore-heading"
              className="section-label mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute"
            >
              {isBasic ? "Menu" : "EXPLORE"}
            </div>
            <ul className="space-y-1 list-none p-0">
              {NAV.map((item, idx) => {
                const active =
                  pathname === item.href ||
                  (item.href === "/home" && pathname?.startsWith("/work"));
                const label = isBasic
                  ? item.label.charAt(0) + item.label.slice(1).toLowerCase()
                  : item.label;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      ref={idx === 0 ? firstNavLinkRef : undefined}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-baseline gap-2 px-2 min-h-[44px] py-2.5 md:py-1.5 md:min-h-0 -mx-2 hover:bg-bg-ridge/60 transition-colors ${
                        active ? "bg-bg-ridge/40" : ""
                      }`}
                      onMouseEnter={() => play("hover")}
                      onClick={() => {
                        play("select");
                        setOpen(false);
                      }}
                    >
                      {!isBasic && (
                        <span
                          className="font-mono text-[10px] text-ink-mute group-hover:text-neon-cyan"
                          aria-hidden="true"
                        >
                          {item.no}.
                        </span>
                      )}
                      {isBasic ? (
                        <span
                          className={`text-[15px] leading-tight ${
                            active ? "text-ink underline underline-offset-4" : "text-ink-dim group-hover:text-ink"
                          }`}
                          style={{ fontFamily: "var(--font-garamond)", fontWeight: 500 }}
                        >
                          {label}
                        </span>
                      ) : (
                        <span
                          className={`font-pixel text-[11px] tracking-widest ${
                            active ? "text-glow-magenta" : "text-ink group-hover:text-glow-cyan"
                          }`}
                        >
                          {item.label}
                        </span>
                      )}
                      <span
                        className="ml-auto font-mono text-[10px] text-ink-mute opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="dash-divider" aria-hidden="true" />

          <nav aria-labelledby="contact-heading">
            <div
              id="contact-heading"
              className="section-label font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute mb-2"
            >
              {isBasic ? "Contact" : "FIND ME AT"}
            </div>
            <ul className="font-mono text-[12px] text-ink-dim space-y-0.5 list-none p-0">
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-center min-h-[44px] py-2 md:min-h-0 md:py-0.5 hover:text-glow-cyan transition-colors"
                  >
                    <span aria-hidden="true">›</span> {s.label}
                    {s.href.startsWith("http") && (
                      <span className="sr-only"> (opens in new tab)</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="dash-divider" aria-hidden="true" />

          <div className="space-y-3">
            <div className="font-mono text-[11px] flex items-center gap-2">
              {!isBasic && (
                <span
                  className="inline-block w-2 h-2 rounded-full bg-neon-lime shadow-neon-lime animate-pulse"
                  aria-hidden="true"
                />
              )}
              <LiveClock />
            </div>
            {!isBasic && (
              <div
                className="font-mono text-[10px] text-ink-mute uppercase tracking-widest"
                aria-live="off"
              >
                All systems operational
              </div>
            )}
            <div className="pt-1 flex flex-wrap gap-2">
              <ModeToggle />
              {/* Theme + sound floats live in the corners on desktop;
                  surface them inline on mobile so the sidebar is the only
                  place needed to manage display preferences. */}
              <div className="md:hidden contents">
                <ThemeToggle variant="inline" />
                <SoundToggle variant="inline" />
              </div>
            </div>
          </div>

          <div className="dash-divider" aria-hidden="true" />

          <section aria-labelledby="latest-log-heading">
            <div
              id="latest-log-heading"
              className="section-label font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute mb-2"
            >
              {isBasic ? "Latest update" : "LATEST LOG"}
            </div>
            <time
              className="font-mono text-[11px] text-ink-mute block mb-1"
              dateTime={latest.date}
            >
              {new Date(latest.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <p
              className={`leading-relaxed text-ink-dim ${
                isBasic ? "text-[14px]" : "font-mono text-[12px]"
              }`}
              style={isBasic ? { fontFamily: "var(--font-garamond)" } : undefined}
            >
              {latest.body}
            </p>
          </section>

          <div className="mt-auto pt-6">
            <Link
              href="/?restart=1"
              className={`inline-flex items-center min-h-[44px] py-2 ${
                isBasic
                  ? "text-[13px] font-mono text-ink-mute hover:text-ink underline-offset-4 hover:underline"
                  : "font-pixel text-[9px] tracking-widest text-ink-mute hover:text-glow-magenta"
              }`}
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">↩&nbsp;</span>
              {isBasic ? "Restart intro" : "INSERT COIN"}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
