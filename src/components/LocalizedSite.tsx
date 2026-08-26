"use client";

import { Header } from "@/components/Header";
import { HomeMain } from "@/components/HomeMain";
import { Footer } from "@/components/Footer";
import { useLocalizedCv } from "@/lib/i18n";
import type { CvData } from "@/lib/types";

export function LocalizedSite({ cv }: { cv: CvData }) {
  const localized = useLocalizedCv(cv);

  return (
    <div className="relative z-10 flex min-h-dvh flex-col">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Header socials={localized.socials} />
      </div>

      <HomeMain cv={localized as CvData} />

      <Footer personal={localized.personal} socials={localized.socials} />
    </div>
  );
}
