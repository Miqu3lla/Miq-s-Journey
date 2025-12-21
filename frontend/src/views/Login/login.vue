<script setup>

import LoginCard from '@/components/LoginCard.vue'
import axios from 'axios'
import {ref} from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const toast = useToast()

const username = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
    loading.value = true
    try {
        //gain access to the login logic from auth store
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
    
    <div class="flex gap-10 min-h-screen bg-cover bg-center" style="background-image: url('/src/images/login_background.png'); background-size: cover; background-attachment: fixed;">
        <div class = "hidden ml-60 mt-45 w-170 xl:block">
            <h1 class ='text-5xl text-white flex flex-col font-sans font-semibold'>Welcome Back 
                <span class = 'bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent'>Miquella!</span></h1>
            <h1 class = 'text-xl font-medium text-gray-200 my-5'>A private space to document your journey, track your growth, and organize your thoughts.</h1>
        <div class = "mt-10 flex flex-col gap-6">
              <LoginCard 
                icons="mdi:login"
                iconClass="bg-indigo-600 h-12 w-12 p-2"
                title="Document Everything"
                content="Access your personalized dashboard and continue your journey with Miq."
            />
              <LoginCard 
                icons="mdi:notebook-edit"
                iconClass="bg-purple-600 h-12 w-12 p-2"
                title="Create New Entry"
                content="Start writing your thoughts, ideas, and experiences today."
            />
              <LoginCard 
                icons="mdi:chart-timeline-variant"
                iconClass="bg-blue-600 h-12 w-12 p-2"
                title="Track Your Progress"
                content="View your journey timeline and see how far you've come."
            />
        </div>    
        </div>
        <div class = 'flex flex-col justify-center items-center w-1000 xl:w-1/3 '>
            <div class = "flex bg-white rounded-lg h-160 w-130 xl:mt-10">
                <div class = "mt-10 ml-10">
                    <h1 class = "mb-3 text-2xl font-semibold">Access Your Space</h1>
                    <h1 class = "font-light">Enter your credentials below</h1>
                    <form  @submit.prevent="handleLogin" class = "flex flex-col mt-5">
                        <h1 class = "mb-4">Username: </h1>
                        <input v-model="username" placeholder="Enter your Username"type="text" class="w-50 border p-3 w-100 rounded-md"/>
                        <h1 class = "mt-4">Password: </h1>
                        <input v-model="password" placeholder="Enter your Password"type="password" class = "mt-4 mb-3 border rounded-md p-3 w-100"/>
                        <button type="submit" class = "bg-indigo-700 text-white rounded-md p-3 mt-6 hover:bg-indigo-600 transition-colors ">Sign in to your Space</button>
                    </form>
                    <div class="flex justify-center" @click="handleGuestLogin">
                            <h1 class="text-indigo-900 font-sans cursor-pointer">Sign in as Guest!</h1>
                        </div>
                </div>
            </div>
        </div>
    </div>

</template>