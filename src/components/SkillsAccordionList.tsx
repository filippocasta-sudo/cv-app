"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Sparkles, Wrench } from "lucide-react";
import { useState } from "react";
import { useMode } from "@/context/ModeContext";
import { useI18n } from "@/lib/i18n";
import type { SkillGroup } from "@/lib/types";

function SkillAccordionItem({
  group,
  accent,
}: {
  group: SkillGroup;
  accent: "mint" | "indigo";
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const titleClass = accent === "mint" ? "text-mint-strong" : "text-indigo-strong";
  const borderClass = accent === "mint" ? "border-mint/30" : "border-indigo/30";
  const tint =
    accent === "mint"
      ? "bg-gradient-to-br from-mint-soft/60 via-surface to-surface"
      : "bg-gradient-to-br from-indigo-soft/60 via-surface to-surface";

  return (
    <article className={`neu-card overflow-hidden rounded-2xl ${tint}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="no-print flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className={`font-display text-sm font-bold ${titleClass}`}>{group.name}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="size-4 text-foreground-muted" aria-hidden />
        </motion.span>
      </button>

      <h3 className={`hidden px-4 pt-4 font-display text-sm font-bold print:block ${titleClass}`}>
        {group.name}
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="print-block overflow-hidden"
          >
            <div className="space-y-2 px-4 pb-4">
              <p className="text-[13px] leading-relaxed text-foreground-muted">{group.summary}</p>

              {group.details.length > 0 && (
                <div>
                  <button
                    type="button"
                    onClick={() => setDetailsOpen((value) => !value)}
                    aria-expanded={detailsOpen}
                    className="no-print inline-flex items-center gap-1.5 text-xs font-semibold text-foreground-muted transition hover:text-indigo"
                  >
                    {detailsOpen ? t("skills.hideDetails") : t("skills.showDetails")}
                    <motion.span
                      animate={{ rotate: detailsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="size-3.5" aria-hidden />
                    </motion.span>
                  </button>

                  {detailsOpen && (
                    <ul className={`mt-2 space-y-1.5 border-l-2 ${borderClass} pl-3 print-block`}>
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
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export function HardSkillsColumn({ groups }: { groups: SkillGroup[] }) {
  const { formal } = useMode();
  const { t } = useI18n();

  return (
    <aside id="competenze-hard" aria-label={t("skills.hardModern")} className="scroll-mt-28">
      <h2 className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.16em] text-mint uppercase">
        <Wrench className="size-3.5" aria-hidden />
        {formal ? t("skills.hardFormal") : t("skills.hardModern")}
      </h2>
      <ul className="space-y-3 py-1">
        {groups.map((group) => (
          <li key={group.id} className="px-0.5">
            <SkillAccordionItem group={group} accent="mint" />
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function SoftSkillsColumn({ groups }: { groups: SkillGroup[] }) {
  const { formal } = useMode();
  const { t } = useI18n();

  return (
    <aside id="competenze-soft" aria-label={t("skills.softModern")} className="scroll-mt-28">
      <h2 className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.16em] text-indigo uppercase">
        <Sparkles className="size-3.5" aria-hidden />
        {formal ? t("skills.softFormal") : t("skills.softModern")}
      </h2>
      <ul className="space-y-3 py-1">
        {groups.map((group) => (
          <li key={group.id} className="px-0.5">
            <SkillAccordionItem group={group} accent="indigo" />
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** @deprecated Used only for legacy layouts; prefer HardSkillsColumn / SoftSkillsColumn. */
export function SkillsAccordionList({
  hardSkills,
  softSkills,
}: {
  hardSkills: SkillGroup[];
  softSkills: SkillGroup[];
}) {
  const { t } = useI18n();

  return (
    <section id="competenze" aria-label={t("skills.aria")} className="scroll-mt-28 mt-5 grid gap-6 lg:grid-cols-2 lg:gap-8">
      <HardSkillsColumn groups={hardSkills} />
      <SoftSkillsColumn groups={softSkills} />
    </section>
  );
}
