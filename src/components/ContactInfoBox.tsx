"use client";

import { motion } from "framer-motion";
import { Car, Languages, Mail, MapPin, Phone } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import type { PersonalInfo } from "@/lib/types";

export function ContactInfoBox({ personal }: { personal: PersonalInfo }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12 }}
      className="print-avoid-break neu-card mt-5 rounded-3xl p-4 sm:p-5"
      aria-label="Info e contatti"
    >
      <h2 className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.16em] text-coral uppercase">
        <MapPin className="size-3.5" aria-hidden />
        Info e contatti
      </h2>
      <ul className="grid gap-2 text-[13px] sm:grid-cols-2">
        <li>
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2 transition hover:text-coral"
          >
            <Mail className="size-3.5 shrink-0 text-foreground-faint" aria-hidden />
            {personal.email}
          </a>
        </li>
        <li>
          <a
            href={`tel:${personal.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 transition hover:text-coral"
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
            className="inline-flex items-center gap-2 transition hover:text-coral"
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
      <div className="mt-3 border-t border-foreground-faint/10 pt-3">
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
          <Languages className="size-3.5" aria-hidden />
          Lingue
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
          {personal.languages.map((language) => (
            <li key={language.name} className="flex gap-2 text-[13px]">
              <span>{language.name}</span>
              <span className="font-bold text-mint">{language.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
