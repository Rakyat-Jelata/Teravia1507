// Cek status login
const sesi = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');
if(!sesi) { 
    alert('Silakan masuk dulu!'); 
    location.href='../login.html'; 
}

// Ambil data iklan
const idIklan = new URLSearchParams(window.location.search).get('id');
const semuaIklan = JSON.parse(localStorage.getItem('daftarIklan') || '[]');
const iklan = semuaIklan.find(i => i.id === idIklan);

if(!iklan) { 
    alert('Iklan tidak ditemukan!'); 
    location.href='iklan-saya.html'; 
}

// Tampilkan ringkasan iklan
document.getElementById('infoIklan').innerHTML = `
    <div class="judul">${iklan.judul}</div>
    <div class="ringkas">${iklan.kecamatan || ''}, ${iklan.kabupaten || ''}</div>
    <div class="ringkas">Harga: Rp ${Number(iklan.harga).toLocaleString('id-ID')}</div>
`;

let hargaTerpilih = 0;
let hariTerpilih = 0;
let pesananBaru = null;

// Pilih durasi
document.querySelectorAll('.opsi').forEach(el => {
    el.addEventListener('click', function(){
        document.querySelectorAll('.opsi').forEach(o => o.classList.remove('terpilih'));
        this.classList.add('terpilih');
        hargaTerpilih = parseInt(this.dataset.harga);
        hariTerpilih = parseInt(this.dataset.hari);
        document.getElementById('nilaiTotal').textContent = `Rp ${hargaTerpilih.toLocaleString('id-ID')}`;
    });
});

// Lanjut bayar
document.getElementById('tombolLanjut').addEventListener('click', function(){
    if(hargaTerpilih === 0){
        return alert('⚠️ Silakan pilih durasi promosi dulu!');
    }

    // Simpan pesanan
    const pesanan = JSON.parse(localStorage.getItem('pesananAds') || '[]');
    pesananBaru = {
        id: Date.now(),
        userId: sesi.id,
        idIklan: idIklan,
        judulIklan: iklan.judul,
        durasiHari: hariTerpilih,
        biaya: hargaTerpilih,
        status: 'menunggu bayar',
        tanggal: new Date().toLocaleString('id-ID')
    };
    pesanan.push(pesananBaru);
    localStorage.setItem('pesananAds', JSON.stringify(pesanan));

    alert(`✅ Pesanan promosi tercatat!`);
    window.location.href = `invoice.html?jenis=ads&id=${pesananBaru.id}`;
});

