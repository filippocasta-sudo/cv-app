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

      {!formal && (
        <>
          <CapabilitiesAccordion canDo={cv.canDo} cannotDo={cv.cannotDo} />
          <GoalsPanel goals={cv.goals} />
        </>
      )}

      <div className="mt-14 space-y-14">
        <Timeline entries={cv.timeline} classicOnly={formal} />

        <ProfileDetails certifications={cv.certifications} compensation={cv.compensation} />
      </div>
    </main>
  );
}
