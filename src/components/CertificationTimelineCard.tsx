"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Certification } from "@/lib/types";

export function certificationSortKey(year: string): number {
  const parsed = Number.parseInt(year, 10);
  return Number.isFinite(parsed) ? parsed * 100 + 6 : 0;
}

export function CertificationTimelineCard({ cert }: { cert: Certification }) {
  const { t } = useI18n();

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="print-avoid-break relative pl-11 sm:pl-14"
    >
      <span
        className="absolute left-0 grid size-7 place-items-center rounded-xl bg-gradient-to-br from-cert to-cert-strong text-white shadow-neumorphic-sm ring-4 ring-background sm:size-8"
        aria-hidden
      >
        <Award className="size-3.5" />
      </span>

      <article
        className={`overflow-hidden rounded-2xl p-3.5 sm:p-4 ${
          cert.primary
            ? "gradient-surface-cert-indigo shadow-neumorphic-sm"
            : "bg-gradient-to-br from-cert-soft/90 via-surface to-indigo-soft/40 shadow-neumorphic-sm"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
              cert.primary ? "bg-white/20 text-white" : "bg-cert-soft text-cert-strong"
            }`}
          >
            {t("timeline.kindCert")}
          </span>
          <span
            className={`shrink-0 rounded-lg px-2 py-0.5 text-xs font-extrabold tabular-nums ${
              cert.primary
                ? "bg-white/20 text-white"
                : "bg-surface/80 text-foreground shadow-neumorphic-inset"
            }`}
          >
            {cert.year}
          </span>
        </div>

        <h3
          className={`mt-2 text-sm leading-snug font-bold sm:text-[15px] ${
            cert.primary ? "text-white" : "text-foreground"
          }`}
        >
          {cert.name}
        </h3>
        <p
          className={`mt-0.5 text-xs sm:text-[13px] ${
            cert.primary ? "text-white/85" : "text-foreground-muted"
          }`}
        >
          {cert.issuer}
        </p>
        {cert.note && cert.primary && (
          <p className="mt-1.5 text-xs leading-relaxed text-white/80">{cert.note}</p>
        )}
      </article>
    </motion.li>
  );
}
