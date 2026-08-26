"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Database,
  Loader2,
  LogOut,
  RotateCcw,
  Save,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CapabilitiesEditor } from "@/components/admin/CapabilitiesEditor";
import { CertificationsEditor } from "@/components/admin/CertificationsEditor";
import {
  CompensationEditor,
  GoalsEditor,
  PersonalEditor,
  SocialsEditor,
} from "@/components/admin/ProfileEditor";
import { SkillsEditor } from "@/components/admin/SkillsEditor";
import { TimelineEditor } from "@/components/admin/TimelineEditor";
import {
  type AdminLocale,
  ensureCvWithEn,
  getActiveBundle,
  italianBundle,
  patchActiveBundle,
  syncEnFromItalian,
  type LocaleBundleKey,
} from "@/components/admin/localeHelpers";
import type { StorageInfo } from "@/lib/storage";
import type { CvData, CvDataLocaleBundle } from "@/lib/types";

const TABS = [
  { key: "profile", label: "Profilo" },
  { key: "goals", label: "Cosa vorrei fare" },
  { key: "skills", label: "Competenze" },
  { key: "certifications", label: "Certificazioni" },
  { key: "capabilities", label: "Cosa so fare / Cosa non fa per me" },
  { key: "timeline", label: "Timeline" },
  { key: "extra", label: "RAL e link" },
] as const;

const LOCALES = [
  { key: "it", label: "ITA" },
  { key: "en", label: "ENG" },
] as const satisfies ReadonlyArray<{ key: AdminLocale; label: string }>;

type TabKey = (typeof TABS)[number]["key"];
type Status = "idle" | "saving" | "saved" | "error";

