// api.js
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // from .env
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Automatically attach token if exists
axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
