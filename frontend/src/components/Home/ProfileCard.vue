<script setup>
import { useAuthStore } from '@/stores/authStore';
import { usePostStore } from '@/stores/postsStore';
import { useImageStore } from '@/stores/imageStore';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { Icon } from '@iconify/vue';
import defaultImg from '@/images/default.jpg';

const authStore = useAuthStore();
const postStore = usePostStore();
const imageStore = useImageStore();
const toast = useToast();

const fileInput = ref(null);
const loading = ref(false);

const triggerFilePicker = () => {
    fileInput.value.click();
}

const uploadImage = async (event) => {
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
    } finally {
        loading.value = false;
    }

    event.target.value = '';
}
</script>

<template>
    <div :class="[
        'rounded-xl overflow-hidden transition-all duration-300 border shadow-xl',
        postStore.isDark ? 'bg-[#0d0d1c]/60 backdrop-blur-2xl border-white/10 shadow-[0_0_20px_rgba(210,187,255,0.05)] hover:shadow-[0_0_20px_rgba(210,187,255,0.2)] hover:border-[#d2bbff]/30' : 'bg-white shadow-lg border-gray-100'
    ]">
        <div class="h-32 bg-gradient-to-br from-[#7c3aed] via-[#be009d] to-[#121221] relative overflow-hidden">
            <input ref="fileInput" type="file" accept="image/*" @change="uploadImage" class="hidden"/>
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30"></div>
        </div>
        <div class="px-6 pb-6 relative">
            <div class="w-20 h-20 rounded-full border-4 absolute -top-10 overflow-hidden group cursor-pointer"
                :class="[postStore.isDark ? 'border-[#1a1a2a] bg-[#343344]' : 'border-white bg-gray-100']"
                @click="authStore.isOwner ? triggerFilePicker() : null">
                <img :src="imageStore.image || defaultImg" alt="Profile"
                     class="w-full h-full object-cover transition-opacity duration-300"
                     :class="authStore.isOwner ? 'group-hover:opacity-60' : ''"/>
                <div v-if="authStore.isOwner" class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon icon="mdi:camera" class="text-white text-2xl drop-shadow-md" />
                </div>
            </div>
            
            <div class="mt-12">
                <h2 :class="postStore.isDark ? 'text-[#e3e0f6]' : 'text-gray-900'" class="text-2xl font-bold tracking-tight">Miq</h2>
                <p class="text-[#d2bbff] mb-4 font-medium text-sm">@miq_dev</p>
                <p :class="postStore.isDark ? 'text-[#ccc3d8]' : 'text-gray-500'" class="mb-6 text-sm leading-relaxed">
                    Currently a College Student, Web Developer by passion, and lifelong learner. Documenting my journey one post at a time.
                </p>
                <div class="flex gap-3 mt-4">
                    <a href="#" :class="postStore.isDark ? 'bg-[#343344] text-[#ccc3d8] hover:bg-white/10 hover:text-[#d2bbff]' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-[#7c3aed]'" class="w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                        <Icon icon="mdi:link-variant" class="text-xl" />
                    </a>
                    <a href="#" :class="postStore.isDark ? 'bg-[#343344] text-[#ccc3d8] hover:bg-white/10 hover:text-[#d2bbff]' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-[#7c3aed]'" class="w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                        <Icon icon="mdi:github" class="text-xl" />
                    </a>
                    <a href="#" :class="postStore.isDark ? 'bg-[#343344] text-[#ccc3d8] hover:bg-white/10 hover:text-[#d2bbff]' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-[#7c3aed]'" class="w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                        <Icon icon="mdi:email-outline" class="text-xl" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
