// Cek status login terlebih dahulu
const sesi = JSON.parse(localStorage.getItem('sesiTeravia') || 'null');
if(!sesi) { 
    alert('⚠️ Silakan masuk dulu untuk mengakses halaman favorit!'); 
    location.href='login.html'; 
}
