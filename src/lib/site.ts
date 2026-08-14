/**
 * Canonical public origin, used for metadata, robots and sitemap.
 *
 * On Vercel `VERCEL_PROJECT_PRODUCTION_URL` resolves to the shortest production
 * domain and is set even on preview deployments, so canonical links always point
 * at production instead of a per-deployment hostname.
 */
export function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return new URL(explicit);

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return new URL(`https://${production}`);

  return new URL("http://localhost:3000");
}
