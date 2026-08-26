"use client";

import { buildAtsKeywords } from "@/lib/atsKeywords";
import { introParagraphs } from "@/lib/hero";
import { useI18n } from "@/lib/i18n";
import type { CvData, TimelineEntry } from "@/lib/types";

function TimelineBlock({
  entries,
  summaryKey,
  inProgressLabel,
}: {
  entries: TimelineEntry[];
  summaryKey: "formalSummary" | "impact";
  inProgressLabel: string;
}) {
  return (
    <ul className="ats-list space-y-3">
      {entries.map((entry) => (
        <li key={entry.id} className="print-avoid-break">
          <p className="font-bold">
            {entry.title}
            {entry.current ? ` (${inProgressLabel})` : ""}
          </p>
          <p className="text-[10.5pt]">
            {entry.organization}
            {entry.location ? ` · ${entry.location}` : ""} · {entry.period}
          </p>
          <p className="mt-1 text-[10.5pt] leading-relaxed">
            {summaryKey === "formalSummary" && entry.formalSummary
              ? entry.formalSummary
              : entry.impact}
          </p>
          {entry.tags.length > 0 && (
            <p className="mt-1 text-[10pt] text-neutral-700">{entry.tags.join(" · ")}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

export function AtsPrintCv({ cv }: { cv: CvData }) {
  const { t } = useI18n();
  const keywords = buildAtsKeywords(cv);
  const summary = introParagraphs(cv.personal.formalIntro).join(" ");

  const work = cv.timeline
    .filter((entry) => entry.kind === "work")
    .sort((a, b) => b.sortKey - a.sortKey);
  const education = cv.timeline
    .filter((entry) => entry.kind === "education")
    .sort((a, b) => b.sortKey - a.sortKey);
  const certifications = [...cv.certifications].sort((a, b) => b.year.localeCompare(a.year));

  return (
    <article
      aria-label={t("ats.documentLabel")}
      className="ats-print-cv mx-auto hidden max-w-[210mm] bg-white px-8 py-10 text-[11pt] leading-snug text-black print:block"
    >
      <header className="border-b border-neutral-300 pb-4">
        <h1 className="text-[20pt] font-bold tracking-tight">{cv.personal.name}</h1>
        <p className="mt-1 font-semibold">{cv.personal.roles.join(" · ")}</p>
        <p className="mt-2 text-[10.5pt]">
          {cv.personal.email} · {cv.personal.phone} · {cv.personal.location}
        </p>
        <p className="text-[10.5pt]">{cv.personal.linkedin}</p>
      </header>

      <section className="mt-5 print-avoid-break">
        <h2 className="ats-heading">{t("ats.summary")}</h2>
        <p className="mt-2 leading-relaxed">{summary}</p>
      </section>

      <section className="mt-5 print-avoid-break">
        <h2 className="ats-heading">{t("ats.keywords")}</h2>
        <p className="mt-2 leading-relaxed">{keywords.join(" · ")}</p>
      </section>

      <section className="mt-5">
        <h2 className="ats-heading">{t("ats.experience")}</h2>
        <div className="mt-2">
          <TimelineBlock entries={work} summaryKey="formalSummary" inProgressLabel={t("timeline.inProgress")} />
        </div>
      </section>

      <section className="mt-5">
        <h2 className="ats-heading">{t("ats.education")}</h2>
        <div className="mt-2">
          <TimelineBlock entries={education} summaryKey="formalSummary" inProgressLabel={t("timeline.inProgress")} />
        </div>
      </section>

      {certifications.length > 0 && (
        <section className="mt-5 print-avoid-break">
          <h2 className="ats-heading">{t("ats.certifications")}</h2>
          <ul className="ats-list mt-2 space-y-1.5">
            {certifications.map((cert) => (
              <li key={cert.id}>
                <span className="font-semibold">{cert.name}</span>
                {" — "}
                {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-5 print-avoid-break">
        <h2 className="ats-heading">{t("ats.skills")}</h2>
        <div className="mt-2 space-y-3">
          <div>
            <h3 className="font-bold">{t("skills.hardFormal")}</h3>
            <ul className="ats-list mt-1 space-y-2">
              {cv.hardSkills.map((group) => (
                <li key={group.id}>
                  <span className="font-semibold">{group.name}:</span> {group.summary}
                  {group.details.length > 0 && (
                    <span> — {group.details.join("; ")}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold">{t("skills.softFormal")}</h3>
            <ul className="ats-list mt-1 space-y-1.5">
              {cv.softSkills.map((group) => (
                <li key={group.id}>
                  <span className="font-semibold">{group.name}:</span> {group.summary}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-5 print-avoid-break">
        <h2 className="ats-heading">{t("contact.languages")}</h2>
        <p className="mt-2">
          {cv.personal.languages.map((lang) => `${lang.name} (${lang.level})`).join(" · ")}
        </p>
      </section>
    </article>
  );
}
