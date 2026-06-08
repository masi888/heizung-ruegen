import type { MetadataRoute } from "next";

import { buildCanonical, groupedRoutes, knowledgeEntries } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseEntries = [
    "/",
    "/leistungen",
    "/kontakt",
    "/faq",
    "/ratgeber",
    "/impressum",
    "/datenschutz",
    ...groupedRoutes.services.map((route) => route.slug),
    ...knowledgeEntries.map((entry) => entry.slug),
  ];

  const now = new Date();

  return baseEntries.map((path) => ({
    url: buildCanonical(path),
    lastModified: now,
    changeFrequency: path.startsWith("/ratgeber") ? "monthly" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
