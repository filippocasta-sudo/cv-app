import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readCv, resetCv, writeCv } from "@/lib/store";

export async function GET() {
  return NextResponse.json(await readCv());
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON non valido." }, { status: 400 });
  }

  try {
    return NextResponse.json(await writeCv(body));
  } catch {
    return NextResponse.json(
      { error: "Salvataggio non riuscito: il filesystem non è scrivibile." },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }

  try {
    return NextResponse.json(await resetCv());
  } catch {
    return NextResponse.json(
      { error: "Ripristino non riuscito: il filesystem non è scrivibile." },
      { status: 500 },
    );
  }
}
