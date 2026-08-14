"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
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
import type { CvData } from "@/lib/types";

const TABS = [
  { key: "profile", label: "Profilo" },
  { key: "goals", label: "Cosa vorrei fare" },
  { key: "skills", label: "Competenze" },
  { key: "certifications", label: "Certificazioni" },
  { key: "capabilities", label: "So fare / Non so fare" },
  { key: "timeline", label: "Timeline" },
  { key: "extra", label: "RAL e link" },
] as const;

type TabKey = (typeof TABS)[number]["key"];
type Status = "idle" | "saving" | "saved" | "error";

export function AdminPanel({ initialData }: { initialData: CvData }) {
  const router = useRouter();
  const [draft, setDraft] = useState<CvData>(initialData);
  const [saved, setSaved] = useState<CvData>(initialData);
  const [tab, setTab] = useState<TabKey>("timeline");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(saved), [draft, saved]);

  const patch = <K extends keyof CvData>(key: K, value: CvData[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  async function save() {
    setStatus("saving");
    setError("");
    try {
      const response = await fetch("/api/cv", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
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
    const body = (await response.json()) as CvData;
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
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground-muted transition hover:text-sage"
          >
            <ArrowLeft className="size-4" aria-hidden />
            CV pubblico
          </Link>

          <span className="font-display text-sm font-extrabold">Pannello admin</span>

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
              className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle px-3 py-2 text-sm font-semibold text-foreground-muted transition hover:border-border-strong hover:text-foreground"
            >
              <RotateCcw className="size-4" aria-hidden />
              <span className="hidden sm:inline">Ripristina</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle px-3 py-2 text-sm font-semibold text-foreground-muted transition hover:border-border-strong hover:text-foreground"
            >
              <LogOut className="size-4" aria-hidden />
              <span className="hidden sm:inline">Esci</span>
            </button>

            <button
              type="button"
              onClick={save}
              disabled={status === "saving" || !dirty}
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
        {error && (
          <p className="mb-5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
            {error}
          </p>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {tab === "profile" && (
              <PersonalEditor
                personal={draft.personal}
                onChange={(personal) => patch("personal", personal)}
              />
            )}

            {tab === "goals" && (
              <GoalsEditor goals={draft.goals} onChange={(goals) => patch("goals", goals)} />
            )}

            {tab === "skills" && (
              <div className="space-y-10">
                <section>
                  <h2 className="mb-3 text-lg">Hard skills</h2>
                  <SkillsEditor
                    label="Hard skill"
                    prefix="hs"
                    groups={draft.hardSkills}
                    onChange={(hardSkills) => patch("hardSkills", hardSkills)}
                  />
                </section>
                <section>
                  <h2 className="mb-3 text-lg">Soft skills</h2>
                  <SkillsEditor
                    label="Soft skill"
                    prefix="ss"
                    groups={draft.softSkills}
                    onChange={(softSkills) => patch("softSkills", softSkills)}
                  />
                </section>
              </div>
            )}

            {tab === "certifications" && (
              <CertificationsEditor
                items={draft.certifications}
                onChange={(certifications) => patch("certifications", certifications)}
              />
            )}

            {tab === "capabilities" && (
              <div className="space-y-10">
                <section>
                  <h2 className="mb-3 text-lg">Su questo rispondo io</h2>
                  <CapabilitiesEditor
                    label="So fare"
                    prefix="can"
                    items={draft.canDo}
                    onChange={(canDo) => patch("canDo", canDo)}
                  />
                </section>
                <section>
                  <h2 className="mb-3 text-lg">Su questo non contarci</h2>
                  <CapabilitiesEditor
                    label="Non so fare"
                    prefix="cannot"
                    items={draft.cannotDo}
                    onChange={(cannotDo) => patch("cannotDo", cannotDo)}
                  />
                </section>
              </div>
            )}

            {tab === "timeline" && (
              <TimelineEditor
                entries={draft.timeline}
                onChange={(timeline) => patch("timeline", timeline)}
              />
            )}

            {tab === "extra" && (
              <div className="space-y-10">
                <section>
                  <h2 className="mb-3 text-lg">RAL desiderata</h2>
                  <CompensationEditor
                    compensation={draft.compensation}
                    onChange={(compensation) => patch("compensation", compensation)}
                  />
                </section>
                <section>
                  <h2 className="mb-3 text-lg">Link e social</h2>
                  <SocialsEditor
                    socials={draft.socials}
                    onChange={(socials) => patch("socials", socials)}
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
