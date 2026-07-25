<script setup>
import { usePostStore } from '@/stores/postsStore';
import { Icon } from '@iconify/vue';

const postStore = usePostStore();
</script>

<template>
    <div :class="[
        'rounded-xl p-6 relative overflow-hidden backdrop-blur-2xl border shadow-xl',
        postStore.isDark ? 'bg-[#0d0d1c]/60 border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.15)_0%,transparent_50%)]' : 'bg-white border-gray-100 shadow-lg'
    ]">
        <h3 :class="postStore.isDark ? 'text-[#e3e0f6]' : 'text-gray-800'" class="text-xl font-bold mb-6 flex items-center gap-2">
            <Icon icon="mdi:chart-timeline-variant" :class="postStore.isDark ? 'text-[#d2bbff]' : 'text-purple-600'" class="text-2xl" />
            Space Stats
        </h3>
        <div class="space-y-4">
            <div class="flex justify-between items-center border-b pb-3" :class="postStore.isDark ? 'border-white/5' : 'border-gray-100'">
                <span :class="postStore.isDark ? 'text-[#ccc3d8]' : 'text-gray-500'" class="text-base">Total Posts</span>
                <span :class="postStore.isDark ? 'text-[#e3e0f6]' : 'text-gray-900'" class="text-sm font-bold">{{ postStore.PostCount }}</span>
            </div>
            <div class="flex justify-between items-center border-b pb-3" :class="postStore.isDark ? 'border-white/5' : 'border-gray-100'">
                <span :class="postStore.isDark ? 'text-[#ccc3d8]' : 'text-gray-500'" class="text-base">Unique Tags</span>
                <span :class="postStore.isDark ? 'text-[#e3e0f6]' : 'text-gray-900'" class="text-sm font-bold">{{ postStore.UniqueTagCount }}</span>
            </div>
            <div class="flex justify-between items-center">
                <span :class="postStore.isDark ? 'text-[#ccc3d8]' : 'text-gray-500'" class="text-base">Joined</span>
                <span :class="postStore.isDark ? 'text-[#e3e0f6]' : 'text-gray-900'" class="text-sm font-bold">2026</span>
            </div>
        </div>
    </div>
</template>
