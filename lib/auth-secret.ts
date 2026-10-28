/**
 * Secret untuk menandatangani cookie NextAuth.
 *
 * Urutan pemakaian:
 * 1. `NEXTAUTH_SECRET` dari environment (ini yang benar untuk produksi).
 * 2. Demo secret di bawah — hanya supaya demo kelas tetap jalan tanpa setup env.
 *
 * TODO: hapus DEMO_SECRET begitu login sudah pakai data/akun asli.
 * Selama fallback aktif, siapa pun yang baca repo bisa membuat cookie sendiri,
 * jadi jangan simpan data sensitif di balik login ini.
 */
const DEMO_SECRET = "class-hub-demo-only-secret-do-not-use-in-production";

let warned = false;

export function getAuthSecret(): string {
  const fromEnv = process.env.NEXTAUTH_SECRET?.trim();
  if (fromEnv) return fromEnv;

  if (!warned) {
    warned = true;
    console.warn(
      "[auth] NEXTAUTH_SECRET belum diset — memakai demo secret. " +
        "Set NEXTAUTH_SECRET di Vercel (Settings → Environment Variables) untuk produksi."
    );
  }
  return DEMO_SECRET;
}
