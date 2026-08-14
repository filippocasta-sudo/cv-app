"use client";

import { motion } from "framer-motion";
import { Pizza, Shirt, Swords } from "lucide-react";
import { TooltipBadge } from "@/components/ui/TooltipBadge";
import { useMode } from "@/context/ModeContext";

/** Decorative passion badges fixed in page corners — pure UI, no data changes. */
export function PassionLayer() {
  const { formal } = useMode();

  if (formal) return null;

  return (
    <div className="easter-egg-layer no-print pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {/* Ambient color orbs */}
      <div className="ambient-glow -top-24 -left-24 size-72 bg-coral/30" aria-hidden />
      <div className="ambient-glow top-1/3 -right-32 size-80 bg-indigo/25" aria-hidden />
      <div className="ambient-glow -bottom-20 left-1/4 size-64 bg-mint/20" aria-hidden />

      {/* Star Wars — subtle Death Star silhouette */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute top-[18%] right-[6%] hidden size-16 rounded-full border border-foreground-faint/10 opacity-[0.07] sm:block dark:border-white/5"
      >
        <div className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground-faint/15 dark:border-white/10" />
      </motion.div>

      {/* Corner passion badges */}
      <div className="pointer-events-auto absolute top-28 left-3 sm:left-6">
        <TooltipBadge
          icon={<Shirt className="size-4 text-coral" strokeWidth={2.2} />}
          label="Lega FantaTregnago"
          tooltip="League Commissioner & Coach a tempo perso — Lega FantaTregnago, dal 2009."
          accent="coral"
          floating
        />
      </div>

      <div className="pointer-events-auto absolute top-36 right-3 sm:right-6">
        <TooltipBadge
          icon={<Swords className="size-4 text-cyan dark:text-magenta" strokeWidth={2.2} />}
          label="Star Wars fan"
          tooltip="May the Force be with you — e che i deploy del venerdì siano con te."
          accent="cyan"
          className="animate-float-delayed"
          floating={false}
        />
      </div>

      <div className="pointer-events-auto absolute bottom-28 left-3 sm:left-6">
        <TooltipBadge
          icon={<Pizza className="size-4 text-amber" strokeWidth={2.2} />}
          label="Passione pizza"
          tooltip="Forno a legna & ottimizzazione processi sotto stress."
          accent="amber"
          className="animate-float-slow"
          floating={false}
        />
      </div>

      {/* Tiny lightsaber accent */}
      <motion.div
        aria-hidden
        className="absolute bottom-[22%] right-[4%] hidden h-14 w-1.5 rounded-full bg-gradient-to-b from-cyan via-white to-magenta opacity-40 shadow-[0_0_12px_var(--cyan)] sm:block dark:opacity-55"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
