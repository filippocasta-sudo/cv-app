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

  const skillColumnClass = formal
    ? "order-2 min-w-0 lg:order-1 lg:px-5 lg:py-2"
    : "order-2 min-w-0 lg:order-1 lg:sticky lg:top-28 lg:px-5 lg:py-2";

  const skillScrollClass = formal
    ? "px-1 py-1 sm:px-2 lg:px-5 lg:py-2"
    : "px-1 py-1 sm:px-2 lg:-mx-5 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overscroll-y-contain lg:px-5 lg:py-2";

  const softColumnClass = formal
    ? "order-3 min-w-0 lg:px-5 lg:py-2"
    : "order-3 min-w-0 lg:sticky lg:top-28 lg:px-5 lg:py-2";

  return (
    <main>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Hero personal={cv.personal} />
        <GoalsPanel goals={cv.goals} />
      </div>

      {/* Full viewport width: hard skills | timeline + certs | soft skills */}
      <section
        aria-label="Percorso e competenze"
        className="mt-14 border-y border-foreground-faint/10 bg-surface-muted/35 py-10 sm:py-12"
      >
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)_minmax(0,280px)] lg:gap-6 xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)_minmax(0,300px)] xl:gap-8">
          <div className={skillColumnClass}>
            <div className={skillScrollClass}>
              <HardSkillsColumn groups={cv.hardSkills} />
            </div>
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <Timeline
              entries={cv.timeline}
              certifications={cv.certifications}
              classicOnly={formal}
              birthDate={cv.personal.birthDate}
            />
          </div>

          <div className={softColumnClass}>
            <div className={skillScrollClass}>
              <SoftSkillsColumn groups={cv.softSkills} />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-14 w-full max-w-6xl px-4 sm:px-6">
        <CapabilitiesAccordion canDo={cv.canDo} cannotDo={cv.cannotDo} layout="grid" />
      </div>
    </main>
  );
}
