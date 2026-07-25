<script setup>
import { Icon } from '@iconify/vue';
import { usePostStore } from '@/stores/postsStore';

const postStore = usePostStore();

const props = defineProps({
    title: { type: String, required: true },
    value: { type: [Number, String], required: true },
    subtitle: { type: String, default: '' },
    icon: { type: String, required: true },
    gradientClass: { type: String, default: 'from-blue-500 to-indigo-500' },
    iconColorClass: { type: String, default: 'text-blue-500' }
});
</script>

<template>
    <div :class="[
            'rounded-xl p-6 relative overflow-hidden group transition-all duration-300',
            postStore.isDark 
                ? 'bg-[#1e1e2e]/80 backdrop-blur-xl border border-white/5 hover:border-[#7c3aed]/30 shadow-[0_0_15px_rgba(124,58,237,0.05)]' 
                : 'bg-white shadow-lg hover:shadow-xl border border-gray-100'
        ]">
        <div :class="['absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-70', props.gradientClass]"></div>
        
        <div class="flex justify-between items-start mb-4">
            <h3 :class="[
                'font-medium text-sm tracking-wide',
                postStore.isDark ? 'text-dash-on-surface-variant' : 'text-gray-500'
            ]">{{ props.title }}</h3>
            <Icon :icon="props.icon" :class="[props.iconColorClass, 'h-6 w-6 opacity-80']" />
        </div>
        
        <div :class="[
            'text-4xl font-bold mb-2 transition-colors font-display-lg',
            postStore.isDark ? 'text-dash-on-surface group-hover:text-white' : 'text-gray-900 group-hover:text-gray-700'
        ]">{{ props.value }}</div>
        
        <p :class="[
            'text-sm',
            postStore.isDark ? 'text-dash-on-surface-variant/70' : 'text-gray-400'
        ]">{{ props.subtitle || 'All time' }}</p>
    </div>
</template>
