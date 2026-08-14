"use client";

import { motion } from "framer-motion";
import { Moon, Printer, Sun } from "lucide-react";
import { useMode } from "@/context/ModeContext";

const MODES = [
  { key: "candid", label: "Versione schietta", short: "Schietta" },
  { key: "formal", label: "CV formale classico", short: "Formale" },
] as const;

export function Header({ name }: { name: string }) {
  const { theme, toggleTheme, formal, toggleFormal } = useMode();

  return (
    <header className="no-print sticky top-0 z-40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="neu-interactive grid size-9 place-items-center rounded-2xl bg-gradient-to-br from-coral to-indigo text-sm font-extrabold text-white shadow-neumorphic-sm">
            {name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </span>
          <span className="font-display text-sm font-extrabold tracking-tight transition group-hover:text-coral">
            {name}
          </span>
        </a>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Stile di presentazione del CV"
            className="flex rounded-2xl p-1 shadow-neumorphic-inset"
          >
            {MODES.map((mode) => {
              const active = (mode.key === "formal") === formal;
              return (
                <button
                  key={mode.key}
                  type="button"
                  onClick={() => {
                    if (!active) toggleFormal();
                  }}
                  aria-pressed={active}
                  title={mode.label}
                  className="relative rounded-xl px-3 py-1.5 text-xs font-semibold transition sm:text-[13px]"
                >
                  {active && (
                    <motion.span
                      layoutId="mode-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-coral to-indigo shadow-neumorphic-sm"
                    />
                  )}
                  <span
                    className={`relative z-10 ${active ? "text-white" : "text-foreground-muted hover:text-foreground"}`}
                  >
                    <span className="hidden sm:inline">{mode.label}</span>
                    <span className="sm:hidden">{mode.short}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {formal && (
            <button
              type="button"
              onClick={() => window.print()}
              title="Stampa o esporta in PDF"
              className="neu-interactive grid size-9 place-items-center rounded-2xl text-foreground-muted hover:text-indigo"
            >
              <Printer className="size-4" aria-hidden />
              <span className="sr-only">Stampa il CV</span>
            </button>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            title={theme === "dark" ? "Passa alla modalità chiara" : "Passa alla modalità scura"}
            className="neu-interactive grid size-9 place-items-center rounded-2xl text-foreground-muted hover:text-amber"
          >
            {theme === "dark" ? (
              <Sun className="size-4" aria-hidden />
            ) : (
              <Moon className="size-4" aria-hidden />
            )}
            <span className="sr-only">Cambia tema</span>
          </button>
        </div>
      </div>
    </header>
  );
}
