import axios from 'axios';

const geoApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GEOCODING_API_URL || '',
});

export default geoApi;
