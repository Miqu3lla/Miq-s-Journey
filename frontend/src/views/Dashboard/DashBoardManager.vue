<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { usePostStore } from '@/stores/postsStore';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from 'vue-toastification';

const postStore = usePostStore();
const authStore = useAuthStore();
const toast = useToast();

const editingPostId = ref(null);
const newTitle = ref('');
const newContent = ref('');
const newTags = ref('');
const searchQuery = ref('');
const currentPage = ref(1);
const postsPerPage = 5;

const startEditing = (post) => {
    editingPostId.value = post._id;
    newTitle.value = post.title;
    newContent.value = post.content;
    newTags.value = post.tags.join(', ');
};

const cancelEdit = () => {
    editingPostId.value = null;
    newTitle.value = '';
    newContent.value = '';
    newTags.value = '';
};

const saveEdit = async (postID) => {
    try {
        const result = await postStore.editPost({
            postID,
            title: newTitle.value.trim() || authStore.user?.username,
            content: newContent.value,
            tags: newTags.value.trim()
                ? newTags.value.split(',').map(t => t.trim()).filter(t => t !== '')
                : [],
        });
        if (result.success) {
            toast.success('Post updated successfully!');
            cancelEdit();
        } else {
            toast.error('Failed to update post: ' + result.message);
        }
    } catch (err) {
        toast.error('An error occurred: ' + err.message);
    }
};

const confirmDelete = async (postID) => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
        try {
            const result = await postStore.deletePost(postID);
            if (result.success) {
                toast.success('Post deleted.');
            } else {
                toast.error('Failed to delete post: ' + result.message);
            }
        } catch (err) {
            toast.error('An error occurred: ' + err.message);
        }
    }
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

const filteredPosts = computed(() => {
    const q = searchQuery.value.toLowerCase();
    const sorted = [...postStore.posts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    if (!q) return sorted;
    return sorted.filter(
        p =>
            p.title.toLowerCase().includes(q) ||
            p.content.toLowerCase().includes(q) ||
            p.tags.some(t => t.toLowerCase().includes(q))
    );
});

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage));

const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage;
    return filteredPosts.value.slice(start, start + postsPerPage);
});

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        editingPostId.value = null;
    }
};

// Reset to page 1 when search changes
watch(searchQuery, () => { currentPage.value = 1; });

onMounted(() => {
    if (!postStore.posts.length) postStore.viewPosts();
});
</script>

