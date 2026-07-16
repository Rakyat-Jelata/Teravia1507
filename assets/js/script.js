// ✅ SEMUA IMPOR WAJIB DI ATAS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ✅ KONEKSI SUDAH BENAR
const firebaseConfig = {
  apiKey: "AIzaSyCuAuSm-3fp0OEjqDVwaT8JJhU6e7fmSKA",
  authDomain: "teravia-9d672.firebaseapp.com",
  projectId: "teravia-9d672",
  storageBucket: "teravia-9d672.firebasestorage.app",
  messagingSenderId: "717751333401",
  appId: "1:717751333401:web:f3e4eacb88e83b26c2f088"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ DATA PROVINSI
const dataProvinsi = [
  {"id": 11, "name": "ACEH"},
  {"id": 12, "name": "SUMATERA UTARA"},
  {"id": 13, "name": "SUMATERA BARAT"},
  {"id": 14, "name": "RIAU"},
  {"id": 15, "name": "JAMBI"},
  {"id": 16, "name": "SUMATERA SELATAN"},
  {"id": 17, "name": "BENGKULU"},
  {"id": 18, "name": "LAMPUNG"},
  {"id": 19, "name": "KEPULAUAN BANGKA BELITUNG"},
  {"id": 21, "name": "KEPULAUAN RIAU"},
  {"id": 31, "name": "DKI JAKARTA"},
  {"id": 32, "name": "JAWA BARAT"},
  {"id": 33, "name": "JAWA TENGAH"},
  {"id": 34, "name": "DI YOGYAKARTA"},
  {"id": 35, "name": "JAWA TIMUR"},
  {"id": 36, "name": "BANTEN"},
  {"id": 51, "name": "BALI"},
  {"id": 52, "name": "NUSA TENGGARA BARAT"},
  {"id": 53, "name": "NUSA TENGGARA TIMUR"},
  {"id": 61, "name": "KALIMANTAN BARAT"},
  {"id": 62, "name": "KALIMANTAN TENGAH"},
  {"id": 63, "name": "KALIMANTAN SELATAN"},
  {"id": 64, "name": "KALIMANTAN TIMUR"},
  {"id": 65, "name": "KALIMANTAN UTARA"},
  {"id": 71, "name": "SULAWESI UTARA"},
  {"id": 72, "name": "SULAWESI TENGAH"},
  {"id": 73, "name": "SULAWESI SELATAN"},
  {"id": 74, "name": "SULAWESI TENGGARA"},
  {"id": 75, "name": "GORONTALO"},
  {"id": 76, "name": "SULAWESI BARAT"},
  {"id": 81, "name": "MALUKU"},
  {"id": 82, "name": "MALUKU UTARA"},
  {"id": 91, "name": "PAPUA BARAT"},
  {"id": 94, "name": "PAPUA"}
];

// ✅ FUNGSI SIMPAN
async function simpanProvinsi() {
  for (const item of dataProvinsi) {
    await addDoc(collection(db, "provinces"), item);
  }
}

// ✅ FUNGSI TOMBOL & MENU
document.addEventListener('DOMContentLoaded', function(){
  // Menu Hamburger
  const tombolMenu = document.getElementById('tombolMenu');
  const menuMobile = document.getElementById('menuMobile');
  if(tombolMenu && menuMobile){
    tombolMenu.addEventListener('click', () => menuMobile.classList.toggle('buka'));
  }

  // Tombol Masuk Data
  const tombolData = document.getElementById('tombolMasukData');
  if(tombolData){
    tombolData.addEventListener('click', async function(){
      tombolData.textContent = "Memproses...";
      tombolData.disabled = true;
      try {
        await simpanProvinsi();
        alert("✅ BERHASIL! Cek Firestore ya!");
      } catch (err) {
        alert("❌ Gagal: " + err.message);
      }
      tombolData.textContent = "Selesai!";
    });
  }
});
