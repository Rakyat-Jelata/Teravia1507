// ==============================================
// SCRIPT LENGKAP TERAVIA
// Menu Hamburger + Pilihan Lokasi Berantai
// ==============================================

document.addEventListener('DOMContentLoaded', function(){
    // === FUNGSI MENU HAMBURGER ===
    const tombolMenu = document.getElementById('tombolMenu');
    const menuMobile = document.getElementById('menuMobile');
    if(tombolMenu && menuMobile){
        tombolMenu.addEventListener('click', () => menuMobile.classList.toggle('buka'));
    }

    // === JALANKAN SISTEM LOKASI ===
    muatDataLokasi();
});

// ==============================================
// AMBIL DATA DARI FILE JSON
// ==============================================
async function ambilData(namaFile) {
  try {
    const res = await fetch(`Teravia1507/assets/data/${namaFile}.json`);
    if (!res.ok) throw new Error(`Gagal baca ${namaFile}`);
    return await res.json();
  } catch (err) {
    console.error("❌ Kesalahan ambil data:", err);
    return [];
  }
}

// ==============================================
// SISTEM PILIHAN BERANTAI
// ==============================================
async function muatDataLokasi() {
  // Ambil elemen di halaman
  const provinsiEl = document.getElementById("pilihProvinsi");
  const kabupatenEl = document.getElementById("pilihKabupaten");
  const kecamatanEl = document.getElementById("pilihKecamatan");
  const desaEl = document.getElementById("pilihDesa");

  // Jika tidak ada form lokasi di halaman, berhenti saja
  if (!provinsiEl) return;

  // Muat semua data sekaligus
  const [dataProvinsi, dataKabupaten, dataKecamatan, dataDesa] = await Promise.all([
    ambilData("provinces"),
    ambilData("regencies"),
    ambilData("districts"),
    ambilData("villages")
  ]);

  // 1. TAMPILKAN SEMUA PROVINSI
  dataProvinsi.forEach(item => {
    const opsi = document.createElement("option");
    opsi.value = item.id;
    opsi.textContent = item.name;
    provinsiEl.appendChild(opsi);
  });

  // 2. PROVINSI DIPILIH → TAMPILKAN KABUPATEN
  provinsiEl.addEventListener("change", function(){
    const idProv = parseInt(this.value);
    // Reset pilihan di bawahnya
    kabupatenEl.innerHTML = '<option value="">Pilih Kabupaten/Kota...</option>';
    kecamatanEl.innerHTML = '<option value="">Pilih Kecamatan...</option>';
    desaEl.innerHTML = '<option value="">Pilih Desa/Kelurahan...</option>';

    if (!idProv) return;
    const hasil = dataKabupaten.filter(kab => kab.province_id === idProv);
    hasil.forEach(item => {
      const opsi = document.createElement("option");
      opsi.value = item.id;
      opsi.textContent = item.name;
      kabupatenEl.appendChild(opsi);
    });
  });

  // 3. KABUPATEN DIPILIH → TAMPILKAN KECAMATAN
  kabupatenEl.addEventListener("change", function(){
    const idKab = parseInt(this.value);
    kecamatanEl.innerHTML = '<option value="">Pilih Kecamatan...</option>';
    desaEl.innerHTML = '<option value="">Pilih Desa/Kelurahan...</option>';

    if (!idKab) return;
    const hasil = dataKecamatan.filter(kec => kec.regency_id === idKab);
    hasil.forEach(item => {
      const opsi = document.createElement("option");
      opsi.value = item.id;
      opsi.textContent = item.name;
      kecamatanEl.appendChild(opsi);
    });
  });

  // 4. KECAMATAN DIPILIH → TAMPILKAN DESA
  kecamatanEl.addEventListener("change", function(){
    const idKec = parseInt(this.value);
    desaEl.innerHTML = '<option value="">Pilih Desa/Kelurahan...</option>';

    if (!idKec) return;
    const hasil = dataDesa.filter(desa => desa.district_id === idKec);
    hasil.forEach(item => {
      const opsi = document.createElement("option");
      opsi.value = item.id;
      opsi.textContent = item.name;
      desaEl.appendChild(opsi);
    });
  });
}

// === FUNGSI GENERATE JUDUL & DESKRIPSI AI ===
document.addEventListener('DOMContentLoaded', function(){
    const tombolAI = document.getElementById('tombolAI');
    if(tombolAI){
        tombolAI.addEventListener('click', function(){
            const jenis = document.getElementById('jenisProperti')?.selectedOptions[0]?.text || 'Properti';
            const status = document.getElementById('statusListing')?.selectedOptions[0]?.text || '';
            const harga = document.getElementById('hargaJual')?.value || document.getElementById('hargaSewa')?.value || '';
            const lokasi = document.getElementById('pilihKabupaten')?.selectedOptions[0]?.text || '';

            // Buat Judul Otomatis
            const judul = `${jenis} ${status} Lokasi Strategis di ${lokasi} - Harga Terjangkau`;
            document.getElementById('judulIklan').value = judul;

            // Buat Deskripsi Otomatis
            const deskripsi = `Dijual/Disewakan dengan harga sangat menarik sebesar Rp ${harga}. Lokasi sangat strategis, mudah diakses, lingkungan aman dan nyaman. Cocok untuk hunian keluarga maupun investasi. Segera hubungi untuk info lebih lanjut dan jadwalkan kunjungan!`;
            document.getElementById('deskripsiIklan').value = deskripsi;

            alert('✅ Judul & Deskripsi berhasil dibuat! Silakan diedit sesuai keinginan.');
        });
    }
});
