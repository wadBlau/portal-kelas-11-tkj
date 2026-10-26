"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
    >
      <LogOut size={15} aria-hidden />
      Keluar
    </button>
  );
}
