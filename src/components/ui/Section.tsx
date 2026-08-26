import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      <header className="mb-6">
        {eyebrow && (
          <p className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 font-heading text-xs font-bold tracking-[0.18em] text-indigo uppercase shadow-neumorphic-inset">
            <span className="size-1.5 rounded-full bg-gradient-to-r from-coral to-indigo" aria-hidden />
            {eyebrow}
          </p>
        )}
        <h2 className="text-balance text-2xl break-words sm:text-3xl">{title}</h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-muted">
            {description}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}
