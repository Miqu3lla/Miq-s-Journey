<script setup>
import { usePostStore } from '@/stores/postsStore';
import { ref,onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/stores/authStore';

const PostStore = usePostStore();
const AuthStore = useAuthStore();


const postCount = PostStore.PostCount;




</script>

<template>
    <div :class ="PostStore.isDark ? 'bg-indigo-900 text-white' : 'bg-white text-black' " class = "min-h-screen  ">
        <div :class="AuthStore.isOwner ? 'block' : 'hidden' " class = "pt-30 px-30">
            <h1 class = "text-3xl font-semibold mb-6">Dashboard</h1>
            
            <div :class="PostStore.isDark ? 'bg-[#1e293b] text-white border border-gray-500 rounded-3xl shadow-md' : 'bg-white text-black  rounded-3xl shadow-lg'"
                class = "w-full max-w-4xl p-6">
                <div class = "flex items-center gap-4">
                    <Icon icon="mdi:post-outline" class="h-10 w-10 text-indigo-500"/>
                    <div>
                        <h2 class = "text-xl font-medium">Total Posts</h2>
                        <p class = "text-3xl font-bold">{{ postCount }}</p> 
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>