"use client";

import { useState } from "react";

/**
 * Interactive demo of the actual 3-tier token graph from the RT (Roundtable)
 * design library at Berkeley Research Group. All token names and hex values
 * below were pulled directly from the Figma file's variable definitions
 * (Color/*, Header/*, Body/*, etc.) — none are invented.
 *
 * Architecture:
 *   1. Primitives — raw color and type values (Color/Neutrals/*, Color/Primary/*)
 *   2. Semantic   — purpose-bound aliases (Color/Text/*, Color/Borders/*, Color/Surfaces/*)
 *   3. Component  — slot-specific bindings (Core/card-bg, Cards/Data-primary)
 *
 * Hover any token and the cascade lights up across all three tiers so the
 * resolution path is visible. Click to pin focus.
 */

/* ─── Real tokens from Figma (file: KfGd38GHhnEUEQHL9XWn95) ─────────────── */

const PRIMITIVES = [
  { name: "Color/Neutrals/white",        value: "#FFFFFF" },
  { name: "Color/Neutrals/gray-1",       value: "#F2F5F8" },
  { name: "Color/Neutrals/gray-2",       value: "#E8EDF3" },
  { name: "Color/Neutrals/gray-3",       value: "#DEE5EB" },
  { name: "Color/Neutrals/gray-4",       value: "#ADBBC8" },
  { name: "Color/Neutrals/gray-5",       value: "#718291" },
  { name: "Color/Neutrals/gray-6",       value: "#636366" },
  { name: "Color/Neutrals/midnight",     value: "#0A162F" },
  { name: "Color/Primary/deep-indigo",   value: "#25265E" },
  { name: "Color/Primary/cerulean-blue", value: "#3246D3" },
  { name: "Color/Primary/light-blue",    value: "#C9D8FF" },
  { name: "Color/System/green",          value: "#24B668" },
  { name: "Color/System/green-light",    value: "#DEF8EA" },
] as const;

type PrimitiveName = (typeof PRIMITIVES)[number]["name"];

/* Semantic tier: every entry resolves to exactly one primitive above. */
const SEMANTIC: Array<{
  name: string;
  primitive: PrimitiveName;
  use: string;
}> = [
  { name: "Color/Text/text-dark",     primitive: "Color/Neutrals/midnight",     use: "Body copy, headings" },
  { name: "Color/Text/text-white",    primitive: "Color/Neutrals/white",        use: "Type on dark surfaces" },
  { name: "Color/Text/text-category", primitive: "Color/Primary/cerulean-blue", use: "Category eyebrow" },
  { name: "Color/Text/subtext-dark",  primitive: "Color/Neutrals/gray-6",       use: "Secondary copy, meta" },
  { name: "Color/Text/subtext-light", primitive: "Color/Neutrals/gray-4",       use: "Disabled / placeholder" },
  { name: "Color/Text/link-active",   primitive: "Color/Primary/deep-indigo",   use: "Active link state" },
  { name: "Color/Borders/border-light", primitive: "Color/Neutrals/gray-3",     use: "Card / divider line" },
  { name: "Color/Borders/border-dark",  primitive: "Color/Neutrals/midnight",   use: "Strong divider, focus" },
  { name: "Color/Surfaces/surface-gray", primitive: "Color/Neutrals/gray-1",    use: "Page / panel surface" },
];

type SemanticName = (typeof SEMANTIC)[number]["name"];

/* Component tier: slots that point at semantic (or, in this library, at a
   primitive directly when no purpose-bound alias was defined yet). */
const COMPONENT_TOKENS: Array<{
  name: string;
  semantic: SemanticName | PrimitiveName;
  slot: string;
}> = [
  { name: "Core/card-bg",         semantic: "Color/Neutrals/white",         slot: "Card surface fill" },
  { name: "Cards/Data-primary",   semantic: "Color/Primary/cerulean-blue",  slot: "Card data accent" },
];

