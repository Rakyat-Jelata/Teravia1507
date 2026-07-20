/* ==========================================================
   TERAVIA
   Dashboard
   assets/js/dashboard.js
========================================================== */


async function loadDashboard(){


    const user =
    await getCurrentUser();


    if(!user) return;



    // Ambil profile
    const { data: profile, error } =

    await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();



    if(error){

        console.error(error);
        return;

    }



    // Tampilkan data user

    const nama =
    document.getElementById('namaUser');


    if(nama){

        nama.textContent =
        profile.nama_lengkap;

    }



    const jenis =
    document.getElementById('jenisAkun');


    if(jenis){

        jenis.textContent =
        profile.jenis_akun;

    }



    const role =
    document.getElementById('roleUser');


    if(role){

        role.textContent =
        profile.role;

    }



}

// LOGOUT

const btnLogout = document.getElementById('btnLogout');


if(btnLogout){

    btnLogout.addEventListener('click', async function(){

        try{

            await logoutUser();

            window.location.href = '../login.html';


        }catch(error){

            console.error(error);

        }

    });

}


loadDashboard();
