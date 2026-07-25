<script setup>
import { usePostStore } from '@/stores/postsStore'
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/stores/authStore'

const postStore = usePostStore()
const authStore = useAuthStore()
const toast = useToast()

const editingPostId = ref(null)
const newTitle = ref('')
const newContent = ref('')
const newTags = ref('')

const suggestedTags = ['learning', 'programming', 'feature', 'design', 'bug'];

const addSuggestedTag = (suggestion) => {
    let currentTags = newTags.value.split(',').map(t => t.trim()).filter(t => t);
    if (!currentTags.includes(suggestion)) {
        currentTags.push(suggestion);
        newTags.value = currentTags.join(', ') + ', ';
    }
}

const startEditing = (post) => {
  editingPostId.value = post._id
  newTitle.value = post.title
  newContent.value = post.content
  newTags.value = post.tags.join(', ')
}

const cancelEdit = () => {
  editingPostId.value = null
  newTitle.value = ''
  newContent.value = ''
  newTags.value = ''
}

const editPost = async (postID) => {
  try {
    const result = await postStore.editPost({
      postID: postID,
      title: newTitle.value.trim() ? newTitle.value.trim() : authStore.user.username,
      content: newContent.value,
      tags: newTags.value.trim()
        ? newTags.value
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t !== '')
        : [],
    })

    if (result.success) {
      toast.success('Post edited successfully!')
      editingPostId.value = null
    } else {
      toast.error('Failed to edit post: ' + result.message)
    }
  } catch (error) {
    toast.error('An error occured,' + error.message)
  }
}

const deletePost = async (postID) => {
  try {
    const response = await postStore.deletePost(postID)
    if (response.success) {
      toast.error('Post deleted successfully!')
    } else {
      toast.error('Failed to delete post: ' + response.message)
    }
  } catch (error) {
    toast.error('An error occured,' + error.message)
  }
}

const confirmDelete = (postID) => {
  if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
    deletePost(postID)
  }
}

