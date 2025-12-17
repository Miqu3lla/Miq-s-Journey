<script setup>
import { usePostStore } from '@/stores/postsStore';
import { ref } from 'vue';

const postStore = usePostStore();

const props = defineProps({
    isDark: {
        type: Boolean,
        required: true
    }
});

</script>

<template>
    <div :class="props.isDark ? 'bg-[#1e293b] text-white p-6 rounded-lg shadow-md' : 'bg-white text-black p-6 rounded-lg shadow-md'">
        <div>
            <h1>Create new Post</h1>
        </div>
    </div>

</template>