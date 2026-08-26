"use client";

import { motion } from "framer-motion";
import { Coffee, Loader2, Mail, MapPin, Phone, Pizza, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Disclosure } from "@/components/ui/Disclosure";
import { LinkedInIcon } from "@/components/ui/icons";
import { useI18n } from "@/lib/i18n";
import type { PersonalInfo, SocialLink } from "@/lib/types";

type Status = "idle" | "sending" | "sent" | "error";

function ContactForm({ email }: { email: string }) {
  const { t } = useI18n();
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
        setError(body.error ?? t("footer.error"));
        setStatus("error");
        return;
      }

      setStatus("sent");
      event.currentTarget.reset();
    } catch {
      setError(t("footer.errorNetwork"));
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-white/25 bg-white/20 p-4 text-sm text-white"
      >
        <p className="font-bold">{t("footer.sentTitle")}</p>
        <p className="mt-1 leading-relaxed text-white/90">
          {t("footer.sentBody")}{" "}
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
          <span className="mb-1 block text-xs font-semibold text-white/85">{t("footer.name")}</span>
          <input
            name="name"
            required
            minLength={2}
            autoComplete="name"
            className="w-full rounded-xl border border-white/30 bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-white/50"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-white/85">{t("footer.email")}</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-white/30 bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-white/50"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-xs font-semibold text-white/85">{t("footer.message")}</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={4}
          placeholder={t("footer.placeholder")}
          className="w-full resize-y rounded-xl border border-white/30 bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-white/50"
        />
      </label>

      {status === "error" && <p className="text-sm text-coral-soft">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-sm font-bold text-indigo-strong transition hover:bg-white/90 disabled:opacity-60"
      >
        {status === "sending" ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Send className="size-4" aria-hidden />
        )}
        {t("footer.send")}
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
  const { t } = useI18n();
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
    <footer id="contatti" className="relative mt-20 flex flex-1 flex-col scroll-mt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />

      <div className="footer-contact-band gradient-surface-indigo-deep relative flex flex-1 flex-col border-t border-white/15 py-12 sm:py-14">
        <div className="relative mx-auto grid w-full max-w-6xl flex-1 gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white sm:text-2xl">{t("footer.title")}</h2>
              <span
                className="group/coffee relative hidden sm:inline-flex"
                title={t("footer.pizzaTip")}
              >
                <Coffee className="size-4 text-coral-soft" aria-hidden />
                <Pizza className="absolute -right-2 -bottom-1 size-3 text-white opacity-0 transition group-hover/coffee:opacity-100" />
              </span>
            </div>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/90">
              {t("footer.intro")}
            </p>

            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-white/80"
                >
                  <Mail className="size-4 text-white/85" aria-hidden />
                  {personal.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personal.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-white/80"
                >
                  <Phone className="size-4 text-white/85" aria-hidden />
                  {personal.phone}
                </a>
              </li>
              <li>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-white/80"
                >
                  <LinkedInIcon className="size-4 text-white/85" />
                  {t("footer.linkedin")}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-white/85">
                <MapPin className="size-4 text-white/85" aria-hidden />
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
                    className="inline-flex rounded-2xl border border-white/30 bg-white/15 px-3.5 py-2 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/25"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/12 p-5 backdrop-blur-md">
            <Disclosure
              label={t("footer.openForm")}
              openLabel={t("footer.closeForm")}
              emphasis
              onGradient
            >
              <div className="pt-2">
                <ContactForm email={personal.email} />
              </div>
            </Disclosure>
          </div>
        </div>

        <div className="relative mx-auto mt-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 pt-10 text-xs text-white/65 sm:px-6">
          <p>
            © {new Date().getFullYear()} {personal.name}{t("footer.builtWith")}
            <span className="no-print ml-1 opacity-60" title="May the Force be with you">
              · ★
            </span>
          </p>
          <button
            type="button"
            onClick={handleSecretClick}
            aria-label={t("footer.adminSr")}
            title="·"
            className="no-print size-4 rounded-full text-transparent transition hover:bg-white/10"
          >
            ·
          </button>
        </div>
      </div>
    </footer>
  );
}
