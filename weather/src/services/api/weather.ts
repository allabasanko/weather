import { useAuthStore } from '@/store';
import axios from 'axios';

const apiWeather = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
});

apiWeather.interceptors.request.use((config) => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated;

  console.log('📌 Request Headers:', config.headers);

  console.log(isAuthenticated, 'interceptor auth');
  if (isAuthenticated) {
    const token = Buffer.from(`${process.env.NEXT_PUBLIC_USER}:${process.env.NEXT_PUBLIC_PASSWORD}`).toString('base64');

    config.headers.Authorization = `Basic ${token}`;
  }

  return config;
});

export default apiWeather;
