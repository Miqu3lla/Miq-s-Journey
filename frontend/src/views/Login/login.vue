<script setup>

import LoginCard from '@/components/LoginCard.vue'
import axios from 'axios'

</script>

<template>
    
    <div class = "flex bg-gradient-to-b from-indigo-700 to-indigo-900  min-h-screen ">
        <div class = "ml-60 mt-60 w-170">
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
    </div>

</template>