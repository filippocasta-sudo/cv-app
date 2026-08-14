"use client";

import { motion } from "framer-motion";
import { Building2, Compass, Target } from "lucide-react";
import { useMode } from "@/context/ModeContext";
import type { CareerGoals as CareerGoalsData } from "@/lib/types";

export function CareerGoals({ goals }: { goals: CareerGoalsData }) {
  const { formal } = useMode();

  const columns = [
    { icon: Compass, title: "Tipo di progetti", items: goals.projectTypes, accent: "text-indigo" },
    { icon: Building2, title: "Contesto ideale", items: goals.idealContext, accent: "text-mint" },
  ];

  return (
    <motion.section
      id="obiettivi"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="print-avoid-break scroll-mt-24"
    >
      <div className="neu-card relative overflow-hidden rounded-3xl p-5 sm:p-7">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />

        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="neu-interactive grid size-8 place-items-center rounded-xl text-coral">
              <Target className="size-4" aria-hidden />
            </span>
            <p className="text-xs font-bold tracking-[0.18em] text-coral uppercase">
              {formal ? "Obiettivo professionale" : "Cosa vorrei fare"}
            </p>
          </div>

          <h2 className="text-balance-tight mt-3 max-w-3xl text-xl leading-snug sm:text-2xl">
            {goals.headline}
          </h2>

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
              Ruoli target
            </p>
            <ul className="flex flex-wrap gap-2">
              {goals.targetRoles.map((role) => (
                <li
                  key={role}
                  className="neu-interactive rounded-full px-3.5 py-1.5 text-sm font-bold text-indigo"
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {columns.map(({ icon: Icon, title, items, accent }) => (
              <div key={title} className="rounded-2xl neu-surface-inset p-4">
                <p
                  className={`mb-2 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase ${accent}`}
                >
                  <Icon className="size-3.5" aria-hidden />
                  {title}
                </p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-foreground-muted"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-r from-coral to-indigo"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
