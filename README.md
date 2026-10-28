# Portal Kelas 11 TKJ 1

Hub kelas: Next.js 14 (App Router) + Tailwind + NextAuth (credentials, masih stub).

- `/` → redirect ke `/dashboard`
- `/dashboard` & `/dashboard/galeri` → perlu login (siapa pun bisa login, ini masih stub)
- `/auth/signin` → halaman login

## Jalanin di lokal

```bash
npm install
copy .env.example .env.local   # macOS/Linux: cp .env.example .env.local
npm run dev
```

Buka http://localhost:3000

## Deploy ke Vercel (cara paling gampang)

1. Buka https://vercel.com/new
2. **Import Git Repository** → pilih repo ini (`wadBlau/portal-kelas-11-tkj`).
   Kalau repo-nya di akun lain, fork dulu, jangan download ZIP.
3. Biarkan semua setting default:
   - **Framework Preset**: Next.js (otomatis)
   - **Root Directory**: kosong
   - **Build Command**: `next build` (default)
   - **Output Directory**: kosong
4. Buka **Environment Variables**, tambahkan:

   | Name             | Value                                                        |
   | ---------------- | ------------------------------------------------------------ |
   | `NEXTAUTH_SECRET` | string acak, generate dengan `node -p "require('crypto').randomBytes(32).toString('hex')"` |

   `NEXTAUTH_URL` **tidak perlu** diisi di Vercel (otomatis terdeteksi).
   Jangan copy `.env.local` dari laptop ke Vercel, isinya `localhost`.

   > Tanpa `NEXTAUTH_SECRET`, aplikasi tetap jalan memakai **demo secret** dari
   > `lib/auth-secret.ts` (ada warning di log). Itu cuma buat demo kelas —
   > untuk pemakaian nyata, secret **wajib** diset lewat env.

5. **Deploy**. Tunggu status **Ready**, lalu buka domain `https://<project>.vercel.app`.

### Jangan begini

- ❌ Upload ZIP repo ke Vercel / drag-and-drop folder → Vercel menganggapnya situs statis, tidak ada `index.html` → **404**.
- ❌ Isi Root Directory dengan nama folder (mis. `first-project`) padahal `package.json` ada di root repo → **404**.
- ❌ Buka URL `https://<project>.vercel.app/dashboard` sebelum deploy selesai, atau buka preview URL branch yang salah.

## Kalau masih 404

Cek berurutan:

1. **Deployments** di dashboard Vercel → status deploy terakhir harus **Ready** (bukan Error/Canceled). Kalau Error, buka log build-nya.
2. **Settings → General → Root Directory** harus **kosong**.
3. **Settings → General → Framework Preset** harus **Next.js**.
4. **Settings → Git → Production Branch** harus branch yang berisi kode ini (repo ini: `main`). Kalau kode terbaru ada di `dev`, merge dulu ke `main` lalu redeploy.
5. Pastikan `package.json` ada di halaman utama repo GitHub (bukan di dalam subfolder).
6. Redeploy: **Deployments → ⋯ → Redeploy** dan centang **Clear Build Cache**.

Catatan: kalau `NEXTAUTH_SECRET` lupa diisi, situs **tidak** 404 — yang muncul error 500 "There is a problem with the server configuration". Itu tanda env belum diset.

## Struktur

```
app/            halaman & route (App Router)
components/     komponen UI
lib/            auth & data navigasi
public/assets/  gambar
middleware.ts   proteksi /dashboard
```
