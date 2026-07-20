document.addEventListener('DOMContentLoaded', function () {
    // Cek Sesi Login
    const sesi = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');
    if (!sesi) {
        alert('⚠️ Silakan masuk dulu untuk mengakses halaman ini!');
        window.location.href = '../login.html';
        return;
    }

    // Logika Kirim Formulir
    const form = document.getElementById('formKonfirmasi');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Simulasi pengiriman
        alert('✅ Konfirmasi pembayaran berhasil dikirim!\nTunggu verifikasi admin maksimal 1x24 jam kerja.');
        window.location.href = 'riwayat-transaksi.html';
    });
});
