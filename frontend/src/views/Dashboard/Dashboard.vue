<script setup>
import { usePostStore } from '@/stores/postsStore';
import { ref,watch, onMounted} from 'vue';
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/stores/authStore';

const PostStore = usePostStore();
const AuthStore = useAuthStore();


onMounted(() => {
    PostStore.viewPosts();
})


</script>

<template>
    <main :class="PostStore.isDark ? 'bg-indigo-900 w-full min-h-screen text-white' : 'text-black'"class = "pt-39">
        <section :class="PostStore.isDark? 'bg-indigo-800' : ''"class = ' ml-25 max-w-4xl rounded-2xl'>
            <div class = 'flex p-5  items-center'>
                <div class = 'bg-indigo-600 rounded-2xl p-4 ml-5 mr-5'>
                    <Icon icon="mdi:chart-line" class="h-8 w-8 "/>
                </div>
                <div class = 'flex flex-col mt-4'>
                    <h1 class ="text-3xl font-medium">Content Dashboard</h1>
                    <h1 class = "text-gray-900"> Overview of your Digital Garden</h1>
                </div>
            </div>
        </section>
    </main>
    
</template>