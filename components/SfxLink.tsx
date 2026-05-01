"use client";

import Link from "next/link";
import type { LinkProps } from "next/link";
import { useSound } from "./SoundProvider";
import type { SfxName } from "@/lib/arcadeAudio";

type Props = Omit<LinkProps, "href"> & {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  hoverSfx?: SfxName | null;
  clickSfx?: SfxName | null;
  external?: boolean;
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
    onClick: () => clickSfx && play(clickSfx),
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        style={style}
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
