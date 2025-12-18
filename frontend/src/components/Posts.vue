<script setup>
import { usePostStore } from '@/stores/postsStore';
import { ref, computed, onMounted} from 'vue';
import { useToast } from 'vue-toastification';
import { Icon } from '@iconify/vue';


const postStore = usePostStore();
const toast = useToast();

const sortedPosts = computed(() => {
    return [...postStore.posts].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    );
});


const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    })
}
const props = defineProps({
    isDark: {
        type: Boolean,
        required: true,
    }
});
onMounted(async () => {
    try {
        await postStore.viewPosts();
    } catch (error) {
        toast.error('An error occured,' + error.message);
    }
})
</script>

<template>
    <div class="w-full max-w-4xl ">
        <div v-for="post in sortedPosts" :key="post.id" :class="props.isDark ? 'bg-[#1e293b] text-white border border-gray-500 rounded-lg shadow-md' : 'bg-white text-black  rounded-lg shadow-md'" class= "mb-4 p-4 w-full">
            <h1 class ='mb-2'>{{ post.title }}</h1>
            <div class ='flex text-gray-500 mb-5'>
                <Icon icon="mdi:calendar-blank-outline" class="h-5 w-5 mr-1"/>
                <h1>{{ formatDate(post.createdAt) }}</h1>
            </div>
            <h1 class = 'mb-10'>{{ post.content }}</h1>
            <div class = 'flex justify-start gap-3 text-indigo-400 '>
                <h1 v-for="tag in post.tags.slice(0,99)" :class="isDark? 'bg-[#0f172a]' : 'bg-gray-100'" class="rounded-md p-2">#{{ tag }}</h1>
            </div>
            
        </div>
    </div>

</template>