<script setup>
import { computed } from 'vue';
import { usePostStore } from '@/stores/postsStore';
import { Icon } from '@iconify/vue';

const postStore = usePostStore();

const topTags = computed(() => {
    const counts = {};
    postStore.posts.forEach(post => {
        post.tags.forEach(tag => {
            counts[tag] = (counts[tag] || 0) + 1;
        });
    });
    
    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10) // Show up to 10 top tags
        .map(([name, count]) => ({ name, count }));
});
</script>

<template>
    <div :class="[
        'rounded-xl p-6 backdrop-blur-2xl border shadow-xl',
        postStore.isDark ? 'bg-[#0d0d1c]/60 border-white/10' : 'bg-white border-gray-100 shadow-lg'
    ]">
        <h3 :class="postStore.isDark ? 'text-[#e3e0f6]' : 'text-gray-800'" class="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon icon="mdi:tag-multiple" :class="postStore.isDark ? 'text-[#ffade1]' : 'text-pink-500'" class="text-2xl" />
            Popular Topics
        </h3>
        <div class="flex flex-wrap gap-2">
            <div v-if="topTags.length === 0" :class="postStore.isDark ? 'text-[#ccc3d8]' : 'text-gray-400'" class="text-sm py-2">
                No topics found.
            </div>
            <button v-for="tag in topTags" :key="tag.name" 
               @click="postStore.toggleFilterTag(tag.name)"
               :class="[
                   postStore.isDark 
                       ? 'bg-[#343344]/50 hover:bg-[#7c3aed]/20 border-transparent hover:border-[#d2bbff]/30 text-[#ccc3d8] hover:text-[#d2bbff]' 
                       : 'bg-gray-100 hover:bg-indigo-50 border-transparent hover:border-indigo-200 text-gray-600 hover:text-indigo-600',
                   postStore.selectedTag === tag.name ? (postStore.isDark ? 'ring-1 ring-[#d2bbff] !bg-[#7c3aed]/20 !text-[#d2bbff]' : 'ring-1 ring-indigo-500 !bg-indigo-50 !text-indigo-600') : ''
               ]"
               class="px-3 py-1.5 rounded-md border transition-all text-sm font-medium cursor-pointer">
                #{{ tag.name }} ({{ tag.count }})
            </button>
        </div>
    </div>
</template>
