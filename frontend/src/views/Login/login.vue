<script setup>

import LoginCard from '@/components/LoginCard.vue'
import axios from 'axios'
import {ref} from 'vue'

const username = ref('')
const password = ref('')
const message = ref('')
const loading = ref(false)
const user = ref('')
const handleLogin = async () => {
    try { 
        loading.value = true
        const response = await axios.post("http://localhost:4000/api/user/login", {
            username: username.value,
            password: password.value
        })
        user.value = response.data
        message.value = "Welcome back, " + user.value.username + "!!"
        console.log(user.value)
    }catch (error) {
        message.value = error.response?.data?.message || "An error occurred during login."
        console.log(message.value)
    } finally {
        loading.value = false
    }
}

</script>

<template>
    
    <div class = "flex bg-gradient-to-b from-indigo-700 to-indigo-900  min-h-screen ">
        <div class = "hidden ml-60 mt-50 w-170 xl:block">
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
        <div class = 'flex flex-col justify-center items-center w- xl:w-1/3 '>
            <div class = "flex bg-white rounded-lg h-160 w-130 xl:mt-10">
                <div class = "mt-10 ml-10">
                    <h1 class = "mb-5 text-2xl font-semibold">Welcome back</h1>
                    <h1 class = "font-light">Enter your credentials to access your Space</h1>
                    <form  @submit.prevent="handleLogin" class = "flex flex-col mt-5">
                        <h1 class = "mb-4">Username: </h1>
                        <input v-model="username" placeholder="Enter your Username"type="text" class="w-50 border p-3 w-100 rounded-md"/>
                        <h1 class = "mt-4">Password: </h1>
                        <input v-model="password" placeholder="Enter your Password"type="password" class = "mt-4 mb-3 border rounded-md p-3 w-100"/>
                        <button type="submit" class = "bg-indigo-700 text-white rounded-md h-10 mt-6 hover:bg-indigo-600 transition-colors">Sign in to your Space</button>
                        <h1>{{ message }}</h1>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>