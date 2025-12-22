<script setup>
import { useAuthStore } from '@/stores/authStore';
import { usePostStore } from '@/stores/postsStore';
import { Icon } from '@iconify/vue';
import { onMounted, ref, } from 'vue';
import CreatePost from '@/components/CreatePost.vue';
import Posts from '@/components/Posts.vue';
import { useToast } from 'vue-toastification';
import Navbar from '@/components/Navbar.vue';
const authStore = useAuthStore();
const postStore = usePostStore();

const isDark = ref(localStorage.getItem('isDarkMode') === 'true');



</script>


<template>
    <div>
        <Navbar  />
    </div>
    
    <div :class="postStore.isDark ? 'bg-indigo-900' : 'bg-white' "  class = "min-h-screen w-full ">
        <div :class="authStore.isOwner ? 'block' : 'hidden' " class = "pt-30 px-30">
        <CreatePost />
        </div>
        <div class = "px-30 grid" :class="authStore.isGuest ? 'pt-30' : 'pt-15'">
            <Posts />
        </div>
     </div>
    
     
   
    
    </template>