"use client";

import { motion } from "framer-motion";
import { Coffee, Loader2, Mail, MapPin, Phone, Pizza, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Disclosure } from "@/components/ui/Disclosure";
import { LinkedInIcon } from "@/components/ui/icons";
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
        className="rounded-2xl bg-surface/80 p-4 text-sm text-mint-strong shadow-neumorphic-inset"
      >
        <p className="font-bold">Messaggio ricevuto.</p>
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
            autoComplete="name"
            className="w-full rounded-xl bg-surface/90 px-3 py-2.5 text-sm shadow-neumorphic-inset outline-none transition focus:ring-2 focus:ring-indigo/40"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-foreground-muted">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl bg-surface/90 px-3 py-2.5 text-sm shadow-neumorphic-inset outline-none transition focus:ring-2 focus:ring-indigo/40"
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
          className="w-full resize-y rounded-xl bg-surface/90 px-3 py-2.5 text-sm shadow-neumorphic-inset outline-none transition focus:ring-2 focus:ring-indigo/40"
        />
      </label>

      {status === "error" && <p className="text-sm text-coral">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="neu-interactive inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-coral to-indigo px-5 py-2.5 text-sm font-bold text-white shadow-neumorphic-sm disabled:opacity-60"
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
    <footer id="contatti" className="relative mt-20 scroll-mt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-coral/25 to-transparent"
      />

      <div className="footer-contact-band relative border-y border-foreground-faint/10 bg-surface-muted py-12 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo/8 via-transparent to-coral/10 dark:from-indigo/15 dark:to-coral/15"
        />

        <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl">Parliamone</h2>
              <span
                className="group/coffee relative hidden sm:inline-flex"
                title="Forno a legna & ottimizzazione processi sotto stress"
              >
                <Coffee className="size-4 text-amber" aria-hidden />
                <Pizza className="absolute -right-2 -bottom-1 size-3 text-coral opacity-0 transition group-hover/coffee:opacity-100" />
              </span>
            </div>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground-muted">
              Se il profilo ti torna, scrivimi. Preferisco una prima chiacchierata onesta a tre
              round di test attitudinali.
            </p>

            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2 font-semibold transition hover:text-coral"
                >
                  <Mail className="size-4 text-foreground-faint" aria-hidden />
                  {personal.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personal.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 font-semibold transition hover:text-coral"
                >
                  <Phone className="size-4 text-foreground-faint" aria-hidden />
                  {personal.phone}
                </a>
              </li>
              <li>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-semibold transition hover:text-coral"
                >
                  <LinkedInIcon className="size-4 text-foreground-faint" />
                  Profilo LinkedIn
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-foreground-muted">
                <MapPin className="size-4 text-foreground-faint" aria-hidden />
                {personal.location}
              </li>
            </ul>

            <ul className="mt-5 flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target={social.url.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="neu-interactive inline-flex rounded-2xl px-3.5 py-2 text-sm font-bold text-foreground-muted hover:text-indigo"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="neu-card rounded-3xl bg-surface/70 p-5 backdrop-blur-sm">
            <Disclosure label="Inviami un messaggio" openLabel="Chiudi il form" emphasis>
              <div className="pt-2">
                <ContactForm email={personal.email} />
              </div>
            </Disclosure>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-8 text-xs text-foreground-faint sm:px-6">
        <p>
          © {new Date().getFullYear()} {personal.name} · CV costruito con Next.js
          <span className="no-print ml-1 opacity-40" title="May the Force be with you">
            · ★
          </span>
        </p>
        <button
          type="button"
          onClick={handleSecretClick}
          aria-label="Area riservata"
          title="·"
          className="no-print size-4 rounded-full text-transparent transition hover:shadow-neumorphic-inset"
        >
          ·
        </button>
      </div>
    </footer>
  );
}
