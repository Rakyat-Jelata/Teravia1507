/* ==========================================================
   TERAVIA
   AI Service
   assets/js/services/ai-service.js
   Version : 1.0
========================================================== */

const AIService = (() => {

    /**
     * Generate Deskripsi Properti
     */
    async function generate(data){

        const {

            data: result,

            error

        } = await supabase.functions.invoke(

            "generate-property-description",

            {

                body: data

            }

        );


        if(error){

            throw error;

        }


        return result.description;

    }



    return{

        generate

    };

})();
