import {defineStore } from 'pinia';
import axios from '../api/axios.js';
import {ref, computed} from 'vue';
import router from '../router/index.js';
import API from '../config/api.js';


export const useAuthStore = defineStore('auth', () => {
    const saveduser = localStorage.getItem('user');
    const user = ref(saveduser ? JSON.parse(saveduser) : null);
    const loading = ref(false);
    const error = ref(null);

    //getters
    const isOwner = computed(() => user.value?.role === 'owner');
    const isGuest = computed(() => user.value?.role === 'guest');

    //actions
    const handleLogin = async (username, password) => {
    try { 
        loading.value = true
        error.value = null
        //fetch from backend
        const response = await axios.post(`${API}/api/user/login`, {
            username,
            password
        })
        //set user data on successful login
        user.value = {
            userID: response.data.userID,
            username: response.data.username,
            role: 'owner'
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
const logout = () => {
    user.value = null
    localStorage.removeItem('user')
    router.push('/login')
}
const guestLogin = () => {
    user.value = {
        userID: null,
        username: 'Guest',
        role: 'guest'
    }
    localStorage.setItem('user', JSON.stringify(user.value))
    router.push('/home')
    }


    return {
    //state
    user,
    loading,
    error,

    //getters
    isOwner,
    isGuest,

    //actions
    handleLogin,
    guestLogin,
    logout,
}
})



