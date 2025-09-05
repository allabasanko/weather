import axios from 'axios';
import apiWeather from '../api/weather';

export const loginUser = async (username: string, password: string) => {
  try {
    const token = Buffer.from(`${username}:${password}`).toString('base64');
    const headers = { Authorization: `Basic ${token}` };

    const response = await apiWeather.post('/auth/login', {}, { headers });

    localStorage.setItem('token', response.data.token);

    return response.data;
  } catch (error: unknown) {
    let message = 'Ooops, something went wrong';

    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          message = 'Wrong username or password';
        } else {
          message = `Server error: ${error.response.status}`;
        }
      } else if (error.request) {
        message = 'Server is not available';
      } else {
        message = error.message || message;
      }
    }

    throw new Error(message);
  }
};
