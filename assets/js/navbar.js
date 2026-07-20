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

// Cek status login & level member
const sesi = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');

if (sesi && sesi.statusLogin) {
    // Ganti menu Masuk/Daftar jadi Nama Profil + Lencana Premium
    const menuAkun = document.querySelector('.tautan-nav:contains("Masuk")');
    if (menuAkun) {
        menuAkun.outerHTML = `
            <div style="display:flex;align-items:center;gap:8px;">
                <span style="color:#F59E0B;font-weight:600;">👑 ${sesi.namaPaket}</span>
                <a href="profil.html" style="color:#165DFF;">👤 ${sesi.nama}</a>
                <button onclick="keluarAkun()" style="background:none;border:none;color:#EF4444;">Keluar</button>
            </div>
        `;
    }
}

// Fungsi Keluar
function keluarAkun() {
    localStorage.removeItem('sesiTeravia');
    alert('Berhasil keluar!');
    window.location.href = 'login.html';
}
