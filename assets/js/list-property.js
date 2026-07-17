document.addEventListener('DOMContentLoaded', function() {
    // BACA PARAMETER DARI BERANDA
    const urlParams = new URLSearchParams(window.location.search);
    const tujuan = urlParams.get('tujuan') || 'beli';
    const lokasi = urlParams.get('lokasi') || 'Seluruh Indonesia';

    // TAMPILKAN INFORMASI
    const judul = document.getElementById('judulHasil');
    const lokasiEl = document.getElementById('lokasiHasil');
    const btnBeli = document.getElementById('btnFilterBeli');
    const btnSewa = document.getElementById('btnFilterSewa');

    judul.textContent = tujuan === 'beli' ? 'Properti Dijual' : 'Properti Disewa';
    lokasiEl.textContent = `Lokasi: ${lokasi}`;

    // TANDAI TOMBOL AKTIF
    if(tujuan === 'beli') {
        btnBeli.classList.add('aktif');
        btnSewa.classList.remove('aktif');
    } else {
        btnSewa.classList.add('aktif');
        btnBeli.classList.remove('aktif');
    }
}
                         );
