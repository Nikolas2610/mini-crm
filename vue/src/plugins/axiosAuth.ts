import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { useUserStore } from '../stores/UserStore'

const userStore = useUserStore();

const axiosAuth: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

axiosAuth.interceptors.request.use((config) => {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${userStore.getToken}`;
    return config;
});

export default axiosAuth;
