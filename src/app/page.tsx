import { CareerGoals } from "@/components/CareerGoals";
import { PassionLayer } from "@/components/easter-eggs/PassionLayer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Sidebar } from "@/components/Sidebar";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { Timeline } from "@/components/Timeline";
import { readCv } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cv = await readCv();

  return (
    <>
      <PassionLayer />
      <Header name={cv.personal.name} />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Hero personal={cv.personal} />
        <CareerGoals goals={cv.goals} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-12">
          <Sidebar
            personal={cv.personal}
            hardSkills={cv.hardSkills}
            softSkills={cv.softSkills}
            certifications={cv.certifications}
            compensation={cv.compensation}
          />

          <div className="space-y-14">
            <SkillsMatrix canDo={cv.canDo} cannotDo={cv.cannotDo} />
            <Timeline entries={cv.timeline} />
          </div>
        </div>

        <Footer personal={cv.personal} socials={cv.socials} />
      </main>
    </>
  );
}
