'use client';
import { useWeatherStore } from '@/store';
import { FC } from 'react';
import { CurrentWeatherCard } from '../CurrentWeatherCard';

export const CurrentWeather: FC = () => {
  const { currentWeather } = useWeatherStore();

  return (
    <>
      {currentWeather ? (
        <CurrentWeatherCard data={currentWeather.current} />
      ) : (
        <p>No city selected, please select a city</p>
      )}
    </>
  );
};
