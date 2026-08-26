"use client";

import { Plus, Trash2 } from "lucide-react";

const inputClass =
  "w-full rounded-lg border-2 border-[var(--admin-border)] bg-[var(--admin-input-bg)] px-3 py-2 text-sm shadow-sm outline-none transition placeholder:text-foreground-faint/80 focus:border-[var(--admin-border-focus)] focus:ring-2 focus:ring-indigo/25";

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-foreground-muted">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder ?? `Inserisci ${label.toLowerCase()}…`}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass}${disabled ? " opacity-60" : ""}`}
      />
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-foreground-muted">{label}</span>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder ?? `Inserisci ${label.toLowerCase()}…`}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} resize-y`}
      />
    </label>
  );
}

export function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-foreground-muted">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className={inputClass}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-[var(--indigo)]"
      />
      <span className="font-semibold text-foreground-muted">{label}</span>
    </label>
  );
}

/** Editor for the many `string[]` fields in the CV model. */
export function StringListField({
  label,
  items,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  function update(index: number, value: string) {
    onChange(items.map((item, position) => (position === index ? value : item)));
  }

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground-muted">{label}</span>
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-semibold text-indigo transition hover:bg-indigo-soft"
        >
          <Plus className="size-3.5" aria-hidden />
          Aggiungi
        </button>
      </div>

      {items.length === 0 && (
        <p className="rounded-lg border-2 border-dashed border-[var(--admin-border)] bg-[var(--admin-input-bg)] px-3 py-2 text-xs text-foreground-faint">
          Nessuna voce — clicca Aggiungi.
        </p>
      )}

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            {multiline ? (
              <textarea
                value={item}
                rows={2}
                placeholder={placeholder ?? "Inserisci testo…"}
                onChange={(event) => update(index, event.target.value)}
                className={`${inputClass} resize-y`}
              />
            ) : (
              <input
                value={item}
                placeholder={placeholder ?? "Inserisci testo…"}
                onChange={(event) => update(index, event.target.value)}
                className={inputClass}
              />
            )}
            <button
              type="button"
              onClick={() => onChange(items.filter((_, position) => position !== index))}
              aria-label={`Rimuovi voce ${index + 1}`}
              className="mt-1 grid size-8 shrink-0 place-items-center rounded-lg border-2 border-[var(--admin-border)] text-foreground-faint transition hover:border-red-400 hover:text-red-500"
            >
              <Trash2 className="size-3.5" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EditorCard({
  title,
  subtitle,
  onRemove,
  children,
}: {
  title: string;
  subtitle?: string;
  onRemove?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border-2 border-[var(--admin-border)] bg-surface p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-sm font-bold">{title || "Senza titolo"}</p>
          {subtitle && <p className="text-xs text-foreground-faint">{subtitle}</p>}
        </div>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex shrink-0 items-center gap-1 rounded-md border-2 border-[var(--admin-border)] px-2 py-1 text-xs font-semibold text-foreground-muted transition hover:border-red-400 hover:text-red-500"
          >
            <Trash2 className="size-3.5" aria-hidden />
            Elimina
          </button>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-indigo/50 bg-indigo-soft/40 px-4 py-3 text-sm font-bold text-indigo-strong transition hover:border-indigo hover:bg-indigo-soft"
    >
      <Plus className="size-4" aria-hidden />
      {label}
    </button>
  );
}
