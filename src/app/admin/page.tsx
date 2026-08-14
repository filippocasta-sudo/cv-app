import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAdminConfigured, isAuthenticated } from "@/lib/auth";
import { readCv } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Area riservata",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    return <LoginForm configured={isAdminConfigured()} />;
  }

  return <AdminPanel initialData={await readCv()} />;
}
