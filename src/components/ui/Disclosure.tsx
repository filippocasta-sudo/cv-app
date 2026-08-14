"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { useMode } from "@/context/ModeContext";

interface DisclosureProps {
  label: string;
  openLabel?: string;
  children: ReactNode;
  emphasis?: boolean;
  defaultOpen?: boolean;
}

export function Disclosure({
  label,
  openLabel,
  children,
  emphasis = false,
  defaultOpen = false,
}: DisclosureProps) {
  const { formal } = useMode();
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const expanded = formal || open;

  return (
    <div className="print-avoid-break">
      {!formal && (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className={
            emphasis
              ? "no-print neu-interactive group inline-flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-2.5 text-left text-sm font-bold text-coral"
              : "no-print group inline-flex w-full items-center justify-between gap-3 rounded-xl px-2 py-1.5 text-left text-sm font-semibold text-foreground-muted transition hover:text-indigo"
          }
        >
          <span>{open && openLabel ? openLabel : label}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="shrink-0"
          >
            <ChevronDown className="size-4" aria-hidden />
          </motion.span>
        </button>
      )}

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="print-block overflow-hidden"
          >
            <div className={formal ? "pt-1" : "pt-2"}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
