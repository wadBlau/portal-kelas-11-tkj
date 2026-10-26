"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Mark } from "@/components/ui/Mark";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      router.push("/auth/signin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="auth">
      <aside className="auth-visual">
        <img
          src="/assets/photos/siswa-sedang-belajar.jpg"
          alt=""
          width={1920}
          height={1280}
          decoding="async"
        />
        <div className="auth-visual-note">
          <Mark className="brand-mark" />
          <span className="glass-id-text">
            <span className="glass-id-school">SMKN 54</span>
            <span className="glass-id-sub">Computer Engineering</span>
          </span>
          <span className="glass-id-tag">11TKJ1</span>
        </div>
      </aside>

      <div className="auth-panel">
        <div className="auth-card">
          <div className="auth-brand">
            <Mark className="brand-mark" />
            <span className="brand-text">
              <span className="brand-word">11TKJ1</span>
              <span className="brand-sub">SMKN 54</span>
            </span>
            <ThemeToggle />
          </div>

          <h1 className="auth-title display">Masuk ke papan kelas.</h1>
          <p className="auth-lead">
            Kas, piket, ekskul, dan jadwal kelas dalam satu papan.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="auth-field">
              <span>Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="nama@kelas11tj1.sch.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
            </label>
            <label className="auth-field">
              <span>Password</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
              />
            </label>
            <button type="submit" className="btn btn-primary auth-submit">
              Masuk
              <ArrowRight size={16} aria-hidden />
            </button>
          </form>

          <p className="auth-note">
            Akun masih tahap demo. Email apa pun bisa masuk, password bebas.
          </p>
          <p className="auth-foot">SMKN 54 Computer Engineering · 2026</p>
        </div>
      </div>
    </main>
  );
}
