/** Split intro into display paragraphs (preserves blank lines and full text). */
export function introParagraphs(intro: string): string[] {
  const trimmed = intro.trim();
  if (!trimmed) return [];

  const blocks = trimmed.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  if (blocks.length > 1) return blocks;

  return [trimmed];
}

/** @deprecated Prefer introParagraphs — kept for tests referencing the old two-line split. */
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
