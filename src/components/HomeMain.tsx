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
        <div className="min-w-0 space-y-14">
          <Timeline entries={cv.timeline} classicOnly={formal} />
          <ProfileDetails certifications={cv.certifications} />
        </div>

        {!formal && (
          <aside className="no-print lg:sticky lg:top-28 lg:self-start">
            <CapabilitiesAccordion
              canDo={cv.canDo}
              cannotDo={cv.cannotDo}
              layout="sidebar"
            />
          </aside>
        )}
      </div>
    </main>
  );
}
