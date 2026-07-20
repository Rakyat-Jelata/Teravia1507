// Cek status login terlebih dahulu
const sesi = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');
if (!sesi) {
    alert('⚠️ Silakan masuk dulu untuk melihat daftar iklan!');
    location.href = 'login.html';
}

// Muat semua data iklan dan filter milik pengguna
const semuaIklan = JSON.parse(localStorage.getItem('daftarIklan') || '[]');
const iklanSaya = semuaIklan.filter(i => i.pemilik === sesi.id);

const wadah = document.getElementById('daftarIklan');

// Tampilkan konten
if (iklanSaya.length === 0) {
    wadah.innerHTML = `<div class="kosong">
        Belum ada iklan yang dipasang.<br>
        Yuk pasang iklan pertamamu sekarang!
    </div>`;
} else {
    iklanSaya.forEach(iklan => {
        let kelasStatus = 'menunggu';
        let teksStatus = iklan.status || 'Menunggu Persetujuan';
        
        if (iklan.status === 'aktif') kelasStatus = 'aktif';
        if (iklan.status === 'ditolak') kelasStatus = 'tolak';

        wadah.innerHTML += `
        <div class="kartu">
            <div class="judul">${iklan.judul}</div>
            <div class="lokasi">${iklan.kabupaten || '-'}, ${iklan.provinsi || '-'}</div>
            <span class="status ${kelasStatus}">${teksStatus}</span>
            <div class="aksi">
                <button class="btn-sundul" onclick="sundulIklan('${iklan.id}')">🚀 Sundul</button>
                <button class="btn-hapus" onclick="hapusIklan('${iklan.id}')">🗑️ Hapus</button>
            </div>
        </div>`;
    });
}

// Aturan batas sundul berdasarkan paket keanggotaan
const aturanPaket = {
    'Kaveling': { maks: 1 },
    'Cluster': { maks: 4 },
    'Residence': { maks: 999 },
    'Estate': { maks: 999 }
};

// Fungsi sundul iklan
function sundulIklan(id) {
    const dataAkun = JSON.parse(localStorage.getItem('dataAkunTeravia') || '[]');
    const akun = dataAkun.find(a => a.id === sesi.id) || { paket: 'Kaveling' };
    const batas = aturanPaket[akun.paket].maks;

    // Cek jumlah sundul hari ini
    const hariIni = new Date().toDateString();
    const catatan = JSON.parse(localStorage.getItem('catatanSundul') || '{}');
    const jumlahHariIni = (catatan[sesi.id]?.tanggal === hariIni) ? catatan[sesi.id].jumlah : 0;

    if (jumlahHariIni >= batas) {
        return alert(`❌ Batas sundul hari ini sudah habis!\nPaket ${akun.paket} maksimal ${batas} kali sehari.`);
    }

    // Perbarui waktu iklan agar muncul di paling atas
    const index = semuaIklan.findIndex(i => i.id === id);
    if (index > -1) {
        semuaIklan[index].waktuSundul = new Date().toISOString();
        localStorage.setItem('daftarIklan', JSON.stringify(semuaIklan));
        
        // Simpan catatan penggunaan
        catatan[sesi.id] = { tanggal: hariIni, jumlah: jumlahHariIni + 1 };
        localStorage.setItem('catatanSundul', JSON.stringify(catatan));
        
        alert(`✅ Berhasil disundul!\nSisa kuota hari ini: ${batas - jumlahHariIni - 1} kali lagi.`);
        location.reload();
    }
}

// Fungsi hapus iklan
function hapusIklan(id) {
    if (confirm('⚠️ Yakin ingin menghapus iklan ini? Tindakan ini tidak dapat dibatalkan!')) {
        const sisaIklan = semuaIklan.filter(i => i.id !== id);
        localStorage.setItem('daftarIklan', JSON.stringify(sisaIklan));
        location.reload();
    }
                                       }
