<script setup>
import { usePostStore } from '@/stores/postsStore';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/stores/authStore';
// Initialize store and utilities
const postStore = usePostStore();
const authStore = useAuthStore();
const toast = useToast();

// Form field reactive references
const title = ref('');
const content = ref('');
const tag = ref('');

// Handle post submission
const submitPost = async () => {
    try {
        const tagArray = tag.value.trim() ? tag.value.split(',').map(t => t.trim()).filter(t => t !== "") : [];
        const username = title.value.trim() ? title.value.trim() : authStore.user.username
        // Split tags by comma and trim whitespace
        const result = await postStore.createPost(
            username,
            content.value,
            tagArray
        );

        // Show success or error notification
        if (result.success) {
            toast.success('Post created successfully!');
        } else {
            toast.error('Failed to create post: ' + result.message);
        }
        
        // Clear form fields after submission
        title.value = '';
        content.value = '';
        tag.value = '';

    } catch (error) {
        toast.error('An error occured,' + error.message);
    }
}


</script>

<template>
    <div :class="postStore.isDark ? 'bg-[#1e293b]/60 backdrop-blur-xl border border-white/5 text-[#e3e0f6] rounded-3xl shadow-[0_0_20px_rgba(124,58,237,0.1)]' : 'bg-white text-black rounded-3xl shadow-lg'"
        class = "w-full max-w-4xl transition-colors">
        <div class = "ml-6 pt-6 flex gap-3">
            <Icon icon="mdi:creation" :class="postStore.isDark ? 'text-[#00f4fe]' : 'text-indigo-500'" class="h-7 w-7"/>
            <h1 class ="font-medium text-lg">Create new Post</h1>
        </div>

        <hr :class="postStore.isDark ? 'border-white/5' : 'border-gray-200'" class ="mt-5 w-full"></hr>

        <div class = "mt-6 p-6">
            <form @submit.prevent="submitPost">
                <input v-model="title" type="text" placeholder="Post Title..." 
                    :class="postStore.isDark ? 'input-dark focus:ring-[#7c3aed]' : 'input-light focus:ring-indigo-500'"
                    class="w-full border p-2 rounded-md mb-4 focus:outline-none focus:ring-2 transition-colors"/>
                <textarea v-model="content" placeholder="What's on your mind?" required="true"
                    :class="postStore.isDark ? 'input-dark focus:ring-[#7c3aed]' : 'input-light focus:ring-indigo-500'"
                    class="w-full border p-2 rounded-md h-30 mb-4 resize-none focus:outline-none focus:ring-2 transition-colors"></textarea>
                <input v-model="tag" type="text" placeholder="Tags (comma separated)..." 
                    :class="postStore.isDark ? 'input-dark focus:ring-[#7c3aed]' : 'input-light focus:ring-indigo-500'"
                    class="w-full border p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 transition-colors"/>
                <div class='flex justify-end'>
                    <button type="submit" 
                        :class="postStore.isDark ? 'bg-[#7c3aed] hover:bg-[#6d28d9] shadow-[0_0_10px_rgba(124,58,237,0.3)]' : 'bg-indigo-600 hover:bg-indigo-700'"
                        class="px-6 py-2 rounded-lg text-white font-medium cursor-pointer transition-all">Publish Post</button>
                </div>
            </form>
        </div>
    </div>
    

</template>

<style scoped>
.input-dark {
    background-color: #121221;
    border-color: #343344;
    color: #e3e0f6;
}



.input-light {
    background-color: white;
    border-color: #d1d5db;
    color: black;
}


</style>