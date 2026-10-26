import {
  LayoutDashboard,
  Wallet,
  ClipboardCheck,
  Users,
  Calendar,
  Camera,
} from "lucide-react";
import type { NavItem, Modul, Role, ModulStatus } from "@/types";

const navItems: NavItem[] = [
  { id: "hub", label: "Hub Utama", icon: LayoutDashboard },
  { id: "galeri", label: "Galeri Kelas", icon: Camera },
  { id: "kas", label: "Uang Kas Kelas", icon: Wallet },
  { id: "piket", label: "Absen Piket", icon: ClipboardCheck },
  { id: "ekskul", label: "Absen Ekskul", icon: Users },
  { id: "jadwal", label: "Jadwal Pelajaran", icon: Calendar },
];

const moduls: Modul[] = [
  {
    id: "galeri",
    label: "Galeri Kelas",
    desc: "Kumpulan momen 11TKJ1, dari papan tulis sampai jam istirahat",
    url: "/dashboard/galeri",
    badge: "Foto",
    roles: ["siswa", "wali_kelas"],
    status: "online",
  },
  {
    id: "kas",
    label: "Uang Kas Kelas",
    desc: "Bayar iuran, cek saldo, riwayat transaksi",
    url: "https://kas.kelas11tj1.sch.id",
    badge: "Wajib",
    roles: ["siswa", "wali_kelas"],
    status: "coming-soon",
  },
  {
    id: "piket",
    label: "Absen Piket",
    desc: "Check-in harian, jadwal mingguan, riwayat kehadiran",
    url: "https://piket.kelas11tj1.sch.id",
    badge: "Harian",
    roles: ["siswa", "wali_kelas"],
    status: "coming-soon",
  },
  {
    id: "ekskul",
    label: "Absen Ekskul",
    desc: "Pilih ekskul, absen pertemuan, rekap kehadiran",
    url: "https://ekskul.kelas11tj1.sch.id",
    badge: "Mingguan",
    roles: ["siswa", "wali_kelas"],
    status: "coming-soon",
  },
  {
    id: "jadwal",
    label: "Jadwal Pelajaran",
    desc: "Lihat jadwal, pengumuman guru, rekap kehadiran harian",
    url: "https://jadwal.kelas11tj1.sch.id",
    badge: "Real-time",
    roles: ["siswa", "wali_kelas"],
    status: "coming-soon",
  },
];

export function getNavItems(role: Role): NavItem[] {
  return navItems;
}

export function getModuls(role: Role): Modul[] {
  return moduls.filter((m) => m.roles.includes(role));
}

export const CLASS_NAME = "Kelas 11TKJ1";
export const CLASS_PREFIX = "11TKJ1";
export const SCHOOL_NAME = "SMKN 54 Computer Engineering";
export const SCHOOL_SHORT = "SMKN 54";
export const SCHOOL_FIELD = "Computer Engineering";
export const STUDENT_COUNT = 36;
export const TEACHER_COUNT = 1;
export const MODUL_COUNT = moduls.length;
export const STATUS_LABELS: Record<ModulStatus, string> = {
  online: "Online",
  maintenance: "Maintenance",
  "coming-soon": "Segera",
};
