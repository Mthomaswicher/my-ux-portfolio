"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import GuestbookCard from "./GuestbookCard";
import ModeText from "./ModeText";
import { getPublicClient, timeoutSignal, type GuestbookRow } from "@/lib/supabase";

type Stats = {
  total: number;
  colors: { magenta: number; cyan: number; lime: number; amber: number };
  latestAt: string | null;
};

const COLORS: Array<{ key: keyof Stats["colors"]; label: string; hex: string }> = [
  { key: "magenta", label: "MAGENTA", hex: "#ff2bd6" },
  { key: "cyan", label: "CYAN", hex: "#22d3ee" },
  { key: "lime", label: "LIME", hex: "#a3e635" },
  { key: "amber", label: "AMBER", hex: "#fbbf24" },
];

function emptyStats(): Stats {
  return {
    total: 0,
    colors: { magenta: 0, cyan: 0, lime: 0, amber: 0 },
    latestAt: null,
  };
}

function statsFromEntries(entries: GuestbookRow[]): Stats {
  const s = emptyStats();
  s.total = entries.length;
  for (const e of entries) {
    if (e.color in s.colors) s.colors[e.color] += 1;
  }
  s.latestAt = entries[0]?.created_at ?? null;
  return s;
}

function formatRelative(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso).getTime();
  const diff = Math.max(0, Date.now() - d);
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function GuestbookGallery() {
  const [entries, setEntries] = useState<GuestbookRow[]>([]);
  const [stats, setStats] = useState<Stats>(emptyStats());
  const [loading, setLoading] = useState(true);
  const [usingLocal, setUsingLocal] = useState(false);
  const [liveError, setLiveError] = useState(false);
  const [justSigned, setJustSigned] = useState(false);

  // Copy swaps so basic ("Reading Room") mode reads as a plain
  // guestbook instead of an arcade leaderboard. Rendered through <C>
  // (both variants ship, CSS picks) rather than branched in JS — see the
  // "Mode-gated content" note in globals.css for why.
  const copy = {
    savedTag: ["SAVED", "Saved"],
    savedBlurb: [
      "Your card is on the wall. Thanks for signing.",
      "Your entry is in the guestbook. Thanks for signing.",
    ],
    totalLabel: ["TOTAL SIGNS", "Total entries"],
    latestLabel: ["LAST SIGN-IN", "Latest entry"],
    colorsLabel: ["COLOR PICKS", "Pen colors"],
    entriesHeading: ["ENTRIES", "Entries"],
    addYours: ["+ ADD YOURS", "Add yours \u2192"],
    emptyHeader: ["\u2591 NO HIGH SCORES YET \u2591", null],
    emptyBlurb: [
      "No one has signed the wall yet. Be the first.",
      "No entries yet. Be the first.",
    ],
    signCta: ["[ SIGN IN ]", "Sign guestbook \u2192"],
    loading: ["LOADING\u2026", "Loading\u2026"],
  } as const;

  function C({ k }: { k: keyof typeof copy }) {
    return <ModeText scenic={copy[k][0]} basic={copy[k][1]} />;
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("welcome") === "1") {
      setJustSigned(true);
      // Clean the URL so a refresh doesn't re-show the banner
      const url = new URL(window.location.href);
      url.searchParams.delete("welcome");
      url.searchParams.delete("local");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const client = getPublicClient();
      if (!client) {
        const local = JSON.parse(
          localStorage.getItem("mtw.guestbook") || "[]",
        ) as GuestbookRow[];
        if (!cancelled) {
          setEntries(local);
          setStats(statsFromEntries(local));
          setUsingLocal(true);
          setLoading(false);
        }
        return;
      }
      try {
        const { data, error } = await client
          .from("guestbook_entries")
          .select(
            "id, tag, name, color, signature_png, card_number, created_at",
          )
          .order("created_at", { ascending: false })
          .limit(120)
          .abortSignal(timeoutSignal());
        if (cancelled) return;
        if (error) throw error;
        const list = (data ?? []) as GuestbookRow[];
        setEntries(list);
        setStats(statsFromEntries(list));
        setUsingLocal(false);
      } catch {
        if (cancelled) return;
        const local = JSON.parse(
          localStorage.getItem("mtw.guestbook") || "[]",
        ) as GuestbookRow[];
        setEntries(local);
        setStats(statsFromEntries(local));
        setUsingLocal(true);
        setLiveError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {justSigned && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 cartridge p-4 font-mono text-[13px] text-ink"
        >
          <span className="text-glow-lime mr-2" aria-hidden="true">
            ✓
          </span>
          <span
            className="gb-saved-tag text-glow-lime font-pixel text-[11px] tracking-widest mr-3"
          >
            <C k="savedTag" />
          </span>
          <C k="savedBlurb" />
        </div>
      )}

      <section className="mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 cartridge p-1">
          <div className="p-3 sm:p-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
              <C k="totalLabel" />
            </div>
            <div className="gb-stat-num font-display text-[32px] sm:text-[40px] leading-none text-glow-amber mt-1">
              <ModeText
                scenic={stats.total.toString().padStart(4, "0")}
                basic={stats.total.toLocaleString()}
              />
            </div>
          </div>
          <div className="p-3 sm:p-4 border-l border-ink-ghost">
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
              <C k="latestLabel" />
            </div>
            <div
              className="gb-stat-latest font-display text-[24px] sm:text-[28px] leading-none text-glow-cyan mt-1 break-words"
            >
              {formatRelative(stats.latestAt)}
            </div>
          </div>
          <div className="p-3 sm:p-4 border-t md:border-t-0 md:border-l border-ink-ghost col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-2">
              <C k="colorsLabel" />
            </div>
            <ul className="space-y-1.5">
              {COLORS.map((c) => {
                const n = stats.colors[c.key];
                const pct = stats.total ? Math.round((n / stats.total) * 100) : 0;
                return (
                  <li
                    key={c.key}
                    className="flex items-center gap-2 sm:gap-3 font-mono text-[11px] text-ink-dim"
                  >
                    <span
                      className="inline-block w-2.5 h-2.5 shrink-0"
                      style={{ background: c.hex, boxShadow: `0 0 6px ${c.hex}` }}
                    />
                    <span className="w-14 sm:w-16 tracking-widest shrink-0">{c.label}</span>
                    <span className="flex-1 bg-bg-deep h-1.5 overflow-hidden">
                      <span
                        className="block h-full"
                        style={{ width: `${pct}%`, background: c.hex }}
                      />
                    </span>
                    <span className="w-12 sm:w-14 text-right tabular-nums text-ink-mute shrink-0">
                      {pct}% ({n})
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {usingLocal && (
          <div
            className="mt-3 font-mono text-[11px] text-ink-mute"
            role="status"
            aria-live="polite"
          >
            {liveError ? (
              <>
                <span aria-hidden="true">⚠ </span>
                Couldn&apos;t reach the live wall. Showing your locally-saved
                entries instead.
              </>
            ) : (
              <>
                <span aria-hidden="true">⚠ </span>
                Supabase not configured, viewing your local entries only.
                <Link href="/" className="ml-2 text-glow-magenta hover:underline">
                  See setup
                </Link>
              </>
            )}
          </div>
        )}
      </section>

      <div className="flex items-center justify-between mb-4">
        <h2
          className="gb-entries-heading font-pixel text-[12px] tracking-widest text-glow-magenta"
        >
          <ModeText scenic={<span aria-hidden="true">▌</span>} basic={null} />
          <C k="entriesHeading" />
        </h2>
        <Link
          href="/sign"
          className="gb-add-yours font-pixel text-[10px] tracking-widest text-glow-cyan hover:underline focus-visible:underline"
        >
          <C k="addYours" />
        </Link>
      </div>

      <div role="status" aria-live="polite" className="sr-only">
        {loading
          ? "Loading guestbook entries"
          : `${entries.length} ${entries.length === 1 ? "entry" : "entries"} loaded`}
      </div>

      {loading ? (
        <div className="font-mono text-[12px] text-ink-mute" aria-hidden="true">
          <C k="loading" />
        </div>
      ) : entries.length === 0 ? (
        <div className="cartridge p-8 text-center">
          <ModeText
            scenic={
              <div
                className="font-pixel text-[12px] tracking-widest text-glow-amber mb-3"
                aria-hidden="true"
              >
                {copy.emptyHeader[0]}
              </div>
            }
            basic={null}
          />
          <div
            className="gb-empty-blurb font-mono text-[14px] text-ink-dim mb-5"
          >
            <C k="emptyBlurb" />
          </div>
          <Link
            href="/sign"
            className="gb-sign-cta cartridge px-4 py-2 font-pixel text-[10px] tracking-widest text-glow-cyan inline-block hover:shadow-neon-cyan transition-shadow"
          >
            <C k="signCta" />
          </Link>
        </div>
      ) : (
        <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance] list-none p-0">
          {entries.map((e) => (
            <li key={e.id}>
              <GuestbookCard entry={e} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
