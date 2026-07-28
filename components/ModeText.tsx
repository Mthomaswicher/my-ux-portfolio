/**
 * Renders both mode variants and lets CSS pick one at first paint.
 *
 * Why not `useMode()` and branch in JS: this is a static export, so the
 * server HTML is always the scenic variant. A JS branch only corrects
 * itself once React hydrates, which on a throttled phone is seconds,
 * so a Reading Room visitor would watch arcade copy sit on screen and
 * then swap. It also guarantees a hydration mismatch on every page.
 *
 * The inline script in <head> sets html[data-mode] before the first
 * paint, so emitting both variants and hiding one with CSS means the
 * right copy is the only copy ever painted. Server and client render
 * identically, so there's no mismatch either.
 *
 * The wrappers are `display: contents`, so block-level children (headings,
 * divs) still lay out exactly as if the wrapper weren't there.
 */
export default function ModeText({
  scenic,
  basic,
}: {
  scenic: React.ReactNode;
  basic: React.ReactNode;
}) {
  return (
    <>
      <span className="mode-only mode-scenic-only">{scenic}</span>
      <span className="mode-only mode-basic-only">{basic}</span>
    </>
  );
}
