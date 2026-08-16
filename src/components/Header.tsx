"use client";

import { motion } from "framer-motion";
import { Mail, Moon, Printer, Sun } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { useMode } from "@/context/ModeContext";
import { useI18n } from "@/lib/i18n";
import type { SocialLink } from "@/lib/types";

const MODES = [
  { key: "candid", labelKey: "header.modern" as const },
  { key: "formal", labelKey: "header.classic" as const },
] as const;

const LOCALES = [
  { key: "it", label: "ITA" },
  { key: "en", label: "ENG" },
] as const;

function socialIcon(label: string) {
  const lower = label.toLowerCase();
  if (lower.includes("linkedin")) return <LinkedInIcon className="size-3.5" />;
  if (lower.includes("mail") || lower.includes("email"))
    return <Mail className="size-3.5" aria-hidden />;
  return null;
}

export function Header({ socials }: { socials: SocialLink[] }) {
  const { theme, toggleTheme, formal, toggleFormal, locale, setLocale } = useMode();
  const { t } = useI18n();

  return (
    <header className="no-print sticky top-3 z-50">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="neu-card flex flex-wrap items-center justify-between gap-3 rounded-3xl px-3 py-2.5 sm:px-4 sm:py-3"
      >
        <div className="flex flex-wrap items-center gap-2">
          <div
            role="group"
            aria-label={t("header.presentationStyle")}
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
                  title={t(mode.labelKey)}
                  className="relative rounded-xl px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 sm:text-[13px]"
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
                    {t(mode.labelKey)}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            role="group"
            aria-label={t("header.language")}
            className="flex rounded-2xl p-1 shadow-neumorphic-inset"
          >
            {LOCALES.map((item) => {
              const active = locale === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    if (!active) setLocale(item.key);
                  }}
                  aria-pressed={active}
                  title={item.label}
                  className="relative rounded-xl px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 sm:text-[13px]"
                >
                  {active && (
                    <motion.span
                      layoutId="locale-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-mint to-cyan shadow-neumorphic-sm"
                    />
                  )}
                  <span
                    className={`relative z-10 ${active ? "text-white" : "text-foreground-muted hover:text-foreground"}`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <nav aria-label={t("header.contactsNav")}>
            <ul className="flex flex-wrap items-center gap-1.5">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target={social.url.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="neu-interactive inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold text-foreground-muted hover:text-indigo sm:px-3 sm:text-[13px]"
                  >
                    {socialIcon(social.label)}
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {formal && (
            <button
              type="button"
              onClick={() => window.print()}
              title={t("header.print")}
              className="neu-interactive grid size-8 place-items-center rounded-xl text-foreground-muted hover:text-indigo sm:size-9 sm:rounded-2xl"
            >
              <Printer className="size-4" aria-hidden />
              <span className="sr-only">{t("header.printSr")}</span>
            </button>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            title={theme === "dark" ? t("header.themeLight") : t("header.themeDark")}
            className="neu-interactive grid size-8 place-items-center rounded-xl text-foreground-muted hover:text-amber sm:size-9 sm:rounded-2xl"
          >
            {theme === "dark" ? (
              <Sun className="size-4" aria-hidden />
            ) : (
              <Moon className="size-4" aria-hidden />
            )}
            <span className="sr-only">{t("header.themeSr")}</span>
          </button>
        </div>
      </motion.div>
    </header>
  );
}
