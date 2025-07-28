import axios from 'axios'

export function AxiosApi() {
    const API_URL = import.meta.env.VITE_API_URL;
    const api = axios.create({
        baseURL: API_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return api;
};