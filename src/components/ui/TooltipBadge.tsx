"use client";

import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

interface TooltipBadgeProps {
  icon: ReactNode;
  tooltip: string;
  label: string;
  accent?: "coral" | "indigo";
  floating?: boolean;
}

const ACCENT_RING: Record<NonNullable<TooltipBadgeProps["accent"]>, string> = {
  coral: "ring-coral/30 hover:ring-coral/60",
  indigo: "ring-indigo/30 hover:ring-indigo/60",
};

export function TooltipBadge({
  icon,
  tooltip,
  label,
  accent = "indigo",
  floating = true,
}: TooltipBadgeProps) {
  const [open, setOpen] = useState(false);
  const tipId = `${label.replace(/\s+/g, "-")}-tip`;

  return (
    <div className="group relative">
      <motion.button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
        onClick={() => setOpen((value) => !value)}
        onBlur={() => setOpen(false)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`neu-interactive grid size-10 place-items-center rounded-2xl text-foreground-muted ring-2 ring-transparent transition hover:text-foreground ${ACCENT_RING[accent]} ${floating ? "animate-float" : ""}`}
      >
        {icon}
      </motion.button>

      <div
        id={tipId}
        role="tooltip"
        className={`pointer-events-none absolute top-1/2 left-full z-50 ml-3 w-max max-w-[min(240px,calc(100vw-5rem))] -translate-y-1/2 rounded-xl px-3 py-2 text-left text-xs leading-relaxed font-semibold text-foreground shadow-neumorphic-sm neu-surface-inset transition-all duration-200 ${
          open ? "visible opacity-100" : "invisible opacity-0 group-hover:visible group-hover:opacity-100 sm:group-focus-within:visible sm:group-focus-within:opacity-100"
        }`}
      >
        {tooltip}
      </div>
    </div>
  );
}
