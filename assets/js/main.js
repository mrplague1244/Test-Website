// =====================================================
// MAIN.JS - JavaScript yang dipakai di semua halaman
// Dimuat dengan atribut "defer", jadi HTML sudah siap saat file ini jalan.
// =====================================================

// ---------- 1. Tahun otomatis di footer ----------
const elTahun = document.getElementById("tahun");
if (elTahun) elTahun.textContent = new Date().getFullYear();

// ---------- 2. Menu mobile (tombol ☰) ----------
const tombol = document.querySelector(".nav-toggle");
const menu = document.getElementById("menu-utama");

if (tombol && menu) {
  tombol.addEventListener("click", () => {
    const terbuka = menu.classList.toggle("terbuka");
    tombol.setAttribute("aria-expanded", String(terbuka)); // info untuk screen reader
  });
}

// ---------- 3. Formulir kontak (DUMMY) ----------
// Saat ini hanya menampilkan pesan di layar, belum mengirim ke mana pun.
// Untuk mengirim sungguhan, lihat bagian "Formulir" di STRUKTUR.md.
const form = document.getElementById("form-kontak");
const status = document.getElementById("status-form");

if (form && status) {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // cegah reload halaman
    const nama = form.elements["nama"].value;
    status.textContent = `Terima kasih, ${nama}! (demo: pesan belum dikirim)`;
    form.reset();
  });
}
