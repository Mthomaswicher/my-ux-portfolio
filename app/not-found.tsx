import Link from "next/link";

export const metadata = {
  title: "404 · GAME OVER · MTW.ARCADE",
};

export default function NotFound() {
  return (
    <main id="main" className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <div
          className="font-pixel text-[14px] sm:text-[18px] tracking-widest text-glow-magenta mb-6"
          aria-hidden="true"
        >
          ░ ░ ░ GAME OVER ░ ░ ░
        </div>

        <h1 className="font-display text-[80px] sm:text-[120px] leading-none text-glow-cyan mb-2">
          404
        </h1>
        <p className="font-pixel text-[10px] sm:text-[12px] tracking-widest text-glow-amber mb-8">
          THIS CARTRIDGE ISN&apos;T IN THE CABINET.
        </p>

        <p className="font-mono text-[14px] text-ink-dim leading-relaxed mb-8 max-w-lg">
          The link you followed points to a screen that doesn&apos;t exist. Maybe the URL is
          mistyped, maybe it moved, maybe a player ripped the label off. Either way, try
          one of these:
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/home"
            className="cartridge px-5 py-3 font-pixel text-[12px] tracking-widest text-glow-cyan hover:shadow-neon-cyan transition-shadow"
          >
            [ CABINET ]
          </Link>
          <Link
            href="/"
            className="cartridge px-5 py-3 font-pixel text-[12px] tracking-widest text-ink hover:text-glow-magenta hover:shadow-neon-magenta transition-shadow"
          >
            [ INSERT COIN ]
          </Link>
          <Link
            href="/guestbook"
            className="cartridge px-5 py-3 font-pixel text-[12px] tracking-widest text-ink hover:text-glow-amber hover:shadow-neon-amber transition-shadow"
          >
            [ HIGH SCORES ]
          </Link>
        </div>

        <div className="mt-12 font-mono text-[11px] uppercase tracking-widest text-ink-mute">
          ERROR CODE: NO_SUCH_CARTRIDGE
        </div>
      </div>
    </main>
  );
}
