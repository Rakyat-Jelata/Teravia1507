// ==============================================
// SCRIPT LENGKAP TERAVIA - VERSI PERBAIKAN AKHIR
// ==============================================

document.addEventListener('DOMContentLoaded', function(){
    // === 1. MENU HAMBURGER ===
    const tombolMenu = document.getElementById('tombolMenu');
    const menuMobile = document.getElementById('menuMobile');
    if(tombolMenu && menuMobile){
        tombolMenu.addEventListener('click', () => menuMobile.classList.toggle('buka'));
    }

    // === 2. JALANKAN SISTEM LOKASI BERANTAI ===
    muatDataLokasi();

    // === 3. JALANKAN FUNGSI LAINNYA ===
    inisialisasiFiturTambahan();
});

// ==============================================
// AMBIL DATA WILAYAH (ALAMAT SUDAH DIPERBAIKI!)
// ==============================================
async function ambilData(namaFile) {
  try {
    // ✅ Ganti dengan NAMA REPOSITORI KAMU YANG BENAR:
    // Kalau alamat di browser: rakyat-jelata.github.io/Teravia15/ → pakai /Teravia15/
    // Kalau alamat di browser: rakyat-jelata.github.io/Teravia1507/ → pakai /Teravia1507/
    const repositori = "Teravia15"; // UBAH INI SESUAI KAMU!
    const res = await fetch(`/${repositori}/assets/data/${namaFile}.json`);
    
    if (!res.ok) throw new Error(`File ${namaFile}.json tidak ditemukan`);
    return await res.json();
  } catch (err) {
    console.error("❌ Gagal memuat data wilayah:", err);
    alert("Gagal memuat daftar wilayah. Cek nama repositori di script.js atau coba muat ulang.");
    return [];
  }
}

// ==============================================
// SISTEM PILIHAN WILAYAH BERANTAI
// ==============================================
async function muatDataLokasi() {
  const provinsiEl = document.getElementById("pilihProvinsi");
  const kabupatenEl = document.getElementById("pilihKabupaten");
  const kecamatanEl = document.getElementById("pilihKecamatan");
  const desaEl = document.getElementById("pilihDesa");

  // Hanya berjalan jika ada elemen lokasi di halaman
  if (!provinsiEl || !kabupatenEl || !kecamatanEl || !desaEl) return;

  // Muat semua data sekaligus
  const [dataProvinsi, dataKabupaten, dataKecamatan, dataDesa] = await Promise.all([
    ambilData("provinces"),
    ambilData("regencies"),
    ambilData("districts"),
    ambilData("villages")
  ]);

  // Tambah pilihan awal
  provinsiEl.innerHTML = '<option value="">-- Pilih Provinsi --</option>';

  // Tampilkan semua Provinsi
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
// FUNGSI TAMBAHAN: AI GENERATOR & META ADS
// ==============================================
function inisialisasiFiturTambahan(){
    // --- A. GENERATE JUDUL & DESKRIPSI AI ---
    const tombolAI = document.getElementById('tombolAI');
    const judulEl = document.getElementById('judulIklan');
    const deskripsiEl = document.getElementById('deskripsiIklan');
    
    if(tombolAI && judulEl && deskripsiEl){
        tombolAI.addEventListener('click', function(){
            // Ambil data dari form
            const jenis = document.getElementById('jenisProperti')?.selectedOptions[0]?.text || 'Properti';
            const status = document.getElementById('statusListing')?.selectedOptions[0]?.text || '';
            const harga = document.getElementById('hargaJual')?.value || document.getElementById('hargaSewa')?.value || 'Sesuai kesepakatan';
            const kab = document.getElementById('pilihKabupaten')?.selectedOptions[0]?.text || 'lokasi strategis';
            const luas = document.querySelector('input[placeholder*="Luas Tanah"]')?.value || '';

            // Buat hasil
            judulEl.value = `${jenis} ${status} di ${kab} - Harga Terbaik`;
            deskripsiEl.value = `Dijual/disewakan ${jenis} dengan lokasi sangat strategis di ${kab}. ${luas ? `Luas tanah ${luas} m², ` : ""}mudah diakses kendaraan, dekat fasilitas umum. Sangat cocok untuk hunian maupun investasi. Harga penawaran Rp ${harga}. Segera hubungi untuk jadwal kunjungan!`;

            alert('✅ Judul & Deskripsi berhasil dibuat! Silakan diedit ya.');
        });
    }

    // --- B. INFO PROMOSI META ADS ---
    const opsiMeta = document.querySelectorAll('input[name="metaAds"]');
    const elemenTujuan = document.querySelector('input[name="metaAds"]')?.closest('.form-group');
    
    if(opsiMeta.length && elemenTujuan){
        // Buat kotak info
        const infoAds = document.createElement('div');
        infoAds.id = 'infoMetaAds';
        infoAds.className = 'form-group sembunyi';
        infoAds.innerHTML = `
            <div style="background:#f0f7ff; padding:15px; border-radius:8px; border:1px solid #165DFF; margin-top:10px;">
                <p style="margin:0 0 8px 0; font-weight:600;">📢 Paket Promosi Meta Ads</p>
                <p style="margin:0 0 5px 0;">💸 Harga: Rp 75.000</p>
                <p style="margin:0 0 5px 0;">⏳ Durasi: 7 Hari Penayangan</p>
                <p style="margin:0; font-size:13px; color:#555;">Jangkauan hingga 50.000 calon pembeli di Facebook & Instagram.</p>
            </div>
        `;
        elemenTujuan.after(infoAds);

        // Tampilkan/sembunyikan
        opsiMeta.forEach(radio => {
            radio.addEventListener('change', function(){
                infoAds.classList.toggle('sembunyi', this.value !== 'ya');
            });
        });
    }
}
