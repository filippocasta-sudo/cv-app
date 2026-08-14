"use client";

import { motion } from "framer-motion";
import { ContactInfoBox } from "@/components/ContactInfoBox";
import { HeroPortrait } from "@/components/HeroPortrait";
import { useMode } from "@/context/ModeContext";
import { heroLines } from "@/lib/hero";
import type { PersonalInfo } from "@/lib/types";

export function Hero({ personal }: { personal: PersonalInfo }) {
  const { formal } = useMode();
  const intro = formal ? personal.formalIntro : personal.intro;
  const [line1, line2] = heroLines(intro);

  return (
    <section id="top" className="relative scroll-mt-28 pt-4 pb-2 sm:pt-6">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(200px,32%)] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1"
        >
          {!formal && (
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-coral shadow-neumorphic-inset"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-coral opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-gradient-to-r from-coral to-magenta" />
              </span>
              {personal.statusBadge}
            </motion.span>
          )}

          <h1 className="mt-3 text-3xl leading-[1.05] sm:text-5xl lg:text-[3.25rem]">
            <span className="gradient-text-coral">{personal.name.split(" ")[0]}</span>{" "}
            <span className="text-foreground">{personal.name.split(" ").slice(1).join(" ")}</span>
          </h1>

          <div className="mt-4 space-y-2">
            <p className="text-balance-tight max-w-xl text-[15px] leading-relaxed text-foreground sm:text-base">
              {line1}
            </p>
            {line2 && (
              <p className="text-balance-tight max-w-xl text-[15px] leading-relaxed text-foreground-muted sm:text-base">
                {line2}
              </p>
            )}
          </div>

          <ContactInfoBox personal={personal} />

          <p className="mt-4 font-display text-base font-bold gradient-text-mint sm:text-lg">
            {personal.roles.join(" · ")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 flex justify-center lg:sticky lg:top-28 lg:order-2 lg:justify-end"
        >
          <HeroPortrait name={personal.name} />
        </motion.div>
      </div>
    </section>
  );
}
