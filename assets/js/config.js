/* ==========================================================
   TERAVIA
   Global Configuration
   assets/js/config.js
   Version : 1.0.0
========================================================== */

const TERAVIA_CONFIG = Object.freeze({

    APP: {
        NAME: "TERAVIA",
        VERSION: "1.0.0"
    },

    STORAGE: {
        SESSION: "sesiTeravia",
        REDIRECT: "tujuanSetelahLogin"
    },

    ROUTE: {
        HOME: "index.html",
        LOGIN: "login.html",
        REGISTER: "register.html",
        DASHBOARD: "dashboard.html",
        PROFILE: "profil.html",
        POST_PROPERTY: "pages/pasang-iklan.html"
    },

    TRIAL: {
        EMAIL: "teravia.vip@gmail.com",
        PASSWORD: "TeraviaVip@2026"
    },

    MEMBER: {
        ID: "trial-001",
        NAME: "Teravia VIP",
        EMAIL: "teravia.vip@gmail.com",
        PACKAGE: "Estate Premium",
        ROLE: "broker",
        ADMIN: false
    },

    STATUS: {
        LOGIN: true,
        LOGOUT: false
    }

});
