// Rumus angsuran KPR efektif yang benar
function hitungKPR(){
    const harga = parseFloat(document.getElementById('harga').value);
    const persenUangMuka = parseFloat(document.getElementById('persenUangMuka').value);
    const tahun = parseInt(document.getElementById('tahun').value);
    const bunga = parseFloat(document.getElementById('bunga').value);

    // Validasi input
    if(isNaN(harga) || harga < 10000000) {
        alert('⚠️ Masukkan harga properti yang valid!');
        return;
    }
    if(isNaN(persenUangMuka) || persenUangMuka <10 || persenUangMuka>50) {
        alert('⚠️ Uang muka minimal 10% dan maksimal 50%!');
        return;
    }
    if(isNaN(bunga) || bunga <3 || bunga>15) {
        alert('⚠️ Masukkan suku bunga antara 3% - 15%!');
        return;
    }

    // Perhitungan
    const uangMuka = harga * persenUangMuka / 100;
    const pinjaman = harga - uangMuka;
    const bungaBulanan = bunga / 100 / 12;
    const bulan = tahun * 12;

    // Rumus angsuran tetap KPR
    const angsuran = pinjaman * (bungaBulanan * Math.pow(1 + bungaBulanan, bulan)) / (Math.pow(1 + bungaBulanan, bulan) - 1);
    const totalBayar = angsuran * bulan;
    const totalBunga = totalBayar - pinjaman;

    // Tampilkan hasil
    document.getElementById('hasilSimulasi').innerHTML = `
    <div class="hasil">
        <div class="baris-hasil"><span>Uang Muka (${persenUangMuka}%)</span><span>Rp ${uangMuka.toLocaleString('id-ID')}</span></div>
        <div class="baris-hasil"><span>Pinjaman Pokok</span><span>Rp ${pinjaman.toLocaleString('id-ID')}</span></div>
        <div class="baris-hasil"><span>Total Bunga</span><span>Rp ${Math.round(totalBunga).toLocaleString('id-ID')}</span></div>
        <div class="baris-hasil"><span>Jangka Waktu</span><span>${tahun} Tahun (${bulan} Bulan)</span></div>
        <div class="baris-hasil utama"><span>Angsuran per Bulan</span><span>Rp ${Math.round(angsuran).toLocaleString('id-ID')}</span></div>
        <div class="baris-hasil"><span>Total Pembayaran</span><span>Rp ${Math.round(totalBayar).toLocaleString('id-ID')}</span></div>
    </div>`;
}
