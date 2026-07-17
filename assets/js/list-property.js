document.addEventListener('DOMContentLoaded', function() {
    // 1. BACA PARAMETER DARI BERANDA
    const urlParams = new URLSearchParams(window.location.search);
    const tujuan = urlParams.get('tujuan') || 'beli';
    const lokasi = urlParams.get('lokasi') || 'Seluruh Indonesia';

    // 2. TAMPILKAN INFORMASI JUDUL & LOKASI
    const judul = document.getElementById('judulHasil');
    const lokasiEl = document.getElementById('lokasiHasil');
    const btnBeli = document.getElementById('btnFilterBeli');
    const btnSewa = document.getElementById('btnFilterSewa');

    if(judul) judul.textContent = tujuan === 'beli' ? 'Properti Dijual' : 'Properti Disewa';
    if(lokasiEl) lokasiEl.textContent = `Lokasi: ${lokasi}`;

    // 3. TANDAI TOMBOL FILTER AKTIF
    if(btnBeli && btnSewa) {
        btnBeli.classList.toggle('aktif', tujuan === 'beli');
        btnSewa.classList.toggle('aktif', tujuan === 'sewa');
    }

    // ==============================================
    // ✅ TAMBAHKAN BAGIAN INI: BUAT KARTU OTOMATIS + TAUTAN KE DETAIL
    // ==============================================
    const wadah = document.getElementById("wadahPropertiDaftar");
    if(wadah){
        // Pakai data yang sama persis dengan beranda
        const daftarProperti = [
            { id: "rumah-cibinong-01", judul: "Rumah Modern Siap Huni di Cibinong", harga: "Rp 950 Juta", lokasi: "Bogor, Jawa Barat", kt: "3", km: "2", luas: "108 m²", label: "⭐ Unggulan", kelas: "label-unggulan" },
            { id: "rumah-bsd-02", judul: "Rumah Cluster Elite di BSD City", harga: "Rp 2,8 Miliar", lokasi: "Tangerang Selatan, Banten", kt: "4", km: "3", luas: "150 m²", label: "Baru", kelas: "label-baru" },
            { id: "apartemen-tebet-03", judul: "Apartemen Dekat Stasiun Tebet", harga: "Rp 3,5 Juta / bulan", lokasi: "Jakarta Selatan", kt: "2", km: "1", luas: "45 m²", label: "Sewa", kelas: "label-sewa" }
        ];

        // Fungsi buat kartu SAMA PERSIS
        function buatKartu(data) {
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

        wadah.innerHTML = daftarProperti.map(buatKartu).join("");
   
    }
});
