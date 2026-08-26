"use client";

import { Printer } from "lucide-react";
import { useMode } from "@/context/ModeContext";
import { useI18n } from "@/lib/i18n";

export function PrintPdfFab() {
  const { formal } = useMode();
  const { t } = useI18n();

  if (!formal) return null;

  return (
    <div className="no-print pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
      <button
        type="button"
        onClick={() => window.print()}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-coral to-indigo px-5 py-3 text-sm font-bold text-white shadow-neumorphic-sm transition hover:brightness-110"
      >
        <Printer className="size-4" aria-hidden />
        {t("header.printPdf")}
      </button>
    </div>
  );
}
