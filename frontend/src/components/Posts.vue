<script setup>
import { usePostStore } from '@/stores/postsStore';
import { ref, onMounted} from 'vue';
import { useToast } from 'vue-toastification';


const postStore = usePostStore();
const toast = useToast();

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
    })
}
const props = defineProps({
    isDark: {
        type: Boolean,
        required: true
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
    <div>
        <div v-for="post in postStore.posts" :key="post.id" class="mb-4 p-4 border rounded-md">
            <h1>{{ post.title }}</h1>
            <h1>{{ formatDate(post.createdAt) }}</h1>
            
        </div>
    </div>

</template>