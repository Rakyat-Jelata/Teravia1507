// Hamburger Menu
const btnHam = document.getElementById('btnHamburger');
const menuNav = document.getElementById('menuNav');
function aturMenu() {
    if(window.innerWidth <= 768) {
        btnHam.style.display = 'block';
        menuNav.style.display = 'none';
        menuNav.style.flexDirection = 'column';
        menuNav.style.position = 'absolute';
        menuNav.style.top = '100%';
        menuNav.style.left = '0';
        menuNav.style.width = '100%';
        menuNav.style.background = 'white';
        menuNav.style.padding = '16px';
        menuNav.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    } else {
        btnHam.style.display = 'none';
        menuNav.style.display = 'flex';
        menuNav.style.position = 'static';
        menuNav.style.boxShadow = 'none';
    }
}
btnHam.addEventListener('click', () => menuNav.style.display = menuNav.style.display === 'flex' ? 'none' : 'flex');
window.addEventListener('resize', aturMenu);
aturMenu();

// Logika Data
const sesi = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');
if(!sesi) { alert('⚠️ Silakan masuk dulu!'); location.href='login.html'; }

document.getElementById('namaLengkap').value = sesi.namaLengkap || '';
document.getElementById('noHp').value = sesi.nomorHp || '';
document.getElementById('email').value = sesi.email || '';

document.getElementById('formUbahProfil').addEventListener('submit', e => {
    e.preventDefault();
    sesi.namaLengkap = document.getElementById('namaLengkap').value.trim();
    sesi.nomorHp = document.getElementById('noHp').value.trim();
    sesi.email = document.getElementById('email').value.trim();
    localStorage.setItem('sesiTeravia', JSON.stringify(sesi));
    alert('✅ Data profil berhasil diperbarui!');
    location.href = 'profil-member.html';
});
