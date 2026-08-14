"use client";

import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

interface TooltipBadgeProps {
  icon: ReactNode;
  tooltip: string;
  label: string;
  className?: string;
  accent?: "coral" | "mint" | "indigo" | "amber" | "cyan";
  floating?: boolean;
}

const ACCENT_RING: Record<NonNullable<TooltipBadgeProps["accent"]>, string> = {
  coral: "ring-coral/30 hover:ring-coral/60",
  mint: "ring-mint/30 hover:ring-mint/60",
  indigo: "ring-indigo/30 hover:ring-indigo/60",
  amber: "ring-amber/30 hover:ring-amber/60",
  cyan: "ring-cyan/30 hover:ring-cyan/60",
};

export function TooltipBadge({
  icon,
  tooltip,
  label,
  className = "",
  accent = "indigo",
  floating = true,
}: TooltipBadgeProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`group relative ${className}`}>
      <motion.button
        type="button"
        aria-label={label}
        aria-describedby={open ? `${label}-tip` : undefined}
        onClick={() => setOpen((value) => !value)}
        onBlur={() => setOpen(false)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`neu-interactive grid size-10 place-items-center rounded-2xl text-foreground-muted ring-2 ring-transparent transition hover:text-foreground ${ACCENT_RING[accent]} ${floating ? "animate-float" : ""}`}
      >
        {icon}
      </motion.button>

      <div
        id={`${label}-tip`}
        role="tooltip"
        className={`pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[220px] -translate-x-1/2 rounded-xl px-3 py-2 text-center text-xs leading-relaxed font-semibold text-foreground shadow-neumorphic-sm neu-surface-inset transition-all duration-200 ${
          open ? "visible opacity-100" : "invisible opacity-0 sm:group-hover:visible sm:group-hover:opacity-100"
        }`}
      >
        {tooltip}
      </div>
    </div>
  );
}
