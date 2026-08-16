"use client";

import { motion } from "framer-motion";
import { ClipboardList, Shirt } from "lucide-react";
import { useState } from "react";
import { useMode } from "@/context/ModeContext";
import { useI18n } from "@/lib/i18n";

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
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 grid size-8 place-items-center rounded-2xl bg-gradient-to-br from-coral to-magenta text-white shadow-neumorphic-sm ring-4 ring-background sm:size-9"
        aria-hidden
      >
        <Shirt className="size-4" />
        <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-amber text-[9px] font-extrabold text-foreground">
          10
        </span>
      </motion.span>

      <div className="neu-card overflow-hidden">
        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-coral-soft px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-coral uppercase shadow-neumorphic-inset">
              {t("fanta.passion")}
            </span>
            <span className="rounded-full bg-indigo-soft px-2 py-0.5 text-[11px] font-bold tracking-wide text-indigo uppercase">
              {t("fanta.easterEgg")}
            </span>
            <span className="ml-auto text-xs font-semibold text-foreground-faint tabular-nums">
              {t("fanta.period")}
            </span>
          </div>

          <h3 className="mt-2.5 text-lg leading-snug">{t("fanta.title")}</h3>
          <p className="mt-0.5 text-sm font-semibold text-foreground-muted">
            {t("fanta.subtitle")}
            <span className="font-normal text-foreground-faint"> · Tregnago (VR)</span>
          </p>

          <p className="mt-3 flex gap-2 text-sm leading-relaxed">
            <ClipboardList className="mt-0.5 size-4 shrink-0 text-coral" aria-hidden />
            <span>{t("fanta.impact")}</span>
          </p>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-coral transition hover:text-coral-strong"
          >
            {open ? t("fanta.collapse") : t("fanta.expand")}
          </button>

          {open && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 rounded-xl neu-surface-inset p-3 text-[13px] leading-relaxed text-foreground-muted italic"
            >
              &ldquo;{t("fanta.lore")}&rdquo;
            </motion.p>
          )}
        </div>
      </div>
    </motion.li>
  );
}
