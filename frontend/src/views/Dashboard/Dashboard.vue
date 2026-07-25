<script setup>
import { usePostStore } from '@/stores/postsStore';
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import DashboardCard from '@/components/Dashboard/DashboardCard.vue';
import DashboardChart from '@/components/Dashboard/DashboardChart.vue';
import PopularTags from '@/components/Dashboard/PopularTags.vue';
import DashBoardManager from '@/components/Dashboard/DashBoardManager.vue';

const postStore = usePostStore();
const authStore = useAuthStore();

onMounted(() => {
    postStore.viewPosts();
});
</script>

<template>
    <main :class="postStore.isDark ? 'bg-[#121221] text-[#e3e0f6]' : 'bg-gray-50 text-gray-900'" class="min-h-screen pt-24 pb-10 w-full transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
            
            <!-- Dashboard Header -->
            <div :class="[
                'rounded-xl p-6 md:p-8 flex items-center gap-4 relative overflow-hidden transition-colors',
                postStore.isDark ? 'bg-[#1e293b]/80 backdrop-blur-xl border border-white/5 shadow-[0_0_20px_rgba(124,58,237,0.1)]' : 'bg-white shadow-lg border border-gray-100'
            ]">
                <div v-if="postStore.isDark" class="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30 text-blue-500 shadow-inner">
                    <Icon icon="mdi:chart-timeline-variant" class="text-3xl" />
                </div>
                <div>
                    <h2 class="text-2xl font-bold tracking-tight">Content Dashboard</h2>
                    <p :class="postStore.isDark ? 'text-[#ccc3d8]' : 'text-gray-500'" class="text-sm">Overview of your Digital Garden</p>
                </div>
            </div>
            
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    title="Total Posts"
                    :value="postStore.PostCount"
                    subtitle="All time"
                    icon="mdi:file-document-outline"
                    gradientClass="from-blue-500 to-indigo-500"
                    iconColorClass="text-blue-500" />
                <DashboardCard
                    title="This Month"
                    :value="postStore.MonthlyPostCount"
                    :subtitle="postStore.GetCurrentMonth + ' ' + postStore.GetCurrentYear"
                    icon="mdi:calendar-month"
                    gradientClass="from-purple-500 to-pink-500"
                    iconColorClass="text-purple-400" />
                <DashboardCard
                    title="Unique Tags"
                    :value="postStore.UniqueTagCount"
                    subtitle="Categories created"
                    icon="mdi:tag-multiple-outline"
                    gradientClass="from-teal-400 to-emerald-500"
                    iconColorClass="text-teal-400" />
            </div>
            
            <!-- Charts -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DashboardChart />
                <PopularTags />
            </div>
            
            <!-- Table -->
            <DashBoardManager />
            
        </div>
    </main>
</template>
