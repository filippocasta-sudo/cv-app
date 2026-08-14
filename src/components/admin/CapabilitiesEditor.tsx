"use client";

import { AddButton, EditorCard, TextAreaField, TextField } from "@/components/admin/fields";
import type { Capability } from "@/lib/types";

export function CapabilitiesEditor({
  label,
  prefix,
  items,
  onChange,
}: {
  label: string;
  prefix: string;
  items: Capability[];
  onChange: (items: Capability[]) => void;
}) {
  function update(index: number, patch: Partial<Capability>) {
    onChange(items.map((item, position) => (position === index ? { ...item, ...patch } : item)));
  }

  return (
    <div className="space-y-4">
      <AddButton
        label={`Aggiungi voce · ${label}`}
        onClick={() =>
          onChange([...items, { id: `${prefix}-${Date.now()}`, label: "", detail: "" }])
        }
      />

      <div className="space-y-4">
        {items.map((item, index) => (
          <EditorCard
            key={item.id}
            title={item.label}
            onRemove={() => onChange(items.filter((_, position) => position !== index))}
          >
            <TextField
              label="Titolo"
              value={item.label}
              onChange={(value) => update(index, { label: value })}
            />
            <TextAreaField
              label="Dettaglio"
              value={item.detail}
              rows={2}
              onChange={(detail) => update(index, { detail })}
            />
          </EditorCard>
        ))}
      </div>
    </div>
  );
}
