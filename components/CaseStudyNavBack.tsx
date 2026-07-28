import Link from "next/link";
import ModeText from "./ModeText";

type Props = { variant: "top" | "bottom" };

/**
 * Back-to-work link on case study pages. Both copies ship and CSS picks
 * one at first paint — see the "Mode-gated content" note in globals.css.
 */
export default function CaseStudyNavBack({ variant }: Props) {
  const isTop = variant === "top";
  const scenicClass = isTop
    ? "inline-block py-2 font-pixel text-[10px] tracking-widest text-ink-mute hover:text-glow-cyan focus-visible:text-glow-cyan"
    : "font-pixel text-[12px] tracking-widest text-ink hover:text-glow-cyan focus-visible:text-glow-cyan";
  const basicClass = isTop
    ? "inline-block py-2 text-[13px] font-mono text-ink-mute hover:text-ink underline-offset-4 hover:underline"
    : "inline-block text-[14px] font-mono text-ink hover:text-ink-mute underline-offset-4 hover:underline";

  return (
    <ModeText
      scenic={
        <Link href="/home" className={scenicClass}>
          <span aria-hidden="true">← </span>
          {isTop ? "BACK TO GAME CABINET" : "MORE CARTRIDGES"}
        </Link>
      }
      basic={
        <Link href="/home" className={basicClass}>
          <span aria-hidden="true">← </span>
          {isTop ? "All work" : "More work"}
        </Link>
      }
    />
  );
}
