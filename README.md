# odhiahmad.github.io — Portfolio

Portfolio & CV Odhi Ahmad Hidayat. Dibangun dengan **Next.js 15 (App Router) + Tailwind CSS v4**, dua bahasa (ID/EN), dengan SEO lengkap (metadata, Open Graph, Twitter card, JSON-LD `Person`, `sitemap.xml`, `robots.txt`).

Memakai **static export** (`output: "export"`) sehingga satu codebase bisa di-deploy ke **Vercel** sekaligus tetap hidup di **GitHub Pages**.

## Menjalankan lokal

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # menghasilkan folder out/ (static)
```

## Deploy ke Vercel

1. Buka https://vercel.com → **Add New → Project** → import repo `odhiahmad/odhiahmad.github.io`.
2. Framework otomatis terdeteksi **Next.js**. Biarkan default (Build: `next build`).
3. **Deploy**. Nanti dapat URL `*.vercel.app`.
4. (Opsional) Pasang domain sendiri di **Settings → Domains**. Domain `*.github.io` tidak bisa dipindah ke Vercel (dikontrol GitHub) — beli domain sendiri mis. `odhiahmad.com`.

## GitHub Pages (tetap hidup untuk trafik/SEO)

Workflow `.github/workflows/deploy-pages.yml` otomatis mem-build dan deploy ke Pages tiap push ke `main`.
Aktifkan sekali: **repo Settings → Pages → Source: GitHub Actions**.

## Mengubah konten

- Teks dua bahasa: `lib/dict.ts`
- Daftar proyek, skill, stat, timeline CV: `lib/content.ts`
- Screenshot: `public/assets/`, CV PDF: `public/cv-odhi-ahmad.pdf`
- URL kanonik & identitas SEO: `SITE` di `lib/content.ts`

Versi lama (single-file HTML) disimpan sebagai `legacy-index.html.bak`.
