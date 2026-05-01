import Image from "next/image";
import Link from "next/link";

export default function DevNavHubBanner() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-ink-ghost bg-bg-deep/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 md:px-6">
        <Link
          href="/"
          aria-label="DevNav Hub home"
          className="flex items-center"
        >
          <Image
            src="/images/branding/devnav-hub.avif"
            alt="DevNav Hub"
            width={512}
            height={199}
            priority
            className="h-8 w-auto md:h-10"
          />
        </Link>
        <span className="font-pixel text-[9px] tracking-widest text-ink-mute uppercase">
          ░ ░ ░ ONLINE ░ ░ ░
        </span>
      </div>
    </div>
  );
}
