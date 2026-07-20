const emailVerif = new URLSearchParams(window.location.search).get('email');
const semuaUser = JSON.parse(localStorage.getItem('teravia_users') || '[]');
const user = semuaUser.find(u => u.email === emailVerif);

if(user){
  user.terverifikasi = true;
  localStorage.setItem('teravia_users', JSON.stringify(semuaUser));
  document.getElementById('pesan').innerHTML = '✅ Akunmu sudah aktif!';
} else {
  document.getElementById('pesan').innerHTML = '❌ Tautan tidak valid atau sudah kadaluarsa';
}
