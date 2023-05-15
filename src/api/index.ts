import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';
// export const BOOKS = `${BASE_URL}books.json`;
// export const AUTHORS = `${BASE_URL}authors.json`;
// export const CATEGORIES = `${BASE_URL}categories.json`;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.defaults.headers.common['Content-Type'] = 'application/json';
// api.defaults.headers.common = { Authorization: `Bearer ${cookie.get('logged_in')}` };