const sortedPosts = computed(() => {
  let filtered = postStore.posts
  if (postStore.selectedTag) {
    filtered = filtered.filter(p => p.tags.includes(postStore.selectedTag))
  }
  return [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const getTagColorClass = (index, isDark) => {
  if (!isDark) return 'bg-purple-100 border-purple-200 text-purple-700'
  const colors = [
    'bg-[#ffade1]/10 border-[#ffade1]/20 text-[#ffade1]', // tertiary
    'bg-[#00f4fe]/10 border-[#00f4fe]/20 text-[#00f4fe]', // secondary
    'bg-[#d2bbff]/10 border-[#d2bbff]/20 text-[#d2bbff]', // primary
  ]
  return colors[index % colors.length]
}

onMounted(async () => {
  try {
    await postStore.viewPosts()
  } catch (error) {
    toast.error('An error occured,' + error.message)
  }
})
</script>

<template>
  <div v-if="postStore.selectedTag" class="w-full max-w-4xl mb-6">
    <div class="flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors" 
         :class="postStore.isDark ? 'bg-[#7c3aed]/20 border-[#7c3aed]/30 text-[#d2bbff]' : 'bg-purple-50 border-purple-200 text-purple-700'">
        <Icon icon="mdi:filter-variant" class="text-xl" />
        <span class="text-sm">Filtering by tag: <strong class="font-bold">#{{ postStore.selectedTag }}</strong></span>
        <button @click="postStore.toggleFilterTag(postStore.selectedTag)" class="ml-auto p-1 rounded-md hover:bg-black/10 transition-colors">
            <Icon icon="mdi:close" class="text-lg" />
        </button>
    </div>
  </div>

  <TransitionGroup
    name="layout"
    tag="div"
    class="w-full max-w-4xl"
    :class="postStore.isGrid ? 'grid grid-cols-2 gap-4' : 'flex flex-col gap-6'"
  >
    <article
      v-for="post in sortedPosts"
      :key="post._id"
      class="rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1 group shadow-xl border w-full relative"
      :class="[
        postStore.isDark
          ? 'bg-[#0d0d1c]/40 backdrop-blur-2xl border-white/20 hover:shadow-[0_0_30px_rgba(210,187,255,0.05)]'
          : 'bg-white border-gray-200 hover:shadow-2xl',
      ]"
    >
      <!-- View Mode -->
      <div v-if="editingPostId !== post._id">
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center font-bold"
              :class="
                postStore.isDark ? 'bg-[#343344] text-[#ccc3d8]' : 'bg-gray-100 text-gray-500'
              "
            >
              {{ post.title ? post.title.charAt(0).toUpperCase() : 'U' }}
            </div>
            <div>
              <h3
                class="font-semibold text-base"
                :class="postStore.isDark ? 'text-[#e3e0f6]' : 'text-gray-900'"
              >
                {{ post.title || 'Unknown' }}
              </h3>
              <p
                class="text-xs flex items-center gap-1"
                :class="postStore.isDark ? 'text-[#ccc3d8]/70' : 'text-gray-500'"
              >
                <Icon icon="mdi:calendar-blank" class="text-sm" />
                {{ formatDate(post.createdAt) }}
              </p>
            </div>
          </div>
          <div
            v-if="authStore.isOwner"
            class="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2"
          >
            <button
              @click="startEditing(post)"
              class="p-1 rounded-md transition-colors"
              :class="
                postStore.isDark
                  ? 'text-[#ccc3d8] hover:text-[#00f4fe] hover:bg-white/5'
                  : 'text-gray-400 hover:text-purple-600 hover:bg-gray-100'
              "
            >
              <Icon icon="mdi:pencil" class="text-lg" />
            </button>
            <button
              @click="confirmDelete(post._id)"
              class="p-1 rounded-md transition-colors"
              :class="
                postStore.isDark
                  ? 'text-[#ccc3d8] hover:text-red-400 hover:bg-white/5'
                  : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
              "
            >
              <Icon icon="mdi:delete" class="text-lg" />
            </button>
          </div>
        </div>

        <p
          class="mb-6 whitespace-pre-wrap leading-relaxed text-sm md:text-base"
          :class="postStore.isDark ? 'text-[#ccc3d8]' : 'text-gray-600'"
        >
          {{ post.content }}
        </p>

        <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2">
          <button
            v-for="(tag, index) in post.tags"
            :key="tag"
            @click="postStore.toggleFilterTag(tag)"
            class="px-3 py-1 rounded-full border text-xs font-medium cursor-pointer transition-all hover:scale-105"
            :class="[
              getTagColorClass(index, postStore.isDark),
              postStore.selectedTag === tag ? 'ring-2 ring-offset-1 ' + (postStore.isDark ? 'ring-[#d2bbff] ring-offset-[#121221]' : 'ring-purple-500 ring-offset-white') : ''
            ]"
          >
            #{{ tag }}
          </button>
        </div>
      </div>

      <!-- Edit Mode -->
      <div v-else>
        <div
          class="flex justify-between items-center mb-4 border-b pb-2"
          :class="postStore.isDark ? 'border-white/10' : 'border-gray-200'"
        >
          <h1
            class="font-medium text-lg"
            :class="postStore.isDark ? 'text-[#d2bbff]' : 'text-purple-600'"
          >
            Edit Thought
          </h1>
          <button
            @click="cancelEdit"
            class="transition-colors"
            :class="
              postStore.isDark
                ? 'text-gray-400 hover:text-red-400'
                : 'text-gray-400 hover:text-red-500'
            "
          >
            <Icon icon="mdi:close" class="text-xl" />
          </button>
        </div>
        <form @submit.prevent="editPost(post._id)">
          <div class="space-y-4">
            <input
              v-model="newTitle"
              type="text"
              placeholder="Title..."
              :class="
                postStore.isDark
                  ? 'bg-[#292839]/20 border-white/5 text-[#e3e0f6] focus:border-[#d2bbff]/40 focus:ring-[#d2bbff]/40'
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-400 focus:ring-purple-400'
              "
              class="w-full border p-3 rounded-xl focus:outline-none focus:ring-1 transition-all"
            />

            <textarea
              v-model="newContent"
              placeholder="Content..."
              :class="
                postStore.isDark
                  ? 'bg-[#292839]/20 border-white/5 text-[#e3e0f6] focus:border-[#d2bbff]/40 focus:ring-[#d2bbff]/40'
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-400 focus:ring-purple-400'
              "
              class="w-full border p-3 rounded-xl h-32 resize-none focus:outline-none focus:ring-1 transition-all"
            ></textarea>

            <input
              v-model="newTags"
              type="text"
              placeholder="Tags (comma separated)..."
              :class="
                postStore.isDark
                  ? 'bg-[#292839]/20 border-white/5 text-[#e3e0f6] focus:border-[#d2bbff]/40 focus:ring-[#d2bbff]/40'
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-400 focus:ring-purple-400'
              "
              class="w-full border p-3 rounded-xl focus:outline-none focus:ring-1 transition-all"
            />

            <div class="flex flex-wrap gap-2 pt-1">
                <span v-for="suggestion in suggestedTags" :key="suggestion"
                      @click="addSuggestedTag(suggestion)"
                      class="text-xs px-2 py-1 rounded-md cursor-pointer transition-colors border"
                      :class="postStore.isDark ? 'bg-white/5 border-white/10 hover:border-[#d2bbff]/50 hover:text-[#d2bbff] text-[#ccc3d8]' : 'bg-gray-100 border-gray-200 hover:border-purple-300 hover:text-purple-600 text-gray-600'">
                    + {{ suggestion }}
                </span>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              @click="cancelEdit"
              :class="
                postStore.isDark
                  ? 'bg-white/5 hover:bg-white/10 text-[#ccc3d8]'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              "
              class="px-6 py-2 rounded-full font-medium transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              :class="
                postStore.isDark
                  ? 'bg-[#7c3aed] hover:bg-[#6d28d9] text-[#ede0ff] shadow-[#7c3aed]/20'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/30'
              "
              class="px-6 py-2 rounded-full font-medium transition-all shadow-lg text-sm flex items-center gap-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </article>
  </TransitionGroup>
</template>

<style scoped>
/* Animate items when they move to new positions */
.layout-move {
  transition: all 0.5s ease-in-out;
}

/* Animate items entering */
.layout-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
.layout-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.layout-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.layout.leave-from {
  opacity: 1;
  transform: scale(1);
}

/* Smooth transition for layout changes */
.layout-leave-active {
  transition: all 0.5s ease-in;
  position: absolute;
}

.layout-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
