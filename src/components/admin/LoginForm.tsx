"use client";

import { motion } from "framer-motion";
import { KeyRound, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? "Accesso non riuscito.");
        setPending(false);
        return;
      }

      setPassword("");
      router.refresh();
    } catch {
      setError("Accesso non riuscito: controlla la connessione.");
      setPending(false);
    }
  }

  return (
    <div data-admin className="grid min-h-screen place-items-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm rounded-2xl border-2 border-[var(--admin-border)] bg-surface p-6 shadow-sm"
      >
        <span className="grid size-10 place-items-center rounded-xl bg-sage-soft text-sage">
          <KeyRound className="size-5" aria-hidden />
        </span>

        <h1 className="mt-4 text-xl">Area riservata</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
          Pannello di gestione dei contenuti del CV.
        </p>

        {configured ? (
          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-foreground-muted">
                Password
              </span>
              <input
                type="password"
                value={password}
                autoFocus
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border-2 border-[var(--admin-border)] bg-[var(--admin-input-bg)] px-3 py-2 text-sm outline-none transition placeholder:text-foreground-faint/80 focus:border-[var(--admin-border-focus)] focus:ring-2 focus:ring-mint/25"
              />
            </label>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={pending || password.length === 0}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sage px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sage-strong disabled:opacity-60"
            >
              {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
              Accedi
            </button>
          </form>
        ) : (
          <div className="mt-5 rounded-lg border border-kind-project/40 bg-kind-project-soft p-3.5 text-sm leading-relaxed text-kind-project">
            <p className="font-semibold">Password non configurata</p>
            <p className="mt-1">
              Imposta la variabile d&apos;ambiente <code>ADMIN_PASSWORD</code> e riavvia
              l&apos;applicazione.
            </p>
          </div>
        )}

        <Link
          href="/"
          className="mt-5 inline-block text-sm font-semibold text-foreground-muted transition hover:text-sage"
        >
          ← Torna al CV
        </Link>
      </motion.div>
    </div>
  );
}
