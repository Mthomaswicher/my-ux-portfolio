import type { GuestbookRow } from "@/lib/supabase";

const COLOR_CLASSES: Record<GuestbookRow["color"], { glow: string; hex: string }> = {
  magenta: { glow: "text-glow-magenta", hex: "#ff2bd6" },
  cyan: { glow: "text-glow-cyan", hex: "#22d3ee" },
  lime: { glow: "text-glow-lime", hex: "#a3e635" },
  amber: { glow: "text-glow-amber", hex: "#fbbf24" },
};

export default function GuestbookCard({ entry }: { entry: GuestbookRow }) {
  const c = COLOR_CLASSES[entry.color] ?? COLOR_CLASSES.cyan;
  const date = new Date(entry.created_at);
  const stamp = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });

  return (
    <article
      className="cartridge p-3 break-inside-avoid mb-4"
      style={{ ["--accent" as any]: c.hex }}
    >
      <header className="flex items-center justify-between mb-2">
        <span className={`font-pixel text-[14px] tracking-widest ${c.glow}`}>{entry.tag}</span>
        <span className="font-mono text-[10px] text-ink-mute uppercase tracking-widest">
          NO. {String(entry.card_number).padStart(4, "0")}
        </span>
      </header>

      <div className="bg-bg-void border border-ink-ghost mb-2 aspect-[600/360]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={entry.signature_png}
          alt={`Signature drawn by ${entry.name || "anonymous visitor"}, tag ${entry.tag}`}
          width={600}
          height={360}
          loading="lazy"
          decoding="async"
          className="w-full h-full block pixel-render"
        />
      </div>

      <footer className="flex items-baseline justify-between font-mono text-[10.5px] text-ink-dim">
        <span className="truncate">{entry.name || "anonymous"}</span>
        <span className="text-ink-mute uppercase tracking-widest">{stamp}</span>
      </footer>
    </article>
  );
}
