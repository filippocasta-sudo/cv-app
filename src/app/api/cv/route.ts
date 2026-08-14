import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getStorage } from "@/lib/storage";
import { readCv, resetCv, writeCv } from "@/lib/store";

export async function GET() {
  return NextResponse.json(await readCv());
}

/** Shared guard: both mutating handlers need auth plus writable storage. */
async function assertCanWrite(): Promise<NextResponse | null> {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }

  const storage = getStorage();
  if (!storage.writable) {
    return NextResponse.json(
      { error: storage.hint ?? "Lo storage attuale non è scrivibile." },
      { status: 503 },
    );
  }

  return null;
}

export async function PUT(request: Request) {
  const denied = await assertCanWrite();
  if (denied) return denied;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON non valido." }, { status: 400 });
  }

  try {
    return NextResponse.json(await writeCv(body));
  } catch (error) {
    console.error("[cv] salvataggio non riuscito", error);
    return NextResponse.json(
      { error: "Salvataggio non riuscito: lo storage ha restituito un errore." },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const denied = await assertCanWrite();
  if (denied) return denied;

  try {
    return NextResponse.json(await resetCv());
  } catch (error) {
    console.error("[cv] ripristino non riuscito", error);
    return NextResponse.json(
      { error: "Ripristino non riuscito: lo storage ha restituito un errore." },
      { status: 500 },
    );
  }
}
