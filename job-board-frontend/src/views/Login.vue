<script setup>
import { ref } from 'vue';
import { login } from '../services/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMsg = ref('');

const handleLogin = async () => {
  try {
    const response = await login(email.value, password.value);
    localStorage.setItem('token', response.token);
    router.push('/');
  } catch (error) {
    console.log(error);
    errorMsg.value = 'Invalid credentials';
  }
};
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow w-96">
      <h1 class="text-2xl font-bold text-center mb-4">Login</h1>
      <p v-if="errorMsg" class="text-red-500 text-center">{{ errorMsg }}</p>
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded mb-2">
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded mb-4">
      <button @click="handleLogin" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Login
      </button>
    </div>
  </div>
</template>
