<script setup>
import { ref } from 'vue';
import { register } from '../services/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');

const handleRegister = async () => {
  await register(email.value, password.value);
  router.push('/login');
};
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow w-96">
      <h1 class="text-2xl font-bold text-center mb-4">Register</h1>
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded mb-2">
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded mb-4">
      <button @click="handleRegister" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Register
      </button>
    </div>
  </div>
</template>
