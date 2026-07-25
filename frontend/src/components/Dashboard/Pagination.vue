<script setup>
import { usePostStore } from '@/stores/postsStore';
import { Icon } from '@iconify/vue';

const postStore = usePostStore();

const props = defineProps({
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    itemsPerPage: { type: Number, required: true }
});

const emit = defineEmits(['update:currentPage']);

const goToPage = (page) => {
    if (page >= 1 && page <= props.totalPages) {
        emit('update:currentPage', page);
    }
};
</script>

<template>
    <div :class="postStore.isDark ? 'border-white/5 text-dash-on-surface-variant' : 'border-gray-100 text-gray-500'"
        class="px-6 py-4 border-t flex flex-col sm:flex-row gap-4 items-center justify-between text-xs transition-colors">
        
        <span>Showing {{ totalItems === 0 ? 0 : Math.min((currentPage - 1) * itemsPerPage + 1, totalItems) }}–{{ Math.min(currentPage * itemsPerPage, totalItems) }} of {{ totalItems }} items</span>
        
        <div v-if="totalPages > 1" class="flex items-center gap-1.5">
            <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                :class="postStore.isDark ? 'bg-[#121221] hover:bg-white/10 disabled:opacity-30' : 'bg-gray-100 hover:bg-gray-200 disabled:opacity-30'"
                class="p-1.5 rounded-md transition-colors cursor-pointer disabled:cursor-not-allowed text-dash-on-surface-variant">
                <Icon icon="mdi:chevron-left" class="h-4 w-4" />
            </button>
            
            <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="page === currentPage
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                    : postStore.isDark ? 'bg-[#121221] hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'"
                class="w-7 h-7 rounded-md transition-all cursor-pointer font-medium flex items-center justify-center">
                {{ page }}
            </button>
            
            <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                :class="postStore.isDark ? 'bg-[#121221] hover:bg-white/10 disabled:opacity-30' : 'bg-gray-100 hover:bg-gray-200 disabled:opacity-30'"
                class="p-1.5 rounded-md transition-colors cursor-pointer disabled:cursor-not-allowed text-dash-on-surface-variant">
                <Icon icon="mdi:chevron-right" class="h-4 w-4" />
            </button>
        </div>
    </div>
</template>
