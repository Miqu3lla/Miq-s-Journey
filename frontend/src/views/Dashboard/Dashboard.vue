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
                postStore.isDark ? 'bg-[#292839]/60 backdrop-blur-xl border border-white/5 shadow-[0_0_20px_rgba(124,58,237,0.1)]' : 'bg-white shadow-lg border border-gray-100'
            ]">
                <div v-if="postStore.isDark" class="absolute -top-24 -right-24 w-64 h-64 bg-[#7c3aed]/10 rounded-full blur-3xl pointer-events-none"></div>
                <div class="w-12 h-12 rounded-xl bg-[#7c3aed]/20 flex items-center justify-center border border-[#7c3aed]/30 text-[#7c3aed] shadow-inner">
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
                    gradientClass="from-blue-500 to-[#d2bbff]"
                    iconColorClass="text-blue-400" />
                <DashboardCard
                    title="This Month"
                    :value="postStore.MonthlyPostCount"
                    :subtitle="postStore.GetCurrentMonth + ' ' + postStore.GetCurrentYear"
                    icon="mdi:calendar-month"
                    gradientClass="from-[#ffade1] to-purple-500"
                    iconColorClass="text-[#ffade1]" />
                <DashboardCard
                    title="Unique Tags"
                    :value="postStore.UniqueTagCount"
                    subtitle="Categories created"
                    icon="mdi:tag-multiple-outline"
                    gradientClass="from-teal-500 to-[#00f4fe]"
                    iconColorClass="text-[#00f4fe]" />
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
