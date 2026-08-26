"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Shirt, Target } from "lucide-react";
import { useState } from "react";
import { useMode } from "@/context/ModeContext";
import { useI18n } from "@/lib/i18n";
import { ProjectEdgeLink } from "@/components/ui/ProjectEdgeLink";

const FANTA_INSTAGRAM_URL = "https://www.instagram.com/legafantatregnago/";

/** Easter-egg timeline node — visual only, not part of CV data. */
export function FantaTimelineCard() {
  const { formal } = useMode();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  if (formal) return null;

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="no-print print-avoid-break relative pl-11 sm:pl-14"
    >
      <motion.span
        whileHover={{ scale: 1.08 }}
        className="absolute left-0 grid size-8 place-items-center rounded-2xl bg-gradient-to-br from-coral to-coral-strong text-white shadow-neumorphic-sm ring-4 ring-background sm:size-9"
        aria-hidden
      >
        <Shirt className="size-4" />
      </motion.span>

      <div className={`relative neu-card overflow-hidden ${open ? "shadow-neumorphic-lg" : ""}`}>
        <ProjectEdgeLink href={FANTA_INSTAGRAM_URL} label={t("fanta.linkLabel")} />
        <div className="p-4 pr-11 sm:p-5 sm:pr-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-coral-soft px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-coral uppercase shadow-neumorphic-inset">
              {t("timeline.kindProject")}
            </span>
            <span className="ml-auto rounded-lg bg-gradient-to-r from-indigo/15 to-coral/15 px-2.5 py-1 text-xs font-bold text-indigo tabular-nums shadow-neumorphic-inset dark:from-indigo/25 dark:to-coral/20 dark:text-indigo-strong">
              {t("fanta.period")}
            </span>
          </div>

          <h3 className="font-heading mt-2.5 text-lg leading-snug font-bold">{t("fanta.title")}</h3>
          <p className="font-heading mt-0.5 text-sm font-semibold text-foreground-muted">
            {t("fanta.subtitle")}
            <span className="font-normal text-foreground-faint"> · Tregnago (VR)</span>
          </p>

          <p className="mt-3 flex gap-2 text-sm leading-relaxed">
            <Target className="mt-0.5 size-4 shrink-0 text-coral" aria-hidden />
            <span>{t("fanta.impact")}</span>
          </p>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-coral transition hover:opacity-80"
          >
            {open ? t("fanta.collapse") : t("fanta.expand")}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex"
            >
              <ChevronDown className="size-4" aria-hidden />
            </motion.span>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl neu-surface-inset mx-4 mb-4 p-3.5 pr-11 sm:mx-5 sm:mb-5 sm:pr-12">
                <p className="text-[13px] leading-relaxed text-foreground-muted italic">
                  &ldquo;{t("fanta.lore")}&rdquo;
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}
