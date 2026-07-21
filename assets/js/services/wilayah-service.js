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

const response = await fetch(
  `${EMSIFA_BASE_URL}/provinces.json`
);

console.log("Status :", response.status);

if (!response.ok)
  throw new Error("HTTP " + response.status);

const data = await response.json();

console.log("Data :", data);
console.log("Jumlah :", data.length);

fillSelect(
  provinsiSelect,
  data,
  "Pilih Provinsi"
);
