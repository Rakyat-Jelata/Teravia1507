// Ambil data sesi akun
const dataAkun = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');

// Cek akses sah
if (!dataAkun) {
    alert('⚠️ Silakan masuk terlebih dahulu untuk melihat profil!');
    window.location.href = 'login.html';
} else {
    tampilkanProfil();
}

function tampilkanProfil() {
    const wadah = document.getElementById('isiProfil');
    
    // Tentukan warna lencana paket
    let kelasLencana = 'paket-gratis';
    const namaPaket = dataAkun.jenisKeanggotaan || 'Gratis';
    if (namaPaket === 'Kaveling') kelasLencana = 'paket-kaveling';
    if (namaPaket === 'Cluster') kelasLencana = 'paket-cluster';
    if (namaPaket === 'Residence') kelasLencana = 'paket-residence';
    if (namaPaket === 'Estate Premium') kelasLencana = 'paket-estate';

    // Tampilkan data lengkap
    wadah.innerHTML = `
        <div class="baris-data">
            <span class="label">Nama Lengkap</span>
            <span class="nilai">${dataAkun.namaLengkap || '-'}</span>
        </div>
        <div class="baris-data">
            <span class="label">Email</span>
            <span class="nilai">${dataAkun.email || '-'}</span>
        </div>
        <div class="baris-data">
            <span class="label">No. Telepon</span>
            <span class="nilai">${dataAkun.noTelp || '-'}</span>
        </div>
        <div class="baris-data">
            <span class="label">Jenis Akun</span>
            <span class="nilai">${
                { pemilik: 'Pemilik Properti', agen: 'Agen Properti', broker: 'Broker' }[dataAkun.jenis_akun] 
                || dataAkun.jenis_akun || '-'
            }</span>
        </div>
        <div class="baris-data">
            <span class="label">Keanggotaan</span>
            <span class="nilai"><span class="lencana-paket ${kelasLencana}">${namaPaket}</span></span>
        </div>
    `;
}

// Aturan: Hanya berbayar yang bisa pasang iklan
function cekBisaPasangIklan() {
    const paket = dataAkun.jenisKeanggotaan || 'Gratis';
    if (paket === 'Gratis') {
        alert('⚠️ Fitur pasang iklan hanya untuk anggota berbayar! Silakan upgrade paket terlebih dahulu.');
        return window.location.href = 'membership.html';
    }
    window.location.href = 'pages/pasang-iklan.html';
}

// Fungsi keluar akun
function keluarAkun() {
    if (confirm('Yakin ingin keluar dari akun Teravia?')) {
        localStorage.removeItem('sesiTeravia');
        window.location.href = 'index.html';
    }
}
