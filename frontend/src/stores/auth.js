import {defineStore } from 'pinia';
import axios from 'axios';
import {ref } from 'vue';
import router from '../router/index.js';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const loading = ref(false);
    const error = ref(null);

    //getters

    //actions
    const handleLogin = async (username, password) => {
    try { 
        loading.value = true
        error.value = null
        //fetch from backend
        const response = await axios.post("http://localhost:4000/api/user/login", {
            username,
            password
        })
        //set user data on successful login
        user.value = {
            userID: response.data.userID,
            username: response.data.username
        }
        //save user data to local storage
        localStorage.setItem('user', JSON.stringify(user.value))
        router.push('/home')
        //return success message if saved
        return {
            success: true,
            message: "Welcome back " + user.value.username + "!!"
        }

    }catch (err) {
        //set error message on failed login
        error.value = err.response?.data?.message || "An error occurred during login."
        //returns false with error message
        return {
            success: false,
            message: error.value
        }
    } finally {
        loading.value = false
    }
}

return {
    //state
    user,
    loading,
    error,

    //getters

    //actions
    handleLogin,
}
})
