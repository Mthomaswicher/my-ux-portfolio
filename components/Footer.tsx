import Link from "next/link";

const PIXEL_MARK = `
   ▄▄▄▄▄▄▄▄▄▄▄
  █  ▄     ▄  █
  █ ▀▀▀▄ ▄▀▀▀ █
  █   █▀ ▀█   █
  █   ▀█▄█▀   █
  █  M  ·  W  █
   ▀▀▀▀▀▀▀▀▀▀▀
`;

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-ghost">
      <div className="mx-auto max-w-5xl px-6 py-12 grid gap-10 md:grid-cols-[auto_1fr_auto]">
        <pre
          className="font-mono text-[10px] leading-tight text-glow-magenta whitespace-pre"
          aria-hidden="true"
        >
          {PIXEL_MARK}
        </pre>

        <div className="space-y-3 self-center">
          <div className="font-pixel text-[12px] tracking-widest text-glow-cyan">
            THANKS FOR PLAYING.
          </div>
          <p className="font-mono text-[13px] text-ink-dim max-w-md leading-relaxed">
            Built in Washington, D.C. A small love letter to late-night arcades, design
            systems, and the people who actually read the patch notes.
          </p>
          <div className="flex gap-3 font-mono text-[11px] text-ink-mute">
            <a href="mailto:mthomaswicher@gmail.com" className="hover:text-glow-cyan">
              EMAIL
            </a>
            <span>·</span>
            <a
              href="https://linkedin.com/in/mthomaswicher"
              target="_blank"
              rel="noreferrer"
              className="hover:text-glow-cyan"
            >
              LINKEDIN
            </a>
            <span>·</span>
            <a
              href="https://github.com/Mthomaswicher"
              target="_blank"
              rel="noreferrer"
              className="hover:text-glow-cyan"
            >
              GITHUB
            </a>
            <span>·</span>
            <a
              href="https://dribbble.com/mthomaswicher"
              target="_blank"
              rel="noreferrer"
              className="hover:text-glow-cyan"
            >
              DRIBBBLE
            </a>
          </div>
        </div>

        <div className="self-end space-y-2">
          <Link
            href="/"
            className="font-pixel text-[10px] tracking-widest text-ink-mute hover:text-glow-magenta block"
          >
            <span aria-hidden="true">↩ </span>INSERT COIN
          </Link>
          <Link
            href="/guestbook"
            className="font-pixel text-[10px] tracking-widest text-ink-mute hover:text-glow-amber block"
          >
            <span aria-hidden="true">✦ </span>HIGH SCORES
          </Link>
        </div>
      </div>
    </footer>
  );
}
