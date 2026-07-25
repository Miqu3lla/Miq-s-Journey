<script setup>
import { useAuthStore } from '@/stores/authStore';
import { usePostStore } from '@/stores/postsStore';
import CreatePost from '@/components/CreatePost.vue';
import Posts from '@/components/Posts.vue';
import ProfileCard from '@/components/Home/ProfileCard.vue';
import SpaceStats from '@/components/Home/SpaceStats.vue';
import PopularTopics from '@/components/Home/PopularTopics.vue';

const authStore = useAuthStore();
const postStore = usePostStore();
</script>

<template>
    <div :class="postStore.isDark ? 'bg-[#121221] text-[#e3e0f6]' : 'bg-gray-50 text-gray-900'" class="min-h-screen flex flex-col transition-colors duration-300 relative overflow-hidden">
        
        <!-- Ambient Background -->
        <div v-if="postStore.isDark" class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div class="absolute inset-0 bg-[#121221]"></div>
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-[#2e1065] via-[#121221] to-[#121221] opacity-50"></div>
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-[#4c1d95] via-transparent to-transparent opacity-40"></div>
            <div class="absolute -top-24 -left-24 w-[600px] h-[600px] bg-[#4338ca] rounded-full blur-[150px] opacity-20 mix-blend-screen"></div>
            <div class="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#7c3aed] rounded-full blur-[150px] opacity-10 mix-blend-screen"></div>
            <div class="absolute bottom-0 left-1/4 w-[700px] h-[700px] bg-[#06b6d4] rounded-full blur-[150px] opacity-10 mix-blend-screen"></div>
        </div>

        <!-- Main Content Area -->
        <main class="flex-1 mt-16 px-4 md:px-12 py-12 max-w-[1440px] mx-auto w-full relative z-10">
            <!-- Hero Section -->
            <section class="mb-16 text-center md:text-left relative py-12">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6"
                    :class="postStore.isDark ? 'bg-[#7c3aed]/10 border-[#d2bbff]/20' : 'bg-purple-100 border-purple-200'">
                    <span class="w-2 h-2 rounded-full animate-pulse" :class="postStore.isDark ? 'bg-[#d2bbff]' : 'bg-purple-600'"></span>
                    <span class="text-sm font-medium" :class="postStore.isDark ? 'text-[#d2bbff]' : 'text-purple-700'">New Space Available</span>
                </div>
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 max-w-3xl leading-tight">
                    Documenting the journey, <br class="hidden md:block"/>
                    <span :class="postStore.isDark ? 'bg-gradient-to-r from-[#d2bbff] to-[#ffade1] text-transparent bg-clip-text' : 'text-purple-600'">one post at a time.</span>
                </h1>
                <p :class="postStore.isDark ? 'text-[#ccc3d8]' : 'text-gray-600'" class="text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
                    A personal sanctuary for digital expression, development logs, and random thoughts traversing the neon-lit void.
                </p>
            </section>

            <!-- Bento Grid Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <!-- Main Feed Column (Left) -->
                <div class="lg:col-span-8 flex flex-col gap-6">
                    <!-- Create Post -->
                    <div v-if="authStore.isOwner" class="w-full">
                        <CreatePost />
                    </div>

                    <div class="flex items-center justify-between mb-2 mt-4">
                        <h2 class="text-2xl font-bold tracking-tight" :class="postStore.isDark ? 'text-[#e3e0f6]' : 'text-gray-900'">Recent Thoughts</h2>
                    </div>

                    <!-- Feed -->
                    <div class="w-full">
                        <Posts />
                    </div>
                </div>

                <!-- Sidebar Column (Right) -->
                <div class="lg:col-span-4 flex flex-col gap-6">
                    <ProfileCard />
                    <SpaceStats />
                    <PopularTopics />
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
</style>