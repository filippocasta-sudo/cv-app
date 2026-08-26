"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { useMode } from "@/context/ModeContext";
import type { Capability } from "@/lib/types";

interface SkillsMatrixProps {
  canDo: Capability[];
  cannotDo: Capability[];
}

function CapabilityColumn({
  items,
  tone,
  title,
}: {
  items: Capability[];
  tone: "positive" | "negative";
  title: string;
}) {
  const positive = tone === "positive";
  const Icon = positive ? Check : X;

  return (
    <div className="print-avoid-break">
      <h3
        className={`font-heading mb-4 inline-flex items-center gap-2 text-sm font-extrabold tracking-wide uppercase ${
          positive ? "text-mint" : "text-foreground-faint"
        }`}
      >
        <span
          className={`grid size-6 place-items-center rounded-xl shadow-neumorphic-sm ${
            positive
              ? "bg-gradient-to-br from-mint to-mint-strong text-white"
              : "neu-surface-inset text-foreground-muted"
          }`}
        >
          <Icon className="size-3.5" aria-hidden strokeWidth={3} />
        </span>
        {title}
      </h3>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: positive ? -8 : 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.32, delay: index * 0.04, ease: "easeOut" }}
            whileHover={{ y: -2 }}
            className={`neu-card rounded-2xl p-4 ${
              positive ? "hover:shadow-neumorphic-lg" : "opacity-90"
            }`}
          >
            <p
              className={`font-heading text-[15px] font-bold ${positive ? "text-mint-strong" : ""}`}
            >
              {item.label}
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-foreground-muted">
              {item.detail}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function SkillsMatrix({ canDo, cannotDo }: SkillsMatrixProps) {
  const { formal } = useMode();

  return (
    <Section
      id="cosa-so-fare"
      eyebrow="Trasparenza"
      title={formal ? "Aree di competenza e limiti" : "Cosa so fare vs cosa non so fare"}
      description={
        formal
          ? "Sintesi delle aree di piena autonomia e degli ambiti non presidiati, per una valutazione realistica del profilo."
          : "Nessun profilo copre tutto. Qui c'è quello su cui rispondo io e quello per cui serve chiamare qualcun altro."
      }
    >
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
        <CapabilityColumn items={canDo} tone="positive" title="Su questo rispondo io" />
        <CapabilityColumn items={cannotDo} tone="negative" title="Su questo non contarci" />
      </div>
    </Section>
  );
}
