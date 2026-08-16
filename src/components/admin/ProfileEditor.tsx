"use client";

import {
  AddButton,
  EditorCard,
  StringListField,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import { PortraitUpload } from "@/components/admin/PortraitUpload";
import type {
  CareerGoals,
  Compensation,
  Language,
  PersonalInfo,
  SocialLink,
} from "@/lib/types";

export function PersonalEditor({
  personal,
  onChange,
  storageWritable = true,
}: {
  personal: PersonalInfo;
  onChange: (personal: PersonalInfo) => void;
  storageWritable?: boolean;
}) {
  const patch = (values: Partial<PersonalInfo>) => onChange({ ...personal, ...values });

  function updateLanguage(index: number, values: Partial<Language>) {
    patch({
      languages: personal.languages.map((language, position) =>
        position === index ? { ...language, ...values } : language,
      ),
    });
  }

  return (
    <div className="space-y-4">
      <PortraitUpload
        portraitUrl={personal.portraitUrl}
        onChange={(portraitUrl) => patch({ portraitUrl })}
        disabled={!storageWritable}
      />

      <div className="rounded-xl border-2 border-[var(--admin-border)] bg-surface p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-2">
          <TextField label="Nome" value={personal.name} onChange={(name) => patch({ name })} />
          <TextField
            label="Badge di stato"
            value={personal.statusBadge}
            onChange={(statusBadge) => patch({ statusBadge })}
          />
          <TextField
            label="Email"
            type="email"
            value={personal.email}
            onChange={(email) => patch({ email })}
          />
          <TextField
            label="Telefono"
            value={personal.phone}
            onChange={(phone) => patch({ phone })}
          />
          <TextField
            label="LinkedIn"
            value={personal.linkedin}
            onChange={(linkedin) => patch({ linkedin })}
          />
          <TextField
            label="Posizione"
            value={personal.location}
            onChange={(location) => patch({ location })}
          />
          <TextField
            label="Patente / mobilità"
            value={personal.license}
            onChange={(license) => patch({ license })}
          />
          <TextField
            label="Data di nascita"
            value={personal.birthDate}
            onChange={(birthDate) => patch({ birthDate })}
            placeholder="es. 12 maggio 1992"
          />
        </div>

        <div className="mt-3 space-y-3">
          <StringListField
            label="Ruoli principali"
            items={personal.roles}
            onChange={(roles) => patch({ roles })}
          />
          <TextAreaField
            label="Introduzione schietta"
            value={personal.intro}
            rows={6}
            placeholder="Testo completo visibile in homepage (versione Moderno). Puoi usare paragrafi separati da una riga vuota."
            onChange={(intro) => patch({ intro })}
          />
          <TextAreaField
            label="Introduzione per CV formale"
            value={personal.formalIntro}
            rows={6}
            placeholder="Testo completo visibile in homepage (versione Classico)."
            onChange={(formalIntro) => patch({ formalIntro })}
          />
        </div>
      </div>

      <EditorCard title="Lingue">
        {personal.languages.map((language, index) => (
          <div key={index} className="flex items-end gap-2">
            <div className="grid flex-1 gap-2 sm:grid-cols-2">
              <TextField
                label="Lingua"
                value={language.name}
                onChange={(name) => updateLanguage(index, { name })}
              />
              <TextField
                label="Livello"
                value={language.level}
                onChange={(level) => updateLanguage(index, { level })}
              />
            </div>
            <button
              type="button"
              onClick={() =>
                patch({
                  languages: personal.languages.filter((_, position) => position !== index),
                })
              }
              className="mb-0.5 rounded-lg border-2 border-[var(--admin-border)] px-2 py-2 text-xs font-semibold text-foreground-muted transition hover:border-red-400 hover:text-red-500"
            >
              Rimuovi
            </button>
          </div>
        ))}
        <AddButton
          label="Aggiungi lingua"
          onClick={() => patch({ languages: [...personal.languages, { name: "", level: "" }] })}
        />
      </EditorCard>
    </div>
  );
}

export function GoalsEditor({
  goals,
  onChange,
}: {
  goals: CareerGoals;
  onChange: (goals: CareerGoals) => void;
}) {
  const patch = (values: Partial<CareerGoals>) => onChange({ ...goals, ...values });

  return (
    <div className="space-y-3 rounded-xl border-2 border-[var(--admin-border)] bg-surface p-4 shadow-sm">
      <TextAreaField
        label="Frase di apertura"
        value={goals.headline}
        rows={3}
        onChange={(headline) => patch({ headline })}
      />
      <StringListField
        label="Ruoli target"
        items={goals.targetRoles}
        onChange={(targetRoles) => patch({ targetRoles })}
      />
      <StringListField
        label="Tipo di progetti"
        items={goals.projectTypes}
        multiline
        onChange={(projectTypes) => patch({ projectTypes })}
      />
      <StringListField
        label="Contesto aziendale ideale"
        items={goals.idealContext}
        multiline
        onChange={(idealContext) => patch({ idealContext })}
      />
    </div>
  );
}

export function CompensationEditor({
  compensation,
  onChange,
}: {
  compensation: Compensation;
  onChange: (compensation: Compensation) => void;
}) {
  const patch = (values: Partial<Compensation>) => onChange({ ...compensation, ...values });

  return (
    <div className="space-y-3 rounded-xl border-2 border-[var(--admin-border)] bg-surface p-4 shadow-sm">
      <p className="text-sm leading-relaxed text-foreground-muted">
        Questo blocco resta nascosto dietro un pulsante nella sidebar pubblica.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label="Etichetta"
          value={compensation.label}
          onChange={(label) => patch({ label })}
        />
        <TextField
          label="Range"
          value={compensation.range}
          placeholder="50.000 € – 60.000 €"
          onChange={(range) => patch({ range })}
        />
      </div>
      <TextAreaField
        label="Nota"
        value={compensation.note}
        rows={2}
        onChange={(note) => patch({ note })}
      />
    </div>
  );
}

export function SocialsEditor({
  socials,
  onChange,
}: {
  socials: SocialLink[];
  onChange: (socials: SocialLink[]) => void;
}) {
  function update(index: number, patch: Partial<SocialLink>) {
    onChange(socials.map((item, position) => (position === index ? { ...item, ...patch } : item)));
  }

  return (
    <div className="space-y-4">
      <AddButton
        label="Aggiungi link"
        onClick={() => onChange([...socials, { id: `soc-${Date.now()}`, label: "", url: "" }])}
      />
      {socials.map((social, index) => (
        <EditorCard
          key={social.id}
          title={social.label}
          subtitle={social.url}
          onRemove={() => onChange(socials.filter((_, position) => position !== index))}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField
              label="Etichetta"
              value={social.label}
              onChange={(label) => update(index, { label })}
            />
            <TextField
              label="URL"
              value={social.url}
              onChange={(url) => update(index, { url })}
            />
          </div>
        </EditorCard>
      ))}
    </div>
  );
}