/* Type tokens (real names from Figma; UI uses Roboto, editorial uses EB Garamond) */
const TYPE_TOKENS = [
  { name: "Header/Garamond H1",     spec: "EB Garamond Regular · 44 / -1 letter-spacing", role: "Editorial headline" },
  { name: "Header/Garamond H3",     spec: "EB Garamond SemiBold · 24 / 36 / 10 caps",     role: "Roundup section title" },
  { name: "Header/Roboto H4 Caps",  spec: "Roboto Bold · 14 / 10 letter-spacing / UPPER", role: "Eyebrow label" },
  { name: "Body/Body 2",            spec: "Roboto Regular · 16 / 24",                      role: "Default body copy" },
  { name: "Body/Body 3 Bold",       spec: "Roboto SemiBold · 14 / 24 / 7 letter-spacing",  role: "CTA, button label" },
  { name: "Chips",                  spec: "Roboto SemiBold · 14 / 24",                     role: "Filter chip text" },
  { name: "10 MEDIUM - Label 1",    spec: "Roboto Medium · 10",                            role: "Micro label" },
];

/* ───────────────────────────────────────────────────────────────────────── */

export default function RtLibraryShowcase() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const focus = pinned ?? hovered;

  function isLit(level: "primitive" | "semantic" | "component", name: string) {
    if (!focus) return false;
    if (focus === name) return true;
    if (level === "primitive") {
      const sem = SEMANTIC.find((s) => s.name === focus);
      if (sem) return sem.primitive === name;
      const comp = COMPONENT_TOKENS.find((c) => c.name === focus);
      if (comp) {
        if (comp.semantic === name) return true;
        const s = SEMANTIC.find((s) => s.name === comp.semantic);
        return s?.primitive === name;
      }
    }
    if (level === "semantic") {
      if (PRIMITIVES.find((p) => p.name === focus)) {
        const sem = SEMANTIC.find((s) => s.name === name);
        return sem?.primitive === focus;
      }
      const comp = COMPONENT_TOKENS.find((c) => c.name === focus);
      if (comp) return comp.semantic === name;
    }
    if (level === "component") {
      const me = COMPONENT_TOKENS.find((c) => c.name === name);
      if (!me) return false;
      if (me.semantic === focus) return true;
      const sem = SEMANTIC.find((s) => s.name === me.semantic);
      return sem?.primitive === focus;
    }
    return false;
  }

  function valueFor(level: "semantic" | "component", name: string): string {
    if (level === "semantic") {
      const sem = SEMANTIC.find((s) => s.name === name);
      return PRIMITIVES.find((p) => p.name === sem?.primitive)?.value ?? "#000";
    }
    const comp = COMPONENT_TOKENS.find((c) => c.name === name);
    if (!comp) return "#000";
    const direct = PRIMITIVES.find((p) => p.name === comp.semantic);
    if (direct) return direct.value;
    const sem = SEMANTIC.find((s) => s.name === comp.semantic);
    return PRIMITIVES.find((p) => p.name === sem?.primitive)?.value ?? "#000";
  }

  return (
    <div className="space-y-12">
      {/* ─── Tier diagram ─── */}
      <div className="grid gap-4 md:grid-cols-3">
        <Tier number="01" label="Primitives" subtitle="Raw brand values" accent="#22d3ee">
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

        <Tier number="02" label="Semantic" subtitle="Purpose-bound aliases" accent="#ff2bd6">
          <ul className="list-none p-0 m-0 space-y-1">
            {SEMANTIC.map((s) => (
              <TokenRow
                key={s.name}
                name={s.name}
                value={`→ ${s.primitive.split("/").pop()}`}
                lit={isLit("semantic", s.name)}
                isFocus={focus === s.name}
                swatch={valueFor("semantic", s.name)}
                onHover={() => setHovered(s.name)}
                onLeave={() => setHovered(null)}
                onPin={() => setPinned(pinned === s.name ? null : s.name)}
              />
            ))}
          </ul>
        </Tier>

        <Tier number="03" label="Component" subtitle="Slot-specific bindings" accent="#a3e635">
          <ul className="list-none p-0 m-0 space-y-1">
            {COMPONENT_TOKENS.map((c) => (
              <TokenRow
                key={c.name}
                name={c.name}
                value={`→ ${c.semantic.split("/").pop()}`}
                lit={isLit("component", c.name)}
                isFocus={focus === c.name}
                swatch={valueFor("component", c.name)}
                onHover={() => setHovered(c.name)}
                onLeave={() => setHovered(null)}
                onPin={() => setPinned(pinned === c.name ? null : c.name)}
              />
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-ink-mute font-mono leading-relaxed">
            The library leans heavily on semantic tokens; component-level
            bindings are reserved for slots that don&apos;t fit a generic alias
            (e.g. the cerulean used to tag data cards).
          </p>
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

      {/* ─── Type tokens ─── */}
      <div>
        <div className="font-pixel text-[10px] tracking-widest text-ink-mute mb-3">
          ░ TYPE TOKENS ░
        </div>
        <div
          className="cartridge p-6 sm:p-8 bg-white text-[#0A162F]"
          style={{ fontFamily: "var(--font-roboto), system-ui, sans-serif" }}
        >
          <ul className="list-none p-0 m-0 divide-y" style={{ borderColor: "#DEE5EB" }}>
            {TYPE_TOKENS.map((t) => (
              <li key={t.name} className="py-3 flex flex-col sm:grid sm:grid-cols-[2fr_3fr_1fr] sm:items-baseline gap-x-6 gap-y-1">
                <code
                  className="font-mono text-[11px]"
                  style={{ color: "#25265E" }}
                >
                  {t.name}
                </code>
                <TypePreview token={t.name}>{t.role}</TypePreview>
                <span className="text-[11px]" style={{ color: "#636366" }}>
                  {t.spec}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─── Stamped components against the real chain ─── */}
      <div>
        <div className="font-pixel text-[10px] tracking-widest text-ink-mute mb-3">
          ░ STAMPED COMPONENTS ░
        </div>
        <div
          className="cartridge p-6 sm:p-8"
          style={{
            background: "#F2F5F8" /* surface-gray */,
            color: "#0A162F" /* text-dark */,
            fontFamily: "var(--font-roboto), system-ui, sans-serif",
          }}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <RoundupArticleCard />
            <PolicyCard />
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
            <ChipCluster />
            <CategoryEyebrow />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function TypePreview({ token, children }: { token: string; children: React.ReactNode }) {
  switch (token) {
    case "Header/Garamond H1":
      return (
        <span
          style={{
            fontFamily: "var(--font-garamond), Georgia, serif",
            fontWeight: 400,
            fontSize: 32,
            lineHeight: 1,
            letterSpacing: "-0.5px",
          }}
        >
          {children}
        </span>
      );
    case "Header/Garamond H3":
      return (
        <span
          style={{
            fontFamily: "var(--font-garamond), Georgia, serif",
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
          }}
        >
          {children}
        </span>
      );
    case "Header/Roboto H4 Caps":
      return (
        <span
          style={{
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
          }}
        >
          {children}
        </span>
      );
    case "Body/Body 2":
      return (
        <span style={{ fontWeight: 400, fontSize: 16, lineHeight: "24px" }}>
          {children}
        </span>
      );
    case "Body/Body 3 Bold":
      return (
        <span
          style={{
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "24px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          {children}
        </span>
      );
    case "Chips":
      return (
        <span style={{ fontWeight: 500, fontSize: 14, lineHeight: "24px" }}>
          {children}
        </span>
      );
    default:
      return (
        <span style={{ fontWeight: 500, fontSize: 10, letterSpacing: "0.05em" }}>
          {children}
        </span>
      );
  }
}

/* ─── Tier shell + token row ────────────────────────────────────────── */

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
  // Show only the leaf segment of the path so rows stay readable;
  // full path is in the title attribute for hover reveal.
  const leaf = name.split("/").pop() ?? name;
  return (
    <li>
      <button
        type="button"
        title={name}
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
        <span className="font-mono text-[11.5px] truncate flex-1">{leaf}</span>
        <span className="font-mono text-[10.5px] text-ink-mute truncate hidden sm:inline">
          {value}
        </span>
      </button>
    </li>
  );
}

/* ─── Stamped components (each prop annotated with the token it uses) ───── */

function RoundupArticleCard() {
  return (
    <article
      className="p-5"
      style={{
        background: "#FFFFFF" /* Core/card-bg → Color/Neutrals/white */,
        border: "1px solid #DEE5EB" /* Color/Borders/border-light */,
        boxShadow: "0 6px 14px 0 #4C549933" /* Drop Shadow / Elevation 02 */,
      }}
    >
      <div
        className="mb-3"
        style={{
          color: "#3246D3" /* Color/Text/text-category */,
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
        }}
      >
        Roundup
      </div>
      <h4
        style={{
          fontFamily: "var(--font-garamond), Georgia, serif",
          fontWeight: 400,
          fontSize: 28,
          lineHeight: 1.1,
          color: "#0A162F" /* Color/Text/text-dark */,
          marginBottom: 8,
          letterSpacing: "-0.4px",
        }}
      >
        Energy Storage Procurement, Reconsidered
      </h4>
      <p
        style={{
          color: "#636366" /* Color/Text/subtext-dark */,
          fontWeight: 400,
          fontSize: 14,
          lineHeight: "20px",
          marginBottom: 16,
        }}
      >
        Three states moved bills to committee this week. Here&apos;s what the
        record signals about the next legislative session.
      </p>
      <div className="flex items-center justify-between">
        <span
          style={{
            color: "#25265E" /* Color/Text/link-active */,
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "24px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          Read full ›
        </span>
        <span style={{ color: "#ADBBC8", fontSize: 12 }}>
          {/* Color/Text/subtext-light */}
          Updated 2d ago
        </span>
      </div>
    </article>
  );
}

function PolicyCard() {
  return (
    <article
      className="p-5"
      style={{
        background: "#FFFFFF" /* Core/card-bg */,
        borderTop: "4px solid #3246D3" /* Cards/Data-primary */,
        border: "1px solid #DEE5EB" /* border-light */,
        borderTopWidth: 4,
        borderTopColor: "#3246D3",
      }}
    >
      <div
        style={{
          color: "#636366",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        Maryland · HB-247
      </div>
      <h4
        style={{
          color: "#0A162F",
          fontWeight: 500,
          fontSize: 18,
          lineHeight: 1.2,
          marginBottom: 12,
        }}
      >
        Energy Storage Procurement
      </h4>
      <div className="flex items-center gap-2">
        <span
          style={{
            background: "#DEF8EA" /* System/green-light */,
            color: "#0A162F",
            padding: "2px 8px",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Passed
        </span>
        <span style={{ color: "#636366", fontSize: 12 }}>Updated 3d ago</span>
      </div>
    </article>
  );
}

function ChipCluster() {
  const chips = ["Energy", "Climate", "Tax", "Health", "Labor", "Trade"];
  const [active, setActive] = useState(0);
  return (
    <div>
      <div
        style={{
          color: "#636366",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        Filter / Categories
      </div>
      <div className="flex flex-wrap gap-2">
        {chips.map((c, i) => {
          const isActive = i === active;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setActive(i)}
              style={{
                background: isActive ? "#25265E" : "transparent",
                color: isActive ? "#FFFFFF" : "#0A162F",
                border: `1px solid ${isActive ? "#25265E" : "#DEE5EB"}`,
                padding: "6px 14px",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "24px",
                cursor: "pointer",
              }}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CategoryEyebrow() {
  return (
    <div>
      <div
        style={{
          color: "#636366",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        Category Eyebrow
      </div>
      <div
        style={{
          fontFamily: "var(--font-garamond), Georgia, serif",
          color: "#3246D3",
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
        }}
      >
        Research
      </div>
    </div>
  );
}
