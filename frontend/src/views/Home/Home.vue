<script setup>
import { useAuthStore } from '@/stores/auth';
import { Icon } from '@iconify/vue';
const authStore = useAuthStore();

const logout = () => {
    authStore.logout();
}
</script>

<template>
    <nav>
        <div class = 'flex justify-between bg-white shadow-md p-2'>
            <div class="flex ">
                <div class ="p-2">
                    <Icon icon="mdi:alpha-m" class="h-12 w-12 bg-indigo-600 rounded-md text-white p-1 ml-5"/>
                </div>
                <div class = "flex flex-col">
                    <h1 class="text-xl font-semibold mt-2 ml-2">Miq's Journey</h1>
                    <h1 class="text-md font-medium ml-2 text-gray-500"> Document Your Growth</h1>
                </div>
            </div>
            <div class = 'flex mr-10 items-center gap-4'>
                <!-- Search Bar -->
                <div class="relative">
                    <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                    <input 
                        type="text" 
                        placeholder="Search posts..." 
                        class="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <!-- List View Button -->
                <div class="h-10 w-10 flex items-center justify-center text-gray-600 bg-gray-100 rounded-md hover:bg-indigo-500 hover:text-white transition-colors cursor-pointer"
                    title="List View">
                    <Icon icon="mdi:format-list-bulleted" class="h-6 w-6"/> 
                </div>

                <!-- Grid View Button -->
                <div class="h-10 w-10 flex items-center justify-center text-gray-600 bg-gray-100 rounded-md hover:bg-indigo-500 hover:text-white transition-colors cursor-pointer"
                    title="Grid View">
                    <Icon icon="mdi:view-grid" class="h-6 w-6"/> 
                </div>

                <!-- Light/Dark Mode Toggle -->
                <div class="h-10 w-10 flex items-center justify-center text-gray-600 bg-yellow-100 rounded-md hover:bg-yellow-400 hover:text-white transition-colors cursor-pointer"
                    title="Toggle Theme">
                    <Icon icon="mdi:white-balance-sunny" class="h-6 w-6"/> 
                </div>

                <!-- Dashboard Button -->
                <button class="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors font-medium">
                    Dashboard
                </button>

                <!-- Logout Button -->
                <div  @click="logout" title="Logout" class="h-10 w-10 flex items-center justify-center text-gray-600 bg-gray-100 rounded-md hover:bg-red-400 hover:text-white transition-colors cursor-pointer">
                    <Icon icon="mdi:logout" class="h-6 w-6"/> 
                </div>

            </div>
        </div>
    </nav>
    </template>