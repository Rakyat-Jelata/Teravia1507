// Cek akses sah
const sesi = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');
if (!sesi) {
    alert('⚠️ Silakan masuk terlebih dahulu!');
    window.location.href = 'login.html';
}

// Ambil riwayat transaksi milik pengguna
const idPemilik = sesi.idAkun || 0;
const semuaTransaksi = JSON.parse(localStorage.getItem('riwayatTransaksi') || '[]');
const transaksiSaya = semuaTransaksi.filter(t => t.idPemilik === idPemilik);

const wadah = document.getElementById('daftarTransaksi');

// Tampilkan data
if (transaksiSaya.length === 0) {
    wadah.innerHTML = `
        <div class="kosong">
            <p style="font-size:40px;margin-bottom:8px;">💳</p>
            <p>Belum ada riwayat transaksi.</p>
            <p>Setiap pembayaran paket keanggotaan atau promosi iklan akan muncul di sini.</p>
        </div>
    `;
} else {
    wadah.innerHTML = '';
    // Urutkan dari yang terbaru
    transaksiSaya.sort((a,b) => b.id - a.id);
    transaksiSaya.forEach(item => {
        wadah.innerHTML += `
        <div class="item-transaksi">
            <div class="baris-atas">
                <span class="jenis">${item.jenis || 'Pembayaran Lainnya'}</span>
                <span class="status ${item.status}">${item.status}</span>
            </div>
            <div class="baris-bawah">
                <span>No. Invoice: ${item.noInv || '-'}</span>
                <span class="nominal">Rp ${parseInt(item.total || 0).toLocaleString('id-ID')}</span>
            </div>
            <div class="baris-bawah">
                <span>${item.tanggal || '-'}</span>
            </div>
        </div>`;
    });
}
