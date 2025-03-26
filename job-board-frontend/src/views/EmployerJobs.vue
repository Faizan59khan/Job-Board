<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getEmployerJobs } from '../services/api';

const router = useRouter();
const jobs = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await getEmployerJobs();
    jobs.value = response.data;
  } catch (err) {
    error.value = err.message || 'Failed to fetch jobs';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">My Posted Jobs</h1>
    
    <div v-if="loading" class="text-center">Loading...</div>
    
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div v-if="jobs.length === 0 && !loading" class="text-center text-gray-500">
      You haven't posted any jobs yet.
    </div>

    <div v-else class="grid gap-4">
      <div v-for="job in jobs" :key="job.id" class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold">{{ job.title }}</h2>
        <p class="text-gray-600">{{ job.company }}</p>
        <p class="text-gray-600">{{ job.location }}</p>
        <p class="text-gray-600">${{ job.salary }}</p>
        <p class="text-gray-600">Status: {{ job.status }}</p>
      </div>
    </div>
  </div>
</template>
