// === CEK SESI & UBAH MENU - VERSI PASTI JALAN ===
document.addEventListener('DOMContentLoaded', function() {
    // BACA DATA SESI DENGAN AMAN
    let sesi;
    try {
        sesi = JSON.parse(localStorage.getItem('sesiTeravia') || '{}');
    } catch {
        sesi = {};
    }
    console.log("📥 Data Sesi Dibaca:", sesi);

    // JIKA SUDAH LOGIN
    if (sesi.statusLogin === true) {
        // --- UBAH MENU MOBILE ---
        const menuSamping = document.querySelector('.isi-menu');
        if (menuSamping) {
            menuSamping.innerHTML = `
                <a href="index.html" class="tautan-menu">🏠 Beranda</a>
                <a href="daftar-properti.html" class="tautan-menu">🔍 Cari Properti</a>
                <a href="kalkulator-kpr.html" class="tautan-menu">🧮 Kalkulator KPR</a>
                <a href="membership.html" class="tautan-menu">💎 Keanggotaan</a>
                <a href="mitra-notaris.html" class="tautan-menu">🏛️ Mitra Notaris/PPAT</a>
                <a href="blog.html" class="tautan-menu">📰 Blog Properti</a>
                <a href="tentang.html" class="tautan-menu">ℹ️ Tentang Kami</a>
                <div class="garis-pemisah"></div>
                <a href="pages/pasang-iklan.html" class="btn-pasang-menu">📢 Pasang Iklan Sekarang</a>
                <div style="padding:10px;text-align:center;color:#F59E0B;font-weight:bold;">👑 ${sesi.paket_aktif || 'Member'}</div>
                <a href="profil.html" class="tautan-menu">👤 ${sesi.nama_lengkap || 'Profil Saya'}</a>
                <button onclick="keluarAkun()" style="width:100%;padding:10px;margin-top:8px;background:#FEE2E2;color:#DC2626;border:none;border-radius:8px;">Keluar Akun</button>
            `;
        }

        // --- UBAH MENU DESKTOP ---
        const menuDesktop = document.querySelector('.menu-desktop');
        if (menuDesktop) {
            menuDesktop.innerHTML = `
                <a href="index.html" class="tautan-nav">Beranda</a>
                <a href="daftar-properti.html" class="tautan-nav">Cari Properti</a>
                <a href="kalkulator-kpr.html" class="tautan-nav">🧮 Kalkulator KPR</a>
                <a href="mitra-notaris.html" class="tautan-nav">Mitra Notaris</a>
                <a href="blog.html" class="tautan-nav">Blog Properti</a>
                <a href="tentang.html" class="tautan-nav">Tentang Kami</a>
                <a href="pages/pasang-iklan.html" class="btn-pasang">+ Pasang Iklan</a>
                <span style="color:#F59E0B;font-weight:bold;">👑 ${sesi.paket_aktif || ''}</span>
                <a href="profil.html" class="tautan-nav">👤 ${sesi.nama_lengkap || ''}</a>
                <button onclick="keluarAkun()" style="background:none;border:none;color:#EF4444;">Keluar</button>
            `;
        }

        // --- CEK HALAMAN PASANG IKLAN ---
        if (location.pathname.includes('pasang-iklan')) {
            const paketBoleh = ['Kaveling','Cluster','Residence','Estate Premium'];
            if (paketBoleh.includes(sesi.paket_aktif)) {
                document.body.innerHTML = document.body.innerHTML.replace(
                    'Akses Halaman Ditolak',
                    '✅ Selamat Datang Member Premium! Form Pasang Iklan Siap Digunakan'
                );
            }
        }
    }
});

// FUNGSI KELUAR
function keluarAkun() {
    localStorage.removeItem('sesiTeravia');
    alert('✅ Berhasil Keluar!');
    location.href = 'index.html';
}
