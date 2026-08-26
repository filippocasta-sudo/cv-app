import { Pizza, Shirt, Swords } from "lucide-react";
import type { ReactNode } from "react";
import type { UiKey } from "@/lib/i18n/ui";

export type PassionEggAccent = "coral" | "indigo" | "mint";

export interface PassionEgg {
  icon: ReactNode;
  label: string;
  tooltip: string;
  accent: PassionEggAccent;
  floating?: boolean;
}

export function getPassionEggs(t: (key: UiKey) => string): PassionEgg[] {
  return [
    {
      icon: <Shirt className="size-4 text-coral" strokeWidth={2.2} />,
      label: t("egg.fanta.label"),
      tooltip: t("egg.fanta.tooltip"),
      accent: "coral",
      floating: true,
    },
    {
      icon: <Swords className="size-4 text-mint" strokeWidth={2.2} />,
      label: t("egg.starwars.label"),
      tooltip: t("egg.starwars.tooltip"),
      accent: "mint",
      floating: false,
    },
    {
      icon: <Pizza className="size-4 text-coral" strokeWidth={2.2} />,
      label: t("egg.pizza.label"),
      tooltip: t("egg.pizza.tooltip"),
      accent: "coral",
      floating: false,
    },
  ];
}
