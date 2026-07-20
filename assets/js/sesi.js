/* ==========================================================
   TERAVIA
   Session Manager
   assets/js/sesi.js
   Version : 2.0
========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    let sesi = {};

    try {
        sesi = JSON.parse(
            localStorage.getItem(TERAVIA_CONFIG.STORAGE.SESSION) || "{}"
        );
    } catch (e) {
        sesi = {};
    }

    if (!sesi.status_login) return;

    // ==========================
    // NAVBAR DESKTOP
    // ==========================
    const tombolAksi = document.querySelector(".tombol-aksi");

    if (tombolAksi) {
        tombolAksi.innerHTML = `
            <a href="pages/pasang-iklan.html" class="btn-pasang">+ Pasang Iklan</a>
            <a href="profil.html" class="btn-masuk">👤 ${sesi.nama_lengkap}</a>
            <button class="btn-daftar" onclick="keluarAkun()">Keluar</button>
        `;
    }

    // ==========================
    // MENU MOBILE
    // ==========================
    const menuMobile = document.getElementById("menuMobile");

    if (menuMobile) {
        menuMobile.innerHTML = `
            <a href="index.html">🏠 Beranda</a>
            <a href="daftar-properti.html">🔍 Cari Properti</a>
            <a href="mitra-notaris.html">📜 Mitra Notaris</a>
            <a href="blog.html">📰 Blog Properti</a>
            <a href="tentang.html">ℹ️ Tentang Kami</a>
            <div class="pisah"></div>
            <a href="profil.html">👤 ${sesi.nama_lengkap}</a>
            <a href="pages/pasang-iklan.html">📢 Pasang Iklan</a>
            <a href="#" onclick="keluarAkun()">🚪 Keluar Akun</a>
        `;
    }

});

function keluarAkun() {

    localStorage.removeItem(
        TERAVIA_CONFIG.STORAGE.SESSION
    );

    alert("✅ Berhasil Keluar Akun");

    window.location.href =
        TERAVIA_CONFIG.ROUTE.HOME;

}
