// FUNGSI MENU HAMBURGER
const tombolMenu = document.getElementById('tombolMenu');
const menuMobile = document.getElementById('menuMobile');

tombolMenu.addEventListener('click', () => {
    menuMobile.classList.toggle('buka');
    // Efek animasi garis berubah jadi silang
    tombolMenu.classList.toggle('aktif');
});

// TUTUP MENU JIKA KLIK LINK
menuMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuMobile.classList.remove('buka');
    });
});

