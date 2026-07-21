/* ==========================================================
   TERAVIA
   Listing Form Service
   Build Payload Pasang Iklan
   Version : 1.0
========================================================== */

const ListingFormService = (() => {
  /**
   * Ambil value input
   */
  function value(selector) {
    const el = document.querySelector(selector);

    return el ? el.value.trim() : null;
  }

  /**
   * Ambil text option select
   */
  function selectedText(selector) {
    const el = document.querySelector(selector);

    if (!el || el.selectedIndex < 0) {
      return null;
    }

    return el.options[el.selectedIndex].text.trim();
  }

  /**
   * Build Payload Property
   */
  function buildPayload(wilayah = {}) {
    const payload = {
      // =====================
      // Informasi Properti
      // =====================

      title: value("#judul"),

      category: value("#kategori"),

      property_type: value("#tipe-properti"),

      description: value("#deskripsi"),

      // =====================
      // Harga
      // =====================

      price: Number(value("#harga")) || 0,

      price_type: value("#tipe-harga"),

      // =====================
      // Detail
      // =====================

      building_area: Number(value("#luas-bangunan")) || null,

      land_area: Number(value("#luas-tanah")) || null,

      bedrooms: Number(value("#kamar-tidur")) || null,

      bathrooms: Number(value("#kamar-mandi")) || null,

      // =====================
      // Legalitas
      // =====================

      legality: value("#legalitas"),

      // =====================
      // Lokasi
      // =====================

      province_id: wilayah.province_id,

      province_name: wilayah.province_name,

      city_id: wilayah.city_id,

      city_name: wilayah.city_name,

      district_id: wilayah.district_id,

      district_name: wilayah.district_name,

      village_id: wilayah.village_id,

      village_name: wilayah.village_name,

      // =====================
      // Status
      // =====================

      status: "pending"
    };

    return payload;
  }

  /**
   * Validasi Form
   */
  function validate(payload) {
    const required = [
      "title",
      "category",
      "property_type",
      "price",
      "province_id",
      "city_id"
    ];

    for (const field of required) {
      if (!payload[field]) {
        return {
          valid: false,

          message: `${field} wajib diisi`
        };
      }
    }

    return {
      valid: true,

      message: "OK"
    };
  }

  return {
    buildPayload,

    validate
  };
})();
