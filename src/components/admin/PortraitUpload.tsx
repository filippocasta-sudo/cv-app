"use client";

import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { PORTRAIT_PATH } from "@/lib/hero";

export function PortraitUpload({
  portraitUrl,
  onChange,
  disabled,
}: {
  portraitUrl?: string;
  onChange: (portraitUrl: string | undefined) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const preview = portraitUrl?.trim() || PORTRAIT_PATH;

  async function handleFile(file: File) {
    setUploading(true);
    setError("");

    const body = new FormData();
    body.append("file", file);

    try {
      const response = await fetch("/api/portrait", { method: "POST", body });
      const payload = (await response.json().catch(() => ({}))) as { url?: string; error?: string };

      if (!response.ok) {
        setError(payload.error ?? "Caricamento non riuscito.");
        return;
      }

      if (payload.url) onChange(payload.url);
    } catch {
      setError("Caricamento non riuscito: controlla la connessione.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="rounded-xl border-2 border-dashed border-[var(--admin-border)] bg-[var(--admin-input-bg)] p-4">
      <p className="mb-3 text-xs font-semibold text-foreground-muted">Foto profilo</p>

      <div className="flex flex-wrap items-start gap-4">
        <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl border-2 border-[var(--admin-border)] bg-surface-muted">
          <Image
            src={preview}
            alt="Anteprima foto profilo"
            fill
            className="object-contain object-bottom"
            sizes="112px"
            unoptimized={preview.startsWith("http") || preview.includes("?v=")}
          />
        </div>

        <div className="min-w-[200px] flex-1 space-y-2">
          <p className="text-xs leading-relaxed text-foreground-muted">
            PNG con sfondo trasparente consigliato. Max 5 MB.
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={disabled || uploading}
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[var(--admin-border)] bg-surface px-3 py-2 text-xs font-bold text-foreground transition hover:border-[var(--admin-border-focus)] disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="size-3.5 animate-spin" aria-hidden />
              ) : (
                <ImagePlus className="size-3.5" aria-hidden />
              )}
              {uploading ? "Caricamento…" : "Carica immagine"}
            </button>

            {portraitUrl && (
              <button
                type="button"
                disabled={disabled || uploading}
                onClick={() => onChange(undefined)}
                className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[var(--admin-border)] px-3 py-2 text-xs font-semibold text-foreground-muted transition hover:border-red-400 hover:text-red-500 disabled:opacity-50"
              >
                <Trash2 className="size-3.5" aria-hidden />
                Usa default
              </button>
            )}
          </div>

          {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
          {portraitUrl && (
            <p className="text-[11px] text-foreground-faint">
              Ricorda di cliccare <strong>Salva</strong> per confermare nel CV.
            </p>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
    </div>
  );
}
