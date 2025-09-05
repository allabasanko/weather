'use client';
import React from 'react';
import { WeatherList } from '../WeatherList';
import { useWeatherStore } from '@/store';

export const DailyWeather = () => {
  const { dailyWeather } = useWeatherStore();
  return (
    <>
      {dailyWeather ? (
        <WeatherList data={dailyWeather.daily} variant="daily" />
      ) : (
        <p>No city selected, please select a city</p>
      )}
    </>
  );
};
