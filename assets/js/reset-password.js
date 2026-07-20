/* ==========================================================
   TERAVIA
   Reset Password
========================================================== */


document
.getElementById('formResetPassword')
.addEventListener('submit', async function(e){

    e.preventDefault();


    const password =
    document
    .getElementById('password')
    .value
    .trim();


    const konfirmasi =
    document
    .getElementById('konfirmasiPassword')
    .value
    .trim();



    if(password !== konfirmasi){

        alert('❌ Password tidak sama');
        return;

    }



    try {


        const { error } =
        await supabaseClient.auth
        .updateUser({

            password: password

        });



        if(error){

            throw error;

        }



        alert(
            '✅ Password berhasil diubah'
        );


        window.location.href =
        'login.html';



    } catch(error){


        console.error(error);


        alert(
            '❌ Gagal reset password: '
            + error.message
        );


    }


});
