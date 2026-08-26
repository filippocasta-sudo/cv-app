"use client";

import { CapabilitiesAccordion } from "@/components/CapabilitiesAccordion";
import { GoalsPanel } from "@/components/GoalsPanel";
import { Hero } from "@/components/Hero";
import { HardSkillsColumn, SoftSkillsColumn } from "@/components/SkillsAccordionList";
import { Timeline } from "@/components/Timeline";
import { useMode } from "@/context/ModeContext";
import type { CvData } from "@/lib/types";

export function HomeMain({ cv }: { cv: CvData }) {
  const { formal } = useMode();

  return (
    <main>
      <Hero personal={cv.personal} />

      {!formal && <GoalsPanel goals={cv.goals} />}

      {/* Full viewport width: hard skills | timeline + certs | soft skills */}
      <section
        aria-label="Percorso e competenze"
        className="relative left-1/2 mt-14 w-screen max-w-[100vw] -translate-x-1/2 border-y border-foreground-faint/10 bg-surface-muted/35 py-10 sm:py-12"
      >
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)_minmax(0,240px)] lg:gap-6 xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)_minmax(0,260px)] xl:gap-8">
          <div className="order-2 lg:order-1 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-1">
            <HardSkillsColumn groups={cv.hardSkills} />
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <Timeline
              entries={cv.timeline}
              certifications={cv.certifications}
              classicOnly={formal}
              birthDate={cv.personal.birthDate}
            />
          </div>

          <div className="order-3 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pl-1">
            <SoftSkillsColumn groups={cv.softSkills} />
          </div>
        </div>
      </section>

      <div className="mt-14">
        <CapabilitiesAccordion canDo={cv.canDo} cannotDo={cv.cannotDo} layout="grid" />
      </div>
    </main>
  );
}
