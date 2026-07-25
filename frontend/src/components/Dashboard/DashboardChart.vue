<script setup>
import { computed, ref } from 'vue';
import { usePostStore } from '@/stores/postsStore';
import { Icon } from '@iconify/vue';

const postStore = usePostStore();
const timeRange = ref('7days'); // '7days' or '30days'

const chartData = computed(() => {
    const days = timeRange.value === '7days' ? 7 : 30;
    const counts = Array(days).fill(0);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    postStore.posts.forEach(post => {
        const postDate = new Date(post.createdAt);
        const diffTime = Math.abs(today - postDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < days) {
            counts[days - 1 - diffDays]++; // index 0 is oldest, index (days-1) is today
        }
    });

    const maxVal = Math.max(...counts, 1);
    const stepX = 100 / (days - 1);
    
    const points = counts.map((count, i) => {
        const x = i * stepX;
        const y = 80 - (count / maxVal) * 60; // range 20 to 80 vertically
        return { x, y, count };
    });
    
    const lineStr = points.map(p => `${p.x},${p.y}`).join(' L');
    const path = `M0,100 L0,${points[0].y} L${lineStr} L100,100 Z`;
    const linePath = `M${lineStr}`;
    
    return { points, path, linePath, maxVal };
});

const getLabel = (index) => {
    const days = timeRange.value === '7days' ? 7 : 30;
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - index));
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
</script>

<template>
    <div :class="[
        'rounded-xl p-6 flex flex-col gap-6 transition-all',
        postStore.isDark ? 'bg-[#1e293b]/60 backdrop-blur-xl border border-white/5' : 'bg-white shadow-lg border border-gray-100'
    ]">
        <div class="flex items-center justify-between border-b pb-4" :class="postStore.isDark ? 'border-white/5' : 'border-gray-100'">
            <div class="flex items-center gap-2">
                <Icon icon="mdi:chart-line-variant" class="text-blue-500 text-2xl" />
                <h3 :class="postStore.isDark ? 'text-dash-on-surface' : 'text-gray-800'" class="font-semibold text-lg tracking-wide">Post Activity</h3>
            </div>
            <select v-model="timeRange" :class="postStore.isDark ? 'bg-[#121221] border-white/10 text-dash-on-surface-variant' : 'bg-gray-50 border-gray-200 text-gray-600'" class="border rounded-md text-sm p-1.5 outline-none focus:ring-2 focus:ring-blue-500">
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
            </select>
        </div>
        
        <div class="h-64 w-full relative flex items-end gap-2 pb-6">
            <div :class="postStore.isDark ? 'text-dash-on-surface-variant/50' : 'text-gray-400'" class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs pb-6">
                <span>{{ chartData.maxVal }}</span>
                <span>{{ Math.round(chartData.maxVal * 0.5) }}</span>
                <span>0</span>
            </div>
            <div class="ml-6 w-full h-full relative border-b border-l" :class="postStore.isDark ? 'border-white/10' : 'border-gray-200'">
                <svg class="absolute bottom-0 left-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id="line-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3"></stop>
                            <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"></stop>
                        </linearGradient>
                    </defs>
                    <path :d="chartData.linePath" fill="none" stroke="#8b5cf6" stroke-width="2" vector-effect="non-scaling-stroke"></path>
                    <path :d="chartData.path" fill="url(#line-gradient)"></path>
                    <circle v-for="(p, i) in chartData.points" :key="i" :cx="p.x" :cy="p.y" fill="#8b5cf6" r="3" class="hover:r-5 transition-all cursor-pointer">
                        <title>{{ p.count }} posts on {{ getLabel(i) }}</title>
                    </circle>
                </svg>
                <div class="absolute -bottom-6 left-0 w-full flex justify-between text-xs" :class="postStore.isDark ? 'text-dash-on-surface-variant/50' : 'text-gray-400'">
                    <span>{{ getLabel(0) }}</span>
                    <span>{{ getLabel(Math.floor((timeRange === '7days' ? 6 : 29) / 2)) }}</span>
                    <span>{{ getLabel(timeRange === '7days' ? 6 : 29) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
