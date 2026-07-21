/* ==========================================================
   TERAVIA
   Storage Service
   assets/js/services/storage-service.js
   Version : 1.0
========================================================== */

const StorageService = (() => {

    const BUCKET = "property-images";



    /**
     * Generate nama file unik
     */
    function generateFileName(file) {

        const ext =
            file.name.split(".").pop().toLowerCase();

        return `${Date.now()}_${Math.random()
            .toString(36)
            .substring(2,8)}.${ext}`;

    }



    /**
     * Upload satu gambar
     */
    async function uploadImage(file, userId) {

        const fileName =
            `${userId}/${generateFileName(file)}`;


        const { error } =
        await supabase.storage
            .from(BUCKET)
            .upload(fileName, file, {

                cacheControl: "3600",

                upsert: false

            });


        if(error){

            throw error;

        }


        const { data } =
        supabase.storage
            .from(BUCKET)
            .getPublicUrl(fileName);


        return {

            path: fileName,

            url: data.publicUrl

        };

    }




    /**
     * Upload banyak gambar
     */
    async function uploadImages(files, userId){

        const result = [];


        for(const file of files){

            const image =
                await uploadImage(
                    file,
                    userId
                );

            result.push(image);

        }


        return result;

    }




    /**
     * Hapus gambar
     */
    async function deleteImage(path){

        const { error } =
        await supabase.storage
            .from(BUCKET)
            .remove([path]);


        if(error){

            throw error;

        }

    }




    /**
     * Hapus banyak gambar
     */
    async function deleteImages(paths){

        const { error } =
        await supabase.storage
            .from(BUCKET)
            .remove(paths);


        if(error){

            throw error;

        }

    }




    return{

        uploadImage,

        uploadImages,

        deleteImage,

        deleteImages

    };

})();
