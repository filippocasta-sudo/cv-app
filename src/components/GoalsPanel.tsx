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
      <article className="neu-card gradient-surface-mint-cyan rounded-3xl p-5 sm:p-6">
        <h2 className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.16em] text-white uppercase">
          <Target className="size-3.5" aria-hidden />
          {formal ? t("goals.titleFormal") : t("goals.titleModern")}
        </h2>

        <p className="text-balance-tight mt-3 text-base leading-snug font-semibold text-white sm:text-lg">
          {goals.headline}
        </p>

        <p className="mt-4 text-[11px] font-bold tracking-wide text-white/80 uppercase">
          {t("goals.targetRoles")}
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {goals.targetRoles.map((role) => (
            <li
              key={role}
              className="rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-bold text-white shadow-neumorphic-inset sm:text-sm"
            >
              {role}
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t border-white/20 pt-3">
          <Disclosure label={t("goals.context")} openLabel={t("goals.hideContext")} onGradient>
            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-bold tracking-wide text-white uppercase">
                  {t("goals.projectTypes")}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {goals.projectTypes.map((item) => (
                    <li key={item} className="text-[13px] leading-relaxed text-white/85">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-wide text-white uppercase">
                  {t("goals.idealContext")}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {goals.idealContext.map((item) => (
                    <li key={item} className="text-[13px] leading-relaxed text-white/85">
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
