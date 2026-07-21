/* ==========================================================
   TERAVIA
   Wilayah Component
   Dropdown Provinsi - Kabupaten - Kecamatan - Kelurahan
   API : WilayahService
   Version : 1.0
========================================================== */

const WilayahComponent = (() => {
  let elements = {};

  /**
   * Init Component
   */
  function init(config) {
    elements = {
      provinsi: document.querySelector(config.provinsi),
      kabupaten: document.querySelector(config.kabupaten),
      kecamatan: document.querySelector(config.kecamatan),
      kelurahan: document.querySelector(config.kelurahan)
    };

    bindEvent();
    loadProvinsi();
  }

  /**
   * Event Listener
   */
  function bindEvent() {
    elements.provinsi.addEventListener("change", loadKabupaten);
    elements.kabupaten.addEventListener("change", loadKecamatan);
    elements.kecamatan.addEventListener("change", loadKelurahan);
  }

  /**
   * Reset Dropdown
   */
  function reset(select, text) {
    select.innerHTML = `
      <option value="">
        ${text}
      </option>
    `;

    select.disabled = true;
  }

  /**
   * Isi Dropdown
   */
  function populate(select, data) {
    select.innerHTML = `
      <option value="">
        Pilih
      </option>
    `;

    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.name;

      select.appendChild(option);
    });

    select.disabled = false;
  }

  /**
   * Load Provinsi
   */
  async function loadProvinsi() {
    try {
      const data = await WilayahService.getProvinsi();

      populate(elements.provinsi, data);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Load Kabupaten
   */
  async function loadKabupaten() {
    const id = elements.provinsi.value;

    reset(elements.kabupaten, "Pilih Kabupaten/Kota");
    reset(elements.kecamatan, "Pilih Kecamatan");
    reset(elements.kelurahan, "Pilih Kelurahan");

    if (!id) return;

    const data = await WilayahService.getKabupaten(id);

    populate(elements.kabupaten, data);
  }

  /**
   * Load Kecamatan
   */
  async function loadKecamatan() {
    const id = elements.kabupaten.value;

    reset(elements.kecamatan, "Pilih Kecamatan");
    reset(elements.kelurahan, "Pilih Kelurahan");

    if (!id) return;

    const data = await WilayahService.getKecamatan(id);

    populate(elements.kecamatan, data);
  }

  /**
   * Load Kelurahan
   */
  async function loadKelurahan() {
    const id = elements.kecamatan.value;

    reset(elements.kelurahan, "Pilih Kelurahan");

    if (!id) return;

    const data = await WilayahService.getKelurahan(id);

    populate(elements.kelurahan, data);
  }

  return {
    init
  };
})();
