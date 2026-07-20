/* ==========================================================
   TERAVIA
   Supabase Configuration
   assets/js/supabase.js
========================================================== */

const SUPABASE_CONFIG = {
    url: "https://jvzrhjlwaysbsqyawnci.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2enJoamx3YXlzYnNxeWF3bmNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxODkyMzYsImV4cCI6MjA5OTc2NTIzNn0.rnc5A6xABjEMI0pG-g0hCCRdFK0Om2UspFjTjOkCzeU"
};


// Create Supabase Client
const supabaseClient = window.supabase.createClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey
);
