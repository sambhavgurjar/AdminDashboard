import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_URL || "http://localhost:8080"}/api/v1`,
});
axiosInstance.interceptors.request.use((request) => {
  let token = localStorage.getItem("adminToken");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
},
    (error) => {
    return Promise.reject(error)
})

export default axiosInstance;
