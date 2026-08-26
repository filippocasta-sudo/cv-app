"use client";

import { Header } from "@/components/Header";
import { AtsPrintCv } from "@/components/AtsPrintCv";
import { HomeMain } from "@/components/HomeMain";
import { Footer } from "@/components/Footer";
import { PrintPdfFab } from "@/components/PrintPdfFab";
import { useMode } from "@/context/ModeContext";
import { useLocalizedCv } from "@/lib/i18n";
import type { CvData } from "@/lib/types";

export function LocalizedSite({ cv }: { cv: CvData }) {
  const localized = useLocalizedCv(cv);
  const { formal } = useMode();

  return (
    <div className="relative z-10 flex min-h-dvh flex-col">
      {formal && <AtsPrintCv cv={localized as CvData} />}

      <div className={formal ? "formal-screen flex flex-1 flex-col pb-24" : "flex flex-1 flex-col"}>
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Header socials={localized.socials} />
        </div>

        <HomeMain cv={localized as CvData} />

        <Footer personal={localized.personal} socials={localized.socials} />
      </div>

      <PrintPdfFab />
    </div>
  );
}
