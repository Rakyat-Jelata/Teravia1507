// Cek status login terlebih dahulu
const sesi = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');
if(!sesi) { 
    alert('⚠️ Silakan masuk dulu untuk mengubah kata sandi!'); 
    location.href='login.html'; 
}

// Fungsi tampil/sembunyikan sandi
function toggleSandi(id, el) {
    const inp = document.getElementById(id);
    inp.type = inp.type === 'password' ? 'text' : 'password';
    el.textContent = inp.type === 'password' ? '👁️' : '🙈';
}

// Proses ganti sandi
document.getElementById('formGanti').addEventListener('submit', e => {
    e.preventDefault();
    const lama = document.getElementById('sandiLama').value.trim();
    const baru = document.getElementById('sandiBaru').value.trim();
    const konf = document.getElementById('konfirmasi').value.trim();

    if(lama !== sesi.kataSandi) return alert('❌ Kata sandi lama salah!');
    if(baru !== konf) return alert('❌ Konfirmasi sandi tidak cocok!');
    if(baru.length < 6) return alert('❌ Kata sandi baru minimal 6 karakter!');
    
    sesi.kataSandi = baru;
    localStorage.setItem('sesiTeravia', JSON.stringify(sesi));
    alert('✅ Kata sandi berhasil diperbarui!');
    location.href = 'profil-member.html';
});
