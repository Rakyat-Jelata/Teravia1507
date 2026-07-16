document.addEventListener('DOMContentLoaded', function(){
    const tombol = document.getElementById('tombolMenu');
    const menu = document.getElementById('menuMobile');

    if(tombol && menu){
        tombol.addEventListener('click', function(){
            menu.classList.toggle('buka');
        });
    }
});
