import { cvData as fallbackData } from "@/data/cvData";
import { getStorage } from "@/lib/storage";
import type { CvData } from "@/lib/types";

/**
 * Content is edited through the admin panel and persisted by the active storage
 * driver. When nothing has been saved yet — or the stored payload is unreadable
 * — the versioned dataset in `data/cvData.ts` is served instead.
 */
export async function readCv(): Promise<CvData> {
  try {
    const stored = await getStorage().read();
    return stored === null ? fallbackData : normalizeCv(stored);
  } catch {
    return fallbackData;
  }
}

export async function writeCv(input: unknown): Promise<CvData> {
  const data = normalizeCv(input);
  await getStorage().write(data);
  return data;
}

export async function resetCv(): Promise<CvData> {
  return writeCv(fallbackData);
}

const str = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

const strList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

const num = (value: unknown, fallback: number): number =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;

const bool = (value: unknown): boolean => value === true;

function id(value: unknown, prefix: string, index: number): string {
  const candidate = str(value).trim();
  return candidate.length > 0 ? candidate : `${prefix}-${index + 1}`;
}

/**
 * Coerces arbitrary JSON (file contents or an admin request body) into a
 * complete `CvData`, so a malformed field can never crash a render.
 */
export function normalizeCv(input: unknown): CvData {
  const source = (typeof input === "object" && input !== null ? input : {}) as Record<
    string,
    unknown
  >;
  const personalSource = (source.personal ?? {}) as Record<string, unknown>;
  const goalsSource = (source.goals ?? {}) as Record<string, unknown>;
  const compensationSource = (source.compensation ?? {}) as Record<string, unknown>;
  const fallbackPersonal = fallbackData.personal;

  const languages = Array.isArray(personalSource.languages)
    ? personalSource.languages.map((entry) => {
        const item = (entry ?? {}) as Record<string, unknown>;
        return { name: str(item.name), level: str(item.level) };
      })
    : fallbackPersonal.languages;

  const skillGroups = (value: unknown, prefix: string, fallback: CvData["hardSkills"]) =>
    Array.isArray(value)
      ? value.map((entry, index) => {
          const item = (entry ?? {}) as Record<string, unknown>;
          return {
            id: id(item.id, prefix, index),
            name: str(item.name),
            summary: str(item.summary),
            details: strList(item.details),
          };
        })
      : fallback;

  const capabilities = (value: unknown, prefix: string, fallback: CvData["canDo"]) =>
    Array.isArray(value)
      ? value.map((entry, index) => {
          const item = (entry ?? {}) as Record<string, unknown>;
          return {
            id: id(item.id, prefix, index),
            label: str(item.label),
            detail: str(item.detail),
          };
        })
      : fallback;

  return {
    personal: {
      name: str(personalSource.name, fallbackPersonal.name),
      roles: Array.isArray(personalSource.roles)
        ? strList(personalSource.roles)
        : fallbackPersonal.roles,
      statusBadge: str(personalSource.statusBadge, fallbackPersonal.statusBadge),
      intro: str(personalSource.intro, fallbackPersonal.intro),
      formalIntro: str(personalSource.formalIntro, fallbackPersonal.formalIntro),
      email: str(personalSource.email, fallbackPersonal.email),
      phone: str(personalSource.phone, fallbackPersonal.phone),
      linkedin: str(personalSource.linkedin, fallbackPersonal.linkedin),
      location: str(personalSource.location, fallbackPersonal.location),
      license: str(personalSource.license, fallbackPersonal.license),
      birthDate: str(personalSource.birthDate, fallbackPersonal.birthDate),
      languages,
    },
    goals: {
      headline: str(goalsSource.headline, fallbackData.goals.headline),
      targetRoles: Array.isArray(goalsSource.targetRoles)
        ? strList(goalsSource.targetRoles)
        : fallbackData.goals.targetRoles,
      projectTypes: Array.isArray(goalsSource.projectTypes)
        ? strList(goalsSource.projectTypes)
        : fallbackData.goals.projectTypes,
      idealContext: Array.isArray(goalsSource.idealContext)
        ? strList(goalsSource.idealContext)
        : fallbackData.goals.idealContext,
    },
    hardSkills: skillGroups(source.hardSkills, "hs", fallbackData.hardSkills),
    softSkills: skillGroups(source.softSkills, "ss", fallbackData.softSkills),
    certifications: Array.isArray(source.certifications)
      ? source.certifications.map((entry, index) => {
          const item = (entry ?? {}) as Record<string, unknown>;
          return {
            id: id(item.id, "cert", index),
            name: str(item.name),
            issuer: str(item.issuer),
            year: str(item.year),
            primary: bool(item.primary),
            note: str(item.note) || undefined,
          };
        })
      : fallbackData.certifications,
    canDo: capabilities(source.canDo, "can", fallbackData.canDo),
    cannotDo: capabilities(source.cannotDo, "cannot", fallbackData.cannotDo),
    compensation: {
      label: str(compensationSource.label, fallbackData.compensation.label),
      range: str(compensationSource.range, fallbackData.compensation.range),
      note: str(compensationSource.note, fallbackData.compensation.note),
    },
    timeline: Array.isArray(source.timeline)
      ? source.timeline.map((entry, index) => {
          const item = (entry ?? {}) as Record<string, unknown>;
          const kind = item.kind;
          return {
            id: id(item.id, "tl", index),
            kind:
              kind === "work" || kind === "education" || kind === "project" ? kind : "work",
            title: str(item.title),
            organization: str(item.organization),
            period: str(item.period),
            sortKey: num(item.sortKey, 0),
            current: bool(item.current) || undefined,
            location: str(item.location) || undefined,
            impact: str(item.impact),
            context: strList(item.context),
            learned: strList(item.learned),
            formalSummary: str(item.formalSummary) || undefined,
            tags: strList(item.tags),
          };
        })
      : fallbackData.timeline,
    socials: Array.isArray(source.socials)
      ? source.socials.map((entry, index) => {
          const item = (entry ?? {}) as Record<string, unknown>;
          return {
            id: id(item.id, "soc", index),
            label: str(item.label),
            url: str(item.url),
          };
        })
      : fallbackData.socials,
  };
}
