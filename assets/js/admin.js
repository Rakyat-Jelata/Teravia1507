// === 1. CEK KEAMANAN: HARUS SUDAH LOGIN ===
if(localStorage.getItem('adminLogin') !== 'YA_SUDAH_MASUK'){
    window.location.replace('/admin-login.html');
}

// Tampilkan info admin
document.getElementById('infoAdmin').textContent = 'Masuk sebagai: Admin Utama Teravia (Owner)';

// === 2. FUNGSI MEMUAT DATA ===
function muatData() {
    const permintaan = JSON.parse(localStorage.getItem('permintaan_paket') || '[]').filter(p => p.status === 'menunggu');
    document.getElementById('jumlahPaket').textContent = permintaan.length;

    const wadah = document.getElementById('daftarMembership');
    if(permintaan.length === 0) {
        wadah.innerHTML = `<div class="kosong">✅ Tidak ada permintaan keanggotaan yang menunggu</div>`;
        return;
    }

    wadah.innerHTML = '';
    permintaan.forEach(p => {
        wadah.innerHTML += `
        <div class="kartu-antrean">
            <div class="info-baris">
                <div class="judul-item">${p.nama_user}</div>
                <span class="badge ${p.paket}">Paket ${p.paket}</span>
            </div>
            <div class="detail">
                Tanggal: ${new Date(p.tanggal).toLocaleDateString('id-ID')} | 
                Total: Rp ${p.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </div>
            <div class="aksi">
                <button class="btn-aksi btn-setuju" onclick="setujuiPaket(${p.id})">✅ Setujui & Aktifkan</button>
                <button class="btn-aksi btn-tolak" onclick="tolakPaket(${p.id})">❌ Tolak</button>
            </div>
        </div>`;
    });
}

// === 3. FUNGSI TINDAKAN ADMIN ===
function setujuiPaket(idPermintaan) {
    const semuaPermintaan = JSON.parse(localStorage.getItem('permintaan_paket') || '[]');
    const target = semuaPermintaan.find(p => p.id === idPermintaan);
    if(!target) return;

    target.status = 'disetujui';
    localStorage.setItem('permintaan_paket', JSON.stringify(semuaPermintaan));

    const semuaUser = JSON.parse(localStorage.getItem('teravia_users') || '[]');
    const user = semuaUser.find(u => u.id === target.user_id);
    if(user) {
        user.tier = target.paket;
        user.tanggal_berlaku = new Date(Date.now() + 30*24*60*60*1000).toISOString();
        localStorage.setItem('teravia_users', JSON.stringify(semuaUser));
    }

    alert(`✅ Berhasil! Paket ${target.paket} sudah diaktifkan untuk ${target.nama_user}`);
    muatData();
}

function tolakPaket(idPermintaan) {
    const semuaPermintaan = JSON.parse(localStorage.getItem('permintaan_paket') || '[]');
    const target = semuaPermintaan.find(p => p.id === idPermintaan);
    if(!target) return;

    target.status = 'ditolak';
    localStorage.setItem('permintaan_paket', JSON.stringify(semuaPermintaan));
    alert(`Permintaan ${target.nama_user} ditolak`);
    muatData();
}

// === 4. FUNGSI PERPINDAHAN TAB ===
document.querySelectorAll('.tombol-tab').forEach(tombol => {
    tombol.addEventListener('click', function() {
        document.querySelectorAll('.tombol-tab').forEach(t => t.classList.remove('aktif'));
        this.classList.add('aktif');

        document.querySelectorAll('.konten-tab').forEach(k => k.classList.add('sembunyi'));
        const namaTab = this.dataset.tab.charAt(0).toUpperCase() + this.dataset.tab.slice(1);
        document.getElementById(`tab${namaTab}`).classList.remove('sembunyi');

        if(this.dataset.tab === 'helpdesk') muatPesanBantuan();
    });
});

// === 5. FUNGSI HELP DESK ===
function muatPesanBantuan(){
    const daftar = document.getElementById('daftarPesan');
    const semuaPesan = JSON.parse(localStorage.getItem('pesanBantuan') || '[]').reverse();

    if(semuaPesan.length === 0){
        daftar.innerHTML = `<div class="kosong">✅ Belum ada pesan masuk</div>`;
        return;
    }

    daftar.innerHTML = '';
    semuaPesan.forEach(p => {
        const warna = p.status === 'baru' ? '#fef3c7' : '#f0fdf4';
        const teks = p.status === 'baru' ? 'Baru' : 'Sudah Dibaca';
        daftar.innerHTML += `
        <div class="kartu-antrean" style="background:${warna};">
            <div class="info-baris">
                <div class="judul-item">${p.subjek}</div>
                <span class="badge">${teks}</span>
            </div>
            <p style="font-size:13px;color:#666;">Dari: ${p.pengirim} | ${p.tanggal}</p>
            <p style="font-size:14px;margin:8px 0;">${p.pesan}</p>
            <div class="aksi">
                ${p.status === 'baru' ? `<button class="btn-aksi btn-setuju" onclick="tandaiSelesai(${p.id})">Tandai Selesai</button>` : ''}
                <button class="btn-aksi btn-detail" onclick="balasPesan('${p.pengirim}')">Balas via WA</button>
            </div>
        </div>`;
    });
}

function tandaiSelesai(id){
    const semua = JSON.parse(localStorage.getItem('pesanBantuan') || '[]');
    const target = semua.find(p => p.id === id);
    target.status = 'selesai';
    localStorage.setItem('pesanBantuan', JSON.stringify(semua));
    muatPesanBantuan();
}

function balasPesan(nama){
    const teks = `Halo ${nama}, terima kasih sudah menghubungi Teravia. Ada yang bisa kami bantu?`;
    window.open(`https://wa.me/?text=${encodeURIComponent(teks)}`, '_blank');
}

// === 6. FUNGSI KELUAR ===
document.getElementById('btnKeluar').addEventListener('click', function() {
    localStorage.removeItem('adminLogin');
    window.location.replace('/admin-login.html');
});

// JALANKAN SAAT HALAMAN DIBUKA
muatData();

