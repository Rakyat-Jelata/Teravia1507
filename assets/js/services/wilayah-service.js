/* ==========================================================
   TERAVIA
   Wilayah Service
   API Wilayah Indonesia - Emsifa
   Version : 2.0
========================================================== */

const EMSIFA_BASE_URL =
  "https://www.emsifa.com/api-wilayah-indonesia/api";

const provinsiSelect = document.getElementById("provinsi");
const kabupatenSelect = document.getElementById("kabupaten");
const kecamatanSelect = document.getElementById("kecamatan");
const kelurahanSelect = document.getElementById("kelurahan");

document.addEventListener("DOMContentLoaded", () => {
  initWilayah();
});

async function initWilayah() {
  await loadProvinsi();
}

/* ==========================================================
   LOAD PROVINSI
========================================================== */

async function loadProvinsi() {
  try {

    resetSelect(provinsiSelect, "Pilih Provinsi");
    resetSelect(kabupatenSelect, "Pilih Kabupaten / Kota");
    resetSelect(kecamatanSelect, "Pilih Kecamatan");
    resetSelect(kelurahanSelect, "Pilih Desa / Kelurahan");

    const response = await fetch(
      `${EMSIFA_BASE_URL}/provinces.json`
    );

    if (!response.ok)
      throw new Error("HTTP " + response.status);

    const data = await response.json();

    fillSelect(
      provinsiSelect,
      data,
      "Pilih Provinsi"
    );

  } catch (err) {
    console.error(err);
    showToast("Gagal memuat data provinsi.", "error");
  }
}
