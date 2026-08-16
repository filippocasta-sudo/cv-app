"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { Disclosure } from "@/components/ui/Disclosure";
import { useMode } from "@/context/ModeContext";
import { useI18n } from "@/lib/i18n";
import type { CareerGoals } from "@/lib/types";

export function GoalsPanel({ goals }: { goals: CareerGoals }) {
  const { formal } = useMode();
  const { t } = useI18n();

  return (
    <motion.section
      id="obiettivi"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      className="print-avoid-break scroll-mt-28 mt-5"
    >
      <article className="neu-card rounded-3xl bg-gradient-to-br from-coral-soft/80 via-surface to-surface p-5 sm:p-6">
        <h2 className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.16em] text-coral uppercase">
          <Target className="size-3.5" aria-hidden />
          {formal ? t("goals.titleFormal") : t("goals.titleModern")}
        </h2>

        <p className="text-balance-tight mt-3 text-base leading-snug font-semibold text-foreground sm:text-lg">
          {goals.headline}
        </p>

        <p className="mt-4 text-[11px] font-bold tracking-wide text-foreground-muted uppercase">
          {t("goals.targetRoles")}
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {goals.targetRoles.map((role) => (
            <li
              key={role}
              className="rounded-full px-3 py-1.5 text-xs font-bold text-indigo shadow-neumorphic-inset sm:text-sm"
            >
              {role}
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t border-foreground-faint/10 pt-3">
          <Disclosure label={t("goals.context")} openLabel={t("goals.hideContext")}>
            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-bold tracking-wide text-indigo uppercase">
                  {t("goals.projectTypes")}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {goals.projectTypes.map((item) => (
                    <li key={item} className="text-[13px] leading-relaxed text-foreground-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-wide text-mint uppercase">
                  {t("goals.idealContext")}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {goals.idealContext.map((item) => (
                    <li key={item} className="text-[13px] leading-relaxed text-foreground-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Disclosure>
        </div>
      </article>
    </motion.section>
  );
}
