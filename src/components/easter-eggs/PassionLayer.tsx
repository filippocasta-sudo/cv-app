"use client";

import { TooltipBadge } from "@/components/ui/TooltipBadge";
import { useMode } from "@/context/ModeContext";
import { PASSION_EGGS } from "@/lib/passionEggs";

/** Passion badges on the left edge (desktop) — tooltips open inward. */
export function PassionLayer() {
  const { formal } = useMode();

  if (formal) return null;

  return (
    <div className="easter-egg-layer no-print pointer-events-none fixed inset-0 z-30 hidden overflow-hidden lg:block">
      <div className="ambient-glow -top-24 -left-24 size-72 bg-coral/30" aria-hidden />
      <div className="ambient-glow top-1/3 -right-32 size-80 bg-indigo/25" aria-hidden />

      <div className="pointer-events-auto fixed top-1/2 left-2 z-40 flex -translate-y-1/2 flex-col gap-5 sm:left-3">
        {PASSION_EGGS.map((egg) => (
          <TooltipBadge
            key={egg.label}
            icon={egg.icon}
            label={egg.label}
            tooltip={egg.tooltip}
            accent={egg.accent}
            floating={egg.floating}
          />
        ))}
      </div>
    </div>
  );
}
