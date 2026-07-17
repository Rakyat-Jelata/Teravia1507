// FUNGSI PILIH BELI / SEWA
const tombolTujuan = document.querySelectorAll('.btn-tujuan');
let jenisTujuan = "beli";

tombolTujuan.forEach(tombol => {
    tombol.addEventListener('click', function() {
        tombolTujuan.forEach(t => t.classList.remove('aktif'));
        this.classList.add('aktif');
        jenisTujuan = this.textContent.trim().toLowerCase();
        console.log("Pilihan diubah ke:", jenisTujuan);
    });
});

// FUNGSI TOMBOL CARI PROPERTI
const tombolCari = document.querySelector('.btn-cari-biru');
const inputLokasi = document.querySelector('.input-lokasi input');

// ==============================================
// BUAT KARTU PROPERTI OTOMATIS + TAUTAN KE DETAIL
// ==============================================

// DATA DUMMY PROPERTI KAMU
const daftarProperti = [
    { 
        id: "rumah-cibinong-01", 
        judul: "Rumah Modern Siap Huni di Cibinong", 
        harga: "Rp 950 Juta", 
        lokasi: "Bogor, Jawa Barat", 
        kt: "3", 
        km: "2", 
        luas: "108 m²", 
        label: "⭐ Unggulan", 
        kelas: "label-unggulan" 
    },
    { 
        id: "rumah-bsd-02", 
        judul: "Rumah Cluster Elite di BSD City", 
        harga: "Rp 2,8 Miliar", 
        lokasi: "Tangerang Selatan, Banten", 
        kt: "4", 
        km: "3", 
        luas: "150 m²", 
        label: "Baru", 
        kelas: "label-baru" 
    },
    { 
        id: "apartemen-tebet-03", 
        judul: "Apartemen Dekat Stasiun Tebet", 
        harga: "Rp 3,5 Juta / bulan", 
        lokasi: "Jakarta Selatan", 
        kt: "2", 
        km: "1", 
        luas: "45 m²", 
        label: "Sewa", 
        kelas: "label-sewa" 
    }
];

// FUNGSI MEMBUAT KARTU + TAUTAN OTOMATIS
function buatKartuProperti(data) {
    return `
    <a href="detail-properti.html?id=${data.id}" class="tautan-kartu">
        <div class="kartu-properti">
            <div class="gambar-properti" style="background:#e2e8f0;">
                <span class="${data.kelas}">${data.label}</span>
            </div>
            <div class="isi-kartu">
                <div class="harga">${data.harga}</div>
                <h4>${data.judul}</h4>
                <p class="lokasi">📍 ${data.lokasi}</p>
                <div class="spesifikasi">
                    <span>🛏️ ${data.kt} KT</span>
                    <span>🛁 ${data.km} KM</span>
                    <span>📏 ${data.luas}</span>
                </div>
            </div>
        </div>
    </a>
    `;
}

// TAMPILKAN KARTU SAAT HALAMAN DIBUKA
document.addEventListener("DOMContentLoaded", function() {
    const wadah = document.getElementById("wadahProperti");
    if (wadah) {
        wadah.innerHTML = daftarProperti.map(buatKartuProperti).join("");
   
    }
});
