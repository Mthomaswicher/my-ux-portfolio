"use client";

import { useState } from "react";

/**
 * Interactive demo of the 3-tier token architecture used in the RT (Roundtable)
 * design library at Berkeley Research Group. Tiers:
 *
 *   1. Primitives — raw, brand-agnostic values (blue.700, gray.50)
 *   2. Semantic   — purpose-bound aliases (action.primary, surface.canvas)
 *   3. Component  — slot-specific bindings (button.primary.bg, card.bg)
 *
 * Hover any tier and the cascade lights up across all three so the path is
 * visible. Click to pin. The component samples below re-render against a
 * pinned palette so you can see the system in motion.
 */

const PRIMITIVES = [
  { name: "blue.700", value: "#0E2A5A" },
  { name: "blue.500", value: "#1B449A" },
  { name: "blue.300", value: "#5C7BC2" },
  { name: "blue.50",  value: "#E6ECF7" },
  { name: "gray.900", value: "#1A1A22" },
  { name: "gray.700", value: "#3D3D49" },
  { name: "gray.300", value: "#C2C2CC" },
  { name: "gray.50",  value: "#F5F5F2" },
  { name: "coral.500", value: "#E66B5C" },
] as const;

type PrimitiveName = (typeof PRIMITIVES)[number]["name"];

const SEMANTIC: Array<{
  name: string;
  primitive: PrimitiveName;
  use: string;
}> = [
  { name: "action.primary",     primitive: "blue.500", use: "Primary CTA · links" },
  { name: "action.primaryHover",primitive: "blue.700", use: "CTA hover state" },
  { name: "surface.canvas",     primitive: "gray.50",  use: "Page background" },
  { name: "surface.raised",     primitive: "blue.50",  use: "Card · panel" },
  { name: "text.primary",       primitive: "gray.900", use: "Body copy" },
  { name: "text.secondary",     primitive: "gray.700", use: "Captions · meta" },
  { name: "border.default",     primitive: "gray.300", use: "Dividers · inputs" },
  { name: "status.alert",       primitive: "coral.500",use: "Errors · alerts" },
];

type SemanticName = (typeof SEMANTIC)[number]["name"];

const COMPONENT_TOKENS: Array<{
  name: string;
  semantic: SemanticName;
  slot: string;
}> = [
  { name: "button.primary.bg",        semantic: "action.primary",      slot: "Primary button fill" },
  { name: "button.primary.bgHover",   semantic: "action.primaryHover", slot: "Primary button hover" },
  { name: "card.bg",                  semantic: "surface.raised",      slot: "Card surface" },
  { name: "card.borderColor",         semantic: "border.default",      slot: "Card border" },
  { name: "input.borderColor",        semantic: "border.default",      slot: "Form input border" },
  { name: "chip.label.color",         semantic: "text.secondary",      slot: "Chip text" },
  { name: "alert.banner.bg",          semantic: "status.alert",        slot: "Alert banner" },
];

