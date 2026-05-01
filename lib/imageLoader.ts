const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src }: { src: string; width: number; quality?: number }): string {
  if (/^https?:\/\//.test(src)) return src;
  if (BASE && src.startsWith(BASE)) return src;
  if (src.startsWith("/")) return `${BASE}${src}`;
  return src;
}
