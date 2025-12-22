<script setup>
import { usePostStore } from '@/stores/postsStore';
import { ref, computed, onMounted} from 'vue';
import { useToast } from 'vue-toastification';
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/stores/authStore';
// Initialize stores and utilities
const postStore = usePostStore();
const authStore = useAuthStore();
const toast = useToast();

// Track which post is being edited
const editingPostId = ref(null);
const newTitle = ref('');
const newContent = ref('');
const newTags = ref('');

// Toggle edit mode
const startEditing = (post) => {
    editingPostId.value = post._id;
    newTitle.value = post.title;
    newContent.value = post.content;
    newTags.value = post.tags.join(', ');

}

const cancelEdit = () => {

    editingPostId.value = null;
    newTitle.value = '';
    newContent.value = '';
    newTags.value = '';
}


const editPost = async (postID) => {
    try { 
        const result = await postStore.editPost({
            postID: postID,
            title: newTitle.value,
            content: newContent.value,
            tags: newTags.value.split(',').map(t => t.trim())
        })
        if (result.success) {
            toast.success('Post edited successfully!'); 
            editingPostId.value = null;
        } else {
            toast.error('Failed to edit post: ' + result.message);
        }
    }catch(error) {
        toast.error('An error occured,' + error.message);
    }
}

const deletePost = async (postID) => {
    try {
        const response = await postStore.deletePost(postID);
        if (response.success) {
            toast.error('Post deleted successfully!');
        } else {
            toast.error('Failed to delete post: ' + response.message);
        }
    } catch (error) {
        toast.error('An error occured,' + error.message);
    }
}

const confirmDelete = (postID) => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
        deletePost(postID);
    }
}

// Computed property to sort posts by creation date (newest first)
const sortedPosts = computed(() => {
    return [...postStore.posts].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    );
});


// Format date to display as "Jan 1" format
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    })
}

// Fetch posts when component is mounted
onMounted(async () => {
    try {
        await postStore.viewPosts();
    } catch (error) {
        toast.error('An error occured,' + error.message);
    }
})
</script>

<template>
    <TransitionGroup
        name="layout"
        tag="div"
        class="w-full max-w-4xl"
        :class="postStore.isGrid ? 'grid grid-cols-2 gap-4' : 'flex flex-col'">
        
        <div 
            v-for="post in sortedPosts" 
            :key="post._id"
            class="mb-4 p-4 pl-5 w-full hover:scale-101 transition-transform"
            :class="[
                postStore.isDark 
                    ? 'bg-[#1e293b] text-white border border-gray-500 rounded-3xl shadow-md' 
                    : 'bg-white text-black rounded-lg shadow-md hover:shadow-3xl hover:scale-105',
                    'hover:border-white'
            ]">
            
            <!-- View Mode -->
            <div v-if="editingPostId !== post._id">
                <div class="flex justify-between items-center mb-2">
                    <h1>{{ post.title }}</h1>
                    <div v-if="authStore.isOwner" class="flex gap-3">
                        <Icon @click="startEditing(post)" icon="mdi:pencil" class="h-5 w-5 text-gray-400 hover:text-indigo-500 cursor-pointer transition-colors" title="Edit post"/>
                        <Icon @click= "confirmDelete(post._id)"icon="mdi:delete" class="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" title="Delete post"/>
                    </div>
                </div>
                <div class ='flex text-gray-500 mb-5'>
                    <Icon icon="mdi:calendar-blank-outline" class="h-5 w-5 mr-1"/>
                    <h1>{{ formatDate(post.createdAt) }}</h1>
                </div>
                <h1 class = 'mb-10'>{{ post.content }}</h1>
                <div v-if="post.tags.length === 1 "class = 'flex justify-start gap-3 text-indigo-400 '>
                    <h1 v-for="tag in post.tags.slice(0,99)" :class="postStore.isDark? 'bg-[#0f172a]' : 'bg-gray-100'" class="rounded-md p-2">#{{ tag }}</h1>
                </div>
            </div>

            <!-- Edit Mode -->
            <div v-else>
                <div class="flex justify-between items-center mb-4">
                    <h1 class="font-medium text-lg">Edit Post</h1>
                    <Icon @click="cancelEdit" icon="mdi:close" class="h-6 w-6 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" title="Cancel"/>
                </div>
                    <form @submit.prevent="editPost(post._id)">
                    <input v-model="newTitle" type="text" placeholder="Post Title..."
                        :class="postStore.isDark ? 'bg-[#334155] border-gray-600 text-white' : 'bg-white border-gray-300'"
                        class="w-full border p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    <textarea v-model="newContent" placeholder="What's on your mind?"
                        :class="postStore.isDark ? 'bg-[#334155] border-gray-600 text-white' : 'bg-white border-gray-300'"
                        class="w-full border p-2 rounded-md h-30 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                    <input v-model="newTags" type="text" placeholder="Tags (comma separated)..."
                        :class="postStore.isDark ? 'bg-[#334155] border-gray-600 text-white' : 'bg-white border-gray-300'"
                        class="w-full border p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    <div class='flex justify-end gap-3'>
                        <button type="button" @click="cancelEdit"
                            :class="postStore.isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'"
                            class="px-6 py-2 rounded-md text-white font-medium cursor-pointer transition-colors">Cancel</button>
                        <button type="submit"
                            :class="postStore.isDark ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-700'"
                            class="px-6 py-2 rounded-md text-white font-medium cursor-pointer transition-colors">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </TransitionGroup>
</template>

<style scoped>
/* Animate items when they move to new positions */
.layout-move {
    transition: all 0.5s ease-in-out;
}

/* Animate items entering */
.layout-enter-from {
    opacity: 0;
    transform: scale(0.8);
}
.layout-enter-active {
    transition: all 0.5s ease-out;
}

.layout-enter-to {
    opacity: 1;
    transform: scale(1);
}


.layout.leave-from {
    opacity: 1;
    transform: scale(1);
}

/* Smooth transition for layout changes */
.layout-leave-active {
    transition: all 0.5s ease-in;
    position: absolute;
   
}

.layout-leave-to {
    opacity: 0;
    transform: scale(0.8);
    
}
</style>