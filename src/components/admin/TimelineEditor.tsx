"use client";

import { Reorder, useDragControls } from "framer-motion";
import { GripVertical } from "lucide-react";
import {
  AddButton,
  EditorCard,
  SelectField,
  StringListField,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import {
  applyTimelineVisualOrder,
  nextTimelineSortKey,
  sortTimelineEntries,
} from "@/lib/timelineOrder";
import { TIMELINE_KIND_LABELS, type TimelineEntry, type TimelineKind } from "@/lib/types";

const KIND_OPTIONS = (Object.keys(TIMELINE_KIND_LABELS) as TimelineKind[]).map((kind) => ({
  value: kind,
  label: TIMELINE_KIND_LABELS[kind],
}));

function TimelineEntryCard({
  entry,
  index,
  translationMode,
  onUpdate,
  onRemove,
}: {
  entry: TimelineEntry;
  index: number;
  translationMode: boolean;
  onUpdate: (patch: Partial<TimelineEntry>) => void;
  onRemove?: () => void;
}) {
  const dragControls = useDragControls();

  const card = (
    <div className="flex items-start gap-2">
      {!translationMode && (
        <button
          type="button"
          aria-label="Trascina per riordinare"
          className="mt-4 inline-flex shrink-0 cursor-grab touch-none rounded-lg border-2 border-[var(--admin-border)] bg-[var(--admin-input-bg)] p-2 text-foreground-muted active:cursor-grabbing"
          onPointerDown={(event) => dragControls.start(event)}
        >
          <GripVertical className="size-4" aria-hidden />
        </button>
      )}

      <div className="min-w-0 flex-1">
        <EditorCard
          title={entry.title}
          subtitle={`#${index + 1} · ${TIMELINE_KIND_LABELS[entry.kind]} · ${entry.organization || "—"} · ${entry.period || "—"}`}
          onRemove={onRemove}
        >
            {!translationMode && (
              <SelectField
                label="Tipologia"
                value={entry.kind}
                options={KIND_OPTIONS}
                onChange={(kind) => onUpdate({ kind })}
              />
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="Ruolo / Titolo"
                value={entry.title}
                onChange={(title) => onUpdate({ title })}
              />
              <TextField
                label="Azienda / Istituto"
                value={entry.organization}
                onChange={(organization) => onUpdate({ organization })}
              />
              <TextField
                label="Periodo"
                value={entry.period}
                placeholder="Feb 2026 — Oggi"
                onChange={(period) => onUpdate({ period })}
              />
              <TextField
                label="Luogo (opzionale)"
                value={entry.location ?? ""}
                onChange={(location) => onUpdate({ location: location || undefined })}
              />
            </div>

            {!translationMode && (
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={entry.current === true}
                  onChange={(event) =>
                    onUpdate({ current: event.target.checked || undefined })
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
              onChange={(impact) => onUpdate({ impact })}
            />

            <StringListField
              label={entry.kind === "education" ? "Cosa ho studiato" : "Cosa ho fatto"}
              items={entry.context}
              multiline
              onChange={(context) => onUpdate({ context })}
            />

            {entry.kind !== "education" && (
              <StringListField
                label="Cosa ho imparato"
                items={entry.learned}
                multiline
                onChange={(learned) => onUpdate({ learned })}
              />
            )}

            {entry.kind === "project" && !translationMode && (
              <TextField
                label="Link progetto (opzionale)"
                value={entry.link ?? ""}
                placeholder="https://…"
                onChange={(link) => onUpdate({ link: link || undefined })}
              />
            )}

            <StringListField
              label="Tag"
              items={entry.tags}
              placeholder="Jira"
              onChange={(tags) => onUpdate({ tags })}
            />

            <TextAreaField
              label="Versione per CV formale (opzionale)"
              value={entry.formalSummary ?? ""}
              rows={2}
              onChange={(value) => onUpdate({ formalSummary: value || undefined })}
            />
        </EditorCard>
      </div>
    </div>
  );

  if (translationMode) return card;

  return (
    <Reorder.Item
      value={entry}
      dragListener={false}
      dragControls={dragControls}
      className="list-none"
    >
      {card}
    </Reorder.Item>
  );
}

export function TimelineEditor({
  entries,
  onChange,
  translationMode = false,
}: {
  entries: TimelineEntry[];
  onChange: (entries: TimelineEntry[]) => void;
  translationMode?: boolean;
}) {
  const ordered = sortTimelineEntries(entries);

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
        sortKey: nextTimelineSortKey(entries),
        impact: "",
        context: [],
        learned: [],
        tags: [],
      },
      ...entries,
    ]);
  }

  function handleReorder(reordered: TimelineEntry[]) {
    onChange(applyTimelineVisualOrder(reordered));
  }

  return (
    <div className="space-y-4">
      {!translationMode && (
        <p className="text-sm leading-relaxed text-foreground-muted">
          Trascina le voci con l&apos;icona{" "}
          <GripVertical className="inline size-3.5 align-text-bottom" aria-hidden /> per
          ordinarle come in pagina: in alto le più recenti.
        </p>
      )}

      {!translationMode && <AddButton label="Aggiungi voce alla timeline" onClick={add} />}

      {translationMode ? (
        <div className="space-y-4">
          {ordered.map((entry, position) => {
            const index = entries.findIndex((item) => item.id === entry.id);
            return (
              <div key={entry.id}>
                <TimelineEntryCard
                  entry={entry}
                  index={position}
                  translationMode
                  onUpdate={(patch) => update(index, patch)}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <Reorder.Group
          axis="y"
          values={ordered}
          onReorder={handleReorder}
          className="space-y-4"
        >
          {ordered.map((entry, position) => {
            const index = entries.findIndex((item) => item.id === entry.id);
            return (
              <TimelineEntryCard
                key={entry.id}
                entry={entry}
                index={position}
                translationMode={false}
                onUpdate={(patch) => update(index, patch)}
                onRemove={() => onChange(entries.filter((_, itemIndex) => itemIndex !== index))}
              />
            );
          })}
        </Reorder.Group>
      )}
    </div>
  );
}
