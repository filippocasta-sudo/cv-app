"use client";

import { motion } from "framer-motion";
import {
  Award,
  BadgeEuro,
  Car,
  Languages,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";
import { Disclosure } from "@/components/ui/Disclosure";
import { LinkedInIcon } from "@/components/ui/icons";
import { useMode } from "@/context/ModeContext";
import type {
  Certification,
  Compensation,
  PersonalInfo,
  SkillGroup,
} from "@/lib/types";

interface SidebarProps {
  personal: PersonalInfo;
  hardSkills: SkillGroup[];
  softSkills: SkillGroup[];
  certifications: Certification[];
  compensation: Compensation;
}

function Panel({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="print-avoid-break rounded-2xl border border-border-subtle bg-surface p-5"
    >
      <h3 className="mb-4 inline-flex items-center gap-2 text-sm font-extrabold tracking-wide uppercase">
        <span className="text-sage">{icon}</span>
        {title}
      </h3>
      {children}
    </motion.section>
  );
}

function SkillList({ groups }: { groups: SkillGroup[] }) {
  return (
    <ul className="space-y-3.5">
      {groups.map((group) => (
        <li
          key={group.id}
          className="print-avoid-break border-b border-border-subtle pb-3.5 last:border-0 last:pb-0"
        >
          <p className="font-display text-[15px] font-bold">{group.name}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-foreground-muted">
            {group.summary}
          </p>
          {group.details.length > 0 && (
            <div className="mt-1.5">
              <Disclosure label="Dettagli" openLabel="Nascondi dettagli">
                <ul className="space-y-1.5 border-l-2 border-sage/30 pl-3">
                  {group.details.map((detail) => (
                    <li key={detail} className="text-[13px] leading-relaxed text-foreground-muted">
                      {detail}
                    </li>
                  ))}
                </ul>
              </Disclosure>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Sidebar({
  personal,
  hardSkills,
  softSkills,
  certifications,
  compensation,
}: SidebarProps) {
  const { formal } = useMode();
  const primaryCerts = certifications.filter((cert) => cert.primary);
  const secondaryCerts = certifications.filter((cert) => !cert.primary);

  return (
    <aside id="competenze" className="scroll-mt-24 space-y-5">
      <Panel icon={<Wrench className="size-4" aria-hidden />} title="Hard skills">
        <SkillList groups={hardSkills} />
      </Panel>

      <Panel icon={<Sparkles className="size-4" aria-hidden />} title="Soft skills">
        <SkillList groups={softSkills} />
      </Panel>

      <Panel icon={<Award className="size-4" aria-hidden />} title="Certificazioni">
        <ul className="space-y-3">
          {primaryCerts.map((cert) => (
            <li key={cert.id} className="print-avoid-break">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-[15px] font-bold">{cert.name}</p>
                <span className="shrink-0 rounded-md bg-surface-muted px-1.5 py-0.5 text-xs font-semibold text-foreground-muted">
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
          <div className="mt-3 border-t border-border-subtle pt-2">
            <Disclosure
              label={`Corsi e attestati passati (${secondaryCerts.length})`}
              openLabel="Nascondi corsi passati"
            >
              <ul className="space-y-2.5 border-l-2 border-sage/30 pl-3">
                {secondaryCerts.map((cert) => (
                  <li key={cert.id}>
                    <p className="text-sm font-semibold">{cert.name}</p>
                    <p className="text-[13px] text-foreground-faint">
                      {cert.issuer} · {cert.year}
                    </p>
                    {cert.note && (
                      <p className="text-[13px] leading-relaxed text-foreground-muted">
                        {cert.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </Disclosure>
          </div>
        )}
      </Panel>

      <Panel icon={<MapPin className="size-4" aria-hidden />} title="Info e contatti">
        <ul className="space-y-2.5 text-[13px]">
          <li>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 transition hover:text-sage"
            >
              <Mail className="size-3.5 shrink-0 text-foreground-faint" aria-hidden />
              {personal.email}
            </a>
          </li>
          <li>
            <a
              href={`tel:${personal.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 transition hover:text-sage"
            >
              <Phone className="size-3.5 shrink-0 text-foreground-faint" aria-hidden />
              {personal.phone}
            </a>
          </li>
          <li>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-sage"
            >
              <LinkedInIcon className="size-3.5 shrink-0 text-foreground-faint" />
              Profilo LinkedIn
            </a>
          </li>
          <li className="inline-flex items-center gap-2 text-foreground-muted">
            <MapPin className="size-3.5 shrink-0 text-foreground-faint" aria-hidden />
            {personal.location}
          </li>
          <li className="inline-flex items-center gap-2 text-foreground-muted">
            <Car className="size-3.5 shrink-0 text-foreground-faint" aria-hidden />
            {personal.license}
          </li>
        </ul>

        <div className="mt-4 border-t border-border-subtle pt-3">
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
            <Languages className="size-3.5" aria-hidden />
            Lingue
          </p>
          <ul className="space-y-1.5">
            {personal.languages.map((language) => (
              <li key={language.name} className="flex justify-between gap-3 text-[13px]">
                <span>{language.name}</span>
                <span className="font-semibold text-sage">{language.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="print-avoid-break rounded-2xl border border-border-subtle bg-surface p-5"
      >
        <Disclosure
          emphasis
          label={`Mostra ${compensation.label.toLowerCase()}`}
          openLabel={`Nascondi ${compensation.label.toLowerCase()}`}
        >
          <div className="rounded-lg bg-surface-muted p-3.5">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
              <BadgeEuro className="size-3.5" aria-hidden />
              {compensation.label}
            </p>
            <p className="mt-1.5 font-display text-2xl font-extrabold text-sage">
              {compensation.range}
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-foreground-muted">
              {compensation.note}
            </p>
          </div>
        </Disclosure>
        {!formal && (
          <p className="no-print mt-2 px-1 text-xs leading-relaxed text-foreground-faint">
            Meglio dirlo subito che scoprirlo al terzo colloquio.
          </p>
        )}
      </motion.section>
    </aside>
  );
}
