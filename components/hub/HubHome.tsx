import type { Notification, Role, Modul } from "@/types";
import { ArrowDown, ArrowRight } from "lucide-react";
import Pengumuman from "@/components/hub/Pengumuman";
import ModulGrid from "@/components/hub/ModulGrid";
import PhotoStrip, { PhotoCredits } from "@/components/hub/PhotoStrip";
import Reveal from "@/components/ui/Reveal";
import { Mark } from "@/components/ui/Mark";
import SignOutButton from "@/components/ui/SignOutButton";
import { LiveClock } from "@/components/ui/motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  CLASS_PREFIX,
  SCHOOL_SHORT,
  SCHOOL_FIELD,
  STUDENT_COUNT,
  TEACHER_COUNT,
  MODUL_COUNT,
} from "@/lib/navigation";

function greeting(hour: number) {
  if (hour < 11) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 18) return "Selamat sore";
  return "Selamat malam";
}

export default function HubHome({
  user,
  moduls,
  notifications,
}: {
  user: {
    name?: string | null;
    email?: string | null;
    role?: Role | string | null;
  } | null;
  moduls: Modul[];
  notifications: Notification[];
}) {
  const now = new Date();
  const tanggal = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const rawName = user?.name?.trim() || "Pengguna";
  const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const initials = rawName.slice(0, 2).toUpperCase();
  const isWaliKelas = user?.role === "wali_kelas";

  return (
    <div className="hub">
      <header className="hub-head">
        <p>
          <span className="live-dot" aria-hidden="true" />
          Papan kelas {CLASS_PREFIX}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ThemeToggle />
          <p className="hub-head-date">
            {tanggal} · <LiveClock />
          </p>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 className="hero-title" id="hero-title">
            {greeting(now.getHours())}, {CLASS_PREFIX}.
          </h1>
          <p className="hero-lead">
            Kas, piket, ekskul, jadwal, dan galeri kelas sekarang punya satu
            papan. Semua yang perlu dibuka ada di sini.
          </p>

          <div className="hero-actions">
            <a href="#modul" className="btn btn-primary">
              Lihat modul
              <ArrowDown size={16} aria-hidden />
            </a>
            <a href="#pengumuman" className="btn btn-quiet">
              Baca pengumuman
              <ArrowRight size={16} aria-hidden />
            </a>
          </div>

          <dl className="hero-facts">
            <div className="fact">
              <dt>Siswa</dt>
              <dd>{STUDENT_COUNT}</dd>
            </div>
            <div className="fact">
              <dt>Wali kelas</dt>
              <dd>{TEACHER_COUNT}</dd>
            </div>
            <div className="fact">
              <dt>Modul</dt>
              <dd>{MODUL_COUNT}</dd>
            </div>
          </dl>
        </div>

        <figure className="hero-photo">
          <img
            src="/assets/photos/kelas-hero.jpg"
            alt="Suasana kelas dengan siswa belajar bersama"
            width={1920}
            height={1280}
            decoding="async"
          />
          <span className="photo-note">Foto contoh</span>
          <div className="glass-id">
            <Mark className="brand-mark" />
            <span className="glass-id-text">
              <span className="glass-id-school">{SCHOOL_SHORT}</span>
              <span className="glass-id-sub">{SCHOOL_FIELD}</span>
            </span>
            <span className="glass-id-tag">{CLASS_PREFIX}</span>
          </div>
        </figure>
      </section>

      <ModulGrid moduls={moduls} />

      <div className="board-row">
        <Reveal>
          <Pengumuman
            notifications={notifications}
            className="board-section"
          />
        </Reveal>

        <Reveal delay={80}>
          <aside className="account-card" aria-labelledby="akun-title">
            <div className="account-head">
              <span className="avatar avatar-lg">{initials}</span>
              <div className="account-head-text">
                <h2 id="akun-title">{displayName}</h2>
                <p>{user?.email || "Belum masuk"}</p>
              </div>
            </div>

            <dl className="account-list">
              <div className="account-row">
                <dt>Peran</dt>
                <dd>{isWaliKelas ? "Wali Kelas" : "Siswa"}</dd>
              </div>
              <div className="account-row">
                <dt>Kelas</dt>
                <dd>{CLASS_PREFIX}</dd>
              </div>
            </dl>

            <div className="account-out">
              <SignOutButton />
            </div>
          </aside>
        </Reveal>
      </div>

      <PhotoStrip />

      <footer className="hub-foot">
        <div className="foot-brand">
          <Mark className="foot-mark" />
          <div>
            <p className="foot-title">Kelas {CLASS_PREFIX}</p>
            <p className="foot-meta">
              SMKN 54 Computer Engineering · 2026
            </p>
          </div>
        </div>
        <PhotoCredits />
      </footer>
    </div>
  );
}
