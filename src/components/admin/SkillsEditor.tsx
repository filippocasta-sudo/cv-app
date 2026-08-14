"use client";

import {
  AddButton,
  EditorCard,
  StringListField,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import type { SkillGroup } from "@/lib/types";

export function SkillsEditor({
  label,
  prefix,
  groups,
  onChange,
}: {
  label: string;
  prefix: string;
  groups: SkillGroup[];
  onChange: (groups: SkillGroup[]) => void;
}) {
  function update(index: number, patch: Partial<SkillGroup>) {
    onChange(groups.map((group, position) => (position === index ? { ...group, ...patch } : group)));
  }

  return (
    <div className="space-y-4">
      <AddButton
        label={`Aggiungi ${label.toLowerCase()}`}
        onClick={() =>
          onChange([
            ...groups,
            { id: `${prefix}-${Date.now()}`, name: "", summary: "", details: [] },
          ])
        }
      />

      <div className="space-y-4">
        {groups.map((group, index) => (
          <EditorCard
            key={group.id}
            title={group.name}
            subtitle={`${group.details.length} dettagli espandibili`}
            onRemove={() => onChange(groups.filter((_, position) => position !== index))}
          >
            <TextField
              label="Macro-competenza"
              value={group.name}
              onChange={(name) => update(index, { name })}
            />
            <TextAreaField
              label="Sintesi (sempre visibile)"
              value={group.summary}
              rows={2}
              onChange={(summary) => update(index, { summary })}
            />
            <StringListField
              label="Dettagli (dentro l'accordion)"
              items={group.details}
              multiline
              onChange={(details) => update(index, { details })}
            />
          </EditorCard>
        ))}
      </div>
    </div>
  );
}
