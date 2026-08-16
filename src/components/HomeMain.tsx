"use client";

import { CapabilitiesAccordion } from "@/components/CapabilitiesAccordion";
import { GoalsPanel } from "@/components/GoalsPanel";
import { Hero } from "@/components/Hero";
import { ProfileDetails } from "@/components/ProfileDetails";
import { SkillsAccordionList } from "@/components/SkillsAccordionList";
import { Timeline } from "@/components/Timeline";
import { useMode } from "@/context/ModeContext";
import type { CvData } from "@/lib/types";

export function HomeMain({ cv }: { cv: CvData }) {
  const { formal } = useMode();

  return (
    <main>
      <Hero personal={cv.personal} />

      <SkillsAccordionList hardSkills={cv.hardSkills} softSkills={cv.softSkills} />

      {!formal && <GoalsPanel goals={cv.goals} />}

      <div
        className={`mt-14 grid gap-8 ${!formal ? "lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)] lg:items-start" : ""}`}
      >
        {!formal && (
          <aside className="no-print order-1 flex flex-col gap-4 lg:order-2 lg:col-start-2 lg:row-start-1">
            <CapabilitiesAccordion
              canDo={cv.canDo}
              cannotDo={cv.cannotDo}
              layout="sidebar"
            />
            <ProfileDetails certifications={cv.certifications} />
          </aside>
        )}

        <div className="order-2 min-w-0 space-y-14 lg:order-1 lg:col-start-1 lg:row-start-1">
          <Timeline
            entries={cv.timeline}
            classicOnly={formal}
            birthDate={cv.personal.birthDate}
          />
          {formal && <ProfileDetails certifications={cv.certifications} />}
        </div>
      </div>
    </main>
  );
}
