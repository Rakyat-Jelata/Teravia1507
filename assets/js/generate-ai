// ==============================================
// GENERATOR JUDUL & DESKRIPSI IKLAN
// File terpisah: gampang diubah/upgrade nanti
// ==============================================

// 🔧 PILIH MODE: UBAH JADI "GEMINI" KALAU SUDAH SIAP PAKAI API
const MODE_AI = "LOKAL"; // isi "LOKAL" atau "GEMINI"

// ==============================================
// FUNGSI UTAMA: PANGGIL DARI HALAMAN
// ==============================================
async function hasilkanTeksIklan(dataProperti) {
    if (MODE_AI === "GEMINI") {
        return await pakaiGemini(dataProperti);
    } else {
        return pakaiLokal(dataProperti);
    }
}

// ==============================================
// VERSI 1: GENERATOR LOKAL (GRATIS, AMAN, SIAP PAKAI)
// ==============================================
function pakaiLokal(data) {
    const { status, kategori, jenis, lokasi, harga } = data;
    const teksStatus = status === "dijual" ? "Dijual" : "Disewakan";
    const lokasiLengkap = `${data.kecamatan || ""} ${data.kabupaten || ""}`.trim() || "lokasi strategis";
    const hargaTeks = harga ? `Rp ${parseInt(harga).toLocaleString('id-ID')}` : "harga terjangkau";

    const judul = `${jenis} ${teksStatus} di ${lokasiLengkap} - Harga ${hargaTeks}`;

    const deskripsi = `✨ Penawaran ${jenis} yang sangat layak dan menarik!

📍 Lokasi: ${lokasiLengkap}, posisi strategis, akses mudah ke jalan utama, sekolah, pasar, dan fasilitas umum lainnya.
💰 Harga: ${hargaTeks}, sangat kompetitif dan masih bisa dinegosiasikan.
✅ Kondisi bangunan terawat baik, siap huni langsung atau untuk investasi jangka panjang.

Jangan lewatkan kesempatan ini! Segera hubungi pemilik untuk jadwal survei lokasi.`;

    return { judul, deskripsi };
}

// ==============================================
// VERSI 2: PAKAI GEMINI ASLI (SIAP DIPAKAI NANTI)
// ==============================================
async function pakaiGemini(data) {
    // ⚠️ PERINGATAN: JANGAN TARUH KUNCI ASLI DI SINI KALAU DIPUBLIKASIKAN!
    // Nanti ganti pakai Proxy/Server perantara ya
    const KUNCI_API = "GANTI_DENGAN_KUNCI_GEMINI_KAMU_NANTI";
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${KUNCI_API}`;

    const perintah = `Buat judul iklan properti yang menarik maksimal 70 karakter, dan deskripsi yang persuasif sekitar 150 kata.
    Data properti:
    - Status: ${data.status}
    - Kategori: ${data.kategori}
    - Jenis: ${data.jenis}
    - Lokasi: ${data.kecamatan || ""} ${data.kabupaten || ""}
    - Harga: Rp ${parseInt(data.harga || 0).toLocaleString('id-ID')}
    
    Keluarkan hasilnya dalam format JSON saja seperti ini: {"judul":"...","deskripsi":"..."}`;

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                generationConfig: { response_mime_type: "application/json" },
                contents: [{ parts: [{ text: perintah }] }]
            })
        });

        if (!res.ok) throw new Error("Gagal hubungi Gemini");
        const json = await res.json();
        return JSON.parse(json.candidates[0].content.parts[0].text);

    } catch (err) {
        console.error("❌ Error Gemini:", err, "→ Pakai versi lokal saja");
        return pakaiLokal(data);
    }
}

// ==============================================
// PASANG KE TOMBOL DI HALAMAN PASANG IKLAN
// ==============================================
document.addEventListener("DOMContentLoaded", function(){
    const tombolAI = document.getElementById("tombolAI");
    const judulEl = document.getElementById("judulIklan");
    const deskEl = document.getElementById("deskripsiIklan");

    if (!tombolAI || !judulEl || !deskEl) return;

    tombolAI.addEventListener("click", async function(){
        tombolAI.textContent = "⏳ Sedang membuat...";
        tombolAI.disabled = true;

        // Ambil semua data dari form
        const data = {
            status: document.getElementById("statusListing")?.value || "dijual",
            kategori: document.getElementById("kategoriProperti")?.selectedOptions[0]?.text || "",
            jenis: document.getElementById("jenisProperti")?.selectedOptions[0]?.text || "",
            kabupaten: document.getElementById("pilihKabupaten")?.selectedOptions[0]?.text || "",
            kecamatan: document.getElementById("pilihKecamatan")?.selectedOptions[0]?.text || "",
            harga: document.getElementById("hargaJual")?.value || document.getElementById("hargaSewa")?.value || ""
        };

        try {
            const hasil = await hasilkanTeksIklan(data);
            
            if (!judulEl.value.trim()) judulEl.value = hasil.judul;
            if (!deskEl.value.trim()) deskEl.value = hasil.deskripsi;
            
            alert("✅ Selesai! Silakan disunting lagi jika perlu.");
        } catch (pesan) {
            alert("⚠️ " + pesan);
        } finally {
            tombolAI.textContent = "✨ Buat Otomatis";
            tombolAI.disabled = false;
        }
    });
});
