// === FUNGSI LIHAT/SEMBUNYI SANDI ===
function ubahSandi(id, tombol) {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
    tombol.textContent = input.type === "password" ? "👁️" : "🙈";
}

// === PROSES LOGIN ===
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formLogin');
    if(!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const sandi = document.getElementById('sandi').value;

        try {
            // ✅ AKUN TRIAL - SELALU BERHASIL
            if (email === 'teravia.vip@gmail.com' && sandi === 'TeraviaVip@2026') {
                const sesiTrial = {
                    id: 'trial-001',
                    nama_lengkap: 'Teravia VIP',
                    email: email,
                    paket_aktif: 'Estate Premium',
                    jenis_akun: 'broker',
                    is_admin: false,
                    status_login: true
                };
                localStorage.setItem(TERAVIA_CONFIG.STORAGE.SESSION,JSON.stringify(sesiTrial));
                alert('✅ BERHASIL MASUK! Selamat datang Member Estate Premium!');
                
                // Arahkan ke halaman tujuan atau beranda
                const tujuan = localStorage.getItem(TERAVIA_CONFIG.STORAGE.REDIRECT)||TERAVIA_CONFIG.ROUTE.HOME;
                localStorage.removeItem('tujuanSetelahLogin');
                window.location.href = tujuan;
                return;
            }

            // ❌ Petunjuk akun percobaan
            alert('❌ Gunakan akun percobaan dulu:\n📧 Email: teravia.vip@gmail.com\n🔑 Sandi: TeraviaVip@2026');

        } catch (err) {
            console.error('Kesalahan Login:', err);
            alert('❌ Terjadi kesalahan: ' + err.message);
        }
    });
});
