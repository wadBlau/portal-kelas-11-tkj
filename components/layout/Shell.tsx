"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronRight,
  LogOut,
  Lock,
  LayoutDashboard,
} from "lucide-react";
import clsx from "clsx";
import type { Session } from "next-auth";
import type { LucideIcon } from "lucide-react";
import type { Modul, NavItem, Role } from "@/types";
import {
  getNavItems,
  getModuls,
  CLASS_PREFIX,
  SCHOOL_SHORT,
} from "@/lib/navigation";
import { Mark } from "@/components/ui/Mark";

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/dashboard"
      onClick={onNavigate}
      className="brand"
      aria-label={`${CLASS_PREFIX}, papan kelas`}
    >
      <Mark className="brand-mark" />
      <span className="brand-text">
        <span className="brand-word">{CLASS_PREFIX}</span>
        <span className="brand-sub">{SCHOOL_SHORT}</span>
      </span>
    </Link>
  );
}

function NavList({
  pathname,
  navItems,
  moduls,
  onNavigate,
}: {
  pathname: string;
  navItems: NavItem[];
  moduls: Modul[];
  onNavigate?: () => void;
}) {
  const hubActive = pathname === "/dashboard";

  return (
    <nav aria-label="Navigasi utama" className="rail-nav">
      <div className="nav-group">
        <p className="rail-label">Kelas</p>
        <ul className="nav-list">
          <li>
            <Link
              href="/dashboard"
              onClick={onNavigate}
              className={clsx("nav-link", hubActive && "is-active")}
              aria-current={hubActive ? "page" : undefined}
            >
              <span className="nav-icon">
                <LayoutDashboard size={17} strokeWidth={1.8} aria-hidden />
              </span>
              <span className="nav-label">Papan kelas</span>
              <ChevronRight className="nav-arrow" size={15} aria-hidden />
            </Link>
          </li>
        </ul>
      </div>

      <div className="nav-group">
        <p className="rail-label">Modul</p>
        <ul className="nav-list">
          {moduls.map((m) => {
            const live = m.status === "online";
            const Icon: LucideIcon =
              navItems.find((n) => n.id === m.id)?.icon ?? LayoutDashboard;
            const inner = (
              <>
                <span className="nav-icon">
                  <Icon size={17} strokeWidth={1.8} aria-hidden />
                </span>
                <span className="nav-label">{m.label}</span>
                {live ? (
                  <ArrowUpRight className="nav-arrow" size={15} aria-hidden />
                ) : (
                  <Lock className="nav-lock" size={13} aria-hidden />
                )}
              </>
            );

            return (
              <li key={m.id}>
                {live ? (
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onNavigate}
                    className="nav-link"
                  >
                    {inner}
                  </a>
                ) : (
                  <span
                    className="nav-link is-soon"
                    aria-disabled="true"
                    title="Tautan modul menyusul"
                  >
                    {inner}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

function AccountMini({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: string;
}) {
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <div className="account-mini">
      <span className="avatar">{initials}</span>
      <span className="account-mini-text">
        <span className="account-name">{name}</span>
        <span className="account-mail">{email || role}</span>
      </span>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/auth/signin" })}
        className="icon-btn"
        aria-label="Keluar dari akun"
        title="Keluar"
      >
        <LogOut size={16} aria-hidden />
      </button>
    </div>
  );
}

export default function Shell({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const role = (session?.user?.role ?? "siswa") as Role;
  const navItems = getNavItems(role);
  const moduls = getModuls(role);
  const rawName = session?.user?.name?.trim() || "Pengguna";
  const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const email = session?.user?.email ?? "";
  const roleLabel = role === "wali_kelas" ? "Wali Kelas" : "Siswa";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const account = (
    <AccountMini name={displayName} email={email} role={roleLabel} />
  );

  return (
    <div className="shell">
      <header className="mobile-bar">
        <Brand onNavigate={() => setOpen(false)} />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
          aria-expanded={open}
          aria-controls="mobile-sheet"
          className="icon-btn"
        >
          <Menu size={20} aria-hidden />
        </button>
      </header>

      <aside className="rail" aria-label="Papan kelas">
        <Brand />
        <NavList
          pathname={pathname}
          navItems={navItems}
          moduls={moduls}
        />
        <div className="rail-foot">{account}</div>
      </aside>

      <div
        className="sheet-layer"
        id="mobile-sheet"
        data-open={open}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="sheet-scrim"
          onClick={() => setOpen(false)}
          aria-label="Tutup menu"
        />
        <div className="sheet" role="dialog" aria-modal="true" aria-label="Menu kelas">
          <div className="sheet-head">
            <Brand onNavigate={() => setOpen(false)} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup menu"
              className="icon-btn sheet-close"
            >
              <X size={19} aria-hidden />
            </button>
          </div>
          <div className="sheet-body">
            <NavList
              pathname={pathname}
              navItems={navItems}
              moduls={moduls}
              onNavigate={() => setOpen(false)}
            />
          </div>
          <div className="sheet-foot">{account}</div>
        </div>
      </div>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
