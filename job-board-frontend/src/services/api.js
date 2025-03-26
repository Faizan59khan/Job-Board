import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const makeRequest = async ({
  endpoint,
  method = "GET",
  data = null,
  useAuth = false,
  customHeaders = {},
}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    // Add authorization header if required
    if (useAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const config = {
      method,
      url: endpoint,
      headers,
      ...(data && { data }), // Only add data if it exists
    };

    const response = await api(config);
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      throw {
        status: error.response.status,
        message: error.response.data.message || "Server error",
        data: error.response.data,
      };
    } else if (error.request) {
      // Request made but no response
      throw {
        status: 503,
        message: "Service unavailable",
        error: error.request,
      };
    } else {
      // Request setup error
      throw {
        status: 500,
        message: error.message,
        error,
      };
    }
  }
};

// Updated API functions using makeRequest
export const register = (email, password) =>
  makeRequest({
    endpoint: "/auth/register",
    method: "POST",
    data: { email, password },
  });

export const login = (email, password) =>
  makeRequest({
    endpoint: "/auth/login",
    method: "POST",
    data: { email, password },
  });

export const fetchJobs = () =>
  makeRequest({
    endpoint: "/job",
    useAuth: true,
  });

// Example of additional API functions
export const createJob = (jobData) =>
  makeRequest({
    endpoint: "/job",
    method: "POST",
    data: jobData,
    useAuth: true,
  });

export const updateJob = (jobId, jobData) =>
  makeRequest({
    endpoint: `/job/${jobId}`,
    method: "PUT",
    data: jobData,
    useAuth: true,
  });

export const deleteJob = (jobId) =>
  makeRequest({
    endpoint: `/job/${jobId}`,
    method: "DELETE",
    useAuth: true,
  });

export const searchJobs = (searchParams) =>
  makeRequest({
    endpoint: "/job/search",
    method: "GET",
    data: searchParams,
    useAuth: true,
  });

export const getPresignedUrl = (fileName, fileType) =>
  makeRequest({
    endpoint: `/job-applications/presigned-url`,
    method: "POST",
    data: { fileName, fileType },
    useAuth: true,
  });

export const uploadToS3 = async (presignedUrl, file) => {
  try {
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type
      }
    });
    return true;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};

export const submitJobApplication = (jobId, s3Key) =>
  makeRequest({
    endpoint: `/job-applications`,
    method: "POST",
    data: { jobId, resume: s3Key },
    useAuth: true,
  });

export const getEmployerJobs = () =>
  makeRequest({
    endpoint: '/job/employer',
    useAuth: true,
  });
