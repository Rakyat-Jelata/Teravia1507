/* ==========================================================
   TERAVIA
   Wilayah Service
   API Wilayah Indonesia - Emsifa
   Version : 2.0
========================================================== */
console.log("=== WILAYAH SERVICE LOADED ===");

const EMSIFA_BASE_URL =
  "https://www.emsifa.com/api-wilayah-indonesia/api";

const provinsiSelect = document.getElementById("provinsi");
const kabupatenSelect = document.getElementById("kabupaten");
const kecamatanSelect = document.getElementById("kecamatan");
const kelurahanSelect = document.getElementById("kelurahan");

/* ==========================================================
   INIT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initWilayah();
});

async function initWilayah() {
  await loadProvinsi();

  provinsiSelect.addEventListener("change", () => {
    loadKabupaten(provinsiSelect.value);
  });

  kabupatenSelect.addEventListener("change", () => {
    loadKecamatan(kabupatenSelect.value);
  });

  kecamatanSelect.addEventListener("change", () => {
    loadKelurahan(kecamatanSelect.value);
  });
}

/* ==========================================================
   PROVINSI
========================================================== */

async function loadProvinsi() {

  try {

    resetSelect(provinsiSelect, "Pilih Provinsi");

    const response = await fetch(
      `${EMSIFA_BASE_URL}/provinces.json`
    );

    if (!response.ok)
      throw new Error(response.status);

    const data = await response.json();

    fillSelect(
      provinsiSelect,
      data,
      "Pilih Provinsi"
    );

  } catch (err) {
    console.error(err);
  }

}

/* ==========================================================
   KABUPATEN
========================================================== */

async function loadKabupaten(id) {

  resetSelect(kabupatenSelect, "Pilih Kabupaten / Kota");
  resetSelect(kecamatanSelect, "Pilih Kecamatan");
  resetSelect(kelurahanSelect, "Pilih Desa / Kelurahan");

  if (!id) return;

  try {

    const response = await fetch(
      `${EMSIFA_BASE_URL}/regencies/${id}.json`
    );

    const data = await response.json();

    fillSelect(
      kabupatenSelect,
      data,
      "Pilih Kabupaten / Kota"
    );

  } catch (err) {
    console.error(err);
  }

}

/* ==========================================================
   KECAMATAN
========================================================== */

async function loadKecamatan(id) {

  resetSelect(kecamatanSelect, "Pilih Kecamatan");
  resetSelect(kelurahanSelect, "Pilih Desa / Kelurahan");

  if (!id) return;

  try {

    const response = await fetch(
      `${EMSIFA_BASE_URL}/districts/${id}.json`
    );

    const data = await response.json();

    fillSelect(
      kecamatanSelect,
      data,
      "Pilih Kecamatan"
    );

  } catch (err) {
    console.error(err);
  }

}

/* ==========================================================
   KELURAHAN
========================================================== */

async function loadKelurahan(id) {

  resetSelect(kelurahanSelect, "Pilih Desa / Kelurahan");

  if (!id) return;

  try {

    const response = await fetch(
      `${EMSIFA_BASE_URL}/villages/${id}.json`
    );

    const data = await response.json();

    fillSelect(
      kelurahanSelect,
      data,
      "Pilih Desa / Kelurahan"
    );

  } catch (err) {
    console.error(err);
  }

}

/* ==========================================================
   HELPER
========================================================== */

function fillSelect(select, data, placeholder) {

  select.innerHTML = `<option value="">${placeholder}</option>`;

  data.forEach(item => {

    const option = document.createElement("option");

    option.value = item.id;
    option.textContent = item.name;

    select.appendChild(option);

  });

  select.disabled = false;

}

function resetSelect(select, placeholder) {

  select.innerHTML =
    `<option value="">${placeholder}</option>`;

  select.disabled = true;

       }
