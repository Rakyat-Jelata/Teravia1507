/* ==========================================================
   TERAVIA
   Modal Component
   assets/js/components/modal.js
========================================================== */

const Modal = (() => {

    let modal;

    function create() {

        if (document.getElementById("teravia-modal")) return;

        modal = document.createElement("div");

        modal.id = "teravia-modal";

        modal.className = "modal";

        modal.innerHTML = `
            <div class="modal-overlay"></div>

            <div class="modal-content">

                <div class="modal-body"></div>

            </div>
        `;

        document.body.appendChild(modal);

        modal
            .querySelector(".modal-overlay")
            .addEventListener("click", close);

    }

    function open(html) {

        if (!modal) create();

        modal
            .querySelector(".modal-body")
            .innerHTML = html;

        modal.classList.add("active");

    }

    function close() {

        modal.classList.remove("active");

    }

    return {

        open,

        close

    };

})();
