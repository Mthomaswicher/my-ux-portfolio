"use client";

import Link from "next/link";
import type { LinkProps } from "next/link";
import { useSound } from "./SoundProvider";
import { haptic } from "@/lib/haptic";
import type { SfxName } from "@/lib/arcadeAudio";

type Props = Omit<LinkProps, "href"> & {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  hoverSfx?: SfxName | null;
  clickSfx?: SfxName | null;
  external?: boolean;
  // Allow consumers to thread data-* attributes through to the rendered
  // anchor/Link — used by LongPressNotes to find the cartridge under
  // the press target via [data-cart-no]. Loose index signature so SWC
  // doesn't have to parse a template-literal key type.
  [key: string]: unknown;
};

/**
 * Internal/external Link wrapper that plays SFX on hover + click.
 * Keeps ProjectCard a server component while still firing client-side audio.
 */
export default function SfxLink({
  href,
  className,
  style,
  children,
  hoverSfx = "hover",
  clickSfx = "select",
  external = false,
  ...rest
}: Props) {
  const { play } = useSound();

  const handlers = {
    onMouseEnter: () => hoverSfx && play(hoverSfx),
    onFocus: () => hoverSfx && play(hoverSfx),
    onClick: () => {
      if (clickSfx) play(clickSfx);
      haptic("tap");
    },
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        style={style}
        {...rest}
        {...handlers}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={style} {...rest} {...handlers}>
      {children}
    </Link>
  );
}
