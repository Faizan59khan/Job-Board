import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const register = (email, password) =>
  api.post("/auth/register", { email, password });
export const login = (email, password) =>
  api.post("/auth/login", { email, password });
// Fetch jobs with Authorization token
export const fetchJobs = () => {
  const token = localStorage.getItem("token"); // Get token from local storage
  return api.get("/job", {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token only for /job
    },
  });
};
