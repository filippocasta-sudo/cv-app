"use client";

import {
  AddButton,
  EditorCard,
  SelectField,
  StringListField,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import { TIMELINE_KIND_LABELS, type TimelineEntry, type TimelineKind } from "@/lib/types";

const KIND_OPTIONS = (Object.keys(TIMELINE_KIND_LABELS) as TimelineKind[]).map((kind) => ({
  value: kind,
  label: TIMELINE_KIND_LABELS[kind],
}));

export function TimelineEditor({
  entries,
  onChange,
  translationMode = false,
}: {
  entries: TimelineEntry[];
  onChange: (entries: TimelineEntry[]) => void;
  translationMode?: boolean;
}) {
  function update(index: number, patch: Partial<TimelineEntry>) {
    onChange(entries.map((entry, position) => (position === index ? { ...entry, ...patch } : entry)));
  }

  function add() {
    const now = new Date();
    onChange([
      {
        id: `tl-${Date.now()}`,
        kind: "work",
        title: "",
        organization: "",
        period: `${now.getFullYear()} — Oggi`,
        sortKey: Number(`${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`),
        impact: "",
        context: [],
        learned: [],
        tags: [],
      },
      ...entries,
    ]);
  }

  const ordered = [...entries].sort((a, b) => b.sortKey - a.sortKey);

  return (
    <div className="space-y-4">
      {!translationMode && (
        <p className="text-sm leading-relaxed text-foreground-muted">
          La timeline è ordinata in pagina con <strong>Ordinamento</strong> decrescente: usa un
          numero tipo <code className="rounded bg-surface-muted px-1">202602</code> per febbraio
          2026.
        </p>
      )}

      {!translationMode && <AddButton label="Aggiungi voce alla timeline" onClick={add} />}

      <div className="space-y-4">
        {ordered.map((entry) => {
          const index = entries.indexOf(entry);
          return (
            <EditorCard
              key={entry.id}
              title={entry.title}
              subtitle={`${TIMELINE_KIND_LABELS[entry.kind]} · ${entry.organization || "—"} · ${entry.period || "—"}`}
              onRemove={
                translationMode
                  ? undefined
                  : () => onChange(entries.filter((_, position) => position !== index))
              }
            >
              {!translationMode && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <SelectField
                    label="Tipologia"
                    value={entry.kind}
                    options={KIND_OPTIONS}
                    onChange={(kind) => update(index, { kind })}
                  />
                  <TextField
                    label="Ordinamento (numero)"
                    type="number"
                    value={String(entry.sortKey)}
                    onChange={(value) => update(index, { sortKey: Number(value) || 0 })}
                  />
                </div>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField
                  label="Ruolo / Titolo"
                  value={entry.title}
                  onChange={(title) => update(index, { title })}
                />
                <TextField
                  label="Azienda / Istituto"
                  value={entry.organization}
                  onChange={(organization) => update(index, { organization })}
                />
                <TextField
                  label="Periodo"
                  value={entry.period}
                  placeholder="Feb 2026 — Oggi"
                  onChange={(period) => update(index, { period })}
                />
                <TextField
                  label="Luogo (opzionale)"
                  value={entry.location ?? ""}
                  onChange={(location) => update(index, { location: location || undefined })}
                />
              </div>

              {!translationMode && (
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={entry.current === true}
                    onChange={(event) =>
                      update(index, { current: event.target.checked || undefined })
                    }
                    className="size-4 accent-[var(--sage)]"
                  />
                  <span className="font-semibold text-foreground-muted">
                    Mostra badge “In corso”
                  </span>
                </label>
              )}

              <TextAreaField
                label="Risultato principale / impatto"
                value={entry.impact}
                rows={2}
                placeholder="Cosa hai portato a casa, in una frase."
                onChange={(impact) => update(index, { impact })}
              />

              <StringListField
                label="Cosa facevo / contesto"
                items={entry.context}
                multiline
                onChange={(context) => update(index, { context })}
              />

              <StringListField
                label="Cosa ho imparato"
                items={entry.learned}
                multiline
                onChange={(learned) => update(index, { learned })}
              />

              <StringListField
                label="Tag"
                items={entry.tags}
                placeholder="Jira"
                onChange={(tags) => update(index, { tags })}
              />

              <TextAreaField
                label="Versione per CV formale (opzionale)"
                value={entry.formalSummary ?? ""}
                rows={2}
                onChange={(value) => update(index, { formalSummary: value || undefined })}
              />
            </EditorCard>
          );
        })}
      </div>
    </div>
  );
}
