// DATA AKUN ADMIN
const AKUN_ADMIN = {
    email: "teravia.admin@gmail.com",
    sandi: "TeraviaAdmin@2026"
};

// JIKA SUDAH LOGIN, LANGSUNG KE DASHBOARD
if(localStorage.getItem('adminLogin') === 'YA_SUDAH_MASUK'){
    window.location.replace('/admin-dashboard.html');
}

// PROSES KIRIM FORM
document.getElementById('formLogin').addEventListener('submit', function(e){
    e.preventDefault();
    
    const emailMasuk = document.getElementById('email').value.trim();
    const sandiMasuk = document.getElementById('sandi').value.trim();
    const pesanSalah = document.getElementById('pesanSalah');

    // COCOKKAN DATA
    if(emailMasuk === AKUN_ADMIN.email && sandiMasuk === AKUN_ADMIN.sandi){
        localStorage.setItem('adminLogin', 'YA_SUDAH_MASUK');
        window.location.replace('/admin-dashboard.html');
    } else {
        pesanSalah.style.display = 'block';
    }
});

