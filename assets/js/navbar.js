// ==============================================
// LOGIKA MENU NAVBAR & HAMBURGER
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    const tombolBuka = document.querySelector('.tombol-hamburger');
    const tombolTutup = document.querySelector('.tutup-menu button');
    const menuSamping = document.querySelector('.menu-samping');
    const latarGelap = document.querySelector('.latar-gelap');

    // Fungsi buka menu
    function bukaMenu() {
        if(menuSamping && latarGelap) {
            menuSamping.classList.add('buka');
            latarGelap.classList.add('aktif');
            document.body.style.overflow = 'hidden';
        }
    }

    // Fungsi tutup menu
    function tutupMenu() {
        if(menuSamping && latarGelap) {
            menuSamping.classList.remove('buka');
            latarGelap.classList.remove('aktif');
            document.body.style.overflow = 'auto';
        }
    }

    // Pasang kejadian
    if(tombolBuka) tombolBuka.addEventListener('click', bukaMenu);
    if(tombolTutup) tombolTutup.addEventListener('click', tutupMenu);
    if(latarGelap) latarGelap.addEventListener('click', tutupMenu);
});
