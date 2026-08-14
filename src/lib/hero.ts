/** Split intro copy into two hero lines for the above-the-fold layout. */
export function heroLines(intro: string): [string, string] {
  const sentences = intro.match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()) ?? [intro];
  if (sentences.length >= 2) {
    return [sentences[0], sentences[1]];
  }
  const midpoint = Math.ceil(intro.length / 2);
  const breakAt = intro.indexOf(" ", midpoint);
  if (breakAt === -1) return [intro, ""];
  return [intro.slice(0, breakAt).trim(), intro.slice(breakAt).trim()];
}

export const PORTRAIT_PATH = "/images/filippo-portrait.png";
