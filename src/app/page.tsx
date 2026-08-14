import { PassionLayer } from "@/components/easter-eggs/PassionLayer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HomeMain } from "@/components/HomeMain";
import { readCv } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cv = await readCv();

  return (
    <>
      <PassionLayer />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Header socials={cv.socials} />
        <HomeMain cv={cv} />
        <Footer personal={cv.personal} socials={cv.socials} />
      </div>
    </>
  );
}
