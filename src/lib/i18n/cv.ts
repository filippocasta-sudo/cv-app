import type { CvData, CvDataLocaleBundle } from "@/lib/types";
import type { Locale } from "@/lib/i18n/ui";

/** Returns CV content for the active locale (Italian is the canonical source). */
export function localizeCv(cv: CvData, locale: Locale): Omit<CvData, "en"> {
  if (locale === "en" && cv.en) {
    return cv.en;
  }

  const { en, ...italian } = cv;
  void en;
  return italian;
}

export function mergeCvLocales(
  italian: Omit<CvData, "en">,
  en?: CvDataLocaleBundle,
): CvData {
  return en ? { ...italian, en } : italian;
}
