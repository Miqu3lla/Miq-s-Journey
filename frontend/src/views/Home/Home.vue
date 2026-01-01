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

    if (!file.type.startsWith('image/')) {
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
    <div :class="postStore.isDark ? 'bg-[#1e1a4d]' : 'bg-white' "  class = "min-h-screen flex flex-col ">
        <div class = 'flex pt-30 pl-30 '>
            <div :class="[authStore.isOwner ? 'block' : 'hidden', 'w-full']">
                <CreatePost />
            </div>
            <div class="flex items-center pr-90 gap-4 ">
                <img  :src="imageStore.image || '@/images/default.jpg'" alt='Profile' class ='h-24 w-24 rounded-full object-cover'/>
                <!--call the uploadImage so that event.target knows which input type to target-->
                <input ref="fileInput" type="file" accept="image/*" @change="uploadImage" class="hidden"/>
                <button :class ="[authStore.isOwner ? 'block' : 'hidden', 'bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition-all duration-300']" @click='triggerFilePicker' :disabled="imageStore.uploadStatus === 'uploading'">{{ imageStore.uploadStatus === 'uploading' ? 'Uploading...' : 'Upload Image'}}</button>
            </div>
        </div>
        <div class = "px-30 grid" :class="authStore.isGuest ? 'pt-30' : 'pt-15'">
            <Posts />
        </div>
     </div>
    
     
   
    
    </template>