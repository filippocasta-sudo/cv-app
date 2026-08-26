import { ExternalLink } from "lucide-react";

export function ProjectEdgeLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="no-print absolute inset-y-0 right-0 z-10 flex w-9 flex-col items-center justify-center gap-1.5 rounded-r-2xl border-l border-white/25 bg-gradient-to-b from-coral to-coral-strong px-1 text-white shadow-neumorphic-sm transition hover:brightness-110 sm:w-10"
    >
      <ExternalLink className="size-3.5 shrink-0" aria-hidden />
      <span className="text-[9px] font-bold tracking-wide uppercase [writing-mode:vertical-rl] sm:text-[10px]">
        {label}
      </span>
    </a>
  );
}
