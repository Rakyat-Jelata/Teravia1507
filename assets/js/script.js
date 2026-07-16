// ==============================================
// TERAVIA - SCRIPT LENGKAP
// Menu + Data Wilayah Berantai
// ==============================================

// === 1. FUNGSI MENU HAMBURGER ===
document.addEventListener('DOMContentLoaded', function(){
    const tombolMenu = document.getElementById('tombolMenu');
    const menuMobile = document.getElementById('menuMobile');
    if(tombolMenu && menuMobile){
        tombolMenu.addEventListener('click', function(){
            menuMobile.classList.toggle('buka');
        });
    }

    // === 2. JALANKAN MENU WILAYAH ===
    inisialisasiWilayah();
});

// ==============================================
// FUNGSI AMBIL DATA DARI FILE JSON
// ==============================================
async function ambilData(file) {
  try {
    const res = await fetch(`assets/data/${file}.json`);
    if (!res.ok) throw new Error("Gagal ambil data " + file);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

// ==============================================
// FUNGSI TAMPILKAN PILIHAN WILAYAH BERANTAI
// ==============================================
async function inisialisasiWilayah() {
  // Ambil elemen pilihan di HTML
  const pilihProvinsi = document.getElementById("pilihProvinsi");
  const pilihKabupaten = document.getElementById("pilihKabupaten");
  const pilihKecamatan = document.getElementById("pilihKecamatan");
  const pilihDesa = document.getElementById("pilihDesa");

  // Jika tidak ada elemen di halaman, berhenti saja
  if (!pilihProvinsi) return;

  // 1. Tampilkan Semua Provinsi
  const dataProvinsi = await ambilData("provinces");
  dataProvinsi.forEach(item => {
    const opsi = document.createElement("option");
    opsi.value = item.id;
    opsi.textContent = item.name;
    pilihProvinsi.appendChild(opsi);
  });

  // 2. Pilih Provinsi → Munculkan Kabupaten
  const dataKabupaten = await ambilData("regencies");
  pilihProvinsi.addEventListener("change", async function(){
    const idProv = parseInt(this.value);
    // Kosongkan pilihan bawahnya dulu
    pilihKabupaten.innerHTML = '<option value="">Pilih Kabupaten/Kota...</option>';
    pilihKecamatan.innerHTML = '<option value="">Pilih Kecamatan...</option>';
    pilihDesa.innerHTML = '<option value="">Pilih Desa/Kelurahan...</option>';

    if (!idProv) return;
    // Filter kabupaten yang sesuai
    const hasil = dataKabupaten.filter(kab => kab.province_id === idProv);
    hasil.forEach(item => {
      const opsi = document.createElement("option");
      opsi.value = item.id;
      opsi.textContent = item.name;
      pilihKabupaten.appendChild(opsi);
    });
  });

  // 3. Pilih Kabupaten → Munculkan Kecamatan
  const dataKecamatan = await ambilData("districts");
  pilihKabupaten.addEventListener("change", async function(){
    const idKab = parseInt(this.value);
    pilihKecamatan.innerHTML = '<option value="">Pilih Kecamatan...</option>';
    pilihDesa.innerHTML = '<option value="">Pilih Desa/Kelurahan...</option>';

    if (!idKab) return;
    const hasil = dataKecamatan.filter(kec => kec.regency_id === idKab);
    hasil.forEach(item => {
      const opsi = document.createElement("option");
      opsi.value = item.id;
      opsi.textContent = item.name;
      pilihKecamatan.appendChild(opsi);
    });
  });

  // 4. Pilih Kecamatan → Munculkan Desa
  const dataDesa = await ambilData("villages");
  pilihKecamatan.addEventListener("change", async function(){
    const idKec = parseInt(this.value);
    pilihDesa.innerHTML = '<option value="">Pilih Desa/Kelurahan...</option>';

    if (!idKec) return;
    const hasil = dataDesa.filter(desa => desa.district_id === idKec);
    hasil.forEach(item => {
      const opsi = document.createElement("option");
      opsi.value = item.id;
      opsi.textContent = item.name;
      pilihDesa.appendChild(opsi);
    });
  });
}
