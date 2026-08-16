import type { CvData, CvDataLocaleBundle } from "@/lib/types";

export type AdminLocale = "it" | "en";

export function italianBundle(cv: CvData): CvDataLocaleBundle {
  const { en, ...bundle } = cv;
  void en;
  return bundle;
}

function byId<T extends { id: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]));
}

/** Align EN entries with IT structure (IDs, ordering, non-text fields). */
export function syncEnFromItalian(
  italian: CvDataLocaleBundle,
  english: CvDataLocaleBundle,
): CvDataLocaleBundle {
  const enTimeline = byId(english.timeline);
  const enHard = byId(english.hardSkills);
  const enSoft = byId(english.softSkills);
  const enCerts = byId(english.certifications);
  const enCan = byId(english.canDo);
  const enCannot = byId(english.cannotDo);
  const enSocials = byId(english.socials);

  return {
    personal: {
      ...italian.personal,
      name: english.personal.name || italian.personal.name,
      roles: english.personal.roles.length ? english.personal.roles : [...italian.personal.roles],
      statusBadge: english.personal.statusBadge || italian.personal.statusBadge,
      intro: english.personal.intro || italian.personal.intro,
      formalIntro: english.personal.formalIntro || italian.personal.formalIntro,
      location: english.personal.location || italian.personal.location,
      license: english.personal.license || italian.personal.license,
      birthDate: english.personal.birthDate || italian.personal.birthDate,
      languages: italian.personal.languages.map((lang, index) => {
        const enLang = english.personal.languages[index];
        return enLang
          ? { name: enLang.name || lang.name, level: enLang.level || lang.level }
          : { ...lang };
      }),
      email: italian.personal.email,
      phone: italian.personal.phone,
      linkedin: italian.personal.linkedin,
    },
    goals: {
      headline: english.goals.headline || italian.goals.headline,
      targetRoles: english.goals.targetRoles.length
        ? english.goals.targetRoles
        : [...italian.goals.targetRoles],
      projectTypes: english.goals.projectTypes.length
        ? english.goals.projectTypes
        : [...italian.goals.projectTypes],
      idealContext: english.goals.idealContext.length
        ? english.goals.idealContext
        : [...italian.goals.idealContext],
    },
    hardSkills: italian.hardSkills.map((group) => {
      const enGroup = enHard.get(group.id);
      return enGroup
        ? { ...enGroup, id: group.id }
        : { ...group };
    }),
    softSkills: italian.softSkills.map((group) => {
      const enGroup = enSoft.get(group.id);
      return enGroup
        ? { ...enGroup, id: group.id }
        : { ...group };
    }),
    certifications: italian.certifications.map((cert) => {
      const enCert = enCerts.get(cert.id);
      return enCert
        ? {
            ...enCert,
            id: cert.id,
            year: cert.year,
            primary: cert.primary,
          }
        : { ...cert };
    }),
    canDo: italian.canDo.map((item) => {
      const enItem = enCan.get(item.id);
      return enItem ? { ...enItem, id: item.id } : { ...item };
    }),
    cannotDo: italian.cannotDo.map((item) => {
      const enItem = enCannot.get(item.id);
      return enItem ? { ...enItem, id: item.id } : { ...item };
    }),
    compensation: {
      label: english.compensation.label || italian.compensation.label,
      range: english.compensation.range || italian.compensation.range,
      note: english.compensation.note || italian.compensation.note,
    },
    timeline: italian.timeline.map((entry) => {
      const enEntry = enTimeline.get(entry.id);
      return enEntry
        ? {
            ...enEntry,
            id: entry.id,
            kind: entry.kind,
            sortKey: entry.sortKey,
            current: entry.current,
          }
        : { ...entry };
    }),
    socials: italian.socials.map((link) => {
      const enLink = enSocials.get(link.id);
      return enLink
        ? { ...enLink, id: link.id, url: link.url }
        : { ...link };
    }),
  };
}

export function ensureCvWithEn(cv: CvData): CvData {
  const italian = italianBundle(cv);
  const english = cv.en ?? italian;
  return { ...cv, en: syncEnFromItalian(italian, english) };
}

export function getActiveBundle(cv: CvData, locale: AdminLocale): CvDataLocaleBundle {
  if (locale === "it") return italianBundle(cv);
  return cv.en ?? italianBundle(cv);
}

export type LocaleBundleKey = keyof CvDataLocaleBundle;

export function patchActiveBundle<K extends LocaleBundleKey>(
  cv: CvData,
  locale: AdminLocale,
  key: K,
  value: CvDataLocaleBundle[K],
): CvData {
  if (locale === "it") {
    return { ...cv, [key]: value };
  }

  const italian = italianBundle(cv);
  const en = { ...(cv.en ?? italian), [key]: value };
  return { ...cv, en };
}
