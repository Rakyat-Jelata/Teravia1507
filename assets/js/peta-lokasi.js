// Inisialisasi Peta - Pusat di Wilayah Jakarta
const peta = L.map('peta').setView([-6.215, 106.895], 11);

// Gunakan peta dasar OpenStreetMap (gratis & stabil)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> kontributor'
}).addTo(peta);

// Contoh Data Lokasi Properti (nanti bisa diganti data asli dari basis data)
const daftarProperti = [
    {
        nama: "Rumah Modern Cibubur",
        posisi: [-6.30, 106.90],
        harga: "Rp 950 Juta",
        tautan: "detail-properti.html?id=1"
    },
    {
        nama: "Tanah Kavling Pasar Rebo",
        posisi: [-6.28, 106.87],
        harga: "Rp 450 Juta",
        tautan: "detail-properti.html?id=2"
    },
    {
        nama: "Apartemen Strategis Pulogebang",
        posisi: [-6.20, 106.92],
        harga: "Rp 1,2 Miliar",
        tautan: "detail-properti.html?id=3"
    },
    {
        nama: "Ruko Komersial Cawang",
        posisi: [-6.24, 106.86],
        harga: "Rp 2,1 Miliar",
        tautan: "detail-properti.html?id=4"
    }
];

// Tambahkan Tanda Lokasi & Popup
daftarProperti.forEach(item => {
    L.marker(item.posisi)
     .addTo(peta)
     .bindPopup(`
         <b>${item.nama}</b><br>
         <span style="color:#165DFF;font-weight:600;">${item.harga}</span><br>
         <a href="${item.tautan}">Lihat Detail Lengkap →</a>
     `);
});