<template>
    <section
        :class="postStore.isDark ? 'bg-[#1e293b] text-white' : 'bg-white text-black shadow-md'"
        class="ml-25 w-auto mr-25 rounded-2xl mt-6 overflow-hidden">

        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b"
            :class="postStore.isDark ? 'border-gray-700' : 'border-gray-200'">
            <div class="flex items-center gap-3">
                <div class="bg-indigo-600 rounded-xl p-3">
                    <Icon icon="mdi:table-edit" class="h-6 w-6 text-white" />
                </div>
                <div>
                    <h2 class="text-xl font-semibold">Posts</h2>
                    <p class="text-sm text-gray-400">{{ postStore.posts.length }} total posts</p>
                </div>
            </div>

            <!-- Search -->
            <div class="relative w-full sm:w-72">
                <Icon icon="mdi:magnify"
                    class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search posts..."
                    :class="postStore.isDark
                        ? 'bg-[#0f172a] border-gray-600 text-white placeholder-gray-500'
                        : 'bg-gray-100 border-gray-300 text-black placeholder-gray-400'"
                    class="w-full pl-10 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr :class="postStore.isDark ? 'bg-[#0f172a] text-gray-400' : 'bg-gray-50 text-gray-500'"
                        class="text-left text-xs uppercase tracking-wider">
                        <th class="px-6 py-4 font-medium w-1/3">Title</th>
                        <th class="px-6 py-4 font-medium hidden md:table-cell">Content Preview</th>
                        <th class="px-6 py-4 font-medium hidden lg:table-cell">Tags</th>
                        <th class="px-6 py-4 font-medium hidden sm:table-cell">Date</th>
                        <th class="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="postStore.loading">
                        <tr>
                            <td colspan="5" class="text-center py-16 text-gray-400">
                                <Icon icon="mdi:loading" class="h-8 w-8 mx-auto animate-spin mb-2" />
                                <p>Loading posts...</p>
                            </td>
                        </tr>
                    </template>

                    <template v-else-if="filteredPosts.length === 0">
                        <tr>
                            <td colspan="5" class="text-center py-16 text-gray-400">
                                <Icon icon="mdi:file-document-outline" class="h-10 w-10 mx-auto mb-2 opacity-40" />
                                <p>No posts found.</p>
                            </td>
                        </tr>
                    </template>

                    <template v-else>
                        <template v-for="post in paginatedPosts" :key="post._id">
                            <!-- View Row -->
                            <tr v-if="editingPostId !== post._id"
                                :class="postStore.isDark
                                    ? 'border-gray-700 hover:bg-[#0f172a]'
                                    : 'border-gray-100 hover:bg-gray-50'"
                                class="border-b transition-colors">
                                <td class="px-6 py-4 font-medium">{{ post.title }}</td>
                                <td class="px-6 py-4 text-gray-400 hidden md:table-cell max-w-xs">
                                    <span class="line-clamp-2">{{ post.content }}</span>
                                </td>
                                <td class="px-6 py-4 hidden lg:table-cell">
                                    <div class="flex flex-wrap gap-1">
                                        <span
                                            v-for="tag in post.tags.slice(0, 3)"
                                            :key="tag"
                                            :class="postStore.isDark ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-50 text-indigo-600'"
                                            class="px-2 py-0.5 rounded-md text-xs font-medium">
                                            #{{ tag }}
                                        </span>
                                        <span v-if="post.tags.length > 3"
                                            class="px-2 py-0.5 rounded-md text-xs text-gray-400">
                                            +{{ post.tags.length - 3 }}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-gray-400 whitespace-nowrap hidden sm:table-cell">
                                    {{ formatDate(post.createdAt) }}
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex gap-2 justify-end">
                                        <button
                                            @click="startEditing(post)"
                                            :class="postStore.isDark
                                                ? 'bg-indigo-900 hover:bg-indigo-700 text-indigo-300'
                                                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'"
                                            class="p-2 rounded-lg transition-colors cursor-pointer"
                                            title="Edit post">
                                            <Icon icon="mdi:pencil" class="h-4 w-4" />
                                        </button>
                                        <button
                                            @click="confirmDelete(post._id)"
                                            :class="postStore.isDark
                                                ? 'bg-red-900/40 hover:bg-red-800 text-red-400'
                                                : 'bg-red-50 hover:bg-red-100 text-red-500'"
                                            class="p-2 rounded-lg transition-colors cursor-pointer"
                                            title="Delete post">
                                            <Icon icon="mdi:delete" class="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <!-- Edit Row -->
                            <tr v-else
                                :class="postStore.isDark ? 'bg-[#0f172a] border-indigo-700' : 'bg-indigo-50 border-indigo-200'"
                                class="border-b border-2">
                                <td colspan="5" class="px-6 py-5">
                                    <div class="flex items-center justify-between mb-4">
                                        <h3 class="font-semibold text-base text-indigo-400">Editing Post</h3>
                                        <button @click="cancelEdit"
                                            class="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                                            <Icon icon="mdi:close" class="h-5 w-5" />
                                        </button>
                                    </div>
                                    <form @submit.prevent="saveEdit(post._id)" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            v-model="newTitle"
                                            type="text"
                                            placeholder="Post Title..."
                                            :class="postStore.isDark
                                                ? 'bg-[#1e293b] border-gray-600 text-white'
                                                : 'bg-white border-gray-300'"
                                            class="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2" />
                                        <textarea
                                            v-model="newContent"
                                            placeholder="What's on your mind?"
                                            rows="4"
                                            :class="postStore.isDark
                                                ? 'bg-[#1e293b] border-gray-600 text-white'
                                                : 'bg-white border-gray-300'"
                                            class="border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"></textarea>
                                        <input
                                            v-model="newTags"
                                            type="text"
                                            placeholder="Tags (comma separated)..."
                                            :class="postStore.isDark
                                                ? 'bg-[#1e293b] border-gray-600 text-white'
                                                : 'bg-white border-gray-300'"
                                            class="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                        <div class="flex gap-3 justify-end items-center">
                                            <button type="button" @click="cancelEdit"
                                                :class="postStore.isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'"
                                                class="px-5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors">
                                                Cancel
                                            </button>
                                            <button type="submit"
                                                class="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition-colors">
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </td>
                            </tr>
                        </template>
                    </template>
                </tbody>
            </table>
        </div>

        <!-- Pagination Footer -->
        <div :class="postStore.isDark ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'"
            class="px-6 py-3 border-t flex items-center justify-between text-xs">
            <span>Showing {{ Math.min((currentPage - 1) * postsPerPage + 1, filteredPosts.length) }}–{{ Math.min(currentPage * postsPerPage, filteredPosts.length) }} of {{ filteredPosts.length }} posts</span>
            <div v-if="totalPages > 1" class="flex items-center gap-1">
                <button
                    @click="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    :class="postStore.isDark ? 'bg-[#0f172a] hover:bg-gray-700 disabled:opacity-30' : 'bg-gray-100 hover:bg-gray-200 disabled:opacity-30'"
                    class="p-1.5 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed">
                    <Icon icon="mdi:chevron-left" class="h-4 w-4" />
                </button>
                <button
                    v-for="page in totalPages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="page === currentPage
                        ? 'bg-indigo-600 text-white'
                        : postStore.isDark ? 'bg-[#0f172a] hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'"
                    class="w-7 h-7 rounded-lg transition-colors cursor-pointer font-medium">
                    {{ page }}
                </button>
                <button
                    @click="goToPage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    :class="postStore.isDark ? 'bg-[#0f172a] hover:bg-gray-700 disabled:opacity-30' : 'bg-gray-100 hover:bg-gray-200 disabled:opacity-30'"
                    class="p-1.5 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed">
                    <Icon icon="mdi:chevron-right" class="h-4 w-4" />
                </button>
            </div>
        </div>
    </section>
</template>
