/* ==========================================================
   TERAVIA
   Property Service
   assets/js/services/property-service.js
   Version : 1.0
========================================================== */

const PropertyService = (() => {

    /**
     * Simpan Property
     */
    async function create(payload, images = []) {

        const {

            data: property,

            error

        } = await supabase

            .from("properties")

            .insert(payload)

            .select()

            .single();


        if(error){

            throw error;

        }


        if(images.length){

            const imageRows =

                images.map((image,index)=>({

                    property_id:

                        property.id,

                    image_url:

                        image.url,

                    storage_path:

                        image.path,

                    sort_order:

                        index + 1,

                    is_cover:

                        index === 0

                }));



            const {

                error:imageError

            } = await supabase

                .from("property_images")

                .insert(imageRows);


            if(imageError){

                throw imageError;

            }

        }


        return property;

    }




    /**
     * Detail Property
     */
    async function getById(id){

        const {

            data,

            error

        } = await supabase

            .from("properties")

            .select(`

                *,

                property_images(*)

            `)

            .eq("id",id)

            .single();


        if(error){

            throw error;

        }


        return data;

    }




    /**
     * Update Property
     */
    async function update(id,payload){

        const {

            error

        } = await supabase

            .from("properties")

            .update(payload)

            .eq("id",id);


        if(error){

            throw error;

        }

    }




    /**
     * Delete Property
     */
    async function remove(id){

        const {

            error

        } = await supabase

            .from("properties")

            .delete()

            .eq("id",id);


        if(error){

            throw error;

        }

    }




    return{

        create,

        getById,

        update,

        remove

    };

})();
