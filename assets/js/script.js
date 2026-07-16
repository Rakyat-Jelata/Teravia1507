// 1. INISIALISASI SUPABASE (nanti isi URL & Key kamu)
const SUPABASE_URL = "ISI_URL_PROYEK_KAMU";
const SUPABASE_KEY = "ISI_ANON_KEY_KAMU";
const { createClient } = supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. FUNGSI MENU HAMBURGER
const tombolMenu = document.getElementById('tombolMenu');
const menuMobile = document.getElementById('menuMobile');

tombolMenu.addEventListener('click', () => {
  menuMobile.classList.toggle('buka');
});

// Tutup menu kalau diklik link
menuMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuMobile.classList.remove('buka');
  });
});

// Nanti kita tambah fungsi ambil data provinsi di sini
