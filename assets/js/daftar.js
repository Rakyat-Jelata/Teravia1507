/* ==========================================================
   TERAVIA
   Register Page
   assets/js/daftar.js
========================================================== */


// Toggle password
const inputSandi = document.getElementById('kataSandi');
const tombolMata = document.getElementById('toggleMata');

tombolMata.addEventListener('click', () => {

    const tipe = inputSandi.type === 'password'
        ? 'text'
        : 'password';

    inputSandi.type = tipe;
    tombolMata.textContent =
        tipe === 'password' ? '👁️' : '🙈';

});


// Register
document
.getElementById('formDaftar')
.addEventListener('submit', async function(e){

    e.preventDefault();


    const nama = document
        .getElementById('namaLengkap')
        .value.trim();

    const jenisAkun = document
        .getElementById('jenisAkun')
        .value;

    const noHp = document
        .getElementById('noHp')
        .value.trim();

    const email = document
        .getElementById('email')
        .value.trim();

    const password = document
        .getElementById('kataSandi')
        .value.trim();



    // Validasi HP
    if(!/^08[0-9]{8,12}$/.test(noHp)){
        alert('⚠️ Nomor HP tidak valid');
        return;
    }


    // Validasi jenis akun
    if(!jenisAkun){
        alert('⚠️ Pilih jenis akun');
        return;
    }


    try {

        const user = await registerUser({
            nama,
            jenisAkun,
            noHp,
            email,
            password
        });


        alert(
            '✅ Pendaftaran berhasil! Silakan cek email untuk verifikasi.'
        );


        window.location.href = 'login.html';


    } catch(error){

        console.error(error);

        alert(
            '❌ Pendaftaran gagal: ' + error.message
        );

    }


});
