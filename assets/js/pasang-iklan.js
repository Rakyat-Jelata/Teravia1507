/* ==========================================================
   TERAVIA
   Pasang Iklan
   assets/js/pasang-iklan.js
   Version : 1.0
========================================================== */

/* ==========================================================
   GLOBAL VARIABLE
========================================================== */

const TOTAL_STEP = 13;
let currentStep = 1;
const steps = document.querySelectorAll(".form-step");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const btnNext = document.querySelectorAll(".btn-next");
const btnPrev = document.querySelectorAll(".btn-prev");

/* ==========================================================
   INIT
========================================================== */

document.addEventListener("DOMContentLoaded", initPasangIklan);

function initPasangIklan() {
  showStep(currentStep);
  updateProgress();
  bindNavigation();
  initCounter();
  initAutoSave();
  initModal();
  initToast();
  initLoading();
  initPublish();
}

/* ==========================================================
   STEP WIZARD
========================================================== */

function showStep(step) {
  steps.forEach((item) => {
    item.classList.remove("active");
  });

  const currentPage = document.getElementById(`step${step}`);
  if (currentPage) {
    currentPage.classList.add("active");
  }

  currentStep = step;
  updateProgress();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function nextStep() {
  if (!validateStep(currentStep)) {
    return;
  }

  if (currentStep < TOTAL_STEP) {
    showStep(currentStep + 1);
  }
}

function prevStep() {
  if (currentStep > 1) {
    showStep(currentStep - 1);
  }
}

/* ==========================================================
   PROGRESS BAR
========================================================== */

function updateProgress() {
  const percent = Math.round((currentStep / TOTAL_STEP) * 100);

  progressFill.style.width = percent + "%";
  progressFill.setAttribute("aria-valuenow", percent);
  progressText.textContent = `Step ${currentStep} dari ${TOTAL_STEP}`;

  updateProgressTitle();
}

function updateProgressTitle() {
  const title = document.getElementById("progressTitle");

  if (!title) {
    return;
  }

  const stepTitle = [
    "Data Properti",
    "Detail Properti",
    "Legalitas",
    "Harga",
    "Lokasi",
    "Spesifikasi",
    "Fasilitas",
    "Upload Foto",
    "AI Assistant",
    "Preview Iklan",
    "Promosi",
    "Konfirmasi",
    "Publikasi"
  ];

  title.textContent = stepTitle[currentStep - 1];
}

function getProgressPercent() {
  return Math.round((currentStep / TOTAL_STEP) * 100);
}

/* ==========================================================
   NEXT / PREVIOUS
========================================================== */

function bindNavigation() {
  document.addEventListener("click", (event) => {
    const nextButton = event.target.closest(".btn-next");

    if (nextButton) {
      event.preventDefault();
      nextStep();
      return;
    }

    const prevButton = event.target.closest(".btn-prev");

    if (prevButton) {
      event.preventDefault();
      prevStep();
    }
  });
}

function nextStep() {
  if (!validateStep(currentStep)) {
    return;
  }

  if (currentStep >= TOTAL_STEP) {
    return;
  }

  showStep(currentStep + 1);
}

function prevStep() {
  if (currentStep <= 1) {
    return;
  }

  showStep(currentStep - 1);
}

function goToStep(step) {
  if (step < 1) {
    step = 1;
  }

  if (step > TOTAL_STEP) {
    step = TOTAL_STEP;
  }

  showStep(step);
}

function firstStep() {
  showStep(1);
}

function lastStep() {
  showStep(TOTAL_STEP);
}

function isFirstStep() {
  return currentStep === 1;
}

function isLastStep() {
  return currentStep === TOTAL_STEP;
}

function updateNavigation() {
  document.querySelectorAll(".btn-prev").forEach((button) => {
    button.disabled = isFirstStep();
  });

  document.querySelectorAll(".btn-next").forEach((button) => {
    button.disabled = false;

    if (button.id === "btnPublish") {
      button.disabled = !isLastStep();
    }
  });
}

const originalShowStep = showStep;

showStep = function (step) {
  originalShowStep(step);
  updateNavigation();
};

/* ==========================================================
   VALIDASI PER STEP
========================================================== */

function validateStep(step) {
  const formStep = document.getElementById(`step${step}`);

  if (!formStep) {
    return true;
  }

  clearValidation(formStep);

  const fields = formStep.querySelectorAll("input, select, textarea");

  let valid = true;

  const radioGroup = {};

  fields.forEach((field) => {
    if (field.disabled) {
      return;
    }

    if (field.type === "radio") {
      if (!field.required) {
        return;
      }

      if (radioGroup[field.name]) {
        return;
      }

      radioGroup[field.name] = true;

      const checked = formStep.querySelector(
        `input[name="${field.name}"]:checked`
      );

      if (!checked) {
        showFieldError(field);
        valid = false;
      }

      return;
    }

    if (field.type === "checkbox") {
      if (field.required && !field.checked) {
        showFieldError(field);
        valid = false;
      }

      return;
    }

    if (field.tagName === "SELECT") {
      if (
        field.required &&
        (field.value === "" || field.selectedIndex === 0)
      ) {
        showFieldError(field);
        valid = false;
      }

      return;
    }

    if (field.required && field.value.trim() === "") {
      showFieldError(field);
      valid = false;
    }
  });

  if (!valid) {
    const firstError = formStep.querySelector(".is-invalid");

    if (firstError) {
      firstError.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      firstError.focus();
    }

    showToast("Lengkapi semua data yang wajib diisi.", "error");

    return false;
  }

  return true;
}

/* ==========================================================
   FIELD VALIDATION
========================================================== */

function showFieldError(field) {
  field.classList.add("is-invalid");
}

function clearValidation(container) {
  container.querySelectorAll(".is-invalid").forEach((field) => {
    field.classList.remove("is-invalid");
  });
}

/* ==========================================================
   COUNTER JUDUL & DESKRIPSI
========================================================== */

const MAX_JUDUL = 100;
const MAX_DESKRIPSI = 5000;

function initCounter() {
  initCharacterCounter("judul", "counterJudul", MAX_JUDUL);
  initCharacterCounter("deskripsi", "counterDeskripsi", MAX_DESKRIPSI);
}

function initCharacterCounter(inputId, counterId, maxLength) {
  const input = document.getElementById(inputId);
  const counter = document.getElementById(counterId);

  if (!input || !counter) {
    return;
  }

  updateCharacterCounter(input, counter, maxLength);

  input.addEventListener("input", () => {
    updateCharacterCounter(input, counter, maxLength);
  });
}

function updateCharacterCounter(input, counter, maxLength) {
  const length = input.value.length;

  counter.textContent = `${length} / ${maxLength}`;

  counter.classList.remove("warning", "danger");

  const percent = (length / maxLength) * 100;

  if (percent >= 100) {
    counter.classList.add("danger");
  } else if (percent >= 80) {
    counter.classList.add("warning");
  }
}

/* ==========================================================
   AUTO SAVE DRAFT
========================================================== */

const DRAFT_KEY = "teravia_listing_draft";

function initAutoSave() {
  loadDraft();

  const fields = document.querySelectorAll("input, select, textarea");

  fields.forEach((field) => {
    const eventType = field.tagName === "SELECT" ? "change" : "input";

    field.addEventListener(eventType, saveDraft);
  });
}

function saveDraft() {
  const data = {};

  document.querySelectorAll("input, select, textarea").forEach((field) => {
    if (!field.id) {
      return;
    }

    if (field.type === "radio") {
      if (field.checked) {
        data[field.name] = field.value;
      }
      return;
    }

    if (field.type === "checkbox") {
      data[field.id] = field.checked;
      return;
    }

    data[field.id] = field.value;
  });

  data.currentStep = currentStep;
  data.updatedAt = new Date().toISOString();

  localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
}

function loadDraft() {
  const draft = localStorage.getItem(DRAFT_KEY);

  if (!draft) {
    return;
  }

  const data = JSON.parse(draft);

  Object.keys(data).forEach((key) => {
    if (key === "currentStep" || key === "updatedAt") {
      return;
    }

    const radio = document.querySelector(
      `input[name="${key}"][value="${data[key]}"]`
    );

    if (radio) {
      radio.checked = true;
      return;
    }

    const field = document.getElementById(key);

    if (!field) {
      return;
    }

    if (field.type === "checkbox") {
      field.checked = data[key];
    } else {
      field.value = data[key];
    }
  });

  if (data.currentStep) {
    showStep(data.currentStep);
  }
}

function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

/* ==========================================================
   UNIVERSAL MODAL
========================================================== */

let modalElement = null;
let modalCallback = null;

function initModal() {
  modalElement = document.getElementById("appModal");

  if (!modalElement) {
    return;
  }

  modalElement.addEventListener("click", (event) => {
    if (event.target === modalElement) {
      closeModal();
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.matches(".modal-close")) {
      closeModal();
    }

    if (event.target.matches("#modalCancel")) {
      closeModal();
    }

    if (event.target.matches("#modalConfirm")) {
      if (typeof modalCallback === "function") {
        modalCallback();
      }
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function openModal({
  title = "",
  message = "",
  confirmText = "OK",
  cancelText = "Batal",
  confirmClass = "btn-primary",
  onConfirm = null
}) {
  if (!modalElement) {
    return;
  }

  modalCallback = onConfirm;

  modalElement.querySelector(".modal-title").textContent = title;
  modalElement.querySelector(".modal-body").innerHTML = message;

  const btnConfirm = modalElement.querySelector("#modalConfirm");
  btnConfirm.textContent = confirmText;
  btnConfirm.className = `btn ${confirmClass}`;

  modalElement.querySelector("#modalCancel").textContent = cancelText;

  modalElement.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modalElement) {
    return;
  }

  modalElement.classList.remove("active");
  modalCallback = null;
  document.body.style.overflow = "";
}

function alertModal(title, message) {
  openModal({
    title,
    message,
    confirmText: "OK",
    cancelText: "Tutup"
  });
}

function confirmModal(title, message, callback) {
  openModal({
    title,
    message,
    confirmText: "Ya",
    cancelText: "Batal",
    confirmClass: "btn-success",
    onConfirm: callback
  });
}

/* ==========================================================
   TOAST
========================================================== */

let toastContainer = null;
let toastTimer = null;

function initToast() {
  toastContainer = document.getElementById("toastContainer");

  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toastContainer";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }
}

function showToast(message, type = "success", duration = 3000) {
  if (!toastContainer) {
    initToast();
  }

  clearTimeout(toastTimer);

  toastContainer.innerHTML = `
    <div class="toast ${type}">
      <span class="toast-icon">${getToastIcon(type)}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close">&times;</button>
    </div>
  `;

  const toast = toastContainer.querySelector(".toast");

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  toastContainer
    .querySelector(".toast-close")
    .addEventListener("click", hideToast);

  toastTimer = setTimeout(hideToast, duration);
}

function hideToast() {
  const toast = toastContainer?.querySelector(".toast");

  if (!toast) {
    return;
  }

  toast.classList.remove("show");

  setTimeout(() => {
    if (toastContainer) {
      toastContainer.innerHTML = "";
    }
  }, 250);
}

function getToastIcon(type) {
  switch (type) {
    case "success":
      return "✅";
    case "error":
      return "❌";
    case "warning":
      return "⚠️";
    case "info":
      return "ℹ️";
    default:
      return "🔔";
  }
}

/* ==========================================================
   LOADING
========================================================== */

let loadingElement = null;
let loadingMessage = null;

function initLoading() {
  loadingElement = document.getElementById("loadingModal");

  if (!loadingElement) {
    return;
  }

  loadingMessage = loadingElement.querySelector(".loading-text");
}

function showLoading(message = "Memproses...") {
  if (!loadingElement) {
    return;
  }

  if (loadingMessage) {
    loadingMessage.textContent = message;
  }

  loadingElement.classList.add("active");
  document.body.style.overflow = "hidden";
}

function hideLoading() {
  if (!loadingElement) {
    return;
  }

  loadingElement.classList.remove("active");
  document.body.style.overflow = "";
}

async function withLoading(callback, message = "Memproses...") {
  try {
    showLoading(message);
    return await callback();
  } catch (error) {
    console.error(error);
    showToast("Terjadi kesalahan.", "error");
    throw error;
  } finally {
    hideLoading();
  }
}

/* ==========================================================
   PUBLISH VALIDATION
========================================================== */

function initPublish() {
  const btnPublish = document.getElementById("btnPublish");

  if (!btnPublish) {
    return;
  }

  btnPublish.addEventListener("click", handlePublish);
}

async function handlePublish(event) {
  event.preventDefault();

  if (!validateAllStep()) {
    showToast("Lengkapi seluruh data sebelum dipublikasikan.", "warning");
    return;
  }

  confirmModal(
    "Publikasikan Iklan",
    "Apakah Anda yakin ingin mempublikasikan iklan ini?",
    publishListing
  );
}

function validateAllStep() {
  const lastStep = currentStep;

  for (let step = 1; step <= TOTAL_STEP; step++) {
    showStep(step);

    if (!validateStep(step)) {
      return false;
    }
  }

  showStep(lastStep);
  return true;
}

async function publishListing() {
  await withLoading(async () => {
    saveDraft();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    clearDraft();
    showToast("Iklan berhasil dipublikasikan.", "success");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1200);
  }, "Sedang mempublikasikan iklan...");
}

/* ==========================================================
   FINAL INTEGRATION
========================================================== */

async function submitListing() {
  try {
    showLoading("Sedang mempublikasikan iklan...");

    const listingData = collectListingData();
    const imageData = collectImageData();
    const promotionData = collectPromotionData();
    const aiData = collectAIData();

    console.log({
      listingData,
      imageData,
      promotionData,
      aiData
    });

    hideLoading();

    showToast("Iklan berhasil dipublikasikan.", "success");

    clearDraft();

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  } catch (error) {
    console.error(error);

    hideLoading();

    showToast("Terjadi kesalahan saat mempublikasikan iklan.", "error");
  }
}

/* ==========================================================
   COLLECT DATA
========================================================== */

function collectListingData() {
  const data = {};

  document.querySelectorAll("input, select, textarea").forEach((field) => {
    if (!field.id) {
      return;
    }

    if (field.type === "radio") {
      if (field.checked) {
        data[field.name] = field.value;
      }
      return;
    }

    if (field.type === "checkbox") {
      data[field.id] = field.checked;
      return;
    }

    data[field.id] = field.value.trim();
  });

  data.createdAt = new Date().toISOString();
  data.updatedAt = new Date().toISOString();
  data.status = "DRAFT";

  return data;
}

/* ==========================================================
   IMAGE
========================================================== */

function collectImageData() {
  return {
    cover: null,
    gallery: [],
    floorPlan: null
  };
}

/* ==========================================================
   PROMOTION
========================================================== */

function collectPromotionData() {
  return {
    featured: document.getElementById("featuredListing")?.checked || false,
    sundul: document.getElementById("sundulOtomatis")?.checked || false,
    metaAds: document.getElementById("metaAds")?.checked || false
  };
}

/* ==========================================================
   AI
========================================================== */

function collectAIData() {
  return {
    title: document.getElementById("judul")?.value || "",
    description: document.getElementById("deskripsi")?.value || ""
  };
}

/* ==========================================================
   EXPORT
========================================================== */

window.TERAVIA = {
  submitListing,
  collectListingData,
  collectImageData,
  collectPromotionData,
  collectAIData,
  showToast,
  showLoading,
  hideLoading,
  openModal,
  closeModal
};
