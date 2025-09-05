import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CurrentWeatherDto } from './dto/output/current-weather.dto';
import { DailyWeatherDto } from './dto/output/daily-weather.dto';
import { HourlyWeatherDto } from './dto/output/hourly-weather.dto';

@Injectable()
export class WeatherService {
  async getWeatherByCity(lat: number, lon: number): Promise<CurrentWeatherDto> {
    const weatherBaseUrl = process.env.WEATHER_API_URL || '';
    const weatherParams = {
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,weathercode,windspeed_10m',
    };

    const response = await axios.get<CurrentWeatherDto>(weatherBaseUrl, { params: weatherParams });

    if (response.status !== 200) {
      throw new Error('Failed to fetch weather data');
    }

    return response.data;
  }

  async getWeatherByDay(lat: number, lon: number, days: number): Promise<DailyWeatherDto> {
    const weatherBaseUrl = process.env.WEATHER_API_URL || '';
    const weatherParams = {
      latitude: lat,
      longitude: lon,
      daily: 'temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max',
      timezone: 'auto',
      forecast_days: days,
    };

    const response = await axios.get<DailyWeatherDto>(weatherBaseUrl, { params: weatherParams });

    if (response.status !== 200) {
      throw new Error('Failed to fetch weather data');
    }
    return response.data;
  }

  async getWeatherByHour(lat: number, lon: number, hours: number): Promise<HourlyWeatherDto> {
    const weatherBaseUrl = process.env.WEATHER_API_URL || '';
    const weatherParams = {
      latitude: lat,
      longitude: lon,
      hourly: 'temperature_2m,weathercode,windspeed_10m',
      timezone: 'auto',
      forecast_hours: hours,
    };

    const response = await axios.get<HourlyWeatherDto>(weatherBaseUrl, { params: weatherParams });

    console.log(response.data);

    if (response.status !== 200) {
      throw new Error('Failed to fetch weather data');
    }

    return response.data;
  }
}
