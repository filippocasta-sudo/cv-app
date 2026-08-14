import { Pizza, Shirt, Swords } from "lucide-react";
import type { ReactNode } from "react";

export type PassionEggAccent = "coral" | "mint" | "indigo" | "amber" | "cyan";

export interface PassionEgg {
  icon: ReactNode;
  label: string;
  tooltip: string;
  accent: PassionEggAccent;
  floating?: boolean;
}

export const PASSION_EGGS: PassionEgg[] = [
  {
    icon: <Shirt className="size-4 text-coral" strokeWidth={2.2} />,
    label: "Lega FantaTregnago",
    tooltip:
      "League Commissioner & Coach a tempo perso — Lega FantaTregnago, dal 2009.",
    accent: "coral",
    floating: true,
  },
  {
    icon: <Swords className="size-4 text-cyan dark:text-magenta" strokeWidth={2.2} />,
    label: "Star Wars fan",
    tooltip: "May the Force be with you — e che i deploy del venerdì siano con te.",
    accent: "cyan",
    floating: false,
  },
  {
    icon: <Pizza className="size-4 text-amber" strokeWidth={2.2} />,
    label: "Passione pizza",
    tooltip: "Forno a legna & ottimizzazione processi sotto stress.",
    accent: "amber",
    floating: false,
  },
];
