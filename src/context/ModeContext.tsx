"use client";

import { useCallback, useEffect, useSyncExternalStore, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/ui";

type Theme = "light" | "dark";

interface Snapshot {
  theme: Theme;
  /** Classic CV layout: formal wording, expanded sections, print friendly. */
  formal: boolean;
  locale: Locale;
}

const THEME_KEY = "cv-theme";
const FORMAL_KEY = "cv-formal";
const LOCALE_KEY = "cv-locale";

const SERVER_SNAPSHOT: Snapshot = { theme: "light", formal: false, locale: "it" };

let snapshot: Snapshot = SERVER_SNAPSHOT;
let hydrated = false;
const listeners = new Set<() => void>();

function readStoredSnapshot(): Snapshot {
  try {
    const storedTheme = window.localStorage.getItem(THEME_KEY);
    const theme: Theme =
      storedTheme === "light" || storedTheme === "dark" ? storedTheme : "light";
    const storedLocale = window.localStorage.getItem(LOCALE_KEY);
    const locale: Locale = storedLocale === "en" ? "en" : "it";
    return { theme, formal: window.localStorage.getItem(FORMAL_KEY) === "true", locale };
  } catch {
    return SERVER_SNAPSHOT;
  }
}

function ensureHydrated() {
  if (hydrated) return;
  hydrated = true;
  snapshot = readStoredSnapshot();
}

function getSnapshot(): Snapshot {
  ensureHydrated();
  return snapshot;
}

function getServerSnapshot(): Snapshot {
  return SERVER_SNAPSHOT;
}

function subscribe(listener: () => void) {
  ensureHydrated();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function update(patch: Partial<Snapshot>) {
  snapshot = { ...snapshot, ...patch };
  for (const listener of listeners) listener();
}

/** Keeps the document in sync with the store; no React state involved. */
export function ModeProvider({ children }: { children: ReactNode }) {
  const { theme, formal, locale } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.cvMode = formal ? "formal" : "candid";
    try {
      window.localStorage.setItem(FORMAL_KEY, String(formal));
    } catch {
      /* storage unavailable */
    }
  }, [formal]);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(LOCALE_KEY, locale);
    } catch {
      /* storage unavailable */
    }
  }, [locale]);

  return children;
}

export function useMode() {
  const { theme, formal, locale } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(
    () => update({ theme: snapshot.theme === "dark" ? "light" : "dark" }),
    [],
  );
  const toggleFormal = useCallback(() => update({ formal: !snapshot.formal }), []);
  const setLocale = useCallback((next: Locale) => update({ locale: next }), []);
  const toggleLocale = useCallback(
    () => update({ locale: snapshot.locale === "it" ? "en" : "it" }),
    [],
  );

  return { theme, formal, locale, toggleTheme, toggleFormal, setLocale, toggleLocale };
}
