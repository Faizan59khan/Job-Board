<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(localStorage.getItem('token'));

const logout = () => {
  localStorage.removeItem('token');
  isLoggedIn.value = null;
  router.push('/login');
};
</script>

<template>
  <nav class="bg-blue-600 p-4 text-white flex justify-between">
    <router-link to="/" class="text-xl font-bold">JobBoard</router-link>
    <div class="flex gap-4">
      <router-link to="/jobs" class="hover:underline">Jobs</router-link>
      <router-link to="/login" v-if="!isLoggedIn" class="hover:underline">Login</router-link>
      <router-link to="/register" v-if="!isLoggedIn" class="hover:underline">Register</router-link>
      <button v-if="isLoggedIn" @click="logout" class="hover:underline">Logout</button>
    </div>
  </nav>
</template>
