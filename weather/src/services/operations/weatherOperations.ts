import { WeatherCurrentResponse, WeatherDailyResponse, WeatherHourlyResponse } from '@/types';
import apiWeather from '../api/weather';

export const fetchWeatherToday = async (lat: number, lon: number): Promise<WeatherCurrentResponse> => {
  try {
    const { data } = await apiWeather.get('/weather', {
      params: {
        lat,
        lon,
      },
    });

    console.log(data);

    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchWeatherHourly = async (lat: number, lon: number, hours: number): Promise<WeatherHourlyResponse> => {
  try {
    const { data } = await apiWeather.get('/weather/hourly', {
      params: {
        lat,
        lon,
        hours,
      },
    });

    console.log(data);

    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchWeatherForecast = async (lat: number, lon: number, days: number): Promise<WeatherDailyResponse> => {
  try {
    const { data } = await apiWeather.get('/weather/daily', {
      params: {
        lat,
        lon,
        days,
      },
    });

    console.log(data);

    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
