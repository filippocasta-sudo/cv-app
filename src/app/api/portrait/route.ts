import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Form non valido." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Seleziona un file immagine." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Formato non supportato. Usa PNG, JPEG o WebP." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Immagine troppo grande (max 5 MB)." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import("@vercel/blob");
      const result = await put("cv/portrait.png", buffer, {
        access: "public",
        contentType: file.type,
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      return NextResponse.json({ url: result.url });
    }

    if (process.env.VERCEL === "1") {
      return NextResponse.json(
        {
          error:
            "Su Vercel serve un Blob store collegato al progetto per caricare la foto profilo.",
        },
        { status: 503 },
      );
    }

    const portraitDir = path.join(process.cwd(), "public", "images");
    await mkdir(portraitDir, { recursive: true });
    const portraitPath = path.join(portraitDir, "filippo-portrait.png");
    await writeFile(portraitPath, buffer);

    return NextResponse.json({
      url: `/images/filippo-portrait.png?v=${Date.now()}`,
    });
  } catch (error) {
    console.error("[portrait] upload failed", error);
    return NextResponse.json({ error: "Caricamento non riuscito." }, { status: 500 });
  }
}
