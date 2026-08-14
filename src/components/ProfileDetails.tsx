"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Disclosure } from "@/components/ui/Disclosure";
import type { Certification } from "@/lib/types";

interface ProfileDetailsProps {
  certifications: Certification[];
}

export function ProfileDetails({ certifications }: ProfileDetailsProps) {
  const primaryCerts = certifications.filter((cert) => cert.primary);
  const secondaryCerts = certifications.filter((cert) => !cert.primary);

  return (
    <aside className="scroll-mt-24 space-y-5">
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
    </aside>
  );
}
