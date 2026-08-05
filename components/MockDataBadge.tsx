/**
 * Marks a screen as carrying non-production data.
 *
 * The Capital One case studies show real internal tooling, so every screen in
 * them is populated with mock records rather than anything from a live system.
 * The badge is deliberately styled unlike the product chrome it sits on so it
 * reads as annotation, never as part of the interface.
 *
 * Rendered for any case study whose `brand` is "capital-one", so a screen
 * added later inherits it without anyone having to remember.
 */
export default function MockDataBadge() {
  return (
    <div
      className="absolute top-2 right-2 z-20 pointer-events-none select-none rounded-full px-2.5 py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-white/95"
      style={{
        background: "rgba(20, 26, 34, 0.88)",
        border: "1px solid rgba(255,255,255,0.28)",
        backdropFilter: "blur(2px)",
      }}
    >
      <span aria-hidden="true">● </span>
      Mock data
    </div>
  );
}
