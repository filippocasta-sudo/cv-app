import { CapabilitiesAccordion } from "@/components/CapabilitiesAccordion";
import { PassionLayer } from "@/components/easter-eggs/PassionLayer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProfileDetails } from "@/components/ProfileDetails";
import { Timeline } from "@/components/Timeline";
import { ViewportPanels } from "@/components/ViewportPanels";
import { readCv } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cv = await readCv();

  return (
    <>
      <PassionLayer />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Header socials={cv.socials} />

        <main>
          <Hero personal={cv.personal} />

          <ViewportPanels
            hardSkills={cv.hardSkills}
            softSkills={cv.softSkills}
            goals={cv.goals}
          />

          <CapabilitiesAccordion canDo={cv.canDo} cannotDo={cv.cannotDo} />

          <div className="mt-14 space-y-14">
            <Timeline entries={cv.timeline} />

            <ProfileDetails
              personal={cv.personal}
              certifications={cv.certifications}
              compensation={cv.compensation}
            />
          </div>

          <Footer personal={cv.personal} socials={cv.socials} />
        </main>
      </div>
    </>
  );
}
