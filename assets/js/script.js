// === KONEKSI FIREBASE ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/10/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCuAuSm-3fp0OEjqDVwaT8JJhU6e7fmSKA",
  authDomain: "teravia-9d672.firebaseapp.com",
  projectId: "teravia-9d672",
  storageBucket: "teravia-9d672.firebasestorage.app",
  messagingSenderId: "717751333401",
  appId: "1:717751333401:web:f3e4eacb88e83b26c2f088"
};

// Jalankan koneksi
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// === FUNGSI MENU HAMBURGER ===
document.addEventListener('DOMContentLoaded', function(){
    const tombol = document.getElementById('tombolMenu');
    const menu = document.getElementById('menuMobile');
    if(tombol && menu){
        tombol.addEventListener('click', function(){
            menu.classList.toggle('buka');
        });
    }
});
