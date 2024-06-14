import axios from 'axios';

export const baseURL = 'https://openlibrary.org';

export const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 20000,
});
