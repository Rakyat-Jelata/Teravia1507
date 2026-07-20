document.addEventListener('DOMContentLoaded', function () {
    const tombolBuka = document.getElementById('tombolMenu');
    const tombolTutup = document.getElementById('tombolTutup');
    const menuSamping = document.getElementById('menuMobile');
    const latarGelap = document.getElementById('latarGelap');

    function bukaMenu() {
        menuSamping.classList.add('buka');
        latarGelap.classList.add('tampil');
        document.body.style.overflow = 'hidden';
    }
    function tutupMenu() {
        menuSamping.classList.remove('buka');
        latarGelap.classList.remove('tampil');
        document.body.style.overflow = 'auto';
    }

    if(tombolBuka) tombolBuka.addEventListener('click', bukaMenu);
    if(tombolTutup) tombolTutup.addEventListener('click', tutupMenu);
    if(latarGelap) latarGelap.addEventListener('click', tutupMenu);
});
