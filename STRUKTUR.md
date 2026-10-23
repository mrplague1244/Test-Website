# STRUKTUR.md - Panduan Struktur Proyek Web Statis

Dokumen ini menjelaskan fungsi setiap folder dan file di template ini, aturan
umum yang dipakai di banyak proyek web, dan cara mengembangkannya.

## 1. Peta proyek

```
starter-web/
├── index.html            Beranda (WAJIB bernama index.html)
├── about.html            Halaman Tentang
├── contact.html          Halaman Kontak (berisi form)
├── 404.html              Halaman "tidak ditemukan" (Vercel memakainya otomatis)
│
├── assets/               Semua file pendukung, dipisah dari halaman
│   ├── css/style.css     Seluruh tampilan
│   ├── js/main.js        Seluruh interaksi
│   └── images/           Foto, logo, favicon, gambar OG
│
├── robots.txt            Petunjuk untuk mesin pencari
├── sitemap.xml           Daftar halaman untuk mesin pencari
├── vercel.json           Pengaturan Vercel (URL bersih, header, cache)
├── .gitignore            Daftar file yang tidak diunggah ke GitHub
├── STRUKTUR.md           Dokumen ini
└── README.md             Ringkasan + cara deploy
```

Prinsip utamanya: **halaman di akar, file pendukung di `assets/`**. Dengan
begitu, folder utama tetap bersih dan mudah dinavigasi.

## 2. Fungsi tiap file

| File | Fungsi | Kapan diedit |
|------|--------|--------------|
| `index.html` | Halaman pertama yang dibuka pengunjung. Server mencari nama ini otomatis. | Saat mengganti konten beranda |
| `about.html`, `contact.html` | Halaman tambahan | Saat mengganti konten |
| `404.html` | Tampil saat URL tidak ada | Jarang |
| `assets/css/style.css` | Warna, font, tata letak, responsif | Saat mengubah tampilan |
| `assets/js/main.js` | Menu mobile, tahun footer, form | Saat menambah interaksi |
| `assets/images/` | Gambar | Saat menambah gambar |
| `vercel.json` | Konfigurasi hosting | Jarang |
| `robots.txt`, `sitemap.xml` | SEO dasar | Saat punya domain / menambah halaman |

## 3. Anatomi satu halaman HTML

Setiap halaman punya kerangka yang sama:

```
<html lang="id">
  <head>      -> metadata (judul, deskripsi, CSS, JS). Tidak tampil di layar.
  <body>
    skip-link -> aksesibilitas
    <header>  -> logo + navigasi          (sama di semua halaman)
    <main>    -> isi unik halaman ini     (hanya SATU per halaman)
      <section> ... </section>            (bagian-bagian isi)
    <footer>  -> hak cipta, tautan        (sama di semua halaman)
```

Elemen `<head>` yang sebaiknya selalu ada:

- `<meta charset="UTF-8">`: agar karakter Indonesia dan emoji tampil benar.
- `<meta name="viewport" ...>`: tanpa ini, tampilan di HP tidak responsif.
- `<title>`: judul tab dan judul di Google. Unik per halaman.
- `<meta name="description">`: cuplikan di hasil pencarian. Unik per halaman.
- `<link rel="icon">`: ikon di tab browser.
- Tag `og:*` (Open Graph): tampilan kartu saat link dibagikan.

## 4. Aturan dan kebiasaan umum

**Penamaan file**
- Huruf kecil semua, tanpa spasi, pakai tanda hubung: `tentang-kami.html`, bukan `Tentang Kami.html`.
- Vercel (Linux) membedakan huruf besar/kecil: `Logo.png` dan `logo.png` adalah dua file berbeda. Ini sumber error umum yang "jalan di laptop, rusak di Vercel".

