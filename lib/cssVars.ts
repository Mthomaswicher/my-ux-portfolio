import type { CSSProperties } from "react";

/** Inline styles that also set CSS custom properties. React's CSSProperties
 *  has no index signature for `--*`, so setting one otherwise needs a cast.
 *  Build the object as a typed const, then hand it to `style`. */
export interface CSSVars extends CSSProperties {
  [key: `--${string}`]: string | number | undefined;
}
