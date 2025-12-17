<script setup>
import { usePostStore } from '@/stores/postsStore';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const postStore = usePostStore();
const toast = useToast();
const title = ref('');
const content = ref('');
const tag = ref('');


const submitPost = async () => {
    try {
        const result = await postStore.createPost(
            title.value,
            content.value,
            tag.value.trim
        );
        if (result.success) {
            toast.success('Post created successfully!');
        } else {
            toast.error('Failed to create post: ' + result.message);
        }
        // Clear form fields
        title.value = '';
        content.value = '';
        tag.value = '';

    } catch (error) {
        toast.error('An error occured,' + error.message);
    }
}

const props = defineProps({
    isDark: {
        type: Boolean,
        required: true
    }
});


</script>

<template>
    <div :class="props.isDark ? 'bg-[#1e293b] text-white rounded-t-lg shadow-md' : 'bg-white text-black  rounded-lg shadow-md'"
    class = "w-200 ">
        <div class = "ml-6 pt-6 flex">
            <h1 class ="font-medium text-lg">Create new Post</h1>
        </div>

        <hr class ="mt-5 w-full"></hr>

        <div class = "mt-6 p-6">
            <form @submit.prevent="submitPost">
                <input v-model="title" type="text" placeholder="Post Title..." required="true"
                    :class="props.isDark ? 'input-dark' : 'input-light'"
                    class="w-full border p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                <textarea v-model="content" placeholder="What's on your mind?" required="true"
                    :class="props.isDark ? 'input-dark' : 'input-light'"
                    class="w-full border p-2 rounded-md h-30 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                <input v-model="tag" type="text" placeholder="Tags (comma separated)..." 
                    :class="props.isDark ? 'input-dark' : 'input-light'"
                    class="w-full border p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                <div class='flex justify-end'>
                    <button type="submit" 
                        :class="props.isDark ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-700'"
                        class="px-6 py-2 rounded-md text-white font-medium cursor-pointer transition-colors">Publish Post</button>
                </div>
            </form>
        </div>
    </div>
    

</template>

<style scoped>
.input-dark {
    background-color: #334155;
    border-color: #4b5563;
    color: white;
}



.input-light {
    background-color: white;
    border-color: #d1d5db;
    color: black;
}


</style>