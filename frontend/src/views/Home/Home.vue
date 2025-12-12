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
        <h1 v-if="authStore.isGuest">These are for guests only!</h1>
        <button @click="logout()">Logout</button>
    </div>
</template>