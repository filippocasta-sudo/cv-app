"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useSyncExternalStore, type PointerEvent } from "react";
import { useI18n } from "@/lib/i18n";

export const MODE_HINT_KEY = "cv-mode-hint-seen";

export function readModeHintSeen(): boolean {
  try {
    return window.localStorage.getItem(MODE_HINT_KEY) === "true";
  } catch {
    return false;
  }
}

export function persistModeHintSeen() {
  try {
    window.localStorage.setItem(MODE_HINT_KEY, "true");
  } catch {
    /* storage unavailable */
  }
}

let hintSeen = false;
let hintHydrated = false;
const hintListeners = new Set<() => void>();

function ensureHintHydrated() {
  if (hintHydrated) return;
  hintHydrated = true;
  hintSeen = readModeHintSeen();
}

function subscribeHint(listener: () => void) {
  ensureHintHydrated();
  hintListeners.add(listener);
  return () => hintListeners.delete(listener);
}

function getHintSnapshot(): boolean {
  ensureHintHydrated();
  return hintSeen;
}

function getHintServerSnapshot(): boolean {
  return true;
}

export function dismissModeHintStore() {
  persistModeHintSeen();
  hintSeen = true;
  for (const listener of hintListeners) listener();
}

/** True until the user dismisses the first-visit hint. */
export function useModeHintFirstVisit(): boolean {
  const seen = useSyncExternalStore(subscribeHint, getHintSnapshot, getHintServerSnapshot);
  return !seen;
}

export function ModeToggleHint({
  visible,
  onDismiss,
  onPointerEnter,
  onPointerLeave,
}: {
  visible: boolean;
  onDismiss: () => void;
  onPointerEnter?: () => void;
  onPointerLeave?: (event: PointerEvent<HTMLDivElement>) => void;
}) {
  const { t } = useI18n();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-labelledby="mode-hint-title"
          aria-describedby="mode-hint-body"
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          className="absolute top-[calc(100%+0.65rem)] left-0 z-50 w-[min(18.5rem,calc(100vw-2rem))]"
        >
          <div
            aria-hidden
            className="absolute -top-1.5 left-6 size-3 rotate-45 rounded-sm bg-surface shadow-neumorphic-sm"
          />

          <div className="relative rounded-2xl border border-indigo/10 bg-surface p-3.5 shadow-neumorphic dark:border-indigo/20">
            <div className="flex items-start justify-between gap-2">
              <p id="mode-hint-title" className="font-heading text-xs font-extrabold tracking-wide text-indigo uppercase">
                {t("header.modeHintTitle")}
              </p>
              <button
                type="button"
                onClick={onDismiss}
                aria-label={t("header.modeHintClose")}
                className="neu-interactive -mr-1 -mt-1 grid size-7 shrink-0 place-items-center rounded-xl text-foreground-muted hover:text-coral"
              >
                <X className="size-3.5" aria-hidden />
              </button>
            </div>

            <div id="mode-hint-body" className="mt-2 space-y-2 text-[13px] leading-relaxed text-foreground-muted">
              <p>
                <strong className="font-bold text-foreground">{t("header.modern")}</strong>{" "}
                {t("header.modeHintDirect")}
              </p>
              <p>
                <strong className="font-bold text-foreground">{t("header.classic")}</strong>{" "}
                {t("header.modeHintInstitutional")}
              </p>
            </div>

            <button
              type="button"
              onClick={onDismiss}
              className="neu-interactive mt-3 w-full rounded-xl bg-gradient-to-r from-coral to-indigo px-3 py-2 text-xs font-bold text-white shadow-neumorphic-sm"
            >
              {t("header.modeHintDismiss")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
