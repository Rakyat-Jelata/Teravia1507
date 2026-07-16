// TUNGGU SAMPAI HALAMAN & SEMUA ELEMEN SELESAI DIMUAT
document.addEventListener('DOMContentLoaded', function() {

    // 1. INISIALISASI SUPABASE
    const SUPABASE_URL = "ISI_URL_PROYEK_KAMU";
    const SUPABASE_KEY = "ISI_ANON_KEY_KAMU";
    const { createClient } = supabase;
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // 2. FUNGSI MENU HAMBURGER
    const tombolMenu = document.getElementById('tombolMenu');
    const menuMobile = document.getElementById('menuMobile');

    // Cek dulu apakah elemen benar-benar ada
    if (tombolMenu && menuMobile) {
        tombolMenu.addEventListener('click', () => {
            menuMobile.classList.toggle('buka');
        });

        menuMobile.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuMobile.classList.remove('buka');
            });
        });
    }

    // Nanti kita tambah fungsi ambil data provinsi di sini

}); // AKHIR DARI DOMContentLoaded
