"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { useMode } from "@/context/ModeContext";
import type { PersonalInfo } from "@/lib/types";

export function Hero({ personal }: { personal: PersonalInfo }) {
  const { formal } = useMode();

  return (
    <section id="top" className="pt-10 pb-8 sm:pt-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {!formal && (
          <span className="inline-flex items-center gap-2 rounded-full border border-sage/35 bg-sage-soft px-3 py-1 text-xs font-semibold text-sage-strong">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-sage" />
            </span>
            {personal.statusBadge}
          </span>
        )}

        <h1 className="mt-4 text-4xl leading-[1.05] sm:text-6xl">{personal.name}</h1>

        <p className="mt-3 font-display text-lg font-bold text-sage sm:text-xl">
          {personal.roles.join("  ·  ")}
        </p>

        <p className="text-balance-tight mt-5 max-w-3xl text-[15px] leading-relaxed text-foreground-muted sm:text-base">
          {formal ? personal.formalIntro : personal.intro}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground-muted">
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-1.5 transition hover:text-sage"
          >
            <Mail className="size-4" aria-hidden />
            {personal.email}
          </a>
          <a
            href={`tel:${personal.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 transition hover:text-sage"
          >
            <Phone className="size-4" aria-hidden />
            {personal.phone}
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition hover:text-sage"
          >
            <LinkedInIcon className="size-4" />
            LinkedIn
          </a>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" aria-hidden />
            {personal.location}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
