import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "./auth";



export const usePostStore = defineStore('posts',() => {
const posts = ref([])
const error = ref(null)
const loading = ref(false)
//getters


//actions 
    //create post logic
    const createPost = async(title, content, tags) => {
        loading.value = true
        //try catch for error handling
    try {
        //use auth store to get current user
        const authStore = useAuthStore();
        //call backend api to create post   
        const response = await axios.post("http://localhost:4000/api/post/create", {
            title,
            content,
            tags,
        })

        //add new post to posts array
        posts.value.unshift(response.data.post)
        //return success message
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
return {
    posts,
    error,
    loading,

    //getters

    //actions
    createPost,
}
})

