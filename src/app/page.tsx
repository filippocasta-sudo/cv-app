import { PassionLayer } from "@/components/easter-eggs/PassionLayer";
import { LocalizedSite } from "@/components/LocalizedSite";
import { readCv } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cv = await readCv();

  return (
    <>
      <PassionLayer />

      <LocalizedSite cv={cv} />
    </>
  );
}
