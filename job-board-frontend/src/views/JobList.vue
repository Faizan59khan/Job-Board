<script setup>
import { ref, onMounted } from 'vue';
import { fetchJobs } from '../services/api';

const jobs = ref([]);

onMounted(async () => {
  const response = await fetchJobs();
  jobs.value = response.data;
});
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-center mb-6">Available Jobs</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="job in jobs" :key="job.id" class="p-6 bg-white rounded shadow">
        <h2 class="text-xl font-bold">{{ job.title }}</h2>
        <p class="text-gray-600">{{ job.company }} - {{ job.location }}</p>
        <p class="text-green-600 font-semibold mt-2">${{ job.salary }}</p>
      </div>
    </div>
  </div>
</template>
