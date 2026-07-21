/* ==========================================================
   TERAVIA
   Image Upload Service
   assets/js/services/image-upload-service.js
   Version : 1.0
========================================================== */

const ImageUploadService = (() => {
  const CONFIG = {
    maxFiles: 20,

    maxFileSize: 10 * 1024 * 1024,

    allowedTypes: [
      "image/jpeg",

      "image/jpg",

      "image/png",

      "image/webp"
    ]
  };

  let images = [];

  /**
   * Tambahkan file
   */
  async function addFiles(fileList) {
    const files = Array.from(fileList);

    for (const file of files) {
      if (images.length >= CONFIG.maxFiles) {
        throw new Error(
          `Maksimal ${CONFIG.maxFiles} gambar`
        );
      }

      validate(file);

      let compressed = file;

      if (
        window.ImageCompress &&
        typeof ImageCompress.compress === "function"
      ) {
        compressed = await ImageCompress.compress(file);
      }

      images.push({
        id: crypto.randomUUID(),

        originalFile: file,

        compressedFile: compressed,

        previewUrl: URL.createObjectURL(compressed),

        name: file.name,

        type: compressed.type,

        size: compressed.size
      });
    }

    return getImages();
  }

  /**
   * Validasi file
   */
  function validate(file) {
    if (!CONFIG.allowedTypes.includes(file.type)) {
      throw new Error(
        "Format gambar tidak didukung."
      );
    }

    if (file.size > CONFIG.maxFileSize) {
      throw new Error(
        "Ukuran gambar maksimal 10 MB."
      );
    }
  }

  /**
   * Hapus gambar
   */
  function remove(index) {
    if (!images[index]) {
      return;
    }

    URL.revokeObjectURL(images[index].previewUrl);

    images.splice(index, 1);
  }

  /**
   * Kosongkan semua
   */
  function clear() {
    images.forEach((image) => {
      URL.revokeObjectURL(image.previewUrl);
    });

    images = [];
  }

  /**
   * Semua data gambar
   */
  function getImages() {
    return [...images];
  }

  /**
   * File hasil kompres
   */
  function getCompressedFiles() {
    return images.map((image) => image.compressedFile);
  }

  /**
   * Preview
   */
  function getPreviewData() {
    return images.map((image) => ({
      id: image.id,

      url: image.previewUrl,

      name: image.name,

      size: image.size
    }));
  }

  /**
   * Jumlah gambar
   */
  function count() {
    return images.length;
  }

  return {
    addFiles,

    remove,

    clear,

    getImages,

    getCompressedFiles,

    getPreviewData,

    count
  };
})();
