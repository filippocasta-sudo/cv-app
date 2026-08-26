"use client";

import { motion } from "framer-motion";
import { Sparkles, Target, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import { Disclosure } from "@/components/ui/Disclosure";
import { useMode } from "@/context/ModeContext";
import type { CareerGoals, SkillGroup } from "@/lib/types";

interface ViewportPanelsProps {
  hardSkills: SkillGroup[];
  softSkills: SkillGroup[];
  goals: CareerGoals;
}

function TintedPanel({
  title,
  icon,
  tint,
  children,
}: {
  title: string;
  icon: ReactNode;
  tint: "mint" | "indigo" | "coral";
  children: ReactNode;
}) {
  const tintClass = {
    mint: "from-mint-soft/90 via-mint-soft/40 to-surface",
    indigo: "from-indigo-soft/90 via-indigo-soft/40 to-surface",
    coral: "from-coral-soft/90 via-coral-soft/40 to-surface",
  }[tint];

  const iconClass = {
    mint: "text-mint",
    indigo: "text-indigo",
    coral: "text-coral",
  }[tint];

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`print-avoid-break neu-card flex max-h-[min(42vh,360px)] min-h-[200px] flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${tintClass} p-4 sm:p-5`}
    >
      <h2
        className={`mb-3 inline-flex shrink-0 items-center gap-2 text-xs font-extrabold tracking-[0.16em] uppercase ${iconClass}`}
      >
        <span className="neu-interactive grid size-7 place-items-center rounded-xl">{icon}</span>
        {title}
      </h2>
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">{children}</div>
    </motion.article>
  );
}

function SkillPreview({ groups, accent }: { groups: SkillGroup[]; accent: "mint" | "indigo" | "coral" }) {
  const titleClass =
    accent === "mint"
      ? "text-mint-strong"
      : accent === "coral"
        ? "text-coral-strong"
        : "text-indigo-strong";
  const borderClass =
    accent === "mint" ? "border-mint/30" : accent === "coral" ? "border-coral/30" : "border-indigo/30";

  return (
    <>
      <ul className="space-y-3">
        {groups.map((group) => (
          <li key={group.id}>
            <p className={`font-heading text-sm font-bold ${titleClass}`}>{group.name}</p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-foreground-muted sm:text-[13px]">
              {group.summary}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-3 border-t border-foreground-faint/10 pt-2">
        <Disclosure label="Dettagli completi" openLabel="Nascondi dettagli">
          <ul className="space-y-3 pt-1">
            {groups.map((group) => (
              <li key={group.id}>
                <p className={`font-heading text-sm font-bold ${titleClass}`}>{group.name}</p>
                {group.details.length > 0 && (
                  <ul className={`mt-1.5 space-y-1 border-l-2 ${borderClass} pl-3`}>
                    {group.details.map((detail) => (
                      <li
                        key={detail}
                        className="text-[12px] leading-relaxed text-foreground-muted sm:text-[13px]"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Disclosure>
      </div>
    </>
  );
}

export function ViewportPanels({ hardSkills, softSkills, goals }: ViewportPanelsProps) {
  const { formal } = useMode();

  return (
    <section
      id="competenze"
      aria-label="Competenze e obiettivi"
      className="scroll-mt-28 mt-5 grid gap-4 lg:grid-cols-3"
    >
      <TintedPanel
        title={formal ? "Competenze tecniche" : "Hard skills"}
        icon={<Wrench className="size-3.5" aria-hidden />}
        tint="mint"
      >
        <SkillPreview groups={hardSkills} accent="mint" />
      </TintedPanel>

      <TintedPanel
        title={formal ? "Competenze trasversali" : "Soft skills"}
        icon={<Sparkles className="size-3.5" aria-hidden />}
        tint="indigo"
      >
        <SkillPreview groups={softSkills} accent="indigo" />
      </TintedPanel>

      <TintedPanel
        title={formal ? "Obiettivo professionale" : "Cosa vorrei fare"}
        icon={<Target className="size-3.5" aria-hidden />}
        tint="coral"
      >
        <p className="text-sm leading-snug font-semibold text-foreground">{goals.headline}</p>
        <p className="mt-3 text-[11px] font-bold tracking-wide text-foreground-muted uppercase">
          Ruoli target
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {goals.targetRoles.map((role) => (
            <li
              key={role}
              className="rounded-full px-2.5 py-1 text-[11px] font-bold text-indigo shadow-neumorphic-inset sm:text-xs"
            >
              {role}
            </li>
          ))}
        </ul>
        <div className="mt-3 border-t border-foreground-faint/10 pt-2">
          <Disclosure label="Contesto e progetti" openLabel="Nascondi contesto">
            <div className="space-y-3 pt-1">
              <div>
                <p className="text-[11px] font-bold tracking-wide text-indigo uppercase">
                  Tipo di progetti
                </p>
                <ul className="mt-1.5 space-y-1.5">
                  {goals.projectTypes.map((item) => (
                    <li
                      key={item}
                      className="text-[12px] leading-relaxed text-foreground-muted sm:text-[13px]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-wide text-mint uppercase">
                  Contesto ideale
                </p>
                <ul className="mt-1.5 space-y-1.5">
                  {goals.idealContext.map((item) => (
                    <li
                      key={item}
                      className="text-[12px] leading-relaxed text-foreground-muted sm:text-[13px]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Disclosure>
        </div>
      </TintedPanel>
    </section>
  );
}
