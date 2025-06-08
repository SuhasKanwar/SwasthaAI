import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_USER_BACKEND_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;