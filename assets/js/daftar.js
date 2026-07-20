// 1. Fungsi tampil/sembunyi kata sandi
const inputSandi = document.getElementById('kataSandi');
const tombolMata = document.getElementById('toggleMata');

tombolMata.addEventListener('click', () => {
    const tipe = inputSandi.type === 'password' ? 'text' : 'password';
    inputSandi.type = tipe;
    tombolMata.textContent = tipe === 'password' ? '👁️' : '🙈';
});

// 2. Logika pendaftaran
document.getElementById('formDaftar').addEventListener('submit', function(e) {
    e.preventDefault();

    // Ambil nilai input
    const nama = document.getElementById('namaLengkap').value.trim();
    const jenisAkun = document.getElementById('jenisAkun').value;
    const noHp = document.getElementById('noHp').value.trim();
    const email = document.getElementById('email').value.trim();
    const sandi = document.getElementById('kataSandi').value.trim();

    // Validasi nomor HP Indonesia
    if (!/^08[0-9]{8,12}$/.test(noHp)) {
        alert('⚠️ Masukkan nomor HP yang benar (mulai 08, 10-14 digit)!');
        return;
    }

    // Cek apakah email sudah terdaftar
    const akunTerdaftar = JSON.parse(localStorage.getItem('daftarAkunTeravia') || '[]');
    if (akunTerdaftar.some(a => a.email === email)) {
        alert('⚠️ Email ini sudah terdaftar! Silakan masuk atau gunakan email lain.');
        return;
    }

    // Ambil paket yang dipilih dari halaman keanggotaan
    const paketTerpilih = localStorage.getItem('paketAkanDibayar') || 'Gratis';

    // Susun data akun lengkap
    const akunBaru = {
        idAkun: Date.now(),
        namaLengkap: nama,
        jenis_akun: jenisAkun,
        noTelp: noHp,
        email: email,
        kataSandi: sandi,
        jenisKeanggotaan: paketTerpilih,
        tanggalDaftar: new Date().toLocaleDateString('id-ID'),
        statusAktif: true
    };

    // Simpan daftar semua akun & sesi login
    akunTerdaftar.push(akunBaru);
    localStorage.setItem('daftarAkunTeravia', JSON.stringify(akunTerdaftar));
    localStorage.setItem('sesiTeravia', JSON.stringify(akunBaru));

    // Bersihkan data sementara paket
    localStorage.removeItem('paketAkanDibayar');

    // Arahkan ke halaman tujuan
    alert('✅ Pendaftaran berhasil! Selamat datang di Teravia.');
    const tujuan = localStorage.getItem('tujuanSetelahLogin') || 'index.html';
    localStorage.removeItem('tujuanSetelahLogin');
    window.location.href = tujuan;
});
