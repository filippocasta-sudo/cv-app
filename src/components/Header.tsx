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
    <header className="no-print sticky top-0 z-40 border-b border-border-subtle bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-sage text-sm font-extrabold text-white">
            {name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </span>
          <span className="font-display text-sm font-extrabold tracking-tight transition group-hover:text-sage">
            {name}
          </span>
        </a>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Stile di presentazione del CV"
            className="flex rounded-full border border-border-subtle bg-surface p-0.5"
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
                  className="relative rounded-full px-3 py-1.5 text-xs font-semibold transition sm:text-[13px]"
                >
                  {active && (
                    <motion.span
                      layoutId="mode-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-sage"
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
              className="grid size-9 place-items-center rounded-full border border-border-subtle bg-surface text-foreground-muted transition hover:border-sage hover:text-sage"
            >
              <Printer className="size-4" aria-hidden />
              <span className="sr-only">Stampa il CV</span>
            </button>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            title={theme === "dark" ? "Passa alla modalità chiara" : "Passa alla modalità scura"}
            className="grid size-9 place-items-center rounded-full border border-border-subtle bg-surface text-foreground-muted transition hover:border-sage hover:text-sage"
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
