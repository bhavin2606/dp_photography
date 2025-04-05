// src/lib/api.ts
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // optional if using cookies
});

export default API;
