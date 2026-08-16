"use client";

import { motion } from "framer-motion";
import { Car, Languages, Mail, MapPin, Phone } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { useI18n } from "@/lib/i18n";
import type { PersonalInfo } from "@/lib/types";

export function ContactInfoBox({ personal }: { personal: PersonalInfo }) {
  const { t } = useI18n();

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12 }}
      className="print-avoid-break neu-card gradient-surface-coral-indigo mt-5 rounded-3xl p-4 sm:p-5"
      aria-label={t("contact.infoTitle")}
    >
      <h2 className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.16em] text-white uppercase">
        <MapPin className="size-3.5" aria-hidden />
        {t("contact.infoTitle")}
      </h2>
      <ul className="grid gap-2 text-[13px] sm:grid-cols-2">
        <li>
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-white/80"
          >
            <Mail className="size-3.5 shrink-0 text-white/85" aria-hidden />
            {personal.email}
          </a>
        </li>
        <li>
          <a
            href={`tel:${personal.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-white/80"
          >
            <Phone className="size-3.5 shrink-0 text-white/85" aria-hidden />
            {personal.phone}
          </a>
        </li>
        <li>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-white/80"
          >
            <LinkedInIcon className="size-3.5 shrink-0 text-white/85" />
            {t("contact.linkedin")}
          </a>
        </li>
        <li className="inline-flex items-center gap-2 text-white/85">
          <MapPin className="size-3.5 shrink-0 text-white/85" aria-hidden />
          {personal.location}
        </li>
        <li className="inline-flex items-center gap-2 text-white/85">
          <Car className="size-3.5 shrink-0 text-white/85" aria-hidden />
          {personal.license}
        </li>
      </ul>
      <div className="mt-3 border-t border-white/20 pt-3">
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-white uppercase">
          <Languages className="size-3.5 text-white/85" aria-hidden />
          {t("contact.languages")}
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
          {personal.languages.map((language) => (
            <li key={language.name} className="flex gap-2 text-[13px]">
              <span className="text-white/90">{language.name}</span>
              <span className="font-bold text-white">{language.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
