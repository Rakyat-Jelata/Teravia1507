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
            if (
    email === TERAVIA_CONFIG.TRIAL.EMAIL &&
    sandi === TERAVIA_CONFIG.TRIAL.PASSWORD) {
                const sesiTrial = {
                    id: TERAVIA_CONFIG.MEMBER.ID,
                    nama_lengkap: TERAVIA_CONFIG.MEMBER.NAME,
                    email: email,
                    paket_aktif: TERAVIA_CONFIG.MEMBER.PACKAGE,
                    jenis_akun: TERAVIA_CONFIG.MEMBER.ROLE,
                    is_admin: TERAVIA_CONFIG.MEMBER.ADMIN,
                    status_login: true
                };
                localStorage.setItem(TERAVIA_CONFIG.STORAGE.SESSION,JSON.stringify(sesiTrial));
                alert('✅ BERHASIL MASUK! Selamat datang Member Estate Premium!');
                
                // Arahkan ke halaman tujuan atau beranda
                const tujuan = localStorage.getItem(TERAVIA_CONFIG.STORAGE.REDIRECT)||TERAVIA_CONFIG.ROUTE.HOME;
                localStorage.removeItem(TERAVIA_CONFIG.STORAGE.REDIRECT);
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
