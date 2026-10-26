import type { LucideIcon } from "lucide-react";

export type Role = "siswa" | "wali_kelas";

export type ModulStatus = "online" | "maintenance" | "coming-soon";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  image?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface Modul {
  id: string;
  label: string;
  desc: string;
  url: string;
  badge?: string;
  roles: Role[];
  status: ModulStatus;
}

export type Notification = {
  id: string;
  title: string;
  body: string;
  date: string;
  author: string;
  role: Role;
};
