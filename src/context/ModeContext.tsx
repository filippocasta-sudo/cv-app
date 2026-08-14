"use client";

import { useCallback, useEffect, useSyncExternalStore, type ReactNode } from "react";

type Theme = "light" | "dark";

interface Snapshot {
  theme: Theme;
  /** Classic CV layout: formal wording, expanded sections, print friendly. */
  formal: boolean;
}

const THEME_KEY = "cv-theme";
const FORMAL_KEY = "cv-formal";

/**
 * Preferences live in a module-level store read through `useSyncExternalStore`.
 * The server snapshot stays at the defaults, so hydration matches the HTML and
 * React re-renders once with the stored preferences right after mount.
 */
const SERVER_SNAPSHOT: Snapshot = { theme: "light", formal: false };

let snapshot: Snapshot = SERVER_SNAPSHOT;
let hydrated = false;
const listeners = new Set<() => void>();

function readStoredSnapshot(): Snapshot {
  try {
    const storedTheme = window.localStorage.getItem(THEME_KEY);
    const theme: Theme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    return { theme, formal: window.localStorage.getItem(FORMAL_KEY) === "true" };
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
  const { theme, formal } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage unavailable (private mode): the in-memory store still works */
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.cvMode = formal ? "formal" : "candid";
    try {
      window.localStorage.setItem(FORMAL_KEY, String(formal));
    } catch {
      /* storage unavailable (private mode): the in-memory store still works */
    }
  }, [formal]);

  return children;
}

export function useMode() {
  const { theme, formal } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(
    () => update({ theme: snapshot.theme === "dark" ? "light" : "dark" }),
    [],
  );
  const toggleFormal = useCallback(() => update({ formal: !snapshot.formal }), []);

  return { theme, formal, toggleTheme, toggleFormal };
}
