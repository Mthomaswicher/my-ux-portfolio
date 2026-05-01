"use client";

import { usePathname } from "next/navigation";

const HOMEPAGE_PATHS = new Set(["/", "/home", "/home/"]);

export default function CrtOverlays() {
  const pathname = usePathname() ?? "/";
  if (!HOMEPAGE_PATHS.has(pathname)) return null;
  return (
    <>
      <div className="crt-noise" aria-hidden />
      <div className="crt-vignette" aria-hidden />
      <div className="crt-scanlines" aria-hidden />
      <div className="crt-sweep" aria-hidden />
    </>
  );
}
