import { defineStore } from "pinia";
import { ref,computed } from "vue";
import axios from "axios";
import { useAuthStore } from "./authStore";


// Pinia store for managing posts state and actions
export const usePostStore = defineStore('posts',() => {
// State
const posts = ref([]) // Array to store all posts
const error = ref(null) // Error message storage
const loading = ref(false) // Loading state for async operations
const isGrid = ref(false) // View mode state
const isDark = ref(localStorage.getItem('isDarkMode') === 'true')

// Getters 

const isGridView = computed(() => {
    isGrid.value = !isGrid.value
})

const isDarkMode = computed(() => {
    isDark.value = !isDark.value
    localStorage.setItem('isDarkMode', isDark.value)
})

const PostCount = computed(() => posts.value.length)

const TodayPostCount = computed(() => {
    const today = new Date();
    return posts.value.filter(post => {
        const postDate = new Date(post.createdAt);
        return postDate.getDate() === today.getDate()
    })  
})
const MonthlyPostCount = computed(() => {
    const today = new Date();
    return posts.value.filter(post => {
        const postDate = new Date(post.createdAt);
        return postDate.getMonth() === today.getMonth()
    })
})

const UniqueTagCount = computed(() => {
    const Alltags = posts.value.flatMap(post => post.tags)
    return new Set(Alltags).size
})


// Actionss 
// Create a new post
const createPost = async(title, content, tags) => {
    loading.value = true
    error.value = null
    
    try {
        // Send POST request to backend API to create a new post
        const response = await axios.post("http://localhost:4000/api/post/create", {
            title,
            content,
            tags,
        })


        // Add new post to the beginning of posts array
        posts.value.unshift(response.data.post)
        
        
        // Return success status
        return {
            success: true,
            message: response.data.message
        }
        }catch (err) {
            error.value = err.response?.data?.message || "An error occurred while creating the post."
            return {
                success: false,
                message: error.value
            }

        }finally {
            loading.value = false
        }

    
}

// Fetch all posts from the backend
const viewPosts = async() => {
    loading.value = true
    error.value = null
    
    try {
        // GET request to fetch all posts
        const response = await axios.get("http://localhost:4000/api/post/all")
        
        // Update posts array with fetched data
        posts.value = response.data?.posts
        
        return {
            success: true,
            message: "Posts fetched successfully"
        }
    }catch (err) {
        // Handle errors
        error.value = err.response?.data?.message || "An error occurred while fetching posts."
        return {
            success: false,
            message: error.value
        }
    }finally {
        loading.value = false
    }
}

const editPost = async ({postID, title, content, tags}) => {
    loading.value = true
    error.value = null

    try {
        const response = await axios.put(`http://localhost:4000/api/post/edit/${postID}`, {
            title,
            content,
            tags
        })
        // Update the post in the posts array
        const index = posts.value.findIndex(post => post._id === postID)
        if (index !== -1) {
            posts.value[index] = response.data.post
        }

        return {
            success: true,
            message: response.data.message
        }

    }catch (err) {
        error.value = err.response?.data?.message || "An error occurred while editing the post."
        return {
            success: false,
            message: error.value
        }
    }finally {
        loading.value = false
    }
}

const deletePost = async (postID) => {
    loading.value = true
    error.value = null

    try  {
        const response = await axios.delete(`http://localhost:4000/api/post/delete/${postID}`)

        //remove post from posts array
        posts.value = posts.value.filter(post => post._id !== postID)

        return {
            success: true,
            message: response.data.message
        }

    }catch (err) {
        error.value = err.response?.data?.message || "An error occurred while deleting the post."
        return {
            success: false,
            message: error.value
        }
    }finally {
        loading.value = false
    }
}
return {
    posts,
    error,
    loading,
    isGrid,
    isDark,

    //getters
    isGridView,
    isDarkMode,
    PostCount,
    TodayPostCount,
    MonthlyPostCount,
    UniqueTagCount,

    //actions
    createPost,
    viewPosts,
    editPost,
    deletePost,
    
    
    
}
})

