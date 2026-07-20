// Ambil data sesi & parameter iklan
const sesi = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');
const idIklan = new URLSearchParams(window.location.search).get('id');
const daftarIklan = JSON.parse(localStorage.getItem('daftarIklanSaya') || '[]');

// Cek akses sah
if (!sesi) {
    alert('⚠️ Silakan masuk terlebih dahulu!');
    window.location.href = '../login.html';
}
if (!idIklan) {
    alert('⚠️ Iklan tidak ditemukan!');
    window.location.href = 'iklan-saya.html';
}

// Cek kelayakan paket
const paketSaya = sesi.jenisKeanggotaan || 'Gratis';
if (!['Residence', 'Estate Premium'].includes(paketSaya)) {
    alert('⚠️ Fitur promosi hanya untuk anggota Residence & Estate Premium!');
    window.location.href = '../membership.html';
}

// Tampilkan info iklan
const iklan = daftarIklan.find(i => i.id == idIklan);
const wadahInfo = document.getElementById('infoIklan');

if (!iklan) {
    wadahInfo.innerHTML = `<p style="color:#DC2626;text-align:center;">Data iklan tidak ditemukan</p>`;
} else {
    wadahInfo.innerHTML = `
        <h3>Iklan yang Akan Dipromosikan</h3>
        <div class="baris-iklan">
            <img src="${iklan.gambar || '../assets/img/tempat-properti.png'}" alt="${iklan.judul}" class="gambar-iklan">
            <div class="detail-iklan">
                <h4>${iklan.judul}</h4>
                <p>${iklan.lokasi} • Rp ${parseInt(iklan.harga).toLocaleString('id-ID')}</p>
            </div>
        </div>
    `;
}

// Logika pilih durasi
let durasiTerpilih = null;
let hargaTerpilih = 0;

document.querySelectorAll('.opsi').forEach(opsi => {
    opsi.addEventListener('click', () => {
        document.querySelectorAll('.opsi').forEach(o => o.classList.remove('terpilih'));
        opsi.classList.add('terpilih');
        
        durasiTerpilih = opsi.dataset.hari;
        hargaTerpilih = parseInt(opsi.dataset.harga);
        
        document.getElementById('nilaiTotal').textContent = `Rp ${hargaTerpilih.toLocaleString('id-ID')}`;
        const tombol = document.getElementById('tombolLanjut');
        tombol.disabled = false;
        tombol.textContent = 'Lanjut ke Pembayaran';
    });
});

// Lanjut ke pembayaran
document.getElementById('tombolLanjut').addEventListener('click', () => {
    if (!durasiTerpilih) return;
    
    // Simpan data promosi ke sesi
    sesi.promosiAkanDibayar = {
        idIklan: idIklan,
        judulIklan: iklan.judul,
        durasiHari: durasiTerpilih,
        totalBayar: hargaTerpilih
    };
    localStorage.setItem('sesiTeravia', JSON.stringify(sesi));
    
    // Buka halaman pembayaran promosi
    window.location.href = `pembayaran-promosi.html?id=${idIklan}`;
});
