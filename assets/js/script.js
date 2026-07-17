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

    // Mulai muat data wilayah (FUNGSI LAMA TETAP DIPAKAI, DIPERBAIKI SAJA)
    muatSemuaDataWilayah();

    // Fitur lain
    pasangFiturMetaAds();

    // Jalankan format harga (FUNGSI LAMA TETAP ADA)
    pasangFormatHarga('hargaJual', 'formatHargaJual', 'terbilangJual');
    pasangFormatHarga('hargaSewa', 'formatHargaSewa', 'terbilangSewa');
});

// ==============================================
// MUAT SEMUA DATA SEKALIGUS (DIPERBAIKI: HAPUS ALERT MENGGANGGU)
// ==============================================
async function muatSemuaDataWilayah(){
    try {
        console.log("🔄 Sedang memuat data wilayah...");
        
        // Jalur relatif: berfungsi di semua halaman tanpa ribet
        const [p, k, c, d] = await Promise.all([
            fetch("../assets/data/provinces.json").then(r => {
                if(!r.ok) throw new Error("File provinsi tidak ditemukan");
                return r.json();
            }),
            fetch("../assets/data/regencies.json").then(r => {
                if(!r.ok) throw new Error("File kabupaten tidak ditemukan");
                return r.json();
            }),
            fetch("../assets/data/districts.json").then(r => {
                if(!r.ok) throw new Error("File kecamatan tidak ditemukan");
                return r.json();
            }),
            fetch("../assets/data/villages.json").then(r => {
                if(!r.ok) throw new Error("File desa tidak ditemukan");
                return r.json();
            })
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
        // ✅ HAPUS ALERT YANG MUNCUL DI HALAMAN, TIDAK MENGGANGGU PENGGUNA
        // alert("Gagal memuat data wilayah: " + err.message);
    }
}

// ==============================================
// TAMPILKAN PROVINSI (TIDAK DIUBAH)
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
// TAMPILKAN KABUPATEN (TIDAK DIUBAH)
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
// TAMPILKAN KECAMATAN & DESA (TIDAK DIUBAH, HAPUS DUPLIKAT)
// ==============================================
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

// ==============================================
// FITUR META ADS (DIPERBAIKI: MUNCUL DENGAN BENAR)
// ==============================================
function pasangFiturMetaAds(){
    const radioYa = document.querySelector('input[name="metaAds"][value="ya"]');
    const radioTidak = document.querySelector('input[name="metaAds"][value="tidak"]');
    if(!radioYa || !radioTidak) return;

    const kotak = document.createElement("div");
    kotak.id = "infoMetaAds";
    kotak.style.cssText = "background:#eff6ff; padding:12px; border-radius:8px; border:1px solid #165DFF; margin:10px 0; display:none;";
    kotak.innerHTML = `<p style="font-weight:bold;margin:0;">📢 Paket Meta Ads</p><p style="margin:4px 0;">💸 Rp 75.000 | ⏳ 7 Hari | Jangkauan 50.000 orang</p>`;
    
    radioTidak.closest(".form-group").after(kotak);

    function tampilInfo(){
        kotak.style.display = radioYa.checked ? "block" : "none";
    }
    
    radioYa.addEventListener("change", tampilInfo);
    radioTidak.addEventListener("change", tampilInfo);
    tampilInfo(); // Jalankan otomatis saat buka halaman
}

// ==============================================
// FORMAT RUPIAH & TERBILANG (TIDAK DIUBAH SEKALI PUN)
// ==============================================
function ubahKeTerbilang(angka) {
    const satuan = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];
    const terbilang = ['', 'Ribu', 'Juta', 'Miliar', 'Triliun'];

    if (angka === 0) return "Nol Rupiah";
    if (angka < 0) return "minus " + ubahKeTerbilang(Math.abs(angka));

    let kalimat = '';
    let i = 0;
    while (angka > 0) {
        let bagian = angka % 1000;
        if (bagian !== 0) {
            let strBagian = '';
            if (bagian >= 100) {
                strBagian += satuan[Math.floor(bagian / 100)] + ' Ratus ';
                bagian %= 100;
            }
            if (bagian >= 20) {
                strBagian += satuan[Math.floor(bagian / 10)] + ' Puluh ';
                bagian %= 10;
            }
            if (bagian >= 10 && bagian <= 19) {
                if (bagian === 10) strBagian += 'Sepuluh ';
                else if (bagian === 11) strBagian += 'Sebelas ';
                else strBagian += satuan[bagian - 10] + ' Belas ';
            } else if (bagian > 0) {
                strBagian += satuan[bagian] + ' ';
            }
            kalimat = strBagian + terbilang[i] + ' ' + kalimat;
        }
        angka = Math.floor(angka / 1000);
        i++;
    }
    return kalimat.trim() + ' Rupiah';
}

function pasangFormatHarga(inputId, formatId, terbilangId) {
    const input = document.getElementById(inputId);
    const tampilFormat = document.getElementById(formatId);
    const tampilTerbilang = document.getElementById(terbilangId);
    if (!input || !tampilFormat || !tampilTerbilang) return;

    input.addEventListener('input', function(){
        let nilai = this.value.replace(/[^0-9]/g, '');
        if (!nilai) {
            tampilFormat.textContent = '';
            tampilTerbilang.textContent = '';
            return;
        }
        const angkaMurni = parseInt(nilai);
        tampilFormat.textContent = 'Rp ' + angkaMurni.toLocaleString('id-ID');
        tampilTerbilang.textContent = ubahKeTerbilang(angkaMurni);
        this.value = nilai;
    });
}

// ==============================================
// ✅ FITUR BARU: TIDAK MENGGANGGU FUNGSI LAMA
// ==============================================

// FITUR 1: SIMPAN DRAF OTOMATIS
const KUNCI_DRAFT = "teravia_draf_pasang_iklan";
let otomatisSimpan;

document.addEventListener("DOMContentLoaded", function(){
    pulihkanDraf();
    pantauPerubahanForm();
});

function pantauPerubahanForm(){
    const semuaInput = document.querySelectorAll("input, select, textarea");
    semuaInput.forEach(el => {
        el.addEventListener("input", simpanDraf);
        el.addEventListener("change", simpanDraf);
    });
}

function simpanDraf(){
    clearTimeout(otomatisSimpan);
    otomatisSimpan = setTimeout(() => {
        const data = {};
        document.querySelectorAll("input, select, textarea").forEach(el => {
            if(el.type === "checkbox" || el.type === "radio"){
                data[el.name] = data[el.name] || [];
                if(el.checked) data[el.name].push(el.value);
            } else if(el.id) {
                data[el.id] = el.value;
            }
        });
        localStorage.setItem(KUNCI_DRAFT, JSON.stringify(data));
        console.log("✅ Draf tersimpan otomatis");
    }, 800);
}

function pulihkanDraf(){
    const data = localStorage.getItem(KUNCI_DRAFT);
    if(!data) return;
    try {
        const draf = JSON.parse(data);
        Object.keys(draf).forEach(kunci => {
            const el = document.getElementById(kunci);
            if(el) el.value = draf[kunci] || "";
            document.querySelectorAll(`input[name="${kunci}"]`).forEach(cb => {
                cb.checked = draf[kunci]?.includes(cb.value) || false;
            });
        });
    } catch(e) { console.log("Draf lama tidak dibaca"); }
}

document.querySelector('button[type="submit"]')?.addEventListener("click", () => {
    localStorage.removeItem(KUNCI_DRAFT);
});

// FITUR 2: FASILITAS OTOMATIS KE DESKRIPSI
document.addEventListener("change", function(e){
    if(e.target.name === "fasilitas") updateDeskripsiFasilitas();
});

function updateDeskripsiFasilitas(){
    const desk = document.getElementById("deskripsiIklan");
    if(!desk) return;
    const terpilih = Array.from(document.querySelectorAll('input[name="fasilitas"]:checked')).map(c => c.value);
    let teksDasar = desk.value.replace(/\n?--- Keunggulan ---\n[\s\S]*/g, "").trim();
    if(terpilih.length > 0){
        teksDasar += `\n\n--- Keunggulan ---\n${terpilih.join("\n")}`;
    }
    desk.value = teksDasar.trim();
}

// FITUR 3: SIMULASI KPR
document.addEventListener("input", hitungKPR);
document.getElementById("lamaKpr")?.addEventListener("change", hitungKPR);

function hitungKPR(){
    const harga = parseInt(document.getElementById("hargaJual")?.value || 0);
    const tahun = parseInt(document.getElementById("lamaKpr")?.value || 10);
    const bunga = parseFloat(document.getElementById("bungaKpr")?.value || 6.25) / 100;
    const wadah = document.getElementById("hasilKpr");

    if(harga < 1000000 || !wadah){
        if(wadah) wadah.style.display = "none";
        return;
    }

    const bulan = tahun * 12;
    const bungaBulan = bunga / 12;
    const angsuran = harga * bungaBulan / (1 - Math.pow(1 + bungaBulan, -bulan));
    const total = angsuran * bulan;
    const totalBunga = total - harga;
    const saranMaks = Math.round((angsuran / 0.3) / 1000000) * 1000000;

    document.getElementById("angsuranKpr").textContent = "Rp " + Math.round(angsuran).toLocaleString("id-ID");
    document.getElementById("totalKpr").textContent = "Rp " + Math.round(total).toLocaleString("id-ID");
    document.getElementById("totalBunga").textContent = "Rp " + Math.round(totalBunga).toLocaleString("id-ID");
    document.getElementById("saranHarga").textContent = `💡 Saran: Cicilan ini sekitar 30% dari penghasilan Rp ${saranMaks.toLocaleString("id-ID")}/bulan`;
    wadah.style.display = "block";
}

// FITUR 4: UPLOAD FOTO & PREVIEW HALAMAN IKLAN
let daftarFoto = [];
const inputFoto = document.getElementById("inputFoto");
const wadahFoto = document.getElementById("wadahPreviewFoto");

inputFoto?.addEventListener("change", function(e){
    const fileBaru = Array.from(e.target.files);
    fileBaru.forEach(f => {
        if(f.type.startsWith("image/")) daftarFoto.push(f);
    });
    tampilkanPreviewFoto();
});

function tampilkanPreviewFoto(){
    if(!wadahFoto) return;
    wadahFoto.innerHTML = "";
    daftarFoto.forEach((file, i) => {
        const baca = new FileReader();
        baca.onload = function(e){
            const div = document.createElement("div");
            div.style.cssText = "position:relative; border-radius:8px; overflow:hidden; border:2px solid #ddd; cursor:grab; background:#f9f9f9;";
            div.innerHTML = `
                <img src="${e.target.result}" style="width:100%; height:90px; object-fit:cover;">
                <div style="position:absolute; top:4px; right:4px; display:flex; gap:4px;">
                    <span onclick="jadikanSampul(${i})" style="background:rgba(0,0,0,0.6); color:white; padding:2px 5px; border-radius:4px; font-size:11px; cursor:pointer;">⭐</span>
                    <span onclick="hapusFoto(${i})" style="background:rgba(239,68,68,0.8); color:white; padding:2px 5px; border-radius:4px; font-size:11px; cursor:pointer;">✕</span>
                </div>
                ${i===0?'<div style="position:absolute;bottom:0;left:0;right:0;background:#165DFF;color:white;font-size:10px;text-align:center;padding:2px;">📸 Sampul Utama</div>':''}
            `;
            wadahFoto.appendChild(div);
        };
        baca.readAsDataURL(file);
    });
}

function hapusFoto(i){
    daftarFoto.splice(i, 1);
    tampilkanPreviewFoto();
}

function jadikanSampul(i){
    const [pertama] = daftarFoto.splice(i, 1);
    daftarFoto.unshift(pertama);
    tampilkanPreviewFoto();
}

document.getElementById("btnLihatPratinjau")?.addEventListener("click", bukaPratinjauIklan);

function bukaPratinjauIklan(){
    const judul = document.getElementById("judulIklan")?.value || "Judul Iklan Properti Anda";
    const deskripsi = document.getElementById("deskripsiIklan")?.value || "Deskripsi properti akan tampil di sini...";
    const kecamatan = document.getElementById("pilihKecamatan")?.selectedOptions[0]?.text;
    const kabupaten = document.getElementById("pilihKabupaten")?.selectedOptions[0]?.text;
    const lokasi = [kecamatan, kabupaten].filter(Boolean).join(", ");
    const harga = document.getElementById("hargaJual")?.value || document.getElementById("hargaSewa")?.value || "0";
    const hargaFormat = "Rp " + parseInt(harga).toLocaleString("id-ID");
    const sampul = daftarFoto[0] ? URL.createObjectURL(daftarFoto[0]) : "https://via.placeholder.com/800x400?text=Foto+Properti";

    const jendela = window.open("", "_blank", "width=400,height=700");
    jendela.document.write(`
    <!DOCTYPE html>
    <html style="margin:0; padding:0; font-family:system-ui;">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PRATINJAU IKLAN - Teravia</title>
        <style>
            *{box-sizing:border-box; margin:0; padding:0;}
            body{background:#f5f7fa; padding:15px;}
            .kartu{background:white; border-radius:12px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.1);}
            .foto{width:100%; height:220px; object-fit:cover; background:#eee;}
            .isi{padding:15px;}
            .judul{font-size:18px; font-weight:700; color:#111; margin-bottom:5px;}
            .harga{font-size:20px; font-weight:700; color:#165DFF; margin:8px 0;}
            .lokasi{font-size:13px; color:#666; display:flex; align-items:center; gap:5px;}
            .deskripsi{margin-top:12px; font-size:14px; line-height:1.6; color:#333; white-space:pre-wrap;}
            .label{display:inline-block; background:#e8f3ff; color:#165DFF; padding:3px 8px; border-radius:4px; font-size:11px; margin:3px;}
            .catatan{margin-top:20px; text-align:center; font-size:12px; color:#888;}
        </style>
    </head>
    <body>
        <div class="kartu">
            <img src="${sampul}" class="foto" alt="Foto Properti">
            <div class="isi">
                <div class="judul">${judul}</div>
                <div class="harga">${hargaFormat}</div>
                <div class="lokasi">📍 ${lokasi || "Lokasi belum dipilih"}</div>
                <div class="deskripsi">${deskripsi}</div>
                <div style="margin-top:15px;">
                    <span class="label">Dipasang lewat Teravia</span>
                    <span class="label">Pratinjau Saja</span>
                </div>
            </div>
        </div>
        <p class="catatan">✅ Ini adalah tampilan asli iklan Anda. Pastikan sudah benar sebelum dipublikasikan.</p>
    </body>
    </html>
    `);
    jendela.document.close();
}
