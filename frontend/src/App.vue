<script setup>
import Navbar from './components/Navbar.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const isLoginRoute = computed(() => route.name === 'Login');
</script>

<template>
  <!-- router-view displays the current route's component -->

   <div v-if="!isLoginRoute">
    <navbar/>
   </div>
  <router-view/>
</template>


