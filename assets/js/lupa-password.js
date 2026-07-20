/* ==========================================================
   TERAVIA
   Forgot Password
========================================================== */


document
.getElementById('formLupaPassword')
.addEventListener('submit', async function(e){

    e.preventDefault();


    const email =
        document
        .getElementById('email')
        .value
        .trim();


    try {

        await resetPassword(email);


        alert(
            '✅ Link reset password sudah dikirim ke email'
        );


        window.location.href =
        'login.html';


    } catch(error){

        console.error(error);

        alert(
            '❌ Gagal: ' + error.message
        );

    }


});
