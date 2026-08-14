import { NextResponse } from "next/server";
import { isAdminConfigured, isAuthenticated } from "@/lib/auth";

export async function GET() {
  return NextResponse.json({
    authenticated: await isAuthenticated(),
    configured: isAdminConfigured(),
  });
}
