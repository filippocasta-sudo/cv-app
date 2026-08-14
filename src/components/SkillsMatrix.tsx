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
        className={`mb-3 inline-flex items-center gap-2 text-sm font-extrabold tracking-wide uppercase ${
          positive ? "text-sage" : "text-foreground-faint"
        }`}
      >
        <span
          className={`grid size-5 place-items-center rounded-md ${
            positive ? "bg-sage text-white" : "bg-surface-muted text-foreground-muted"
          }`}
        >
          <Icon className="size-3" aria-hidden strokeWidth={3} />
        </span>
        {title}
      </h3>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: positive ? -8 : 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.32, delay: index * 0.04, ease: "easeOut" }}
            className={`group rounded-xl border p-3.5 transition ${
              positive
                ? "border-sage/25 bg-sage-soft/45 hover:border-sage/60"
                : "border-border-subtle bg-surface hover:border-border-strong"
            }`}
          >
            <p className="font-display text-[15px] font-bold">{item.label}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-foreground-muted">
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
