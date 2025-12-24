<script setup>
import { usePostStore } from '@/stores/postsStore';
import { ref,watch, onMounted} from 'vue';
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/stores/authStore';
import DashboardCard from './DashboardCard.vue';
const PostStore = usePostStore();
const AuthStore = useAuthStore();


onMounted(() => {
    PostStore.viewPosts();
})


</script>

<template>
    <main :class="PostStore.isDark ? 'bg-indigo-900  text-white' : 'text-black'"class = "pt-35 w-full  min-h-screen">
        <section :class="PostStore.isDark? 'bg-[#1e293b]' : 'shadow-md '"class = ' ml-25 w-auto mr-25 rounded-2xl'>
            <div class = 'flex p-5  items-center'>
                <div class = 'bg-indigo-600 rounded-2xl p-4 mt-4 ml-5 mr-3'>
                    <Icon icon="mdi:chart-line" class="h-8 w-8 "/>
                </div>
                <div class = 'flex flex-col mt-5'>
                    <h1 class ="text-2xl font-normal mb-1">Content Dashboard</h1>
                    <h1 class = "text-gray-800 text-sm"> Overview of your Digital Garden</h1>
                </div>
            </div>
            <section class = 'p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
                <DashboardCard 
                    :background-color="PostStore.isDark ? 'bg-gradient-to-br from-indigo-900 to-indigo-800' : 'shadow-sm'"
                    title="Tite"
                    value="9"/>
                <DashboardCard 
                    :background-color="PostStore.isDark ? 'bg-gradient-to-br from-indigo-900 to-indigo-800' : 'shadow-sm'"
                    title="Tite"
                    value="9"/>
                <DashboardCard 
                    :background-color="PostStore.isDark ? 'bg-gradient-to-br from-indigo-900 to-indigo-800' : 'shadow-sm'"
                    title="Tite"
                    value="9"/>
            </section>
        </section>
    </main>
    
</template>