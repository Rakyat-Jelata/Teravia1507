// Cek login
const sesi = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');
if (!sesi) {
    alert('⚠️ Silakan masuk terlebih dahulu!');
    window.location.href = 'login.html';
}

// Ambil parameter URL
const params = new URLSearchParams(window.location.search);
const jenis = params.get('jenis');
const id = params.get('id');

let dataPesanan = null;

// Cari data pesanan
if (jenis === 'upgrade') {
    const antrianUpgrade = JSON.parse(localStorage.getItem('permintaanUpgrade') || '[]');
    dataPesanan = antrianUpgrade.find(item => String(item.id) === String(id));
} else if (jenis === 'ads') {
    const pesananIklan = JSON.parse(localStorage.getItem('pesananAds') || '[]');
    dataPesanan = pesananIklan.find(item => String(item.id) === String(id));
}

// Tampilkan konten
if (!dataPesanan) {
    document.getElementById('isiInvoice').innerHTML = `
        <p style="text-align:center;color:#EF4444;padding:20px;">⚠️ Data invoice tidak ditemukan!</p>
    `;
} else {
    tampilkanInvoice(dataPesanan, jenis);
}

function tampilkanInvoice(data, jenis) {
    const noInv = `INV-${jenis.toUpperCase()}-${data.id}`;
    let judul = '', rincian = '', total = data.biaya || 0;
    let namaPaket = '';

    if (jenis === 'upgrade') {
        judul = `Upgrade Keanggotaan Berhasil`;
        namaPaket = data.paketTujuan;
        rincian = `<div class="baris"><span>Paket Keanggotaan</span><span>${namaPaket}</span></div>`;
        total = data.harga || 0;
    } else {
        judul = `Promosi Meta Ads`;
        namaPaket = 'Layanan Iklan';
        rincian = `
        <div class="baris"><span>Judul Iklan</span><span>${data.judulIklan}</span></div>
        <div class="baris"><span>Durasi</span><span>${data.durasiHari} Hari</span></div>
        <div class="baris"><span>ID Iklan</span><span>${data.idIklan || '-'}</span></div>
        `;
        total = data.biaya;
    }

    document.getElementById('isiInvoice').innerHTML = `
    <div class="kepala">
        <img src="assets/img/logo.png" alt="Teravia" class="logo">
        <h2>BUKTI PEMBAYARAN LUNAS</h2>
        <div class="no-invoice">No: ${noInv} | Tanggal: ${data.tanggal}</div>
        <span class="status" style="background:#ECFDF5;color:#065F46;border:1px solid #A7F3D0;">✅ LUNAS</span>
    </div>

    <div class="bagian">
        <h4>Data Anggota:</h4>
        <div class="baris"><span>Nama Lengkap</span><span>${sesi.namaLengkap || sesi.username || '-'}</span></div>
        <div class="baris"><span>ID Pengguna</span><span>${sesi.id || '-'}</span></div>
    </div>

    <div class="bagian">
        <h4>Rincian Transaksi:</h4>
        <div class="baris"><span>Deskripsi</span><span>${judul}</span></div>
        ${rincian}
    </div>

    <div class="total">
        <div class="baris"><span>Total Pembayaran</span></div>
        <div class="nilai">Rp ${total.toLocaleString('id-ID')}</div>
    </div>

    <div style="margin-top:24px;padding:20px;background:#F8FAFC;border-radius:12px;text-align:center;">
        <p style="font-size:15px;line-height:1.6;color:#1E293B;">
            Terima kasih telah bergabung sebagai anggota <strong>${namaPaket}</strong> di <strong>TERAVIA</strong>.<br>
            Semoga kesuksesan dan kemudahan selalu menghampiri Anda dalam setiap langkah investasi properti! 🤝
        </p>
    </div>
    `;
}

// Kirim ke WhatsApp
function kirimKeWA() {
    const elemenNoInv = document.querySelector('.no-invoice');
    const elemenTotal = document.querySelector('.nilai');
    
    if (!elemenNoInv || !elemenTotal) {
        return alert('⚠️ Data belum dimuat sepenuhnya!');
    }

    const teksPesan = `
✅ *BUKTI PEMBAYARAN LUNAS - TERAVIA*
${elemenNoInv.textContent.trim()}

Jenis Transaksi: ${jenis === 'upgrade' ? 'Upgrade Keanggotaan' : 'Promosi Iklan'}
Total Dibayar: ${elemenTotal.textContent.trim()}

Terima kasih telah menjadi anggota Teravia!
Semoga kesuksesan selalu menyertai Anda.
    `.trim();

    const linkWA = `https://wa.me/?text=${encodeURIComponent(teksPesan)}`;
    window.open(linkWA, '_blank');
    alert('✅ Membuka WhatsApp...');
}

// Kirim ke Email
function kirimKeEmail() {
    const elemenNoInv = document.querySelector('.no-invoice');
    const elemenTotal = document.querySelector('.nilai');
    
    if (!elemenNoInv || !elemenTotal) {
        return alert('⚠️ Data belum dimuat sepenuhnya!');
    }

    const subjek = `Bukti Pembayaran Lunas - Teravia`;
    const isiPesan = `Nomor: ${elemenNoInv.textContent.trim()}\nTotal: ${elemenTotal.textContent.trim()}\n\nTerima kasih telah bergabung bersama Teravia. Semoga kesuksesan selalu menghampiri Anda!`;

    window.location.href = `mailto:?subject=${encodeURIComponent(subjek)}&body=${encodeURIComponent(isiPesan)}`;
    alert('✅ Membuka aplikasi email...');
          }
      
