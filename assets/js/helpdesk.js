// Cek status login terlebih dahulu
const sesi = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');
if(!sesi) {
    alert('⚠️ Silakan masuk dulu untuk menghubungi bantuan!');
    window.location.href = 'login.html';
}

// Proses pengiriman pesan
document.getElementById('formBantuan').addEventListener('submit', function(e){
    e.preventDefault();
    const subjek = document.getElementById('subjek').value.trim();
    const pesan = document.getElementById('pesan').value.trim();

    // Simpan pesan ke penyimpanan lokal
    const semuaPesan = JSON.parse(localStorage.getItem('pesanBantuan') || '[]');
    semuaPesan.push({
        id: Date.now(),
        pengirim: sesi.nama,
        userId: sesi.id,
        email: sesi.email || '-',
        subjek: subjek,
        pesan: pesan,
        status: 'baru',
        tanggal: new Date().toLocaleString('id-ID')
    });
    localStorage.setItem('pesanBantuan', JSON.stringify(semuaPesan));

    alert('✅ Pesan berhasil dikirim! Admin akan segera merespons maksimal 1x24 jam.');
    this.reset();
});
