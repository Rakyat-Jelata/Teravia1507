/* ==========================================================
   TERAVIA
   Login Page
   assets/js/login.js
========================================================== */


document
.getElementById('formLogin')
.addEventListener('submit', async function(e){

    e.preventDefault();


    const email =
document
.getElementById('email')
.value
.trim();


const password =
document
.getElementById('sandi')
.value
.trim();



    try {


        const data =
        await loginUser(
            email,
            password
        );



        // Ambil user aktif
        const user =
        data.user;



        // Simpan session sederhana
        localStorage.setItem(
            'teraviaUser',
            JSON.stringify(user)
        );



        alert(
            '✅ Login berhasil'
        );


        // Redirect
        const tujuan =
        localStorage.getItem(
            'tujuanSetelahLogin'
        )
        || 'index.html';



        localStorage.removeItem(
            'tujuanSetelahLogin'
        );


        window.location.href =
        tujuan;



    } catch(error){


        console.error(error);


        alert(
            '❌ Login gagal: '
            + error.message
        );


    }


});
