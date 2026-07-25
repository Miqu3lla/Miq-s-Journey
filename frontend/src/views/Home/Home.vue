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
        const result = await imageStore.uploadImage(file);

        if (result.success) {
            toast.success('Image uploaded successfully!');
        } else {
            toast.error('Image upload failed: ' + result.message);
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
    <div :class="postStore.isDark ? 'bg-[#121221] text-[#e3e0f6]' : 'bg-white text-black'" class="min-h-screen flex flex-col transition-colors duration-300">
        <div class="flex flex-col lg:flex-row pt-24 md:pt-28 lg:pt-32 px-4 sm:px-8 md:px-16 lg:px-30 gap-6 lg:gap-10">
            <div :class="['hidden xl:block max-w-md w-full', authStore.isOwner ? 'order-2' : 'order-1']">
                <div :class="[postStore.isDark ? 'bg-[#1e293b]/60 backdrop-blur-xl border border-white/5 shadow-[0_0_20px_rgba(124,58,237,0.1)]' : 'bg-white shadow-2xl', 'rounded-3xl overflow-hidden']">
                    <div class="h-32 bg-gradient-to-r from-[#7c3aed] to-[#00f4fe]">
                        <input ref="fileInput" type="file" accept="image/*" @change="uploadImage" class="hidden"/>
                    </div>
                    
                    <div class="px-8 pb-8 pt-4 relative">
                        <div class="absolute -top-16 left-8">
                            <div :class="authStore.isOwner ? 'relative cursor-pointer group' : 'relative cursor-default'"
                                @click="authStore.isOwner ? triggerFilePicker() : null">
                                <img :src="imageStore.image || defaultImg" alt='Profile' 
                                    :class="['h-32 w-32 rounded-full object-cover border-4 shadow-xl',
                                        postStore.isDark ? 'border-[#121221]' : 'border-white',
                                        authStore.isOwner ? 'group-hover:opacity-90 transition-opacity' : ''
                                    ]"/>
                                <div  v-if="authStore.isOwner"
                                    class="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span class="text-white text-2xl">📷</span>
                                </div>
                            </div>
                        </div>
                        
                        <div :class="[postStore.isDark ? 'text-[#e3e0f6]' : 'text-black', 'mt-20']">
                            <h2 class="text-2xl font-bold mb-2 tracking-tight">Miq</h2>
                            <p :class="postStore.isDark ? 'text-[#ccc3d8]' : 'text-gray-500'" class="text-sm leading-relaxed">
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