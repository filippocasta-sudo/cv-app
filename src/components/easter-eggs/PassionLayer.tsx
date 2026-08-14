"use client";

import { Pizza, Shirt, Swords } from "lucide-react";
import { TooltipBadge } from "@/components/ui/TooltipBadge";
import { useMode } from "@/context/ModeContext";

const LEFT_EGGS = [
  {
    icon: <Shirt className="size-4 text-coral" strokeWidth={2.2} />,
    label: "Lega FantaTregnago",
    tooltip:
      "League Commissioner & Coach a tempo perso — Lega FantaTregnago, dal 2009.",
    accent: "coral" as const,
    floating: true,
  },
  {
    icon: <Swords className="size-4 text-cyan dark:text-magenta" strokeWidth={2.2} />,
    label: "Star Wars fan",
    tooltip: "May the Force be with you — e che i deploy del venerdì siano con te.",
    accent: "cyan" as const,
    floating: false,
  },
  {
    icon: <Pizza className="size-4 text-amber" strokeWidth={2.2} />,
    label: "Passione pizza",
    tooltip: "Forno a legna & ottimizzazione processi sotto stress.",
    accent: "amber" as const,
    floating: false,
  },
];

/** Passion badges stacked on the left edge — tooltips open inward (to the right). */
export function PassionLayer() {
  const { formal } = useMode();

  if (formal) return null;

  return (
    <div className="easter-egg-layer no-print pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <div className="ambient-glow -top-24 -left-24 size-72 bg-coral/30" aria-hidden />
      <div className="ambient-glow top-1/3 -right-32 size-80 bg-indigo/25" aria-hidden />

      <div className="pointer-events-auto fixed top-1/2 left-2 z-40 flex -translate-y-1/2 flex-col gap-5 sm:left-3">
        {LEFT_EGGS.map((egg) => (
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
