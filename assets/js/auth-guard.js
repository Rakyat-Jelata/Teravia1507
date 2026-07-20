/* ==========================================================
   TERAVIA
   Auth Guard
   assets/js/auth-guard.js
========================================================== */


async function cekLogin(){

    const { data } =
    await supabaseClient.auth.getSession();


    if(!data.session){

        alert('⚠️ Silakan login terlebih dahulu');

        window.location.href =
        'login.html';

        return false;
    }


    return data.session.user;
}



// Jalankan otomatis
cekLogin();
