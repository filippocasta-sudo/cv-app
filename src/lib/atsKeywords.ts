import type { CvData } from "@/lib/types";

/** Flat keyword list for ATS parsers — deduplicated, stable order. */
export function buildAtsKeywords(cv: CvData): string[] {
  const seen = new Set<string>();
  const keywords: string[] = [];

  const add = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    keywords.push(trimmed);
  };

  for (const role of cv.personal.roles) add(role);

  for (const group of [...cv.hardSkills, ...cv.softSkills]) {
    add(group.name);
    for (const detail of group.details) add(detail);
  }

  for (const entry of cv.timeline) {
    if (entry.kind === "work" || entry.kind === "education") {
      for (const tag of entry.tags) add(tag);
    }
  }

  for (const cert of cv.certifications) {
    add(cert.name);
    add(cert.issuer);
  }

  for (const cap of cv.canDo) add(cap.label);

  return keywords;
}
