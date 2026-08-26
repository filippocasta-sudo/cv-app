"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { useMode } from "@/context/ModeContext";
import { useI18n } from "@/lib/i18n";
import type { Capability } from "@/lib/types";

interface CapabilitiesAccordionProps {
  canDo: Capability[];
  cannotDo: Capability[];
}

function AccordionPanel({
  title,
  items,
  tone,
}: {
  title: string;
  items: Capability[];
  tone: "positive" | "negative";
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const positive = tone === "positive";
  const Icon = positive ? Check : X;
  const expanded = open;

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: positive ? 0.05 : 0.1 }}
      className={`print-avoid-break neu-card overflow-hidden rounded-3xl ${
        positive
          ? "bg-gradient-to-br from-mint-soft/70 via-surface to-surface"
          : "bg-gradient-to-br from-surface-muted/80 via-surface to-surface"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="no-print flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5"
      >
          <span className="inline-flex items-center gap-2.5">
            <span
              className={`grid size-7 place-items-center rounded-xl shadow-neumorphic-sm ${
                positive
                  ? "bg-gradient-to-br from-mint to-mint-strong text-white"
                  : "neu-surface-inset text-foreground-muted"
              }`}
            >
              <Icon className="size-3.5" strokeWidth={3} aria-hidden />
            </span>
            <span>
              <span
                className={`block font-display text-sm font-extrabold sm:text-base ${
                  positive ? "text-mint-strong" : "text-foreground"
                }`}
              >
                {title}
              </span>
              <span className="text-xs text-foreground-faint">
                {items.length}{" "}
                {items.length === 1 ? t("capabilities.point") : t("capabilities.points")}
                {!open && t("capabilities.clickDetails")}
              </span>
            </span>
          </span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="size-5 text-foreground-muted" aria-hidden />
          </motion.span>
        </button>

      <h3
        className={`hidden px-4 pt-4 font-display text-sm font-extrabold print:block sm:px-5 sm:text-base ${
          positive ? "text-mint-strong" : "text-foreground"
        }`}
      >
        {title}
      </h3>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="print-block overflow-hidden"
          >
            <ul className="space-y-2 px-4 pb-4 sm:px-5 sm:pb-5">
              {items.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: positive ? -6 : 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="rounded-2xl neu-surface-inset p-3"
                >
                  <p className="font-display text-[14px] font-bold">{item.label}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-foreground-muted sm:text-[13px]">
                    {item.detail}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function CapabilitiesAccordion({
  canDo,
  cannotDo,
  layout = "grid",
}: CapabilitiesAccordionProps & { layout?: "grid" | "sidebar" }) {
  const { formal } = useMode();
  const { t } = useI18n();
  const isSidebar = layout === "sidebar";

  return (
    <section
      id="cosa-so-fare"
      aria-label={formal ? t("capabilities.ariaFormal") : t("capabilities.ariaModern")}
      className={`scroll-mt-28 ${
        isSidebar ? "flex flex-col gap-4" : "mt-4 grid gap-4 sm:grid-cols-2"
      }`}
    >
      <AccordionPanel
        title={formal ? t("capabilities.strengthsFormal") : t("capabilities.strengthsModern")}
        items={canDo}
        tone="positive"
      />
      <AccordionPanel
        title={formal ? t("capabilities.weaknessesFormal") : t("capabilities.weaknessesModern")}
        items={cannotDo}
        tone="negative"
      />
    </section>
  );
}
