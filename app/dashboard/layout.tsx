import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Shell from "@/components/layout/Shell";
import { CLASS_NAME } from "@/lib/navigation";

export const metadata: Metadata = { title: CLASS_NAME };

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  return <Shell session={session}>{children}</Shell>;
}