export default function RtLibraryShowcase() {
  // Hovered/pinned can be a primitive or semantic name; we light up the chain.
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const focus = pinned ?? hovered;

  // For a given token, decide if it's lit up by the focus cascade.
  function isLit(level: "primitive" | "semantic" | "component", name: string) {
    if (!focus) return false;
    if (focus === name) return true;
    if (level === "primitive") {
      // Lit if any focused semantic uses me, OR a component → semantic → me.
      const sem = SEMANTIC.find((s) => s.name === focus);
      if (sem) return sem.primitive === name;
      const comp = COMPONENT_TOKENS.find((c) => c.name === focus);
      if (comp) {
        const s = SEMANTIC.find((s) => s.name === comp.semantic);
        return s?.primitive === name;
      }
    }
    if (level === "semantic") {
      // Lit if focused primitive feeds me, OR focused component points at me.
      if (PRIMITIVES.find((p) => p.name === focus)) {
        const sem = SEMANTIC.find((s) => s.name === name);
        return sem?.primitive === focus;
      }
      const comp = COMPONENT_TOKENS.find((c) => c.name === focus);
      if (comp) return comp.semantic === name;
    }
    if (level === "component") {
      // Lit if I trace back through semantic to focused primitive, or my
      // semantic IS the focus.
      const me = COMPONENT_TOKENS.find((c) => c.name === name);
      if (!me) return false;
      if (me.semantic === focus) return true;
      const sem = SEMANTIC.find((s) => s.name === me.semantic);
      return sem?.primitive === focus;
    }
    return false;
  }

  function valueFor(level: "semantic" | "component", name: string) {
    if (level === "semantic") {
      const sem = SEMANTIC.find((s) => s.name === name);
      return PRIMITIVES.find((p) => p.name === sem?.primitive)?.value;
    }
    const comp = COMPONENT_TOKENS.find((c) => c.name === name);
    const sem = SEMANTIC.find((s) => s.name === comp?.semantic);
    return PRIMITIVES.find((p) => p.name === sem?.primitive)?.value;
  }

  return (
    <div className="space-y-12">
      {/* ─── Tier diagram ─── */}
      <div className="grid gap-4 md:grid-cols-3">
        <Tier
          number="01"
          label="Primitives"
          subtitle="Raw brand values"
          accent="#22d3ee"
        >
          <ul className="list-none p-0 m-0 space-y-1">
            {PRIMITIVES.map((p) => (
              <TokenRow
                key={p.name}
                name={p.name}
                value={p.value}
                lit={isLit("primitive", p.name)}
                isFocus={focus === p.name}
                swatch={p.value}
                onHover={() => setHovered(p.name)}
                onLeave={() => setHovered(null)}
                onPin={() => setPinned(pinned === p.name ? null : p.name)}
              />
            ))}
          </ul>
        </Tier>

        <Tier
          number="02"
          label="Semantic"
          subtitle="Purpose-bound aliases"
          accent="#ff2bd6"
        >
          <ul className="list-none p-0 m-0 space-y-1">
            {SEMANTIC.map((s) => (
              <TokenRow
                key={s.name}
                name={s.name}
                value={s.use}
                lit={isLit("semantic", s.name)}
                isFocus={focus === s.name}
                swatch={valueFor("semantic", s.name) ?? "#000"}
                onHover={() => setHovered(s.name)}
                onLeave={() => setHovered(null)}
                onPin={() => setPinned(pinned === s.name ? null : s.name)}
              />
            ))}
          </ul>
        </Tier>

        <Tier
          number="03"
          label="Component"
          subtitle="Slot-specific bindings"
          accent="#a3e635"
        >
          <ul className="list-none p-0 m-0 space-y-1">
            {COMPONENT_TOKENS.map((c) => (
              <TokenRow
                key={c.name}
                name={c.name}
                value={c.slot}
                lit={isLit("component", c.name)}
                isFocus={focus === c.name}
                swatch={valueFor("component", c.name) ?? "#000"}
                onHover={() => setHovered(c.name)}
                onLeave={() => setHovered(null)}
                onPin={() => setPinned(pinned === c.name ? null : c.name)}
              />
            ))}
          </ul>
        </Tier>
      </div>

      <p className="font-mono text-[12px] text-ink-mute leading-relaxed text-center">
        Hover a token to trace the cascade. Click to pin.{" "}
        {pinned && (
          <button
            type="button"
            onClick={() => setPinned(null)}
            className="underline hover:text-glow-cyan"
          >
            Clear pin
          </button>
        )}
      </p>

      {/* ─── Live components stamped from those tokens ─── */}
      <div>
        <div className="font-pixel text-[10px] tracking-widest text-ink-mute mb-3">
          ░ STAMPED COMPONENTS ░
        </div>
        <div className="cartridge p-6 sm:p-8 bg-[#F5F5F2] text-[#1A1A22]">
          <div className="grid gap-6 md:grid-cols-2">
            <PolicyCard />
            <ButtonStack />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
            <ChipCluster />
            <AlertBanner />
          </div>
        </div>
      </div>

      {/* ─── Image / thumbnail scale ─── */}
      <div>
        <div className="font-pixel text-[10px] tracking-widest text-ink-mute mb-3">
          ░ IMAGE SCALE ░
        </div>
        <div className="cartridge p-5 sm:p-6 bg-bg-deep">
          <div className="flex items-end gap-3 sm:gap-4 flex-wrap">
            {[
              ["xxsm", 32],
              ["xsm", 48],
              ["sm", 64],
              ["md", 80],
              ["lg", 96],
              ["xl", 112],
              ["xxl", 128],
            ].map(([label, size]) => (
              <figure key={label} className="text-center">
                <div
                  className="bg-gradient-to-br from-[#0E2A5A] to-[#5C7BC2]"
                  style={{
                    width: size as number,
                    height: size as number,
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
                  }}
                  aria-hidden="true"
                />
                <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                  {label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function Tier({
  number,
  label,
  subtitle,
  accent,
  children,
}: {
  number: string;
  label: string;
  subtitle: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="cartridge p-4 relative"
      style={{ boxShadow: `inset 0 0 0 1px ${accent}33` }}
    >
      <header className="mb-3 pb-3 border-b border-ink-ghost">
        <div className="flex items-baseline justify-between">
          <span
            className="font-pixel text-[9px] tracking-widest"
            style={{ color: accent }}
          >
            TIER {number}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
            {subtitle}
          </span>
        </div>
        <h3
          className="font-display text-[28px] leading-none mt-1"
          style={{ color: accent, textShadow: `0 0 8px ${accent}88` }}
        >
          {label}
        </h3>
      </header>
      {children}
    </section>
  );
}

function TokenRow({
  name,
  value,
  swatch,
  lit,
  isFocus,
  onHover,
  onLeave,
  onPin,
}: {
  name: string;
  value: string;
  swatch: string;
  lit: boolean;
  isFocus: boolean;
  onHover: () => void;
  onLeave: () => void;
  onPin: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onFocus={onHover}
        onBlur={onLeave}
        onClick={onPin}
        className={`w-full flex items-center gap-2 px-2 py-1.5 text-left transition-all ${
          lit
            ? "bg-bg-ridge/80 ring-1 ring-neon-cyan/60 text-ink"
            : "text-ink-dim hover:text-ink hover:bg-bg-ridge/40"
        } ${isFocus ? "ring-2 ring-neon-magenta/80" : ""}`}
      >
        <span
          aria-hidden="true"
          className="block w-4 h-4 shrink-0"
          style={{
            background: swatch,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)",
          }}
        />
        <span className="font-mono text-[11.5px] truncate flex-1">{name}</span>
        <span className="font-mono text-[10.5px] text-ink-mute truncate hidden sm:inline">
          {value}
        </span>
      </button>
    </li>
  );
}

/* ─── Stamped component samples (rendered against the real token chain) ── */

function PolicyCard() {
  return (
    <article
      style={{
        background: "#FFFFFF",
        border: "1px solid #C2C2CC",
        boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
      }}
      className="p-4"
    >
      <div
        className="font-mono text-[10px] tracking-widest uppercase mb-2"
        style={{ color: "#3D3D49" }}
      >
        Maryland · HB-247
      </div>
      <h4
        className="text-[18px] leading-tight mb-1"
        style={{ color: "#1A1A22", fontWeight: 600 }}
      >
        Energy Storage Procurement
      </h4>
      <p className="text-[13px] leading-relaxed mb-3" style={{ color: "#3D3D49" }}>
        Tracks legislative progress through committee, floor, and signature
        stages.
      </p>
      <div className="flex items-center gap-2">
        <span
          className="text-[10px] uppercase tracking-widest px-2 py-0.5"
          style={{ background: "#E6ECF7", color: "#0E2A5A" }}
        >
          In committee
        </span>
        <span className="text-[10px]" style={{ color: "#3D3D49" }}>
          Updated 3d ago
        </span>
      </div>
    </article>
  );
}

function ButtonStack() {
  return (
    <div className="flex flex-col gap-3 self-start">
      <SystemButton variant="primary">Read full report</SystemButton>
      <SystemButton variant="secondary">Save for later</SystemButton>
      <SystemButton variant="ghost">View 12 related</SystemButton>
    </div>
  );
}

function SystemButton({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "ghost";
}) {
  const [hover, setHover] = useState(false);
  const styles = (() => {
    if (variant === "primary") {
      return {
        background: hover ? "#0E2A5A" : "#1B449A",
        color: "#FFFFFF",
        border: "1px solid transparent",
      };
    }
    if (variant === "secondary") {
      return {
        background: hover ? "#E6ECF7" : "#FFFFFF",
        color: "#0E2A5A",
        border: "1px solid #1B449A",
      };
    }
    return {
      background: "transparent",
      color: hover ? "#0E2A5A" : "#1B449A",
      border: "1px solid transparent",
      textDecoration: "underline",
    };
  })();
  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={styles}
      className="text-[13px] font-medium px-4 py-2 transition-colors text-left"
    >
      {children}
    </button>
  );
}

function ChipCluster() {
  const chips = ["Energy", "Climate", "Tax Policy", "Healthcare", "Labor"];
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c, i) => (
        <button
          key={c}
          type="button"
          onClick={() => setActive(i)}
          className="text-[11px] px-3 py-1 transition-colors"
          style={{
            background: i === active ? "#0E2A5A" : "transparent",
            color: i === active ? "#FFFFFF" : "#3D3D49",
            border: `1px solid ${i === active ? "#0E2A5A" : "#C2C2CC"}`,
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

function AlertBanner() {
  return (
    <div
      className="text-[12px] px-3 py-2 self-start"
      style={{
        background: "#FCEEEC",
        color: "#7A2118",
        borderLeft: "3px solid #E66B5C",
      }}
    >
      <strong style={{ fontWeight: 600 }}>Heads up:</strong> 3 bills updated
      since your last visit.
    </div>
  );
}