**Path (alamat file)**
- Template ini memakai path relatif (`assets/css/style.css`), supaya bisa dibuka langsung dengan klik dua kali dan juga jalan di Vercel.
- Jika nanti halaman ditaruh di subfolder (`blog/artikel.html`), path berubah menjadi `../assets/css/style.css`. Alternatifnya pakai path dari akar (`/assets/css/style.css`), tapi itu hanya jalan lewat server (Vercel atau Live Server), bukan klik dua kali. Karena itu `404.html` memakai path dari akar.

**Gambar**
- Selalu isi atribut `alt`.
- Kompres sebelum diunggah (target < 200 KB per gambar). Format WebP biasanya paling ringan.
- Nama deskriptif: `tim-kantor-2026.webp`, bukan `IMG_0042.jpg`.

**Struktur CSS**
- Satu file, diurutkan dari umum ke spesifik (variabel, reset, layout, komponen, responsif).
- Warna dan ukuran penting ditaruh di variabel `:root`, sehingga ganti tema cukup mengedit satu tempat.

## 5. Menambah halaman baru

1. Salin `about.html`, ganti namanya, misalnya `layanan.html`.
2. Ubah `<title>`, `description`, dan tag `og:*`.
3. Ganti isi `<main>`.
4. Di **semua** halaman, tambahkan tautan baru ke `<nav>`, dan pindahkan `aria-current="page"` ke tautan halaman aktif.
5. Tambahkan satu baris `<url>` di `sitemap.xml`.
6. Commit ke GitHub, dan Vercel deploy otomatis.

## 6. Batasan web statis murni (dan jalan keluarnya)

| Masalah | Penyebab | Solusi |
|---------|----------|--------|
| Header/footer harus disalin ke tiap halaman | HTML biasa tidak punya "include" | Menambah halaman cukup repot di skala kecil. Untuk situs besar, pindah ke framework (lihat bagian 8) |
| Form belum mengirim apa pun | Tidak ada server | Pakai layanan form seperti Formspree atau Web3Forms: ganti `<form>` jadi `<form action="URL_DARI_LAYANAN" method="POST">` dan hapus bagian form di `main.js` |
| Tidak ada database / login | Statis | Pakai layanan backend (Supabase, Firebase) atau Vercel Functions |
| Konten tidak bisa diedit tanpa mengubah kode | Tidak ada CMS | Pakai headless CMS, atau pindah ke framework |

## 7. Deploy ke Vercel

1. Buat repo GitHub, unggah **isi** folder `starter-web` (file langsung di akar repo, bukan di dalam folder lagi).
2. Di Vercel: Add New → Project → pilih repo → Deploy.
3. Framework Preset: **Other**. Build Command dan Output Directory dikosongkan.
4. Opsional: sambungkan domain sendiri di Project → Settings → Domains.
5. Setelah ada domain, ganti `domainmu.com` di `robots.txt` dan `sitemap.xml`, dan ubah `og:image` jadi URL lengkap.

`vercel.json` di template ini mengaktifkan **clean URLs**: `about.html` bisa diakses lewat `/about`. Tautan `about.html` di kode tetap aman dan otomatis dialihkan.

## 8. Kapan pindah ke React / Next.js?

Tetap di statis jika: situs kecil (< 10 halaman), jarang berubah, tujuannya profil/portofolio/landing page.

Pertimbangkan React (Vite) atau Next.js jika:
- Header/footer/komponen berulang mulai merepotkan.
- Ada banyak interaksi (dashboard, keranjang, filter dinamis).
- Butuh data dari API atau database.
- Butuh halaman dinamis (blog dengan banyak artikel, katalog produk).

Peta perpindahannya kira-kira begini:

| Template ini | Setara di React/Next.js |
|--------------|-------------------------|
| `index.html`, `about.html`, ... | Komponen halaman (`pages/` atau `app/`) |
| Header/footer yang disalin | Satu komponen `<Header />` dan `<Footer />` dipakai di semua halaman |
| `assets/images/` | `public/` |
| `assets/css/style.css` | CSS global atau CSS Modules |
| `assets/js/main.js` | Logika di dalam komponen |
| `vercel.json` | Tetap dipakai (opsional) |
