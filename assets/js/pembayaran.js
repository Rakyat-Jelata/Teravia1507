// Daftar harga paket SESUAI halaman membership
const daftarHarga = {
    'Kaveling': 150000,
    'Cluster': 500000,
    'Residence': 1500000,
    'Estate Premium': 3500000
};

// Ambil data dari sesi (bukan localStorage terpisah)
const sesi = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');

// Cek akses sah
if (!sesi || !sesi.paketAkanDibayar || !daftarHarga[sesi.paketAkanDibayar]) {
    alert('⚠️ Pilih paket keanggotaan terlebih dahulu!');
    window.location.href = 'membership.html';
}

// Hitung & tampilkan ringkasan
const namaPaket = sesi.paketAkanDibayar;
const jenisAkun = sesi.jenis_akun || 'Tidak ditentukan';
const hargaDasar = daftarHarga[namaPaket];
const ppn = hargaDasar * 0.11;
const total = hargaDasar + ppn;

// Ubah jenis akun jadi tampilan ramah
const labelAkun = {
    'pemilik': 'Pemilik Properti Pribadi',
    'agen': 'Agen Properti Terdaftar',
    'broker': 'Broker / Makelar Independen'
}[jenisAkun] || jenisAkun;

document.getElementById('namaPaket').textContent = namaPaket;
document.getElementById('jenisAkun').textContent = labelAkun;
document.getElementById('hargaPaket').textContent = `Rp ${hargaDasar.toLocaleString('id-ID')}`;
document.getElementById('ppnPaket').textContent = `Rp ${ppn.toLocaleString('id-ID')}`;
document.getElementById('totalBayar').textContent = `Rp ${total.toLocaleString('id-ID')}`;

// Efek pilih metode pembayaran
document.querySelectorAll('.kotak-metode').forEach(pilih => {
    pilih.addEventListener('click', () => {
        document.querySelectorAll('.kotak-metode').forEach(k => k.classList.remove('terpilih'));
        pilih.classList.add('terpilih');
        pilih.querySelector('input').checked = true;
    });
});

// Simpan data & lanjut ke faktur
document.getElementById('btnKonfirmasi').addEventListener('click', () => {
    const metodeTerpilih = document.querySelector('input[name="metode"]:checked').value;
    
    // Perbarui data di sesi utama
    sesi.metodePembayaran = metodeTerpilih;
    sesi.totalPembayaran = total;
    sesi.nomorFaktur = `TRV-${Date.now().toString().slice(-8)}`;
    localStorage.setItem('sesiTeravia', JSON.stringify(sesi));

    // Buka halaman faktur
    window.location.href = `invoice.html?nomor=${sesi.nomorFaktur}`;
});
