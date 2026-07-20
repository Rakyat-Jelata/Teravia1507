// === CEK STATUS LOGIN & UBAH MENU ===
const sesi = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');

// 1. UBAH MENU DI NAVBAR / MENU SAMPING
document.addEventListener('DOMContentLoaded', function() {
    // UBAH MENU DESKTOP
    const menuDesktop = document.querySelector('.menu-desktop');
    if (menuDesktop && sesi && sesi.statusLogin) {
        menuDesktop.innerHTML = `
            <a href="index.html" class="tautan-nav">Beranda</a>
            <a href="daftar-properti.html" class="tautan-nav">Cari Properti</a>
            <a href="kalkulator-kpr.html" class="tautan-nav">🧮 Kalkulator KPR</a>
            <a href="mitra-notaris.html" class="tautan-nav">Mitra Notaris</a>
            <a href="blog.html" class="tautan-nav">Blog Properti</a>
            <a href="tentang.html" class="tautan-nav">Tentang Kami</a>
            <a href="pages/pasang-iklan.html" class="btn-pasang">+ Pasang Iklan</a>
            <div style="display:flex;align-items:center;gap:8px;">
                <span style="color:#F59E0B;font-weight:600;">👑 ${sesi.paket_aktif}</span>
                <a href="profil.html" class="tautan-nav">👤 ${sesi.nama_lengkap}</a>
                <button onclick="keluarAkun()" style="background:none;border:none;color:#EF4444;padding:0;">Keluar</button>
            </div>
        `;
    }

    // UBAH MENU MOBILE
    const menuMobile = document.querySelector('.isi-menu');
    if (menuMobile && sesi && sesi.statusLogin) {
        menuMobile.innerHTML = `
            <a href="index.html" class="tautan-menu">🏠 Beranda</a>
            <a href="daftar-properti.html" class="tautan-menu">🔍 Cari Properti</a>
            <a href="kalkulator-kpr.html" class="tautan-menu">🧮 Kalkulator KPR</a>
            <a href="membership.html" class="tautan-menu aktif">💎 Keanggotaan</a>
            <a href="mitra-notaris.html" class="tautan-menu">🏛️ Mitra Notaris/PPAT</a>
            <a href="blog.html" class="tautan-menu">📰 Blog Properti</a>
            <a href="tentang.html" class="tautan-menu">ℹ️ Tentang Kami</a>
            <div class="garis-pemisah"></div>
            <a href="pages/pasang-iklan.html" class="btn-pasang-menu">📢 Pasang Iklan Sekarang</a>
            <a href="profil.html" class="tautan-menu">👤 ${sesi.nama_lengkap}</a>
            <button onclick="keluarAkun()" style="width:100%;padding:10px;background:#FEE2E2;color:#DC2626;border:none;border-radius:8px;margin-top:8px;">Keluar Akun</button>
        `;
    }

    // 2. CEK AKSES HALAMAN PASANG IKLAN
    if (window.location.pathname.includes('pasang-iklan.html')) {
        const kontenHalaman = document.querySelector('.wadah-pasang-iklan');
        const halamanTolak = document.querySelector('.halaman-ditolak');

        // Daftar paket yang boleh pasang iklan
        const paketBoleh = ['Kaveling', 'Cluster', 'Residence', 'Estate Premium'];
        const bolehAkses = sesi && sesi.statusLogin && paketBoleh.includes(sesi.paket_aktif);

        if (!bolehAkses) {
            // Tetap tampilkan pesan tolak seperti yang sudah kamu buat
            console.log('Akses ditolak: Belum berlangganan');
        } else {
            // Sembunyikan pesan tolak, tampilkan form pasang iklan
            if(halamanTolak) halamanTolak.style.display = 'none';
            if(kontenHalaman) kontenHalaman.style.display = 'block';
            console.log('Akses diizinkan sebagai:', sesi.paket_aktif);
        }
    }
});

// === FUNGSI KELUAR AKUN ===
function keluarAkun() {
    localStorage.removeItem('sesiTeravia');
    alert('✅ Berhasil keluar dari akun!');
    window.location.href = 'index.html';
}

