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
      <header className="mb-5">
        {eyebrow && (
          <p className="mb-1.5 text-xs font-semibold tracking-[0.18em] text-sage uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl sm:text-3xl">{title}</h2>
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
