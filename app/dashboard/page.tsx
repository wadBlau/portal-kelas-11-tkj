import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getModuls } from "@/lib/navigation";
import type { Notification } from "@/types";
import HubHome from "@/components/hub/HubHome";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const moduls = user ? getModuls(user.role as "siswa" | "wali_kelas") : [];
  const notifications: Notification[] = [
    {
      id: "1",
      title: "Website in Development",
      body: "Coming ASAP",
      date: "26 Oktober 2026",
      author: "Sultan",
      role: "wali_kelas",
    },
  ];

  return (
    <HubHome user={user ?? null} moduls={moduls} notifications={notifications} />
  );
}
