<script setup >
import { useAuthStore } from '@/stores/authStore';
import { usePostStore } from '@/stores/postsStore';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';


const authStore = useAuthStore();
const PostStore = usePostStore();
const Toast = useToast();
const query = ref('');
const Sidebar = ref(false);

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
        class="fixed top-0 left-0 right-0 h-16 items-center px-6 z-50 ">
            <div class="flex ml-10">
                <div class ="p-2">
                    <router-link to="/home">
                        <Icon icon="mdi:alpha-m" class="h-12 w-12 bg-indigo-600 rounded-md text-white p-1 ml-5"/>
                    </router-link>
                        
                </div>
                <div class = "flex flex-col justify-center block  lg:flex xl:flex">
                    <h1 class="text-xl font-semibold ml-2 ">Moonlit Thoughts</h1>
                    <h1 :class="PostStore.isDark ? 'text-gray-400' : 'text-gray-500'" class="text-md font-medium ml-2 hidden md:block lg:block xl:block"> Your own Personal Space</h1>
                </div>
            </div>
            <div class = ' flex lg:block xl:hidden'>
                <Icon icon="mdi:menu" @click ="Sidebar = !Sidebar":class="PostStore.isDark ? 'text-gray-300' : 'text-gray-600'" class="h-8 w-8 cursor-pointer"/>
            </div>
            <div class = 'flex mr-5 items-center gap-4 hidden xl:flex'>
                <!-- Search Bar -->
                <div class="relative">
                    <Icon icon="mdi:magnify" :class="PostStore.isDark ? 'text-gray-400' : 'text-gray-400'" class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"/>
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
                <div @click="PostStore.isGridView":class="PostStore.isDark ? 'text-gray-300 bg-[#334155] hover:bg-[#475569]' : 'text-gray-600 bg-gray-100 hover:bg-indigo-500'"
                    class="h-10 w-10 flex items-center justify-center rounded-md hover:text-white transition-colors cursor-pointer"
                    :title="PostStore.isGrid ? 'Switch to Grid View' : 'Switch to List View'">
                    <Icon :icon= "PostStore.isGrid ? 'mdi:view-list' : 'mdi:view-grid'" class="h-6 w-6"/> 
                </div>
                <!-- Light/Dark Mode Toggle -->
                <div @click ="PostStore.isDarkMode" 
                    :class="PostStore.isDark ? 'text-yellow-300 bg-[#334155] hover:bg-indigo-500' : 'text-gray-600 bg-yellow-100 hover:bg-yellow-400'"
                    class="h-10 w-10 flex items-center justify-center rounded-md hover:text-white transition-colors cursor-pointer"
                    title="Toggle Theme">
                    <Icon :icon="PostStore.isDark ? 'mdi:moon-waning-crescent' : 'mdi:white-balance-sunny'" class="h-6 w-6"/> 
                </div>

                <!-- Dashboard Button -->
                <router-link v-if="authStore.isOwner" to="/Dashboard">
                <button :class="PostStore.isDark ? 'bg-transparent border border-gray-600 hover:bg-[#334155]' : 'bg-indigo-600 hover:bg-indigo-500'"
                    class="px-9 py-2 text-white rounded-full transition-colors font-medium">
                        Dashboard
                    </button>
                    </router-link>
                <!-- Logout Button -->
                <div @click="logout" title="Logout" 
                    :class="PostStore.isDark ? 'text-gray-300 bg-[#334155] hover:bg-red-500' : 'text-gray-600 bg-gray-100 hover:bg-red-400'"
                    class="h-10 w-10 flex items-center justify-center rounded-md hover:text-white transition-colors cursor-pointer">
                    <Icon icon="mdi:logout" class="h-6 w-6"/> 
                </div>
            </div>
        </div>

        <!-- Sidebar Overlay -->
        <div 
            v-if="Sidebar"
            class="fixed inset-0 bg-black/50 z-40 lg:hidden xl:hidden">
        </div>

        <!-- Sidebar -->
        <div 
            :class="[
                Sidebar ? 'translate-x-0' : 'translate-x-full',
                PostStore.isDark ? 'bg-[#1e293b] text-white' : 'bg-white text-black'
            ]"
            class="fixed top-0 right-0 h-full w-80 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden xl:hidden"
        >
            <!-- Sidebar Header -->
            <div class="flex justify-between items-center p-6 border-b" :class="PostStore.isDark ? 'border-gray-700' : 'border-gray-200'">
                <h2 class="text-xl font-semibold">Menu</h2>
                <Icon 
                    icon="mdi:close" 
                    @click="Sidebar = false"
                    class="h-8 w-8 cursor-pointer hover:text-indigo-500 transition-colors"
                />
            </div>

            <!-- Sidebar Content -->
            <div class="flex flex-col p-6 gap-6">
                <!-- Search Bar -->
                <div class="relative">
                    <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                    <input 
                        v-model="query"
                        @input="searchPost()"
                        type="text" 
                        placeholder="Search posts..." 
                        :class="PostStore.isDark ? 'bg-[#334155] text-white border-[#334155] placeholder-gray-400' : 'bg-gray-100 text-black border-gray-300'"
                        class="pl-10 pr-4 py-2 w-full border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <!-- View Toggle -->
                <div 
                    @click="PostStore.isGridView"
                    :class="PostStore.isDark ? 'bg-[#334155] hover:bg-[#475569]' : 'bg-gray-100 hover:bg-indigo-100'"
                    class="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                >
                    <Icon :icon="PostStore.isGrid ? 'mdi:view-list' : 'mdi:view-grid'" class="h-6 w-6"/>
                    <span class="font-medium">{{ PostStore.isGrid ? 'List View' : 'Grid View' }}</span>
                </div>

                <!-- Theme Toggle -->
                <div 
                    @click="PostStore.isDarkMode"
                    :class="PostStore.isDark ? 'bg-[#334155] hover:bg-[#475569]' : 'bg-gray-100 hover:bg-yellow-100'"
                    class="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                >
                    <Icon :icon="PostStore.isDark ? 'mdi:moon-waning-crescent' : 'mdi:white-balance-sunny'" class="h-6 w-6"/>
                    <span class="font-medium">{{ PostStore.isDark ? 'Dark Mode' : 'Light Mode' }}</span>
                </div>

                <!-- Dashboard Button -->
                <router-link v-if="authStore.isOwner" to="/Dashboard" @click="Sidebar = false">
                    <button 
                        :class="PostStore.isDark ? 'bg-transparent border border-gray-600 hover:bg-[#334155]' : 'bg-indigo-600 hover:bg-indigo-500'"
                        class="w-full px-6 py-3 text-white rounded-full transition-colors font-medium"
                    >
                        Dashboard
                    </button>
                </router-link>

                <!-- Logout Button -->
                <div 
                    @click="logout(); Sidebar = false"
                    :class="PostStore.isDark ? 'bg-[#334155] hover:bg-red-500' : 'bg-gray-100 hover:bg-red-400'"
                    class="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:text-white"
                >
                    <Icon icon="mdi:logout" class="h-6 w-6"/>
                    <span class="font-medium">Logout</span>
                </div>
            </div>
        </div>
    </nav>
</template>