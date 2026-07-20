// Cek akses sah
const sesi = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');
if (!sesi) {
    alert('⚠️ Silakan masuk terlebih dahulu untuk melihat notifikasi!');
    window.location.href = 'login.html';
}

// Ambil data notifikasi dari penyimpanan lokal
let notifikasi = JSON.parse(localStorage.getItem('notifikasi') || `[
    {
        "id": 1,
        "ikon": "✅",
        "judul": "Pembayaran Berhasil",
        "pesan": "Upgrade keanggotaan paket Estate Premium telah aktif sepenuhnya.",
        "waktu": "10 menit yang lalu",
        "dibaca": false,
        "tautan": "profil-member.html"
    },
    {
        "id": 2,
        "ikon": "📢",
        "judul": "Iklan Disetujui",
        "pesan": "Iklan Rumah di Jakarta Timur sudah disetujui dan mulai tayang.",
        "waktu": "2 jam yang lalu",
        "dibaca": true,
        "tautan": "pages/iklan-saya.html"
    },
    {
        "id": 3,
        "ikon": "💬",
        "judul": "Pesan Baru Masuk",
        "pesan": "Bapak Budi bertanya tentang harga dan kelengkapan dokumen properti Anda.",
        "waktu": "Kemarin",
        "dibaca": false,
        "tautan": "pesan-masuk.html"
    }
]`);

// Tampilkan daftar notifikasi
function tampilkanNotif() {
    const wadah = document.getElementById('daftarNotif');
    
    if (notifikasi.length === 0) {
        wadah.innerHTML = `
            <div class="kosong">
                <p class="ikon-kosong">🔕</p>
                <h3>Belum ada notifikasi</h3>
                <p>Pemberitahuan penting akan muncul di sini saat ada pembaruan akun, transaksi, atau interaksi baru.</p>
            </div>
        `;
        return;
    }

    wadah.innerHTML = '';
    notifikasi.forEach(item => {
        wadah.innerHTML += `
        <div class="item-notif ${item.dibaca ? '' : 'belum-dibaca'}" onclick="bukaNotif(${item.id})">
            <div class="ikon">${item.ikon}</div>
            <div class="isi-notif">
                <h4>${item.judul}</h4>
                <p>${item.pesan}</p>
                <span>${item.waktu}</span>
            </div>
        </div>`;
    });
}

// Buka notifikasi & tandai sudah dibaca
function bukaNotif(id) {
    const indeks = notifikasi.findIndex(n => n.id === id);
    if (indeks !== -1) {
        notifikasi[indeks].dibaca = true;
        localStorage.setItem('notifikasi', JSON.stringify(notifikasi));
        tampilkanNotif();
        
        // Buka halaman terkait jika ada tautan
        if (notifikasi[indeks].tautan) {
            window.location.href = notifikasi[indeks].tautan;
        }
    }
}

// Tandai semua sebagai sudah dibaca
function tandaiSemuaDibaca() {
    notifikasi.forEach(n => n.dibaca = true);
    localStorage.setItem('notifikasi', JSON.stringify(notifikasi));
    tampilkanNotif();
}

// Jalankan saat halaman dimuat
tampilkanNotif();
