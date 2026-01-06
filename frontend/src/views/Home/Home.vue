<script setup>
import { useAuthStore } from '@/stores/authStore';
import { usePostStore } from '@/stores/postsStore';
import { useImageStore } from '@/stores/imageStore';
import CreatePost from '@/components/CreatePost.vue';
import Posts from '@/components/Posts.vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import defaultImg from '@/images/default.jpg';

const authStore = useAuthStore();
const postStore = usePostStore();
const imageStore = useImageStore();
const toast = useToast();

const fileInput = ref(null);
const loading = ref(false);
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
    loading.value = true;

    if (loading.value) {
        toast.info('Uploading image, please wait...');
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
    }finally {
        loading.value = false;
    }

    event.target.value = '';
}

</script>
<template>
    <div :class="postStore.isDark ? 'bg-[#1e1a4d]' : 'bg-white'" class="min-h-screen flex flex-col">
        <div class="flex flex-col lg:flex-row pt-20 md:pt-20 lg:pt-30 px-4 sm:px-8 md:px-16 lg:px-30 gap-6 lg:gap-10">
            <div :class="['hidden xl:block max-w-md w-full', authStore.isOwner ? 'order-2' : 'order-1']">
                <div :class="[postStore.isDark ? 'bg-gray-800' : 'bg-white ', 'rounded-3xl overflow-hidden shadow-2xl ']">
                    <div class="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 ">
                        <input ref="fileInput" type="file" accept="image/*" @change="uploadImage" class="hidden"/>
                    </div>
                    
                    <div class="px-8 pb-8 pt-4 relative">
                        <div class="absolute -top-16 left-8">
                            <div :class="authStore.isOwner ? 'relative cursor-pointer group' : 'relative cursor-default'"
                                @click="authStore.isOwner ? triggerFilePicker() : null">
                                <img :src="imageStore.image || defaultImg" alt='Profile' 
                                    :class="['h-32 w-32 rounded-full object-cover border-4 border-gray-800 shadow-xl',
                                        authStore.isOwner ? 'group-hover:opacity-90 transition-opacity' : ''
                                    ]"/>
                                <div  v-if="authStore.isOwner"
                                    class="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span class="text-white text-2xl">📷</span>
                                </div>
                            </div>
                        </div>
                        
                        <div :class="[postStore.isDark ? 'text-white' : 'text-black', 'mt-20']">
                            <h2 class="text-2xl font-bold  mb-2">Miq</h2>
                            <p class="text-gray-400 text-sm leading-relaxed">
                                Currently a College Student, Web Developer by passion, and lifelong learner. Documenting my journey one post at a time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="[authStore.isOwner ? 'block order-1' : 'hidden', 'w-full lg:flex-1']">
                <CreatePost />
            </div>
        </div>
        
        <div class="px-4 sm:px-8 md:px-16 lg:px-30 grid" :class="authStore.isGuest ? 'pt-10 md:pt-20 lg:pt-30' : 'pt-8 md:pt-12 lg:pt-15'">
            <Posts />
        </div>
    </div>
</template>