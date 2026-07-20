document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    let tujuan = urlParams.get('tujuan') || 'beli';
    
    const btnBeli = document.getElementById('btnFilterBeli');
    const btnSewa = document.getElementById('btnFilterSewa');
    const tabBeli = document.getElementById('tabBeli');
    const tabSewa = document.getElementById('tabSewa');
    const tabBaru = document.getElementById('tabBaru');

    function tandaiTombol() {
        // Reset semua
        [btnBeli, btnSewa, tabBeli, tabSewa, tabBaru].forEach(el => el.classList.remove('aktif'));
        
        if (tujuan === 'beli') {
            btnBeli.classList.add('aktif');
            tabBeli.classList.add('aktif');
        } else if (tujuan === 'sewa') {
            btnSewa.classList.add('aktif');
            tabSewa.classList.add('aktif');
        } else {
            tabBaru.classList.add('aktif');
        }
    }

    // Event klik
    btnBeli.addEventListener('click', () => { tujuan = 'beli'; tandaiTombol(); });
    btnSewa.addEventListener('click', () => { tujuan = 'sewa'; tandaiTombol(); });
    tabBeli.addEventListener('click', () => { tujuan = 'beli'; tandaiTombol(); });
    tabSewa.addEventListener('click', () => { tujuan = 'sewa'; tandaiTombol(); });
    tabBaru.addEventListener('click', () => { tujuan = 'baru'; tandaiTombol(); });

    // Jalankan pertama kali
    tandaiTombol();
});
