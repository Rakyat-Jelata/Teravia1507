document.addEventListener('DOMContentLoaded', function () {
    // Logika Kirim Formulir Kontak
    const form = document.getElementById('formKontak');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Ambil nilai input
        const nama = document.getElementById('namaKontak').value.trim();
        const hubungi = document.getElementById('kontakPengirim').value.trim();
        const subjek = document.getElementById('subjek').value.trim();
        const pesan = document.getElementById('isiPesan').value.trim();

        // Simpan sementara ke localStorage
        const daftarPesan = JSON.parse(localStorage.getItem('pesanMasuk') || '[]');
        daftarPesan.push({
            id: Date.now(),
            nama,
            hubungi,
            subjek,
            pesan,
            tanggal: new Date().toLocaleString('id-ID')
        });
        localStorage.setItem('pesanMasuk', JSON.stringify(daftarPesan));

        alert('✅ Pesan berhasil terkirim! Kami akan segera menghubungi Anda maksimal 1x24 jam kerja.');
        form.reset();
    });
});
