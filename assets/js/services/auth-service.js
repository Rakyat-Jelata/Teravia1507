/* ==========================================================
   TERAVIA
   Auth Service
   assets/js/services/auth-service.js
========================================================== */


// REGISTER USER
async function registerUser(data) {

    const { nama, jenisAkun, noHp, email, password } = data;


    // 1. Buat akun Supabase Auth
    const { data: authData, error: authError } =
        await supabaseClient.auth.signUp({
            email: email,
            password: password
        });


    if (authError) {
        throw authError;
    }


    const user = authData.user;


    // 2. Simpan profile user
    const { error: profileError } =
        await supabaseClient
            .from('profiles')
            .insert([
                {
                    id: user.id,
                    nama_lengkap: nama,
                    jenis_akun: jenisAkun,
                    no_hp: noHp,
                    email: email,
                    role: 'member'
                }
            ]);


    if (profileError) {
        throw profileError;
    }


    return user;

}



// LOGIN USER
async function loginUser(email, password) {

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });


    if (error) {
        throw error;
    }


    return data;

}



// LOGOUT USER
async function logoutUser() {

    const { error } =
        await supabaseClient.auth.signOut();


    if (error) {
        throw error;
    }

}



// GET USER AKTIF
async function getCurrentUser() {

    const { data, error } =
        await supabaseClient.auth.getUser();


    if (error) {
        throw error;
    }


    return data.user;

}

// RESET PASSWORD

async function resetPassword(email){

    const { error } =
        await supabaseClient.auth
        .resetPasswordForEmail(email,{
            redirectTo:
            window.location.origin + '/reset-password.html'
        });


    if(error){
        throw error;
    }

}
