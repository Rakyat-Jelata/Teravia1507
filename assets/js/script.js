// ==============================================
// PERBAIKAN AKHIR - DATA BISA DIAKSES & MUAT LANCAR
// ==============================================

// 🔴 VARIABEL DIBUAT DI LUAR, BISA DIAKSES DARI MANA SAJA
let dataProvinsi = [];
let dataKabupaten = [];
let dataKecamatan = [];
let dataDesa = [];

document.addEventListener('DOMContentLoaded', function(){
    console.log("✅ Script Teravia Berjalan!");

    // Menu Hamburger
    const tombolMenu = document.getElementById('tombolMenu');
    const menuMobile = document.getElementById('menuMobile');
    if(tombolMenu && menuMobile){
        tombolMenu.addEventListener('click', () => menuMobile.classList.toggle('buka'));
    }

    // Mulai muat data wilayah
    muatSemuaDataWilayah();

    // Fitur lain
    pasangFiturAI();
    pasangFiturMetaAds();
});

// ==============================================
// MUAT SEMUA DATA SEKALIGUS
// ==============================================
async function muatSemuaDataWilayah(){
    try {
        console.log("🔄 Sedang memuat data wilayah...");
        
        // Jalur relatif: berfungsi di semua halaman tanpa ribet
        const [p, k, c, d] = await Promise.all([
            fetch("../assets/data/provinces.json").then(r => r.json()),
            fetch("../assets/data/regencies.json").then(r => r.json()),
            fetch("../assets/data/districts.json").then(r => r.json()),
            fetch("../assets/data/villages.json").then(r => r.json())
        ]);

        // Simpan ke variabel global
        dataProvinsi = p;
        dataKabupaten = k;
        dataKecamatan = c;
        dataDesa = d;

        console.log("✅ Data berhasil dimuat!");
        console.log("Jumlah Provinsi:", dataProvinsi.length);
        console.log("Jumlah Kabupaten:", dataKabupaten.length);

        // Tampilkan daftar provinsi
        tampilkanProvinsi();

    } catch (err) {
        console.error("❌ Gagal ambil data:", err);
        alert("Gagal memuat data wilayah: " + err.message);
    }
}

// ==============================================
// TAMPILKAN PROVINSI
// ==============================================
function tampilkanProvinsi(){
    const el = document.getElementById("pilihProvinsi");
    if(!el || dataProvinsi.length === 0) return;

    el.innerHTML = '<option value="">-- Pilih Provinsi --</option>';
    dataProvinsi.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = item.name;
        el.appendChild(opt);
    });

    // Pasang event saat provinsi dipilih
    el.addEventListener("change", tampilkanKabupaten);
}

// ==============================================
// TAMPILKAN KABUPATEN
// ==============================================
function tampilkanKabupaten(){
    const idPilih = this.value;
    const elKab = document.getElementById("pilihKabupaten");
    const elKec = document.getElementById("pilihKecamatan");
    const elDesa = document.getElementById("pilihDesa");

    elKab.innerHTML = '<option value="">-- Pilih Kabupaten/Kota --</option>';
    elKec.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
    elDesa.innerHTML = '<option value="">-- Pilih Desa/Kelurahan --</option>';

    if(!idPilih) return;
    const idAngka = Number(idPilih);

    // ✅ SUDAH SESUAIKAN DENGAN NAMA KOLOM DI DATAMU: provincies_id
    const hasil = dataKabupaten.filter(k => Number(k.provincies_id) === idAngka);
    console.log("📌 Kabupaten ditemukan:", hasil.length);

    hasil.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = item.name;
        elKab.appendChild(opt);
    });

    elKab.addEventListener("change", tampilkanKecamatan);
}



// ==============================================
// TAMPILKAN KECAMATAN & DESA
// ==============================================
// Tampilkan Kecamatan
function tampilkanKecamatan(){
    const idPilih = this.value;
    const elKec = document.getElementById("pilihKecamatan");
    const elDesa = document.getElementById("pilihDesa");

    elKec.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
    elDesa.innerHTML = '<option value="">-- Pilih Desa/Kelurahan --</option>';

    if(!idPilih) return;
    const idAngka = Number(idPilih);
    dataKecamatan.filter(c => Number(c.regency_id) === idAngka).forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = item.name;
        elKec.appendChild(opt);
    });
    elKec.addEventListener("change", tampilkanDesa);
}

// Tampilkan Desa
function tampilkanDesa(){
    const idPilih = this.value;
    const elDesa = document.getElementById("pilihDesa");
    elDesa.innerHTML = '<option value="">-- Pilih Desa/Kelurahan --</option>';
    if(!idPilih) return;
    const idAngka = Number(idPilih);
    dataDesa.filter(d => Number(d.district_id) === idAngka).forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = item.name;
        elDesa.appendChild(opt);
    });
}


function tampilkanDesa(){
    const idPilih = this.value;
    const elDesa = document.getElementById("pilihDesa");
    elDesa.innerHTML = '<option value="">-- Pilih Desa/Kelurahan --</option>';
    if(!idPilih) return;

    dataDesa.filter(d => d.district_id == idPilih).forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = item.name;
        elDesa.appendChild(opt);
    });
}

// ==============================================
// FITUR AI & META ADS (TETAP SAMA)
// ==============================================
function pasangFiturAI(){
    const btn = document.getElementById("tombolAI");
    const judul = document.getElementById("judulIklan");
    const desk = document.getElementById("deskripsiIklan");
    if(!btn || !judul || !desk) return;

    btn.addEventListener("click", function(){
        const lokasi = document.getElementById("pilihKabupaten")?.selectedOptions[0]?.text || "lokasi bagus";
        if(!judul.value.trim()) judul.value = `Properti di ${lokasi} - Harga Terbaik`;
        if(!desk.value.trim()) desk.value = `Properti strategis di ${lokasi}, aman dan nyaman. Cocok hunian/investasi!`;
        alert("✅ Judul & deskripsi sudah diisi!");
    });
}

function pasangFiturMetaAds(){
    const radioYa = document.querySelector('input[name="metaAds"][value="ya"]');
    const radioTidak = document.querySelector('input[name="metaAds"][value="tidak"]');
    if(!radioYa || !radioTidak) return;

    const kotak = document.createElement("div");
    kotak.style.cssText = "background:#eff6ff; padding:12px; border-radius:8px; border:1px solid #165DFF; margin:10px 0; display:none;";
    kotak.innerHTML = `<p style="font-weight:bold;margin:0;">📢 Paket Meta Ads</p><p style="margin:4px 0;">💸 Rp 75.000 | ⏳ 7 Hari | Jangkauan 50.000 orang</p>`;
    radioTidak.closest(".form-group").after(kotak);

    function tampilInfo(){ kotak.style.display = radioYa.checked ? "block" : "none"; }
    radioYa.addEventListener("change", tampilInfo);
    radioTidak.addEventListener("change", tampilInfo);
}

