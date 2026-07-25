<script setup>
import { usePostStore } from '@/stores/postsStore';
import { useAuthStore } from '@/stores/authStore';
import { useImageStore } from '@/stores/imageStore';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { Icon } from '@iconify/vue';
import defaultImg from '@/images/default.jpg';

const postStore = usePostStore();
const authStore = useAuthStore();
const imageStore = useImageStore();
const toast = useToast();

const title = ref('');
const content = ref('');
const tag = ref('');

const suggestedTags = ['learning', 'programming', 'feature', 'design', 'bug'];

const addSuggestedTag = (suggestion) => {
    let currentTags = tag.value.split(',').map(t => t.trim()).filter(t => t);
    if (!currentTags.includes(suggestion)) {
        currentTags.push(suggestion);
        tag.value = currentTags.join(', ') + (currentTags.length ? ', ' : '');
    }
}

const submitPost = async () => {
    try {
        const tagArray = tag.value.trim() ? tag.value.split(',').map(t => t.trim()).filter(t => t !== "") : [];
        const username = title.value.trim() ? title.value.trim() : authStore.user.username
        
        const result = await postStore.createPost(
            username,
            content.value,
            tagArray
        );

        if (result.success) {
            toast.success('Post created successfully!');
            title.value = '';
            content.value = '';
            tag.value = '';
        } else {
            toast.error('Failed to create post: ' + result.message);
        }
    } catch (error) {
        toast.error('An error occured,' + error.message);
    }
}
</script>

<template>
    <div :class="[
        'rounded-xl p-6 relative overflow-hidden group backdrop-blur-2xl border shadow-xl w-full transition-colors',
        postStore.isDark ? 'bg-[#0d0d1c]/40 border-white/20' : 'bg-white border-gray-200'
    ]">
        <div v-if="postStore.isDark" class="absolute inset-0 bg-gradient-to-br from-[#d2bbff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <div class="flex items-center gap-4 relative z-10 w-full">
            <form @submit.prevent="submitPost" class="flex flex-col gap-6 w-full">
                <div class="flex gap-4">
                    <div class="flex-shrink-0 hidden sm:block">
                        <img :src="imageStore.image || defaultImg" alt="Avatar" class="w-12 h-12 rounded-full object-cover border-2 shadow-lg" :class="postStore.isDark ? 'border-[#d2bbff]/30 shadow-[#d2bbff]/10' : 'border-purple-200'" />
                    </div>
                    <div class="flex-1 space-y-4">
                        <div class="relative group/field">
                            <Icon icon="mdi:pencil-outline" class="absolute left-3 top-1/2 -translate-y-1/2 transition-colors text-lg" :class="postStore.isDark ? 'text-[#ccc3d8]/50 group-focus-within/field:text-[#d2bbff]' : 'text-gray-400 group-focus-within/field:text-purple-600'" />
                            <input v-model="title" type="text" placeholder="Give your thought a title..." 
                                :class="postStore.isDark 
                                    ? 'bg-[#292839]/20 border-white/5 text-[#e3e0f6] placeholder-[#ccc3d8]/40 focus:border-[#d2bbff]/40 focus:ring-[#d2bbff]/40' 
                                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400'"
                                class="w-full rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-1 transition-all text-base font-medium"/>
                        </div>
                        <div class="relative group/field">
                            <Icon icon="mdi:text-box-outline" class="absolute left-3 top-4 transition-colors text-lg" :class="postStore.isDark ? 'text-[#ccc3d8]/50 group-focus-within/field:text-[#d2bbff]' : 'text-gray-400 group-focus-within/field:text-purple-600'" />
                            <textarea v-model="content" placeholder="What's on your mind? Start a draft..." required="true"
                                :class="postStore.isDark 
                                    ? 'bg-[#292839]/20 border-white/5 text-[#e3e0f6] placeholder-[#ccc3d8]/40 focus:border-[#d2bbff]/40 focus:ring-[#d2bbff]/40' 
                                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400'"
                                class="w-full rounded-xl py-3 pl-10 pr-4 min-h-[140px] resize-none focus:outline-none focus:ring-1 transition-all text-base"></textarea>
                        </div>
                        <div class="relative group/field">
                            <Icon icon="mdi:tag-outline" class="absolute left-3 top-1/2 -translate-y-1/2 transition-colors text-lg" :class="postStore.isDark ? 'text-[#ccc3d8]/50 group-focus-within/field:text-[#d2bbff]' : 'text-gray-400 group-focus-within/field:text-purple-600'" />
                            <input v-model="tag" type="text" placeholder="Add tags (e.g. webdev, design)" 
                                :class="postStore.isDark 
                                    ? 'bg-[#292839]/20 border-white/5 text-[#e3e0f6] placeholder-[#ccc3d8]/40 focus:border-[#d2bbff]/40 focus:ring-[#d2bbff]/40' 
                                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400'"
                                class="w-full rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 transition-all text-sm"/>
                        </div>
                        <div class="flex flex-wrap gap-2 pt-1">
                            <span v-for="suggestion in suggestedTags" :key="suggestion"
                                  @click="addSuggestedTag(suggestion)"
                                  class="text-xs px-2 py-1 rounded-md cursor-pointer transition-colors border"
                                  :class="postStore.isDark ? 'bg-white/5 border-white/10 hover:border-[#d2bbff]/50 hover:text-[#d2bbff] text-[#ccc3d8]' : 'bg-gray-100 border-gray-200 hover:border-purple-300 hover:text-purple-600 text-gray-600'">
                                + {{ suggestion }}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="flex items-center justify-between pt-2 border-t" :class="postStore.isDark ? 'border-white/5' : 'border-gray-100'">
                    <div class="flex gap-2">
                        <button type="button" class="w-10 h-10 rounded-lg flex items-center justify-center transition-all" :class="postStore.isDark ? 'text-[#ccc3d8] hover:text-[#d2bbff] hover:bg-[#d2bbff]/10' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'">
                            <Icon icon="mdi:image-outline" class="text-xl" />
                        </button>
                        <button type="button" class="w-10 h-10 rounded-lg flex items-center justify-center transition-all" :class="postStore.isDark ? 'text-[#ccc3d8] hover:text-[#d2bbff] hover:bg-[#d2bbff]/10' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'">
                            <Icon icon="mdi:link-variant" class="text-xl" />
                        </button>
                    </div>
                    <button type="submit" 
                        :class="postStore.isDark ? 'bg-[#7c3aed] hover:bg-[#6d28d9] text-[#ede0ff] shadow-[#7c3aed]/20' : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/30'"
                        class="px-8 sm:px-10 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-lg flex items-center gap-2 group cursor-pointer">
                        <span>Publish Thought</span>
                        <Icon icon="mdi:send" class="text-sm group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>