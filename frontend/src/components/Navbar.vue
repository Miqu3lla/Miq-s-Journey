<script setup >
import { useAuthStore } from '@/stores/authStore';
import { usePostStore } from '@/stores/postsStore';
import { Icon } from '@iconify/vue';
import { onMounted, ref, defineProps } from 'vue';
import { useToast } from 'vue-toastification';


const authStore = useAuthStore();
const PostStore = usePostStore();
const Toast = useToast();
const query = ref('');

const searchPost = () => {
    // Implement search logic here
    const search = query.value.toLowerCase();
    if (!search) {
        PostStore.viewPosts();
        return;
    }

    PostStore.posts = PostStore.posts.filter(post => 
        post.title.toLowerCase().includes(search) ||
        post.content.toLowerCase().includes(search)
    );
}

const logout = () => {
    authStore.logout();
    Toast.success('You have been logged out successfully.');

}

</script>


<template>
    <nav>
        <div  :class="PostStore.isDark ? ' flex bg-[#1e293b] shadow-md justify-between text-white' : 'flex bg-white shadow-md justify-between text-black'" 
        class="fixed top-0 left-0 w-full h-16 items-center px-6 z-50">
            <div class="flex">
                <div class ="p-2">
                    <Icon icon="mdi:alpha-m" class="h-12 w-12 bg-indigo-600 rounded-md text-white p-1 ml-5"/>
                </div>
                <div class = "flex flex-col justify-center hidden sm:hidden md:hidden lg:flex xl:flex">
                    <h1 class="text-xl font-semibold ml-2">Miq's Journey</h1>
                    <h1 :class="PostStore.isDark ? 'text-gray-400' : 'text-gray-500'" class="text-md font-medium ml-2"> Your own Personal Space</h1>
                </div>
            </div>
            <div class = 'md:block flex lg:hidden xl:hidden'>
                <hi>hi</hi>
            </div>
            <div class = 'flex mr-5 items-center gap-4 hidden lg:flex xl:flex'>
                <!-- Search Bar -->
                <div class="relative">
                    <Icon icon="mdi:magnify" :class="isDark ? 'text-gray-400' : 'text-gray-400'" class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"/>
                    <input 
                        v-model="query"
                        @input="searchPost()"
                        type="text" 
                        placeholder="Search posts..." 
                        :class="isDark ? 'bg-[#334155] text-white border-[#334155] placeholder-gray-400' : 'bg-white text-black border-gray-300'"
                        class="pl-10 pr-4 py-2 w-80 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
                <!-- Grid View Button -->
                <div @click="PostStore.isGridView":class="isDark ? 'text-gray-300 bg-[#334155] hover:bg-[#475569]' : 'text-gray-600 bg-gray-100 hover:bg-indigo-500'"
                    class="h-10 w-10 flex items-center justify-center rounded-md hover:text-white transition-colors cursor-pointer"
                    title="Grid View">
                    <Icon icon="mdi:view-grid" class="h-6 w-6"/> 
                </div>
                <!-- Light/Dark Mode Toggle -->
                <div @click ="PostStore.isDarkMode" 
                    :class="isDark ? 'text-yellow-300 bg-[#334155] hover:bg-indigo-500' : 'text-gray-600 bg-yellow-100 hover:bg-yellow-400'"
                    class="h-10 w-10 flex items-center justify-center rounded-md hover:text-white transition-colors cursor-pointer"
                    title="Toggle Theme">
                    <Icon :icon="isDark ? 'mdi:moon-waning-crescent' : 'mdi:white-balance-sunny'" class="h-6 w-6"/> 
                </div>

                <!-- Dashboard Button -->
                <button :class="isDark ? 'bg-transparent border border-gray-600 hover:bg-[#334155]' : 'bg-indigo-600 hover:bg-indigo-500'"
                    class="px-6 py-2 text-white rounded-full transition-colors font-medium">
                    Dashboard
                </button>
                <!-- Logout Button -->
                <div @click="logout" title="Logout" 
                    :class="isDark ? 'text-gray-300 bg-transparent hover:bg-red-500' : 'text-gray-600 bg-gray-100 hover:bg-red-400'"
                    class="h-10 w-10 flex items-center justify-center rounded-md hover:text-white transition-colors cursor-pointer">
                    <Icon icon="mdi:logout" class="h-6 w-6"/> 
                </div>
            </div>
        </div>
    </nav>
</template>