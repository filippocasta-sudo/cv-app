import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let payload: { name?: unknown; email?: unknown; message?: unknown };
  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (name.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Compila nome, email valida e un messaggio di almeno 10 caratteri." },
      { status: 422 },
    );
  }

  // No mail provider is wired up yet: the submission is logged server-side so
  // the form is functional, and the UI also offers a mailto fallback.
  console.info("[contact]", { name, email, length: message.length });

  return NextResponse.json({ ok: true });
}
