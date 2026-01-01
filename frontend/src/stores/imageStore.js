import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

// Pinia store for managing image uploads

export const useImageStore = defineStore('images', () => {
    const uploadStatus = ref('idle'); // idle, uploading, success, error
    const uploadError = ref(null);
    const image = ref(JSON.parse(localStorage.getItem('avatar')) ||  null);





    //getters 



    //Actions 

    //Action to upload image to backend
    const uploadImage = async (file) => {
        try {
            uploadStatus.value = 'uploading';
            uploadError.value = null;

            // Prepare form data
            const formData = new FormData();
            //send the file with the key avatar and let it only upload images
            formData.append('avatar', file);
            // Send POST request to backend
            const response = await axios.post('http://localhost:4000/api/user/avatar', formData)
            
            image.value = response.data.avatarURL;
            uploadStatus.value = 'success';
            localStorage.setItem('avatar', JSON.stringify(image.value))
            return {
                success: true,
                message: 'Image uploaded successfully',
            }
        }catch (err) {
            uploadStatus.value = 'error';
            uploadError.value = err.response?.data?.message || 'Image upload failed';
            return {
                success: false,
                message: uploadError.value
            }
        }
    }

    return {
        uploadStatus,
        uploadError,
        image,

        //actions
        uploadImage
    }
})