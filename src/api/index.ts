import axios from 'axios';

const BASE_URL = 'http://localhost:5173/api/';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.defaults.headers.common['Content-Type'] = 'application/json';
