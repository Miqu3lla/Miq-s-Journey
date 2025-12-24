<script setup>
import { Icon } from '@iconify/vue';
import { defineProps } from 'vue';
import { usePostStore } from '@/stores/postsStore';


const PostStore = usePostStore();

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    value: {
        type: [Number, String],
        required: true
    },
    subtitle: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        required: true
    },
    iconColor: {
        type: String,
        default: 'text-blue-400'
    },
    backgroundColor: {
        type: String,
        default: 'bg-gray-800'
    }
});
</script>

<template>

    <div :class="[props.backgroundColor, 'rounded-2xl p-4 shadow-xl max-w-md  hover:shadow-2xl transition-all duration-300']">
        <div class="flex justify-between items-start mb-8">
            <h3 class=" text-base font-normal">{{ props.title }}</h3>
            <Icon :icon="props.icon" :class="props.iconColor" class="h-9 w-9 opacity-80"/>
        </div>
        <div :class="[PostStore.isDark ? 'text-white' : '', 'mt-4']">
            <h1 class=" text-6xl font-bold mb-3 tracking-tight">{{ props.value }}</h1>
            <p class=" text-sm font-light">{{ props.subtitle || 'All time' }}</p>
        </div>
    </div>
    
</template>