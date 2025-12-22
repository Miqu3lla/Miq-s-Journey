<script setup>
import { usePostStore } from '@/stores/postsStore';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { Icon } from '@iconify/vue';
// Initialize store and utilities
const postStore = usePostStore();
const toast = useToast();

// Form field reactive references
const title = ref('');
const content = ref('');
const tag = ref('');

// Handle post submission
const submitPost = async () => {
    try {
        // Split tags by comma and trim whitespace
        const result = await postStore.createPost(
            title.value,
            content.value,
            tag.value.split(',').map(t => t.trim())
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
    <div :class="postStore.isDark ? 'bg-[#1e293b] text-white border border-gray-500 rounded-3xl shadow-md' : 'bg-white text-black  rounded-3xl shadow-lg'"
        class = "w-full max-w-4xl ">
        <div class = "ml-6 pt-6 flex gap-3">
            <Icon icon="mdi:creation" class="h-7 w-7 text-indigo-500"/>
            <h1 class ="font-medium text-lg">Create new Post</h1>
        </div>

        <hr class ="mt-5 w-full"></hr>

        <div class = "mt-6 p-6">
            <form @submit.prevent="submitPost">
                <input v-model="title" type="text" placeholder="Post Title..." required="true"
                    :class="postStore.isDark ? 'input-dark' : 'input-light'"
                    class="w-full border p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                <textarea v-model="content" placeholder="What's on your mind?" required="true"
                    :class="postStore.isDark ? 'input-dark' : 'input-light'"
                    class="w-full border p-2 rounded-md h-30 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                <input v-model="tag" type="text" placeholder="Tags (comma separated)..." 
                    :class="postStore.isDark ? 'input-dark' : 'input-light'"
                    class="w-full border p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                <div class='flex justify-end'>
                    <button type="submit" 
                        :class="postStore.isDark ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-700'"
                        class="px-6 py-2 rounded-lg text-white font-medium cursor-pointer transition-colors">Publish Post</button>
                </div>
            </form>
        </div>
    </div>
    

</template>

<style scoped>
.input-dark {
    background-color: #334155;
    border-color: #c0c5cb;
    color: white;
}



.input-light {
    background-color: white;
    border-color: #d1d5db;
    color: black;
}


</style>