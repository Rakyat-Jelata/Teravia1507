/* ==========================================================
   TERAVIA
   Preview Modal
   Version : 1.0
========================================================== */

const PreviewModal = (()=>{

    let modal;
    let body;
    let btnPublish;

    function init(){

        modal=document.getElementById("previewModal");
        body=document.getElementById("previewBody");
        btnPublish=document.getElementById("btnPublish");

    }


    function show(payload,images=[]){

        if(!modal){
            init();
        }

        body.innerHTML=render(payload,images);

        modal.classList.add("active");

    }


    function hide(){

        modal.classList.remove("active");

    }


    function onPublish(callback){

        btnPublish.onclick=callback;

    }


    function render(data,images){

        const gallery=images.map(image=>`

            <img
                src="${image.url}"
                class="preview-image"
            >

        `).join("");



        return`

            <div class="preview-gallery">

                ${gallery}

            </div>


            <h2>${data.title}</h2>

            <h3>${formatRupiah(data.price)}</h3>


            <p>

            ${data.village_name},

            ${data.district_name},

            ${data.city_name},

            ${data.province_name}

            </p>


            <hr>


            <p><b>Kategori</b> :
            ${data.category}</p>

            <p><b>Tipe</b> :
            ${data.property_type}</p>

            <p><b>Legalitas</b> :
            ${data.legality}</p>

            <p><b>Luas Tanah</b> :
            ${data.land_area} m²</p>

            <p><b>Luas Bangunan</b> :
            ${data.building_area} m²</p>

            <p><b>Kamar Tidur</b> :
            ${data.bedrooms}</p>

            <p><b>Kamar Mandi</b> :
            ${data.bathrooms}</p>

            <hr>

            <p>${data.description}</p>

        `;

    }


    function formatRupiah(value){

        return new Intl.NumberFormat(

            "id-ID",

            {

                style:"currency",

                currency:"IDR",

                maximumFractionDigits:0

            }

        ).format(value);

    }


    return{

        show,

        hide,

        onPublish

    };

})();
