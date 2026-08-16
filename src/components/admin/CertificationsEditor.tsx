"use client";

import {
  AddButton,
  CheckboxField,
  EditorCard,
  TextField,
} from "@/components/admin/fields";
import type { Certification } from "@/lib/types";

export function CertificationsEditor({
  items,
  onChange,
  translationMode = false,
}: {
  items: Certification[];
  onChange: (items: Certification[]) => void;
  translationMode?: boolean;
}) {
  function update(index: number, patch: Partial<Certification>) {
    onChange(items.map((item, position) => (position === index ? { ...item, ...patch } : item)));
  }

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-foreground-muted">
        Le voci marcate <strong>In primo piano</strong> restano sempre visibili; le altre
        finiscono nell&apos;accordion dei corsi passati.
      </p>

      {!translationMode && (
        <AddButton
          label="Aggiungi certificazione o corso"
          onClick={() =>
            onChange([
              ...items,
              {
                id: `cert-${Date.now()}`,
                name: "",
                issuer: "",
                year: String(new Date().getFullYear()),
                primary: true,
              },
            ])
          }
        />
      )}

      <div className="space-y-4">
        {items.map((item, index) => (
          <EditorCard
            key={item.id}
            title={item.name}
            subtitle={`${item.issuer || "—"} · ${item.year || "—"}`}
            onRemove={
              translationMode
                ? undefined
                : () => onChange(items.filter((_, position) => position !== index))
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="Nome"
                value={item.name}
                onChange={(name) => update(index, { name })}
              />
              <TextField
                label="Ente"
                value={item.issuer}
                onChange={(issuer) => update(index, { issuer })}
              />
              <TextField
                label="Anno"
                value={item.year}
                onChange={(year) => update(index, { year })}
                disabled={translationMode}
              />
              <TextField
                label="Nota (opzionale)"
                value={item.note ?? ""}
                onChange={(note) => update(index, { note: note || undefined })}
              />
            </div>
            {!translationMode && (
              <CheckboxField
                label="In primo piano"
                checked={item.primary}
                onChange={(primary) => update(index, { primary })}
              />
            )}
          </EditorCard>
        ))}
      </div>
    </div>
  );
}
