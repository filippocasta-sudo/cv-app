"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ChevronDown,
  GraduationCap,
  Lightbulb,
  Rocket,
  Target,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { useMode } from "@/context/ModeContext";
import type { TimelineEntry, TimelineKind } from "@/lib/types";

const KIND_CONFIG: Record<
  TimelineKind,
  { label: string; icon: typeof Briefcase; dot: string; chip: string; rail: string }
> = {
  work: {
    label: "Esperienza",
    icon: Briefcase,
    dot: "bg-kind-work text-white",
    chip: "bg-kind-work-soft text-kind-work border-kind-work/35",
    rail: "border-kind-work/40",
  },
  education: {
    label: "Formazione",
    icon: GraduationCap,
    dot: "bg-kind-education text-white",
    chip: "bg-kind-education-soft text-kind-education border-kind-education/35",
    rail: "border-kind-education/40",
  },
  project: {
    label: "Progetto",
    icon: Rocket,
    dot: "bg-kind-project text-white",
    chip: "bg-kind-project-soft text-kind-project border-kind-project/35",
    rail: "border-kind-project/40",
  },
};

const FILTERS = [
  { key: "all", label: "Tutto" },
  { key: "work", label: "Esperienza" },
  { key: "education", label: "Formazione" },
  { key: "project", label: "Progetti" },
] as const;

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  const { formal } = useMode();
  const [open, setOpen] = useState(false);
  const config = KIND_CONFIG[entry.kind];
  const Icon = config.icon;
  const expanded = formal || open;
  const hasDetails = entry.context.length > 0 || entry.learned.length > 0;

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="print-avoid-break relative pl-11 sm:pl-14"
    >
      <span
        className={`absolute left-0 grid size-8 place-items-center rounded-xl shadow-sm ring-4 ring-background sm:size-9 ${config.dot}`}
        aria-hidden
      >
        <Icon className="size-4" />
      </span>

      <div
        className={`rounded-2xl border bg-surface transition ${
          expanded ? "border-border-strong" : "border-border-subtle hover:border-border-strong"
        }`}
      >
        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase ${config.chip}`}
            >
              {config.label}
            </span>
            {entry.current && (
              <span className="rounded-full bg-sage px-2 py-0.5 text-[11px] font-bold tracking-wide text-white uppercase">
                In corso
              </span>
            )}
            <span className="ml-auto text-xs font-semibold text-foreground-faint tabular-nums">
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

          <p className="mt-3 flex gap-2 text-sm leading-relaxed">
            <Target className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden />
            <span>{formal && entry.formalSummary ? entry.formalSummary : entry.impact}</span>
          </p>

          {entry.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md bg-surface-muted px-2 py-0.5 text-[11px] font-semibold text-foreground-muted"
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
              className="no-print mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sage transition hover:text-sage-strong"
            >
              {open ? "Chiudi dettagli" : "Espandi dettagli"}
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
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="print-block overflow-hidden"
            >
              <div className="space-y-4 border-t border-border-subtle px-4 py-4 sm:px-5">
                {entry.context.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-xs font-bold tracking-[0.14em] text-foreground-faint uppercase">
                      Cosa facevo
                    </p>
                    <ul className="space-y-1.5">
                      {entry.context.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-[13px] leading-relaxed text-foreground-muted"
                        >
                          <span
                            className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {entry.learned.length > 0 && (
                  <div className="rounded-xl bg-surface-muted p-3.5">
                    <p className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.14em] text-foreground-faint uppercase">
                      <Lightbulb className="size-3.5" aria-hidden />
                      Cosa ho imparato
                    </p>
                    <ul className="space-y-1.5">
                      {entry.learned.map((item) => (
                        <li key={item} className="text-[13px] leading-relaxed italic">
                          “{item}”
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

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const { formal } = useMode();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

  const ordered = useMemo(
    () => [...entries].sort((a, b) => b.sortKey - a.sortKey),
    [entries],
  );
  const visible = useMemo(
    () => (filter === "all" || formal ? ordered : ordered.filter((entry) => entry.kind === filter)),
    [ordered, filter, formal],
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
      eyebrow="Percorso"
      title={formal ? "Esperienze, formazione e progetti" : "Da dove vengo e cosa ho combinato"}
      description={
        formal
          ? "Percorso professionale, formativo e progettuale in ordine cronologico inverso."
          : "Lavoro, studio e progetti personali in un'unica linea temporale. Ogni card dice subito cosa ho portato a casa; il resto si apre solo se ti interessa."
      }
    >
      {!formal && (
        <div className="no-print mb-6 flex flex-wrap gap-2">
          {FILTERS.map((option) => {
            const active = filter === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setFilter(option.key)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-[13px] font-semibold transition ${
                  active
                    ? "border-sage bg-sage text-white"
                    : "border-border-subtle bg-surface text-foreground-muted hover:border-sage/50 hover:text-foreground"
                }`}
              >
                {option.label}
                <span className={`ml-1.5 tabular-nums ${active ? "text-white/70" : "text-foreground-faint"}`}>
                  {counts[option.key]}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="relative">
        <span
          className="absolute top-2 bottom-2 left-4 w-px bg-border-subtle sm:left-[18px]"
          aria-hidden
        />
        <ul className="space-y-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((entry) => (
              <TimelineCard key={entry.id} entry={entry} />
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </Section>
  );
}
