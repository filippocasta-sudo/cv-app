"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Cake,
  ChevronDown,
  GraduationCap,
  Lightbulb,
  ExternalLink,
  Pizza,
  Rocket,
  Target,
} from "lucide-react";
import { useMemo, useState } from "react";
import { FantaTimelineCard } from "@/components/easter-eggs/FantaTimelineCard";
import { Section } from "@/components/ui/Section";
import { useMode } from "@/context/ModeContext";
import { useI18n } from "@/lib/i18n";
import type { UiKey } from "@/lib/i18n/ui";
import type { TimelineEntry, TimelineKind } from "@/lib/types";

const KIND_STYLES: Record<
  TimelineKind,
  {
    labelKey: UiKey;
    icon: typeof Briefcase;
    dot: string;
    chip: string;
    rail: string;
    accent: string;
  }
> = {
  work: {
    labelKey: "timeline.kindWork",
    icon: Briefcase,
    dot: "bg-gradient-to-br from-indigo to-indigo-strong text-white",
    chip: "bg-indigo-soft text-indigo shadow-neumorphic-inset",
    rail: "from-indigo/50",
    accent: "text-indigo",
  },
  education: {
    labelKey: "timeline.kindEducation",
    icon: GraduationCap,
    dot: "bg-gradient-to-br from-indigo-strong to-indigo text-white",
    chip: "bg-indigo-soft text-indigo shadow-neumorphic-inset",
    rail: "from-indigo/50",
    accent: "text-indigo",
  },
  project: {
    labelKey: "timeline.kindProject",
    icon: Rocket,
    dot: "bg-gradient-to-br from-coral to-coral-strong text-white",
    chip: "bg-coral-soft text-coral shadow-neumorphic-inset",
    rail: "from-coral/50",
    accent: "text-coral",
  },
};

