let paketTerpilih = null;

// Ambil elemen DOM
const tombolLanjut = document.getElementById('lanjutBayar');
const kotakSetuju = document.getElementById('setujuSyarat');
const dropdownStatus = document.getElementById('jenisAkunUpgrade');

// === PILIH PAKET ===
document.querySelectorAll('.pilih-paket').forEach(tombol => {
    tombol.addEventListener('click', () => {
        // Hapus tanda terpilih semua kartu
        document.querySelectorAll('.kartu-tingkatan').forEach(kartu => {
            kartu.style.outline = '';
            kartu.style.boxShadow = '';
            const btn = kartu.querySelector('.pilih-paket');
            btn.textContent = 'Pilih Paket';
            btn.classList.remove('utama');
        });

        // Tandai kartu yang dipilih
        const kartuAktif = tombol.closest('.kartu-tingkatan');
        kartuAktif.style.outline = '3px solid #165DFF';
        kartuAktif.style.boxShadow = '0 0 12px rgba(22, 93, 255, 0.2)';
        tombol.textContent = 'Terpilih ✅';

        // Simpan data paket
        paketTerpilih = kartuAktif.dataset.paket;
        console.log("✅ Paket dipilih:", paketTerpilih);

        // Cek syarat tombol lanjut
        cekSemuaSyarat();
    });
});

// === CEK SYARAT TOMBOL ===
function cekSemuaSyarat() {
    const sudahPilihPaket = paketTerpilih !== null;
    const sudahPilihStatus = dropdownStatus.value !== '';
    const sudahSetuju = kotakSetuju.checked;

    tombolLanjut.disabled = !(sudahPilihPaket && sudahPilihStatus && sudahSetuju);
}

// === AKSI LANJUT KE PEMBAYARAN ===
tombolLanjut.addEventListener('click', () => {
    // Cek login dulu
    const sesi = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');
    if (!sesi) {
        alert('⚠️ Silakan Masuk / Daftar Akun Dulu!');
        localStorage.setItem('tujuanSetelahLogin', 'membership.html');
        return window.location.href = 'login.html';
    }

    // Simpan data ke sesi
    sesi.paketAkanDibayar = paketTerpilih;
    sesi.jenis_akun = dropdownStatus.value;
    sesi.tanggalPesanPaket = new Date().toLocaleString('id-ID');
    localStorage.setItem('sesiTeravia', JSON.stringify(sesi));

    // Pindah ke halaman tagihan
    window.location.href = `invoice.html?jenis=paket&id=${Date.now()}`;
});

// === PERBARUI CEK SETIAP UBAHAN ===
dropdownStatus.addEventListener('change', cekSemuaSyarat);
kotakSetuju.addEventListener('change', cekSemuaSyarat);
cekSemuaSyarat();
