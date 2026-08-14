"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Disclosure } from "@/components/ui/Disclosure";
import { useMode } from "@/context/ModeContext";
import type { Certification, Compensation } from "@/lib/types";

interface ProfileDetailsProps {
  certifications: Certification[];
  compensation: Compensation;
}

export function ProfileDetails({ certifications, compensation }: ProfileDetailsProps) {
  const { formal } = useMode();
  const primaryCerts = certifications.filter((cert) => cert.primary);
  const secondaryCerts = certifications.filter((cert) => !cert.primary);

  return (
    <aside className="mt-14 space-y-5 scroll-mt-24">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        className="print-avoid-break neu-card rounded-3xl p-5"
      >
        <h3 className="mb-4 inline-flex items-center gap-2 text-sm font-extrabold tracking-wide uppercase">
          <span className="neu-interactive grid size-8 place-items-center rounded-xl text-amber">
            <Award className="size-4" aria-hidden />
          </span>
          Certificazioni e corsi
        </h3>
        <ul className="space-y-3">
          {primaryCerts.map((cert) => (
            <li key={cert.id} className="print-avoid-break">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-[15px] font-bold">{cert.name}</p>
                <span className="shrink-0 rounded-lg bg-amber-soft px-2 py-0.5 text-xs font-bold text-amber shadow-neumorphic-inset">
                  {cert.year}
                </span>
              </div>
              <p className="text-[13px] text-foreground-faint">{cert.issuer}</p>
              {cert.note && (
                <p className="mt-0.5 text-[13px] leading-relaxed text-foreground-muted">
                  {cert.note}
                </p>
              )}
            </li>
          ))}
        </ul>
        {secondaryCerts.length > 0 && (
          <div className="mt-3 border-t border-foreground-faint/10 pt-2">
            <Disclosure
              label={`Corsi e attestati passati (${secondaryCerts.length})`}
              openLabel="Nascondi corsi passati"
            >
              <ul className="space-y-2.5 border-l-2 border-amber/30 pl-3">
                {secondaryCerts.map((cert) => (
                  <li key={cert.id}>
                    <p className="text-sm font-semibold">{cert.name}</p>
                    <p className="text-[13px] text-foreground-faint">
                      {cert.issuer} · {cert.year}
                    </p>
                  </li>
                ))}
              </ul>
            </Disclosure>
          </div>
        )}
      </motion.section>

      {!formal && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="print-avoid-break neu-card rounded-3xl p-5"
        >
          <Disclosure
            emphasis
            label={`Mostra ${compensation.label.toLowerCase()}`}
            openLabel={`Nascondi ${compensation.label.toLowerCase()}`}
          >
            <div className="rounded-2xl neu-surface-inset p-3.5">
              <p className="mt-1.5 font-display text-2xl font-extrabold gradient-text-mint">
                {compensation.range}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-foreground-muted">
                {compensation.note}
              </p>
            </div>
          </Disclosure>
          <p className="no-print mt-2 px-1 text-xs leading-relaxed text-foreground-faint">
            Meglio dirlo subito che scoprirlo al terzo colloquio.
          </p>
        </motion.section>
      )}
    </aside>
  );
}
