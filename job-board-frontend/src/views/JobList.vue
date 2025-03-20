<script setup>
import { ref, onMounted } from 'vue';
import { fetchJobs, getPresignedUrl, uploadToS3, submitJobApplication } from '../services/api';

const jobs = ref([]);
const uploadStatus = ref({});
const selectedFiles = ref({});

const handleFileSelect = (event, jobId) => {
  selectedFiles.value[jobId] = event.target.files[0];
};

const handleUpload = async (jobId) => {
  try {
    const file = selectedFiles.value[jobId];
    if (!file) return;

    uploadStatus.value[jobId] = 'uploading';
    
    // Step 1: Get presigned URL
    const fileName = `${Date.now()}-${file.name}`;
    const { presignedUrl, s3Key } = await getPresignedUrl(fileName, file.type);
    
    // Step 2: Upload to S3
    await uploadToS3(presignedUrl, file);
    
    // Step 3: Submit job application with S3 key
    await submitJobApplication(jobId, s3Key);
    
    uploadStatus.value[jobId] = 'success';
    setTimeout(() => {
      uploadStatus.value[jobId] = '';
      selectedFiles.value[jobId] = null;
    }, 3000);
  } catch (error) {
    uploadStatus.value[jobId] = 'error';
    console.error('Error uploading resume:', error);
  }
};

onMounted(async () => {
  const response = await fetchJobs();
  console.log(response, 'jobs');
  jobs.value = response;
});
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-center mb-4">Available Jobs</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="job in jobs" :key="job?.id" class="p-6 bg-white rounded shadow">
        <h2 class="text-xl font-bold">{{ job?.title }}</h2>
        <p class="text-gray-600">{{ job?.company }} - {{ job?.location }}</p>
        <p class="text-green-600 font-semibold mt-2">${{ job?.salary }}</p>
        
        <div class="mt-4">
          <label :for="'resume-' + job.id" class="block text-sm font-medium text-gray-700 mb-2">
            Upload Resume
          </label>
          <input
            :id="'resume-' + job.id"
            type="file"
            accept=".pdf,.doc,.docx"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            @change="(e) => handleFileSelect(e, job.id)"
          />
          <button
            @click="() => handleUpload(job.id)"
            :disabled="!selectedFiles[job.id] || uploadStatus[job.id] === 'uploading'"
            class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <span v-if="uploadStatus[job.id] === 'uploading'">Uploading...</span>
            <span v-else-if="uploadStatus[job.id] === 'success'" class="text-green-500">Uploaded Successfully!</span>
            <span v-else-if="uploadStatus[job.id] === 'error'" class="text-red-500">Upload Failed</span>
            <span v-else>Upload Resume</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
