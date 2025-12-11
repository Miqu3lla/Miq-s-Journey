<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const logout = () => {
    authStore.logout();
}
</script>

<template>
    <div>
        <h1>Home Page</h1>
        <button @click="logout()">Logout</button>
    </div>
</template>