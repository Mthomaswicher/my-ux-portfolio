"use client";

import Link from "next/link";
import { useMode } from "./ModeProvider";

type Props = { variant: "top" | "bottom" };

/**
 * Back-to-work link on case study pages. Mode-aware copy: arcade flavor in
 * scenic mode, plain editorial in basic mode.
 */
export default function CaseStudyNavBack({ variant }: Props) {
  const { mode } = useMode();
  const isBasic = mode === "basic";

  if (variant === "top") {
    return (
      <Link
        href="/home"
        className={
          isBasic
            ? "inline-block py-2 text-[13px] font-mono text-ink-mute hover:text-ink underline-offset-4 hover:underline"
            : "inline-block py-2 font-pixel text-[10px] tracking-widest text-ink-mute hover:text-glow-cyan focus-visible:text-glow-cyan"
        }
      >
        <span aria-hidden="true">← </span>
        {isBasic ? "All work" : "BACK TO GAME CABINET"}
      </Link>
    );
  }

  return (
    <Link
      href="/home"
      className={
        isBasic
          ? "inline-block text-[14px] font-mono text-ink hover:text-ink-mute underline-offset-4 hover:underline"
          : "font-pixel text-[12px] tracking-widest text-ink hover:text-glow-cyan focus-visible:text-glow-cyan"
      }
    >
      <span aria-hidden="true">← </span>
      {isBasic ? "More work" : "MORE CARTRIDGES"}
    </Link>
  );
}
