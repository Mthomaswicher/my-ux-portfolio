const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a root-relative path with the configured basePath.
 *
 * Use only for raw <a>, <video>, or CSS url() references. Next.js components
 * (next/link, next/image, next/script) already prefix automatically.
 */
export function withBase(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE}${path}`;
}
