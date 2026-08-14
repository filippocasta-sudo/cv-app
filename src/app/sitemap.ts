import type { MetadataRoute } from "next";

/** Site is link-only for now — do not expose URLs to crawlers via sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