export function AdminPanel({
  initialData,
  storage,
}: {
  initialData: CvData;
  storage: StorageInfo;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<CvData>(() => ensureCvWithEn(initialData));
  const [saved, setSaved] = useState<CvData>(() => ensureCvWithEn(initialData));
  const [tab, setTab] = useState<TabKey>("profile");
  const [locale, setLocale] = useState<AdminLocale>("it");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(saved), [draft, saved]);
  const bundle = useMemo(() => getActiveBundle(draft, locale), [draft, locale]);
  const translationMode = locale === "en";

  const patchBundle = <K extends LocaleBundleKey>(key: K, value: CvDataLocaleBundle[K]) =>
    setDraft((current) => patchActiveBundle(current, locale, key, value));

  function selectLocale(next: AdminLocale) {
    if (next === locale) return;

    if (next === "en") {
      setDraft((current) => {
        const italian = italianBundle(current);
        const english = syncEnFromItalian(italian, current.en ?? italian);
        return { ...current, en: english };
      });
    }

    setLocale(next);
  }

  async function save() {
    setStatus("saving");
    setError("");
    try {
      const italian = italianBundle(draft);
      const payload: CvData = {
        ...draft,
        en: syncEnFromItalian(italian, draft.en ?? italian),
      };

      const response = await fetch("/api/cv", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => ({}))) as CvData & { error?: string };

      if (!response.ok) {
        setError(body.error ?? "Salvataggio non riuscito.");
        setStatus("error");
        return;
      }

      setDraft(body);
      setSaved(body);
      setStatus("saved");
      router.refresh();
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setError("Salvataggio non riuscito: controlla la connessione.");
      setStatus("error");
    }
  }

  async function resetToDefaults() {
    if (!window.confirm("Ripristinare i contenuti iniziali? Le modifiche salvate andranno perse.")) {
      return;
    }
    setStatus("saving");
    const response = await fetch("/api/cv", { method: "DELETE" });
    if (!response.ok) {
      setError("Ripristino non riuscito.");
      setStatus("error");
      return;
    }
    const body = ensureCvWithEn((await response.json()) as CvData);
    setDraft(body);
    setSaved(body);
    setStatus("saved");
    router.refresh();
    setTimeout(() => setStatus("idle"), 2500);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div data-admin className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b-2 border-[var(--admin-border)] bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground-muted transition hover:text-sage"
          >
            <ArrowLeft className="size-4" aria-hidden />
            CV pubblico
          </Link>

          <span className="font-heading text-sm font-extrabold">Pannello admin</span>

          <div
            role="group"
            aria-label="Lingua contenuti"
            className="flex rounded-xl border border-border-subtle p-0.5"
          >
            {LOCALES.map((item) => {
              const active = locale === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => selectLocale(item.key)}
                  aria-pressed={active}
                  className={`relative rounded-lg px-2.5 py-1 text-xs font-bold transition sm:px-3 ${
                    active ? "text-white" : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="admin-locale-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-sage"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {dirty && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-kind-project-soft px-2.5 py-1 text-xs font-semibold text-kind-project">
              <TriangleAlert className="size-3.5" aria-hidden />
              Modifiche non salvate
            </span>
          )}

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={resetToDefaults}
              disabled={!storage.writable}
              className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[var(--admin-border)] px-3 py-2 text-sm font-semibold text-foreground-muted transition hover:border-[var(--admin-border-focus)] hover:text-foreground disabled:opacity-50"
            >
              <RotateCcw className="size-4" aria-hidden />
              <span className="hidden sm:inline">Ripristina</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[var(--admin-border)] px-3 py-2 text-sm font-semibold text-foreground-muted transition hover:border-[var(--admin-border-focus)] hover:text-foreground"
            >
              <LogOut className="size-4" aria-hidden />
              <span className="hidden sm:inline">Esci</span>
            </button>

            <button
              type="button"
              onClick={save}
              disabled={status === "saving" || !dirty || !storage.writable}
              className="inline-flex items-center gap-1.5 rounded-lg bg-sage px-4 py-2 text-sm font-bold text-white transition hover:bg-sage-strong disabled:opacity-50"
            >
              {status === "saving" ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : status === "saved" ? (
                <Check className="size-4" aria-hidden />
              ) : (
                <Save className="size-4" aria-hidden />
              )}
              {status === "saved" ? "Salvato" : "Salva"}
            </button>
          </div>
        </div>

        <nav className="mx-auto w-full max-w-5xl overflow-x-auto px-4 pb-2 sm:px-6">
          <ul className="flex gap-1">
            {TABS.map((item) => {
              const active = tab === item.key;
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => setTab(item.key)}
                    className={`relative rounded-lg px-3 py-1.5 text-[13px] font-semibold whitespace-nowrap transition ${
                      active ? "text-white" : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="admin-tab"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-lg bg-sage"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        {storage.writable ? (
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-foreground-faint">
            <Database className="size-3.5" aria-hidden />
            Storage attivo: {storage.label}
          </p>
        ) : (
          <div className="mb-5 rounded-lg border border-kind-project/40 bg-kind-project-soft px-4 py-3 text-sm text-kind-project">
            <p className="inline-flex items-center gap-2 font-bold">
              <TriangleAlert className="size-4" aria-hidden />
              Salvataggio non disponibile
            </p>
            <p className="mt-1 leading-relaxed">{storage.hint ?? storage.label}</p>
          </div>
        )}

        {error && (
          <p className="mb-5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
            {error}
          </p>
        )}

        {translationMode && (
          <p className="mb-5 rounded-lg border border-border-subtle bg-surface-muted px-4 py-3 text-sm leading-relaxed text-foreground-muted">
            Stai modificando la <strong>versione inglese</strong>. Aggiungi o rimuovi voci
            (timeline, competenze, certificazioni, link) dalla versione <strong>ITA</strong>; qui
            traduci i testi mantenendo la stessa struttura.
          </p>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${tab}-${locale}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {tab === "profile" && (
              <PersonalEditor
                personal={bundle.personal}
                translationMode={translationMode}
                storageWritable={storage.writable}
                onChange={(personal) => patchBundle("personal", personal)}
              />
            )}

            {tab === "goals" && (
              <GoalsEditor goals={bundle.goals} onChange={(goals) => patchBundle("goals", goals)} />
            )}

            {tab === "skills" && (
              <div className="space-y-10">
                <section>
                  <h2 className="mb-3 text-lg">Hard skills</h2>
                  <SkillsEditor
                    label="Hard skill"
                    prefix="hs"
                    groups={bundle.hardSkills}
                    translationMode={translationMode}
                    onChange={(hardSkills) => patchBundle("hardSkills", hardSkills)}
                  />
                </section>
                <section>
                  <h2 className="mb-3 text-lg">Soft skills</h2>
                  <SkillsEditor
                    label="Soft skill"
                    prefix="ss"
                    groups={bundle.softSkills}
                    translationMode={translationMode}
                    onChange={(softSkills) => patchBundle("softSkills", softSkills)}
                  />
                </section>
              </div>
            )}

            {tab === "certifications" && (
              <CertificationsEditor
                items={bundle.certifications}
                translationMode={translationMode}
                onChange={(certifications) => patchBundle("certifications", certifications)}
              />
            )}

            {tab === "capabilities" && (
              <div className="space-y-10">
                <section>
                  <h2 className="mb-3 text-lg">Cosa so fare</h2>
                  <CapabilitiesEditor
                    label="Cosa so fare"
                    prefix="can"
                    items={bundle.canDo}
                    translationMode={translationMode}
                    onChange={(canDo) => patchBundle("canDo", canDo)}
                  />
                </section>
                <section>
                  <h2 className="mb-3 text-lg">Cosa non fa per me</h2>
                  <CapabilitiesEditor
                    label="Cosa non fa per me"
                    prefix="cannot"
                    items={bundle.cannotDo}
                    translationMode={translationMode}
                    onChange={(cannotDo) => patchBundle("cannotDo", cannotDo)}
                  />
                </section>
              </div>
            )}

            {tab === "timeline" && (
              <TimelineEditor
                entries={bundle.timeline}
                translationMode={translationMode}
                onChange={(timeline) => patchBundle("timeline", timeline)}
              />
            )}

            {tab === "extra" && (
              <div className="space-y-10">
                <section>
                  <h2 className="mb-3 text-lg">RAL desiderata</h2>
                  <CompensationEditor
                    compensation={bundle.compensation}
                    onChange={(compensation) => patchBundle("compensation", compensation)}
                  />
                </section>
                <section>
                  <h2 className="mb-3 text-lg">Link e social</h2>
                  <SocialsEditor
                    socials={bundle.socials}
                    translationMode={translationMode}
                    onChange={(socials) => patchBundle("socials", socials)}
                  />
                </section>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
