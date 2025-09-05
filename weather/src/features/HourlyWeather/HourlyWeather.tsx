'use client';
import React from 'react';
import { WeatherList } from '../WeatherList';
import { useWeatherStore } from '@/store';

export const HourlyWeather = () => {
  const { hourlyWeather } = useWeatherStore();
  return (
    <>
      {hourlyWeather ? (
        <WeatherList data={hourlyWeather.hourly} variant="hourly" />
      ) : (
        <p>No city selected, please select a city</p>
      )}
    </>
  );
};
