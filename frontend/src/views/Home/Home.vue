<script setup>
import { useAuthStore } from '@/stores/authStore';
import { usePostStore } from '@/stores/postsStore';
import { useImageStore } from '@/stores/imageStore';
import CreatePost from '@/components/CreatePost.vue';
import Posts from '@/components/Posts.vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const postStore = usePostStore();
const imageStore = useImageStore();
const toast = useToast();

const fileInput = ref(null);
//triggers file picker
const triggerFilePicker = () => {
    fileInput.value.click();

}
const uploadImage = async (event) => {
    //event target that targets the file input
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startswith('image/')) {
        toast.error('Please select a valid image file.');
        return;
    }
    try {
        const imageUrl = await imageStore.uploadImage(file);
        if (imageUrl) {
            toast.success('Image uploaded successfully!');
        } else {
            toast.error('Image upload failed.' && imageUrl.message);
        }
    } catch (error) {
        console.error('Image upload failed:', error);
        return null;
    }

    event.target.value = '';
}

</script>
<template>
    <div :class="postStore.isDark ? 'bg-indigo-900' : 'bg-white' "  class = "min-h-screen w-full flex flex-col ">
        <div :class="authStore.isOwner ? 'block' : 'hidden' " class = "pt-30 px-30">
        <CreatePost />
        </div>
        <div class = "px-30 grid" :class="authStore.isGuest ? 'pt-30' : 'pt-15'">
            <Posts />
        </div>
        <div>
            <img  :src="imageStore.image || '@/images/default.jpg'" alt='Profile' class ='fixed top-50 right-95 h-24 w-24 rounded-full'/>
            <!--call the uploadImage so that event.target knows which input type to target-->
            <input ref="fileInput" type="file" accept="image/*" @change="uploadImage" class="hidden"/>
            <button class ='fixed top-80 right-90 bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition-all duration-300' @click='triggerFilePicker' :disabled="imageStore.uploadStatus === 'uploading'">{{ imageStore.uploadStatus === 'uploading' ? 'Uploading...' : 'Upload Image'}}</button>
        </div>
     </div>
    
     
   
    
    </template>