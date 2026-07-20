// === FUNGSI MENU HAMBURGER ===
const tombolMenu = document.getElementById('tombolMenu');
const menuMobile = document.getElementById('menuMobile');
tombolMenu.addEventListener('click', () => {
    menuMobile.classList.toggle('buka');
});
menuMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuMobile.classList.remove('buka');
    });
});

// === SLIDER MOBILE ===
const sliderMob = document.getElementById('isiSliderMob');
const dotsMob = document.querySelectorAll('#indikatorMob .dot');
let idxMob = 0;
const totalMob = dotsMob.length;
function gantiSlideMob() { idxMob = (idxMob +1) % totalMob; updateMob(); }
function updateMob() { sliderMob.style.transform = `translateX(-${idxMob * 100}%)`; dotsMob.forEach((d,i) => d.classList.toggle('aktif', i === idxMob)); }
setInterval(gantiSlideMob, 4000);

// === SLIDER PROPERTI DESKTOP ===
const sliderProp = document.getElementById('isiSliderProp');
const navProp = document.querySelectorAll('#navProp .tombol-nav');
let idxProp = 0;
const totalLangkah = 2;
function gantiSlideProp() { idxProp = (idxProp +1) % totalLangkah; updateProp(); }
function updateProp() { 
    sliderProp.style.transform = `translateX(-${idxProp * 100 / totalLangkah}%)`; 
    navProp.forEach((d,i) => d.classList.toggle('aktif', i === idxProp)); 
}
navProp.forEach((btn, indeks) => {
    btn.addEventListener('click', () => {
        idxProp = indeks;
        updateProp();
    });
});
setInterval(gantiSlideProp, 4500);

// === SLIDER TESTIMONI DESKTOP ===
const sliderTesti = document.getElementById('isiSliderTesti');
let idxTesti = 0;
const totalTesti = 3;
function gantiSlideTesti() { idxTesti = (idxTesti +1) % totalTesti; updateTesti(); }
function updateTesti() { sliderTesti.style.transform = `translateX(-${idxTesti * 33.333}%)`; }
setInterval(gantiSlideTesti, 5000);
