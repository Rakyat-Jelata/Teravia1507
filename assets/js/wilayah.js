// === KONFIGURASI API EMSIFA ===
const BASE_API = "https://www.emsifa.com/api-wilayah-indonesia/api"; 
const wadah = document.getElementById('daftarLokasi');
const judul = document.getElementById('judulHalaman');
const jalur = document.getElementById('jalurLokasi');

// Baca parameter dari URL
const urlParams = new URLSearchParams(window.location.search);
const provinsiId = urlParams.get('provinsi_id');
const kabupatenId = urlParams.get('kabupaten_id');
const kecamatanId = urlParams.get('kecamatan_id');
const namaProv = urlParams.get('provinsi') || '';
const namaKab = urlParams.get('kabupaten') || '';
const namaKec = urlParams.get('kecamatan') || '';

// === FUNGSI AMBIL DATA DARI API ===
async function ambilData(endpoint, id = '') {
    try {
        const urlPanggil = id ? `${BASE_API}/${endpoint}/${id}.json` : `${BASE_API}/${endpoint}.json`;
        const res = await fetch(urlPanggil);
        if (!res.ok) throw new Error(`Kesalahan koneksi: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("❌ Gagal ambil data:", err);
        wadah.innerHTML = `
            <div class="pesan-error">
                <p>⚠️ Tidak dapat memuat data lokasi</p>
                <p style="font-size:13px;margin-top:8px;">${err.message}</p>
                <button onclick="tampilkanLokasi()">Coba Lagi</button>
            </div>`;
        return [];
    }
}

// === TAMPILKAN DAFTAR WILAYAH ===
async function tampilkanLokasi() {
    wadah.innerHTML = `<div class="loading">⏳ Memuat daftar lokasi...</div>`;

    if (!provinsiId) {
        judul.textContent = "Pilih Provinsi";
        jalur.innerHTML = "";
        const daftarProvinsi = await ambilData('provinces');
        wadah.innerHTML = "";
        daftarProvinsi.forEach(item => {
            wadah.innerHTML += `
            <div class="item-lokasi" onclick="pilihProvinsi('${item.id}', '${item.name}')">
                ${item.name}
            </div>`;
        });
    } 
    else if (provinsiId && !kabupatenId) {
        judul.textContent = `Pilih Kabupaten/Kota di ${namaProv}`;
        jalur.innerHTML = `<a href="wilayah.html">Provinsi</a> <span>›</span> ${namaProv}`;
        const daftarKabupaten = await ambilData('regencies', provinsiId);
        wadah.innerHTML = "";
        if (daftarKabupaten.length === 0) {
            wadah.innerHTML = `<div class="loading">Tidak ada data kabupaten/kota untuk provinsi ini</div>`;
            return;
        }
        daftarKabupaten.forEach(item => {
            wadah.innerHTML += `
            <div class="item-lokasi" onclick="pilihKabupaten('${item.id}', '${item.name}')">
                ${item.name}
            </div>`;
        });
    }
    else if (provinsiId && kabupatenId && !kecamatanId) {
        judul.textContent = `Pilih Kecamatan di ${namaKab}`;
        jalur.innerHTML = `<a href="wilayah.html">Provinsi</a> <span>›</span> 
                          <a href="wilayah.html?provinsi_id=${provinsiId}&provinsi=${encodeURIComponent(namaProv)}">${namaProv}</a> <span>›</span> ${namaKab}`;
        const daftarKecamatan = await ambilData('districts', kabupatenId);
        wadah.innerHTML = "";
        daftarKecamatan.forEach(item => {
            wadah.innerHTML += `
            <div class="item-lokasi" onclick="pilihKecamatan('${item.id}', '${item.name}')">
                ${item.name}
            </div>`;
        });
    }
    else if (provinsiId && kabupatenId && kecamatanId) {
        judul.textContent = `Pilih Kelurahan/Desa di ${namaKec}`;
        jalur.innerHTML = `<a href="wilayah.html">Provinsi</a> <span>›</span> 
                          <a href="wilayah.html?provinsi_id=${provinsiId}&provinsi=${encodeURIComponent(namaProv)}">${namaProv}</a> <span>›</span> 
                          <a href="wilayah.html?provinsi_id=${provinsiId}&kabupaten_id=${kabupatenId}&provinsi=${encodeURIComponent(namaProv)}&kabupaten=${encodeURIComponent(namaKab)}">${namaKab}</a> <span>›</span> ${namaKec}`;
        const daftarDesa = await ambilData('villages', kecamatanId);
        wadah.innerHTML = "";
        daftarDesa.forEach(item => {
            wadah.innerHTML += `
            <div class="item-lokasi" onclick="bukaDaftarProperti('${item.name}')">
                ${item.name}
            </div>`;
        });
    }
}

// === FUNGSI NAVIGASI ===
function pilihProvinsi(id, nama) {
    location.href = `wilayah.html?provinsi_id=${id}&provinsi=${encodeURIComponent(nama)}`;
}
function pilihKabupaten(id, nama) {
    location.href = `wilayah.html?provinsi_id=${provinsiId}&provinsi=${encodeURIComponent(namaProv)}&kabupaten_id=${id}&kabupaten=${encodeURIComponent(nama)}`;
}
function pilihKecamatan(id, nama) {
    location.href = `wilayah.html?provinsi_id=${provinsiId}&kabupaten_id=${kabupatenId}&provinsi=${encodeURIComponent(namaProv)}&kabupaten=${encodeURIComponent(namaKab)}&kecamatan_id=${id}&kecamatan=${encodeURIComponent(nama)}`;
}
function bukaDaftarProperti(namaDesa) {
    location.href = `daftar-properti.html?provinsi=${encodeURIComponent(namaProv)}&kabupaten=${encodeURIComponent(namaKab)}&kecamatan=${encodeURIComponent(namaKec)}&desa=${encodeURIComponent(namaDesa)}`;
}

// JALANKAN SAAT HALAMAN DIBUKA
tampilkanLokasi();
          
