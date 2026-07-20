/* ==========================================================
   TERAVIA
   Membership
   assets/js/membership.js
========================================================== */


let paketDipilih = null;


// pilih paket

const tombolPaket =
document.querySelectorAll('.pilih-paket');


tombolPaket.forEach(button => {


    button.addEventListener('click', function(){


        const kartu =
        this.closest('.kartu-tingkatan');


        paketDipilih =
        kartu.dataset.paket;


        // hapus aktif sebelumnya
        document
        .querySelectorAll('.kartu-tingkatan')
        .forEach(k => {

            k.classList.remove('terpilih');

        });


        kartu.classList.add('terpilih');


        cekForm();


    });


});



// checkbox syarat

const syarat =
document.getElementById('setujuSyarat');


if(syarat){

    syarat.addEventListener(
    'change',
    cekForm
    );

}



// jenis akun

const jenisAkun =
document.getElementById('jenisAkunUpgrade');


if(jenisAkun){

    jenisAkun.addEventListener(
    'change',
    cekForm
    );

}




function cekForm(){


    const tombol =
    document.getElementById('lanjutBayar');


    if(
        paketDipilih &&
        syarat.checked &&
        jenisAkun.value
    ){

        tombol.disabled = false;


    }else{


        tombol.disabled = true;


    }


}




// lanjut pembayaran

const lanjut =
document.getElementById('lanjutBayar');


if(lanjut){


    lanjut.addEventListener('click', function(){


        localStorage.setItem(
            'paketTerpilih',
            paketDipilih
        );


        localStorage.setItem(
            'jenisAkunUpgrade',
            jenisAkun.value
        );


        window.location.href =
        'pembayaran.html';


    });


}
