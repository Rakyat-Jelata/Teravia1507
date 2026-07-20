// === CEK SESI & UBAH MENU - VERSI PASTI JALAN ===
document.addEventListener('DOMContentLoaded', function() {
    // BACA DATA SESI DENGAN AMAN
    let sesi;
    try {
        sesi = JSON.parse(
    localStorage.getItem(TERAVIA_CONFIG.STORAGE.SESSION) || '{}'
);

    // TENTUKAN JALUR RELATIF (untuk file di folder pages/)
    const jalurDasar = location.pathname.includes('/pages/') ? '../' : '';

    // JIKA SUDAH LOGIN
    if (sesi.status_login === true) {
        // --- UBAH MENU SAMPING MOBILE ---
        const menuSamping = document.querySelector('.isi-menu');
        if (menuSamping) {
            menuSamping.innerHTML = `
                <a href="${jalurDasar}index.html" class="tautan-menu">🏠 Beranda</a>
                <a href="${jalurDasar}daftar-properti.html" class="tautan-menu">🔍 Cari Properti</a>
                <a href="${jalurDasar}kalkulator-kpr.html" class="tautan-menu">🧮 Kalkulator KPR</a>
                <a href="${jalurDasar}membership.html" class="tautan-menu">💎 Keanggotaan</a>
                <a href="${jalurDasar}mitra-notaris.html" class="tautan-menu">🏛️ Mitra Notaris/PPAT</a>
                <a href="${jalurDasar}blog.html" class="tautan-menu">📰 Blog Properti</a>
                <a href="${jalurDasar}tentang.html" class="tautan-menu">ℹ️ Tentang Kami</a>
                <div class="garis-pemisah"></div>
                <a href="${jalurDasar}pages/pasang-iklan.html" class="btn-pasang-menu">📢 Pasang Iklan Sekarang</a>
                <div style="padding:10px;text-align:center;color:#F59E0B;font-weight:bold;">👑 ${sesi.paket_aktif || 'Member'}</div>
                <a href="${jalurDasar}profil.html" class="tautan-menu">👤 ${sesi.nama_lengkap || 'Profil Saya'}</a>
                <button onclick="keluarAkun()" style="width:100%;padding:10px;margin-top:8px;background:#FEE2E2;color:#DC2626;border:none;border-radius:8px;">Keluar Akun</button>
            `;
        }

        // --- UBAH MENU DESKTOP ---
        const menuDesktop = document.querySelector('.menu-desktop');
        if (menuDesktop) {
            menuDesktop.innerHTML = `
                <a href="${jalurDasar}index.html" class="tautan-nav">Beranda</a>
                <a href="${jalurDasar}daftar-properti.html" class="tautan-nav">Cari Properti</a>
                <a href="${jalurDasar}kalkulator-kpr.html" class="tautan-nav">🧮 Kalkulator KPR</a>
                <a href="${jalurDasar}mitra-notaris.html" class="tautan-nav">Mitra Notaris</a>
                <a href="${jalurDasar}blog.html" class="tautan-nav">Blog Properti</a>
                <a href="${jalurDasar}tentang.html" class="tautan-nav">Tentang Kami</a>
                <a href="${jalurDasar}pages/pasang-iklan.html" class="btn-pasang">+ Pasang Iklan</a>
                <span style="color:#F59E0B;font-weight:bold;">👑 ${sesi.paket_aktif || ''}</span>
                <a href="${jalurDasar}profil.html" class="tautan-nav">👤 ${sesi.nama_lengkap || ''}</a>
                <button onclick="keluarAkun()" style="background:none;border:none;color:#EF4444;cursor:pointer;">Keluar</button>
            `;
        }

        // --- CEK HAK AKSES HALAMAN PASANG IKLAN ---
        if (location.pathname.includes('pasang-iklan')) {
            const paketBoleh = ['Kaveling','Cluster','Residence','Estate Premium'];
            const pesanTolak = document.querySelector('.pesan-tolak');
            const formPasang = document.querySelector('.form-pasang');
            
            if (paketBoleh.includes(sesi.paket_aktif)) {
                if (pesanTolak) pesanTolak.style.display = 'none';
                if (formPasang) formPasang.style.display = 'block';
            } else {
                if (pesanTolak) pesanTolak.style.display = 'block';
                if (formPasang) formPasang.style.display = 'none';
            }
        }
    }
});

// === FUNGSI KELUAR AKUN ===
function keluarAkun() {
    localStorage.removeItem(TERAVIA_CONFIG.STORAGE.SESSION);
    alert('✅ Berhasil Keluar Akun!');
    window.location.href = TERAVIA_CONFIG.ROUTE.HOME;
}