const FILTERS = [
  { key: "all", labelKey: "timeline.filterAll" as const },
  { key: "work", labelKey: "timeline.filterWork" as const },
  { key: "education", labelKey: "timeline.filterEducation" as const },
  { key: "project", labelKey: "timeline.filterProject" as const },
] as const;

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  const { formal } = useMode();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const config = KIND_STYLES[entry.kind];
  const Icon = config.icon;
  const expanded = formal || open;
  const isEducation = entry.kind === "education";
  const hasDetails = isEducation
    ? entry.context.length > 0
    : entry.context.length > 0 || entry.learned.length > 0;
  const isPizza = entry.id === "tl-ristorazione";
  const pizzaTip = t("timeline.pizzaTip");

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="print-avoid-break relative pl-11 sm:pl-14"
    >
      <motion.span
        whileHover={{ scale: 1.08 }}
        className={`absolute left-0 grid size-8 place-items-center rounded-2xl shadow-neumorphic-sm ring-4 ring-background sm:size-9 ${config.dot}`}
        aria-hidden
      >
        <Icon className="size-4" />
      </motion.span>

      <div className={`neu-card overflow-hidden ${expanded ? "shadow-neumorphic-lg" : ""}`}>
        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase ${config.chip}`}
            >
              {t(config.labelKey)}
            </span>
            {entry.current && (
              <span className="rounded-full bg-gradient-to-r from-coral to-indigo px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-white uppercase shadow-neumorphic-sm">
                {t("timeline.inProgress")}
              </span>
            )}
            {isPizza && !formal && (
              <span className="group/pizza relative inline-flex" title={pizzaTip}>
                <span className="neu-interactive grid size-7 place-items-center rounded-xl text-coral">
                  <Pizza className="size-3.5" aria-hidden />
                </span>
                <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden w-max max-w-[200px] -translate-x-1/2 rounded-lg px-2 py-1 text-[10px] font-semibold text-foreground shadow-neumorphic-sm neu-surface-inset group-hover/pizza:block">
                  {pizzaTip}
                </span>
              </span>
            )}
            <span className="ml-auto rounded-lg bg-gradient-to-r from-indigo/15 to-coral/15 px-2.5 py-1 text-xs font-extrabold text-indigo tabular-nums shadow-neumorphic-inset dark:from-indigo/25 dark:to-coral/20 dark:text-indigo-strong">
              {entry.period}
            </span>
          </div>

          <h3 className="mt-2.5 text-lg leading-snug">{entry.title}</h3>
          <p className="mt-0.5 text-sm font-semibold text-foreground-muted">
            {entry.organization}
            {entry.location && (
              <span className="font-normal text-foreground-faint"> · {entry.location}</span>
            )}
          </p>

          {entry.kind === "project" && entry.link && (
            <a
              href={entry.link}
              target="_blank"
              rel="noreferrer"
              className={`no-print mt-2 inline-flex items-center gap-1.5 text-sm font-bold transition hover:opacity-80 ${config.accent}`}
            >
              <ExternalLink className="size-3.5" aria-hidden />
              {t("timeline.projectLink")}
            </a>
          )}

          <p className="mt-3 flex gap-2 text-sm leading-relaxed">
            <Target className={`mt-0.5 size-4 shrink-0 ${config.accent}`} aria-hidden />
            <span>{formal && entry.formalSummary ? entry.formalSummary : entry.impact}</span>
          </p>

          {entry.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-lg px-2 py-0.5 text-[11px] font-bold text-foreground-muted shadow-neumorphic-inset"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {hasDetails && !formal && (
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              className={`no-print mt-3 inline-flex items-center gap-1.5 text-sm font-semibold transition ${config.accent} hover:opacity-80`}
            >
              {open ? t("timeline.collapse") : t("timeline.expand")}
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                <ChevronDown className="size-4" aria-hidden />
              </motion.span>
            </button>
          )}
        </div>

        <AnimatePresence initial={false}>
          {expanded && hasDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="print-block overflow-hidden"
            >
              <div className="space-y-4 border-t border-foreground-faint/10 px-4 py-4 sm:px-5">
                {entry.context.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-xs font-bold tracking-[0.14em] text-foreground-faint uppercase">
                      {t(isEducation ? "timeline.whatIStudied" : "timeline.whatIDid")}
                    </p>
                    <ul className="space-y-1.5">
                      {entry.context.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-[13px] leading-relaxed text-foreground-muted"
                        >
                          <span
                            className={`mt-1.5 size-1.5 shrink-0 rounded-full bg-gradient-to-r ${config.rail} to-transparent`}
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!isEducation && entry.learned.length > 0 && (
                  <div className="rounded-2xl neu-surface-inset p-3.5">
                    <p className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.14em] text-foreground-faint uppercase">
                      <Lightbulb className="size-3.5" aria-hidden />
                      {t("timeline.whatILearned")}
                    </p>
                    <ul className="space-y-1.5">
                      {entry.learned.map((item) => (
                        <li key={item} className="text-[13px] leading-relaxed italic">
                          &ldquo;{item}&rdquo;
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}

function BirthDateMarker({ birthDate }: { birthDate: string }) {
  const { t } = useI18n();

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative flex justify-center pb-8"
    >
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-coral to-indigo text-white shadow-neumorphic-sm ring-4 ring-background sm:size-11">
          <Cake className="size-5" aria-hidden />
        </span>
        <span className="mt-2.5 rounded-full bg-gradient-to-r from-coral/15 to-indigo/15 px-3.5 py-1 text-sm font-extrabold text-foreground tabular-nums shadow-neumorphic-inset">
          {birthDate}
        </span>
        <span className="mt-1 text-[11px] font-bold tracking-[0.12em] text-foreground-faint uppercase">
          {t("timeline.birthDate")}
        </span>
      </div>
    </motion.li>
  );
}

export function Timeline({
  entries,
  classicOnly = false,
  birthDate,
}: {
  entries: TimelineEntry[];
  classicOnly?: boolean;
  birthDate?: string;
}) {
  const { formal } = useMode();
  const { t } = useI18n();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const classic = classicOnly || formal;

  const ordered = useMemo(() => {
    const scoped = classic
      ? entries.filter((entry) => entry.kind === "work" || entry.kind === "education")
      : entries;
    return [...scoped].sort((a, b) => b.sortKey - a.sortKey);
  }, [entries, classic]);

  const visible = useMemo(
    () => (filter === "all" || classic ? ordered : ordered.filter((entry) => entry.kind === filter)),
    [ordered, filter, classic],
  );

  const counts = useMemo(
    () => ({
      all: ordered.length,
      work: ordered.filter((entry) => entry.kind === "work").length,
      education: ordered.filter((entry) => entry.kind === "education").length,
      project: ordered.filter((entry) => entry.kind === "project").length,
    }),
    [ordered],
  );

  return (
    <Section
      id="percorso"
      eyebrow={t("timeline.eyebrow")}
      title={classic ? t("timeline.titleFormal") : t("timeline.titleModern")}
      description={classic ? t("timeline.descFormal") : t("timeline.descModern")}
    >
      {!classic && (
        <div className="no-print mb-6 flex flex-wrap gap-2">
          {FILTERS.map((option) => {
            const active = filter === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setFilter(option.key)}
                aria-pressed={active}
                className={`rounded-2xl px-3.5 py-1.5 text-[13px] font-bold transition ${
                  active
                    ? "bg-gradient-to-r from-coral to-indigo text-white shadow-neumorphic-sm"
                    : "neu-interactive text-foreground-muted hover:text-foreground"
                }`}
              >
                {t(option.labelKey)}
                <span
                  className={`ml-1.5 tabular-nums ${active ? "text-white/75" : "text-foreground-faint"}`}
                >
                  {counts[option.key]}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="relative">
        <span
          className="absolute top-2 bottom-2 left-4 w-0.5 rounded-full bg-gradient-to-b from-coral via-indigo to-indigo-strong opacity-40 sm:left-[18px]"
          aria-hidden
        />
        <ul className="space-y-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((entry) => (
              <TimelineCard key={entry.id} entry={entry} />
            ))}
          </AnimatePresence>
          {!classic && (filter === "all" || filter === "project") && <FantaTimelineCard />}
          {birthDate && <BirthDateMarker birthDate={birthDate} />}
        </ul>
      </div>
    </Section>
  );
}
