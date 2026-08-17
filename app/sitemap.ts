import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/caseStudies";
import { SITE_URL } from "@/lib/site";

/** next.config sets trailingSlash, so every emitted URL carries one. */
const url = (path: string) => `${SITE_URL}${path}`;

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<[string, number]> = [
    ["/", 1],
    ["/home/", 1],
    ["/about/", 0.8],
    ["/experience/", 0.8],
    ["/lab/", 0.6],
    ["/guestbook/", 0.4],
  ];

  return [
    ...pages.map(([path, priority]) => ({
      url: url(path),
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...caseStudies.map((c) => ({
      url: url(`/work/${c.slug}/`),
      changeFrequency: "yearly" as const,
      priority: 0.9,
    })),
  ];
}
