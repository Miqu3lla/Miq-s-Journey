import axios from "axios";
import { ref } from "vue";

// Pinia store for managing image uploads

export const useImageStore = defineStore('images', () => {
    const uploadStatus = ref(null);
    const uploadError = ref(null);
    const image = ref(null);

    //Action to upload image to backend
    const uploadImage = async (file) => {
        try {
            uploadStatus.value = 'uploading';
            uploadError.value = null;

            // Prepare form data
            const formData = new FormData();
            formData.append('image', file);
            // Send POST request to backend
            const response = await axios.post('http://localhost:400/api/user/avatar', formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
                
            })
        }catch (err) {
            uploadStatus.value = 'error';
            uploadError.value = err.response?.data?.message || 'Image upload failed';
        }
    }
})