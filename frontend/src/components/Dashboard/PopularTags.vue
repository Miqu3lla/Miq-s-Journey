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
    
    const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([name, count]) => ({ name, count }));
        
    const maxVal = Math.max(...sorted.map(t => t.count), 1);
    
    const colors = [
        'bg-[#d2bbff]', 
        'bg-[#ffade1]', 
        'bg-[#00f4fe]', 
        'bg-blue-400'
    ];
    
    return sorted.map((tag, index) => ({
        ...tag,
        percent: (tag.count / maxVal) * 100,
        color: colors[index % colors.length]
    }));
});
</script>

<template>
    <div :class="[
        'rounded-xl p-6 flex flex-col gap-6 transition-all h-full',
        postStore.isDark ? 'bg-[#292839]/60 backdrop-blur-xl border border-white/5' : 'bg-white shadow-lg border border-gray-100'
    ]">
        <div class="flex items-center gap-2 border-b pb-4" :class="postStore.isDark ? 'border-white/5' : 'border-gray-100'">
            <Icon icon="mdi:tag-multiple" class="text-[#00f4fe] text-2xl" />
            <h3 :class="postStore.isDark ? 'text-dash-on-surface' : 'text-gray-800'" class="font-semibold text-lg tracking-wide">Popular Tags</h3>
        </div>
        
        <div class="flex flex-col gap-5 justify-center h-full pb-4">
            <div v-if="topTags.length === 0" class="text-center py-8" :class="postStore.isDark ? 'text-dash-on-surface-variant' : 'text-gray-400'">
                No tags found.
            </div>
            <div v-for="tag in topTags" :key="tag.name" class="flex flex-col gap-2">
                <div class="flex justify-between text-sm">
                    <span :class="postStore.isDark ? 'text-dash-on-surface' : 'text-gray-700'" class="font-medium capitalize">{{ tag.name }}</span>
                    <span :class="postStore.isDark ? 'text-dash-on-surface-variant' : 'text-gray-500'">{{ tag.count }} posts</span>
                </div>
                <div class="w-full h-3 rounded-full overflow-hidden" :class="postStore.isDark ? 'bg-[#292839]' : 'bg-gray-100'">
                    <div class="h-full transition-all duration-700 ease-out" 
                         :class="tag.color" 
                         :style="{ width: tag.percent + '%' }"></div>
                </div>
            </div>
        </div>
    </div>
</template>
