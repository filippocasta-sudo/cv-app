"use client";

import { useCallback, useMemo } from "react";
import { useMode } from "@/context/ModeContext";
import { localizeCv } from "@/lib/i18n/cv";
import { UI, type Locale, type UiKey } from "@/lib/i18n/ui";
import type { CvData } from "@/lib/types";

export type { Locale, UiKey };
export { UI, localizeCv };

export function useI18n() {
  const { locale } = useMode();

  const t = useCallback(
    (key: UiKey) => UI[locale][key] ?? UI.it[key] ?? key,
    [locale],
  );

  return { locale, t };
}

export function useLocalizedCv(cv: CvData) {
  const { locale } = useMode();
  return useMemo(() => localizeCv(cv, locale), [cv, locale]);
}
