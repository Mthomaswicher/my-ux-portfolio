/** Absolute origin used for canonical URLs, Open Graph tags, robots and the
 *  sitemap. The site is a static export served from a custom domain, so this
 *  cannot be inferred at request time. Override for preview deploys. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mthomaswicher.com";
