'use client';

import { FC } from 'react';
import styles from './WeatherList.module.css';
import { WeatherCard } from '../WeatherCard/WeatherCard';
import { DailyData, HourlyData } from '@/types';

type Props = {
  data: HourlyData | DailyData;
  variant: 'hourly' | 'daily';
};

export const WeatherList: FC<Props> = ({ data, variant }) => {
  if (variant === 'hourly') {
    const hourly = data as HourlyData;

    return (
      <div className={styles.list}>
        {hourly.time.map((time, idx) => (
          <WeatherCard
            key={time}
            time={time}
            temp={hourly.temperature_2m[idx]}
            weathercode={hourly.weathercode[idx]}
            variant={variant}
          />
        ))}
      </div>
    );
  }

  const daily = data as DailyData;

  return (
    <div className={styles.list}>
      {daily.time.map((time, idx) => (
        <WeatherCard
          key={time}
          time={time}
          temp={`${daily.temperature_2m_min[idx]}° / ${daily.temperature_2m_max[idx]}°`}
          weathercode={daily.weathercode[idx]}
          variant={variant}
        />
      ))}
    </div>
  );
};
