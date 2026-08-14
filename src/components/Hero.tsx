"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { useMode } from "@/context/ModeContext";
import type { PersonalInfo } from "@/lib/types";

export function Hero({ personal }: { personal: PersonalInfo }) {
  const { formal } = useMode();

  return (
    <section id="top" className="relative pt-10 pb-8 sm:pt-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl p-6 sm:p-8"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="neu-card rounded-3xl p-6 sm:p-8">
          {!formal && (
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold text-coral shadow-neumorphic-inset"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-coral opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-gradient-to-r from-coral to-magenta" />
              </span>
              {personal.statusBadge}
            </motion.span>
          )}

          <h1 className="mt-4 text-4xl leading-[1.02] sm:text-6xl">
            <span className="gradient-text-coral">{personal.name.split(" ")[0]}</span>{" "}
            <span className="text-foreground">{personal.name.split(" ").slice(1).join(" ")}</span>
          </h1>

          <p className="mt-3 font-display text-lg font-bold gradient-text-mint sm:text-xl">
            {personal.roles.join("  ·  ")}
          </p>

          <p className="text-balance-tight mt-5 max-w-3xl text-[15px] leading-relaxed text-foreground-muted sm:text-base">
            {formal ? personal.formalIntro : personal.intro}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {[
              {
                href: `mailto:${personal.email}`,
                icon: <Mail className="size-4" aria-hidden />,
                label: personal.email,
              },
              {
                href: `tel:${personal.phone.replace(/\s/g, "")}`,
                icon: <Phone className="size-4" aria-hidden />,
                label: personal.phone,
              },
              {
                href: personal.linkedin,
                icon: <LinkedInIcon className="size-4" />,
                label: "LinkedIn",
                external: true,
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="neu-interactive inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-foreground-muted hover:text-indigo"
              >
                {item.icon}
                <span className="max-w-[200px] truncate sm:max-w-none">{item.label}</span>
              </a>
            ))}
            <span className="neu-interactive inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-foreground-muted">
              <MapPin className="size-4" aria-hidden />
              {personal.location}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
