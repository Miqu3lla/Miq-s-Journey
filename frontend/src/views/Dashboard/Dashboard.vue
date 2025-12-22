<script setup>
import { usePostStore } from '@/stores/postsStore';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/stores/authStore';

const PostStore = usePostStore();
const AuthStore = useAuthStore();

</script>

<template>
    <div :class ="PostStore.isDark ? 'bg-indigo-900 text-white' : 'bg-white text-black' " class = "min-h-screen  ">
        <div :class="AuthStore.isOwner ? 'block' : 'hidden' " class = "pt-30 px-30">
            <h1 class = "text-3xl font-semibold mb-6">Dashboard</h1>
            <!-- Dashboard content goes here --> 
        </div>
    </div>
</template>