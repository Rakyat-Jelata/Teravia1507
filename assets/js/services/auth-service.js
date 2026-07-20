/* ==========================================================
   TERAVIA
   Auth Service
   assets/js/services/auth-service.js
========================================================== */

async function registerUser(data) {

    const { nama, jenisAkun, noHp, email, password } = data;

    // 1. Buat akun di Supabase Auth
    const { data: authData, error: authError } =
        await supabase.auth.signUp({
            email: email,
            password: password
        });

    if (authError) {
        throw authError;
    }

    const user = authData.user;

    // 2. Simpan data tambahan ke profiles
    const { error: profileError } =
        await supabase
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


// Login
async function loginUser(email, password) {

    const { data, error } =
        await supabase.auth.signInWithPassword({
            email,
            password
        });

    if (error) {
        throw error;
    }

    return data;
}


// Logout
async function logoutUser() {

    const { error } =
        await supabase.auth.signOut();

    if (error) {
        throw error;
    }
}


// Cek user aktif
async function getCurrentUser() {

    const { data } =
        await supabase.auth.getUser();

    return data.user;
}
