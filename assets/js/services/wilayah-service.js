/* ==========================================================
   EMSIFA API
========================================================== */

const EMSIFA_API = {
  provinsi: "https://wilayah.id/api/provinces.json",

  kabupaten: (provinceId) =>
    `https://wilayah.id/api/regencies/${provinceId}.json`,

  kecamatan: (regencyId) =>
    `https://wilayah.id/api/districts/${regencyId}.json`,

  kelurahan: (districtId) =>
    `https://wilayah.id/api/villages/${districtId}.json`
};

/* ==========================================================
   INIT EMSIFA
========================================================== */

function initWilayah() {
  loadProvinsi();
}

document.addEventListener("DOMContentLoaded", () => {
  initWilayah();
});

/* ==========================================================
   ELEMENT
========================================================== */

const provinsiSelect = document.getElementById("provinsi");
const kabupatenSelect = document.getElementById("kabupaten");
const kecamatanSelect = document.getElementById("kecamatan");
const kelurahanSelect = document.getElementById("kelurahan");

/* ==========================================================
   PROVINSI
========================================================== */

async function loadProvinsi() {
  try {
    const response = await fetch(EMSIFA_API.provinsi);
    const result = await response.json();

    fillSelect(provinsiSelect, result.data, "Pilih Provinsi");
  } catch (error) {
    console.error(error);
    showToast("Gagal memuat provinsi.", "error");
  }
}

/* ==========================================================
   FILL SELECT
========================================================== */

function fillSelect(element, data, placeholder) {
  element.innerHTML = `<option value="">${placeholder}</option>`;

  data.forEach((item) => {
    element.innerHTML += `
      <option value="${item.code}">
        ${item.name}
      </option>
    `;
  });
}

/* ==========================================================
   EVENT
========================================================== */

provinsiSelect.addEventListener("change", () => {
  loadKabupaten(provinsiSelect.value);
});

kabupatenSelect.addEventListener("change", () => {
  loadKecamatan(kabupatenSelect.value);
});

kecamatanSelect.addEventListener("change", () => {
  loadKelurahan(kecamatanSelect.value);
});

async function loadKabupaten(id) {
  resetSelect(kabupatenSelect, "Pilih Kabupaten");
  resetSelect(kecamatanSelect, "Pilih Kecamatan");
  resetSelect(kelurahanSelect, "Pilih Kelurahan");

  if (!id) {
    return;
  }

  const response = await fetch(EMSIFA_API.kabupaten(id));
  const result = await response.json();

  fillSelect(kabupatenSelect, result.data, "Pilih Kabupaten");
}

async function loadKecamatan(id) {
  resetSelect(kecamatanSelect, "Pilih Kecamatan");
  resetSelect(kelurahanSelect, "Pilih Kelurahan");

  if (!id) {
    return;
  }

  const response = await fetch(EMSIFA_API.kecamatan(id));
  const result = await response.json();

  fillSelect(kecamatanSelect, result.data, "Pilih Kecamatan");
}

async function loadKelurahan(id) {
  resetSelect(kelurahanSelect, "Pilih Kelurahan");

  if (!id) {
    return;
  }

  const response = await fetch(EMSIFA_API.kelurahan(id));
  const result = await response.json();

  fillSelect(kelurahanSelect, result.data, "Pilih Kelurahan");
}

/* ==========================================================
   RESET
========================================================== */

function resetSelect(element, placeholder) {
  element.innerHTML = `<option value="">${placeholder}</option>`;
}
