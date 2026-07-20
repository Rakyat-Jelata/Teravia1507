// Fungsi Format Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
}

// Fungsi Hitung KPR
function hitungKpr() {
    const harga = parseFloat(document.getElementById('hargaProperti').value) || 0;
    const persenDp = parseFloat(document.getElementById('persenDp').value) || 10;
    const bunga = parseFloat(document.getElementById('sukuBunga').value) || 0;
    const tahun = parseFloat(document.getElementById('lamaKpr').value) || 1;

    const uangMuka = harga * (persenDp / 100);
    const pinjaman = harga - uangMuka;
    const bungaBulanan = (bunga / 100) / 12;
    const jangkaWaktuBulan = tahun * 12;

    // Rumus Cicilan Tetap (Anuitas)
    let cicilanBulanan;
    if (bungaBulanan === 0) {
        cicilanBulanan = pinjaman / jangkaWaktuBulan;
    } else {
        cicilanBulanan = pinjaman * (bungaBulanan * Math.pow(1 + bungaBulanan, jangkaWaktuBulan)) / (Math.pow(1 + bungaBulanan, jangkaWaktuBulan) - 1);
    }

    const totalBayar = cicilanBulanan * jangkaWaktuBulan;

    // Tampilkan Hasil
    document.getElementById('hasilDp').textContent = formatRupiah(uangMuka);
    document.getElementById('hasilPinjaman').textContent = formatRupiah(pinjaman);
    document.getElementById('hasilCicilan').textContent = formatRupiah(cicilanBulanan);
    document.getElementById('hasilTotal').textContent = formatRupiah(totalBayar);
}

// Jalankan saat halaman dimuat & ada perubahan input
document.addEventListener('DOMContentLoaded', hitungKpr);
document.getElementById('hargaProperti').addEventListener('input', hitungKpr);
document.getElementById('persenDp').addEventListener('input', hitungKpr);
document.getElementById('sukuBunga').addEventListener('input', hitungKpr);
document.getElementById('lamaKpr').addEventListener('input', hitungKpr);

// Pengaman fungsi menu
document.addEventListener('DOMContentLoaded', function () {
    const tombolBuka = document.getElementById('tombolMenu');
    const tombolTutup = document.getElementById('tombolTutup');
    const menuSamping = document.getElementById('menuMobile');
    const latarGelap = document.getElementById('latarGelap');

    function bukaMenu() {
        menuSamping.classList.add('buka');
        latarGelap.classList.add('tampil');
        document.body.style.overflow = 'hidden';
    }
    function tutupMenu() {
        menuSamping.classList.remove('buka');
        latarGelap.classList.remove('tampil');
        document.body.style.overflow = 'auto';
    }

    if(tombolBuka) tombolBuka.addEventListener('click', bukaMenu);
    if(tombolTutup) tombolTutup.addEventListener('click', tutupMenu);
    if(latarGelap) latarGelap.addEventListener('click', tutupMenu);
});
          
