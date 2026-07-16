// ==============================================
// SCRIPT LENGKAP TERAVIA - REPOSITORI: Teravia1507
// Fitur: Menu, Wilayah, AI Generator, Meta Ads
// ==============================================

document.addEventListener('DOMContentLoaded', function(){
    // === 1. MENU HAMBURGER ===
    const tombolMenu = document.getElementById('tombolMenu');
    const menuMobile = document.getElementById('menuMobile');
    if(tombolMenu && menuMobile){
        tombolMenu.addEventListener('click', () => menuMobile.classList.toggle('buka'));
    }

    // === 2. JALANKAN FITUR WILAYAH ===
    muatDataLokasi();

    // === 3. JALANKAN FITUR TAMBAHAN ===
    fiturTambahan();
});

// ==============================================
// AMBIL DATA WILAYAH (ALAMAT SUDAH SESUAI GITHUB)
// ==============================================
async function ambilData(namaFile) {
  try {
    const res = await fetch(`/Teravia1507/assets/data/${namaFile}.json`);
    if (!res.ok) throw new Error(`File ${namaFile}.json tidak ditemukan`);
    return await res.json();
  } catch (err) {
    console.error("❌ Kesalahan ambil data wilayah:", err);
    alert("Gagal memuat daftar wilayah. Coba muat ulang halaman.");
    return [];
  }
}

// ==============================================
// DROPDOWN WILAYAH BERANTAI
// ==============================================
async function muatDataLokasi() {
  const provinsiEl = document.getElementById("pilihProvinsi");
  const kabupatenEl = document.getElementById("pilihKabupaten");
  const kecamatanEl = document.getElementById("pilihKecamatan");
  const desaEl = document.getElementById("pilihDesa");

  // Berhenti jika elemen tidak ada di halaman
  if (!provinsiEl || !kabupatenEl || !kecamatanEl || !desaEl) return;

  // Muat semua data sekaligus
  const [dataProvinsi, dataKabupaten, dataKecamatan, dataDesa] = await Promise.all([
    ambilData("provinces"),
    ambilData("regencies"),
    ambilData("districts"),
    ambilData("villages")
  ]);

  // Tampilkan Provinsi
  provinsiEl.innerHTML = '<option value="">-- Pilih Provinsi --</option>';
  dataProvinsi.forEach(item => {
    const opsi = document.createElement("option");
    opsi.value = item.id;
    opsi.textContent = item.name;
    provinsiEl.appendChild(opsi);
  });

  // Provinsi dipilih → Tampilkan Kabupaten
  provinsiEl.addEventListener("change", function(){
    const idProv = parseInt(this.value);
    kabupatenEl.innerHTML = '<option value="">-- Pilih Kabupaten/Kota --</option>';
    kecamatanEl.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
    desaEl.innerHTML = '<option value="">-- Pilih Desa/Kelurahan --</option>';
    if (!idProv) return;
    dataKabupaten.filter(k => k.province_id === idProv).forEach(item => {
      const opsi = document.createElement("option");
      opsi.value = item.id;
      opsi.textContent = item.name;
      kabupatenEl.appendChild(opsi);
    });
  });

  // Kabupaten dipilih → Tampilkan Kecamatan
  kabupatenEl.addEventListener("change", function(){
    const idKab = parseInt(this.value);
    kecamatanEl.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
    desaEl.innerHTML = '<option value="">-- Pilih Desa/Kelurahan --</option>';
    if (!idKab) return;
    dataKecamatan.filter(k => k.regency_id === idKab).forEach(item => {
      const opsi = document.createElement("option");
      opsi.value = item.id;
      opsi.textContent = item.name;
      kecamatanEl.appendChild(opsi);
    });
  });

  // Kecamatan dipilih → Tampilkan Desa
  kecamatanEl.addEventListener("change", function(){
    const idKec = parseInt(this.value);
    desaEl.innerHTML = '<option value="">-- Pilih Desa/Kelurahan --</option>';
    if (!idKec) return;
    dataDesa.filter(d => d.district_id === idKec).forEach(item => {
      const opsi = document.createElement("option");
      opsi.value = item.id;
      opsi.textContent = item.name;
      desaEl.appendChild(opsi);
    });
  });
}

// ==============================================
// FITUR TAMBAHAN: AI GENERATOR & META ADS
// ==============================================
function fiturTambahan(){
    // ------------------------------
    // ✨ GENERATOR AI: Isi hanya kolom yang BELUM diisi
    // ------------------------------
    const tombolAI = document.getElementById("tombolAI");
    if(tombolAI){
        tombolAI.addEventListener("click", function(){
            // Ambil data dasar yang sudah diisi pengguna
            const status = document.getElementById("statusListing")?.selectedOptions[0]?.text || "";
            const jenis = document.getElementById("jenisProperti")?.selectedOptions[0]?.text || "Properti";
            const lokasi = document.getElementById("pilihKabupaten")?.selectedOptions[0]?.text || "Lokasi strategis";
            const harga = document.getElementById("hargaJual")?.value || document.getElementById("hargaSewa")?.value || "";

            // 1. Isi Judul JIKA MASIH KOSONG
            const judulEl = document.getElementById("judulIklan");
            if(judulEl && !judulEl.value.trim()){
                judulEl.value = `${jenis} ${status} di ${lokasi} - Harga Terbaik`;
            }

            // 2. Isi Deskripsi JIKA MASIH KOSONG
            const deskripsiEl = document.getElementById("deskripsiIklan");
            if(deskripsiEl && !deskripsiEl.value.trim()){
                deskripsiEl.value = `Dijual/disewakan ${jenis} yang sangat layak. Terletak di ${lokasi}, akses mudah dijangkau, lingkungan aman dan tenang, dekat fasilitas umum. ${harga ? `Ditawarkan dengan harga sangat kompetitif Rp ${harga}.` : ""} Segera hubungi untuk jadwal kunjungan!`;
            }

            // Pesan pengingat wajib isi
            alert(`✅ Selesai!
Judul & Deskripsi sudah diisi otomatis.

⚠️ PENTING: Silakan lengkapi semua kolom detail yang bertanda * (bintang merah) sebelum mengirim iklan!`);
        });
    }

    // ------------------------------
    // 📢 INFO PROMOSI META ADS
    // ------------------------------
    const opsiAds = document.querySelectorAll('input[name="metaAds"]');
    const kotakTujuan = document.querySelector('input[name="metaAds"]')?.closest(".form-group");
    
    if(opsiAds.length && kotakTujuan){
        // Buat kotak info harga & durasi
        const infoAds = document.createElement("div");
        infoAds.id = "infoMetaAds";
        infoAds.className = "form-group sembunyi";
        infoAds.innerHTML = `
            <div style="background:#f0f7ff; padding:15px; border-radius:8px; border:1px solid #165DFF;">
                <p style="margin:0 0 8px 0; font-weight:600;">Paket Promosi Meta Ads</p>
                <p style="margin:0 0 5px 0;">💸 Harga: Rp 75.000</p>
                <p style="margin:0 0 5px 0;">⏳ Durasi: 7 Hari Penayangan</p>
                <p style="margin:0; font-size:13px; color:#555;">Jangkauan hingga 50.000 calon pembeli di Facebook & Instagram.</p>
            </div>
        `;
        kotakTujuan.after(infoAds);

        // Tampilkan/sembunyikan saat pilih Ya/Tidak
        opsiAds.forEach(radio => {
            radio.addEventListener("change", function(){
                infoAds.classList.toggle("sembunyi", this.value !== "ya");
            });
        });
    }
}
