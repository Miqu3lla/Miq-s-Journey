<script setup>

import LoginCard from '@/components/LoginCard.vue'
import {ref} from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { usePostStore } from '@/stores/postsStore'
import { useToast } from 'vue-toastification'
import bgImage from '@/images/login_background.png'

const authStore = useAuthStore()
const postStore = usePostStore()
const toast = useToast()

const username = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
    loading.value = true
    try {
        //gain access to the login logic from auth store
        if (loading.value) {
            toast.info('Logging in, please wait...')
        }
        const login = await authStore.handleLogin(username.value, password.value)
        //check if login was successful
        if (login.success) {
            toast.success('Login successful! Welcome back.')
        }
        else {
            toast.error('Login failed! Please check your credentials and try again.')
        }
    }catch (error) {
        toast.error('An error occurred during login. Please try again later.')
    } finally {
        loading.value = false
    }
}

const handleGuestLogin = async () => {
    loading.value = true
    try {
        authStore.guestLogin()
        toast.success('Logged in as Guest! Enjoy your stay.')
    }catch (err) {
        toast.error('An error occurred during guest login. Please try again later.')
    } finally {
        loading.value = false
    }
}

</script>

<template>
    
    <div class="flex gap-10 min-h-screen bg-cover bg-center" :style="{
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: 'cover', 
        backgroundAttachment: 'fixed'
    }">
        <div class = "hidden ml-60 mt-45 w-170 xl:block">
            <h1 class ='text-5xl text-white flex flex-col font-sans font-semibold tracking-tight'>Welcome Back 
                <span class = 'bg-gradient-to-r from-[#d2bbff] to-[#00f4fe] bg-clip-text text-transparent'>Miquella!</span></h1>
            <h1 class = 'text-xl font-medium text-gray-200 my-5'>A private space to document your journey, track your growth, and organize your thoughts.</h1>
        <div class = "mt-10 flex flex-col gap-6">
              <LoginCard 
                icons="mdi:login"
                iconClass="bg-[#7c3aed] text-white h-12 w-12 p-2 shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                title="Document Everything"
                content="Access your personalized dashboard and continue your journey with Miq."
            />
              <LoginCard 
                icons="mdi:notebook-edit"
                iconClass="bg-[#00f4fe] text-[#121221] h-12 w-12 p-2 shadow-[0_0_15px_rgba(0,244,254,0.4)]"
                title="Create New Entry"
                content="Start writing your thoughts, ideas, and experiences today."
            />
              <LoginCard 
                icons="mdi:chart-timeline-variant"
                iconClass="bg-[#ffade1] text-[#121221] h-12 w-12 p-2 shadow-[0_0_15px_rgba(255,173,225,0.4)]"
                title="Track Your Progress"
                content="View your journey timeline and see how far you've come."
            />
        </div>    
        </div>
        <div class = 'flex flex-col justify-center items-center w-1000 xl:w-1/3 '>
            <div :class="postStore.isDark ? 'bg-[#1e293b]/80 backdrop-blur-xl border border-white/5 text-[#e3e0f6] shadow-[0_0_30px_rgba(124,58,237,0.1)]' : 'bg-white text-black'" class="flex rounded-2xl h-160 w-130 xl:mt-10 transition-colors">
                <div class = "mt-10 ml-10">
                    <h1 class = "mb-3 text-2xl font-semibold">Access Your Space</h1>
                    <h1 class = "font-light">Enter your credentials below</h1>
                    <form  @submit.prevent="handleLogin" class = "flex flex-col mt-5">
                        <h1 class = "mb-4 font-medium">Username: </h1>
                        <input v-model="username" placeholder="Enter your Username"type="text" 
                            :class="postStore.isDark ? 'bg-[#121221] border-[#343344] text-white focus:ring-[#7c3aed]' : 'bg-white border-gray-300 focus:ring-indigo-500'" 
                            class="w-50 border p-3 w-100 rounded-lg focus:outline-none focus:ring-2 transition-colors"/>
                        <h1 class = "mt-4 font-medium">Password: </h1>
                        <input v-model="password" placeholder="Enter your Password"type="password" 
                            :class="postStore.isDark ? 'bg-[#121221] border-[#343344] text-white focus:ring-[#7c3aed]' : 'bg-white border-gray-300 focus:ring-indigo-500'" 
                            class="mt-4 mb-3 border rounded-lg p-3 w-100 focus:outline-none focus:ring-2 transition-colors"/>
                        <button type="submit" 
                            :class="postStore.isDark ? 'bg-[#7c3aed] hover:bg-[#6d28d9] shadow-[0_0_15px_rgba(124,58,237,0.3)]' : 'bg-indigo-700 hover:bg-indigo-600'" 
                            class="text-white rounded-lg p-3 mt-6 transition-all font-medium">Sign in to your Space</button>
                    </form>
                    <div class="flex justify-center mt-6" @click="handleGuestLogin">
                            <h1 :class="postStore.isDark ? 'text-[#d2bbff] hover:text-[#eaddff]' : 'text-indigo-900'" class="font-sans font-medium cursor-pointer transition-colors">Sign in as Guest!</h1>
                        </div>
                </div>
            </div>
        </div>
    </div>

</template>