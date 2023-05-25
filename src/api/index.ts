import axios from 'axios';

let BASE_URL;

if (import.meta.env.DEV) {
  BASE_URL = 'http://localhost:8000/api/v1';
}

if (import.meta.env.PROD) {
  BASE_URL = 'https://library-management-system-api-3qyl.onrender.com';
}

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.defaults.headers.common['Content-Type'] = 'application/json';
