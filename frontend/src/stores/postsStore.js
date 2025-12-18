import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "./authStore";

// Pinia store for managing posts state and actions
export const usePostStore = defineStore('posts',() => {
// State
const posts = ref([]) // Array to store all posts
const error = ref(null) // Error message storage
const loading = ref(false) // Loading state for async operations

// Getters (none currently defined)

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
return {
    posts,
    error,
    loading,

    //getters

    //actions
    createPost,
    viewPosts
}
})

