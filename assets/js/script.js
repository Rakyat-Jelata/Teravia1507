// ==============================================
// SCRIPT FINAL TERAVIA - REPOSITORI: Teravia1507
// ==============================================

document.addEventListener('DOMContentLoaded', function(){
    // Menu Hamburger
    const tombolMenu = document.getElementById('tombolMenu');
    const menuMobile = document.getElementById('menuMobile');
    if(tombolMenu && menuMobile){
        tombolMenu.addEventListener('click', () => menuMobile.classList.toggle('buka'));
    }

    // Jalankan semua fitur
    muatDataLokasi();
    fiturTambahan();
});

// ==============================================
// AMBIL DATA WILAYAH (ALAMAT SUDAH BENAR!)
// ==============================================
async function ambilData(namaFile) {
  try {
    // ✅ ALAMAT SUDAH DIKUNCI SESUAI REPOSITORI KAMU: Teravia1507
    const res = await fetch(`/Teravia1507/assets/data/${namaFile}.json`);
    if (!res.ok) throw new Error(`File ${namaFile}.json tidak ditemukan`);
    return await res.json();
  } catch (err) {
    console.error("❌ Kesalahan ambil data:", err);
    alert("Gagal memuat wilayah: " + err.message);
    return [];
  }
}

// ==============================================
// PILIHAN WILAYAH BERANTAI
// ==============================================
async function muatDataLokasi() {
  const provinsiEl = document.getElementById("pilihProvinsi");
  const kabupatenEl = document.getElementById("pilihKabupaten");
  const kecamatanEl = document.getElementById("pilihKecamatan");
  const desaEl = document.getElementById("pilihDesa");

  if (!provinsiEl) return;

  // Muat semua data sekaligus
  const [provinsi, kabupaten, kecamatan, desa] = await Promise.all([
    ambilData("provinces"),
    ambilData("regencies"),
    ambilData("districts"),
    ambilData("villages")
  ]);

  // Tampilkan Provinsi
  provinsiEl.innerHTML = '<option value="">-- Pilih Provinsi --</option>';
  provinsi.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = item.name;
    provinsiEl.appendChild(opt);
  });

  // Provinsi → Kabupaten
  provinsiEl.addEventListener("change", function(){
    const id = parseInt(this.value);
    kabupatenEl.innerHTML = '<option value="">-- Pilih Kabupaten/Kota --</option>';
    kecamatanEl.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
    desaEl.innerHTML = '<option value="">-- Pilih Desa/Kelurahan --</option>';
    if (!id) return;
    kabupaten.filter(k => k.province_id === id).forEach(item => {
      const opt = document.createElement("option");
      opt.value = item.id;
      opt.textContent = item.name;
      kabupatenEl.appendChild(opt);
    });
  });

  // Kabupaten → Kecamatan
  kabupatenEl.addEventListener("change", function(){
    const id = parseInt(this.value);
    kecamatanEl.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
    desaEl.innerHTML = '<option value="">-- Pilih Desa/Kelurahan --</option>';
    if (!id) return;
    kecamatan.filter(k => k.regency_id === id).forEach(item => {
      const opt = document.createElement("option");
      opt.value = item.id;
      opt.textContent = item.name;
      kecamatanEl.appendChild(opt);
    });
  });

  // Kecamatan → Desa
  kecamatanEl.addEventListener("change", function(){
    const id = parseInt(this.value);
    desaEl.innerHTML = '<option value="">-- Pilih Desa/Kelurahan --</option>';
    if (!id) return;
    desa.filter(d => d.district_id === id).forEach(item => {
      const opt = document.createElement("option");
      opt.value = d.id;
      opt.textContent = d.name;
      desaEl.appendChild(opt);
    });
  });
}

// ==============================================
// AI GENERATOR & META ADS
// ==============================================
function fiturTambahan(){
    // 1. Tombol Buat Judul & Deskripsi
    const tombolAI = document.getElementById("tombolAI");
    const judul = document.getElementById("judulIklan");
    const deskripsi = document.getElementById("deskripsiIklan");
    if(tombolAI && judul && deskripsi){
        tombolAI.addEventListener("click", function(){
            const jenis = document.getElementById("jenisProperti")?.selectedOptions[0]?.text || "Properti";
            const status = document.getElementById("statusListing")?.selectedOptions[0]?.text || "";
            const harga = document.getElementById("hargaJual")?.value || document.getElementById("hargaSewa")?.value || "Sesuai kesepakatan";
            const lokasi = document.getElementById("pilihKabupaten")?.selectedOptions[0]?.text || "lokasi strategis";

            judul.value = `${jenis} ${status} di ${lokasi} - Harga Terbaik`;
            deskripsi.value = `Properti istimewa di ${lokasi}, akses mudah, lingkungan aman dan nyaman. Harga penawaran Rp ${harga}. Sangat cocok untuk hunian keluarga maupun investasi jangka panjang!`;
            alert("✅ Judul & Deskripsi berhasil dibuat! Silakan diedit.");
        });
    }

    // 2. Tampilkan Info Meta Ads
    const opsiAds = document.querySelectorAll('input[name="metaAds"]');
    const kotakTujuan = document.querySelector('input[name="metaAds"]')?.closest(".form-group");
    if(opsiAds.length && kotakTujuan){
        const info = document.createElement("div");
        info.className = "sembunyi form-group";
        info.innerHTML = `
            <div style="background:#eff6ff; padding:15px; border-radius:8px; border:1px solid #165DFF; margin-top:10px;">
                <p style="font-weight:bold; margin:0 0 5px 0;">📢 Paket Promosi Meta Ads</p>
                <p style="margin:2px 0;">💸 Harga: Rp 75.000</p>
                <p style="margin:2px 0;">⏳ Durasi: 7 Hari Penayangan</p>
                <p style="margin:2px 0; font-size:13px; color:#666;">Jangkauan hingga 50.000 calon pembeli di Facebook & Instagram</p>
            </div>
        `;
        kotakTujuan.after(info);

        opsiAds.forEach(radio => {
            radio.addEventListener("change", () => {
                info.classList.toggle("sembunyi", radio.value !== "ya");
            });
        });
    }
}

