"use client";

import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Disclosure } from "@/components/ui/Disclosure";
import type { PersonalInfo, SocialLink } from "@/lib/types";

type Status = "idle" | "sending" | "sent" | "error";

function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? "Invio non riuscito.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      event.currentTarget.reset();
    } catch {
      setError("Invio non riuscito: controlla la connessione.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-sage/40 bg-sage-soft p-4 text-sm text-sage-strong"
      >
        <p className="font-semibold">Messaggio ricevuto.</p>
        <p className="mt-1 leading-relaxed">
          Rispondo dallo stesso indirizzo. Se hai fretta, scrivimi direttamente a{" "}
          <a href={`mailto:${email}`} className="underline">
            {email}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-foreground-muted">Nome</span>
          <input
            name="name"
            required
            minLength={2}
            className="w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm outline-none transition focus:border-sage"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-foreground-muted">Email</span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm outline-none transition focus:border-sage"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-xs font-semibold text-foreground-muted">Messaggio</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={4}
          placeholder="Ruolo, contesto e cosa ti serve. Vado al punto anch'io."
          className="w-full resize-y rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm outline-none transition focus:border-sage"
        />
      </label>

      {status === "error" && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-lg bg-sage px-4 py-2 text-sm font-bold text-white transition hover:bg-sage-strong disabled:opacity-60"
      >
        {status === "sending" ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Send className="size-4" aria-hidden />
        )}
        Invia messaggio
      </button>
    </form>
  );
}

export function Footer({
  personal,
  socials,
}: {
  personal: PersonalInfo;
  socials: SocialLink[];
}) {
  const router = useRouter();
  const clicks = useRef(0);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        router.push("/admin");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  /** Three quick clicks on the footer marker open the admin panel. */
  function handleSecretClick() {
    clicks.current += 1;
    if (resetTimer.current) clearTimeout(resetTimer.current);
    if (clicks.current >= 3) {
      clicks.current = 0;
      router.push("/admin");
      return;
    }
    resetTimer.current = setTimeout(() => {
      clicks.current = 0;
    }, 1200);
  }

  return (
    <footer id="contatti" className="mt-16 scroll-mt-24 border-t border-border-subtle pt-10 pb-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <h2 className="text-xl sm:text-2xl">Parliamone</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground-muted">
            Se il profilo ti torna, scrivimi. Preferisco una prima chiacchierata onesta a tre
            round di test attitudinali.
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-sm font-semibold transition hover:border-sage hover:text-sage"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border-subtle bg-surface p-5">
          <Disclosure label="Inviami un messaggio" openLabel="Chiudi il form" emphasis>
            <div className="pt-2">
              <ContactForm email={personal.email} />
            </div>
          </Disclosure>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-5 text-xs text-foreground-faint">
        <p>
          © {new Date().getFullYear()} {personal.name} · CV costruito con Next.js
        </p>
        <button
          type="button"
          onClick={handleSecretClick}
          aria-label="Area riservata"
          title="·"
          className="no-print size-4 rounded-full text-transparent transition hover:bg-border-subtle"
        >
          ·
        </button>
      </div>
    </footer>
  );
}
