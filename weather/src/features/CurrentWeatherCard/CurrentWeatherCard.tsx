'use client';

import { FC } from 'react';
import styles from './CurrentWeatherCard.module.css';

import { CurrentData } from '@/types';
import { weatherIconMap } from '@/utils';

type Props = {
  data: CurrentData;
};

export const CurrentWeatherCard: FC<Props> = ({ data }) => {
  const weather = weatherIconMap[data.weathercode] || {
    label: 'Unknown',
    icon: null,
  };
  const Icon = weather.icon;

  return (
    <div className={styles.card}>
      <p className={styles.time}>{new Date(data.time).toLocaleString()}</p>
      {Icon && <Icon className={styles.icon} />}
      <p className={styles.temp}>{data.temperature_2m}°C</p>
      <p className={styles.label}>{weather.label}</p>
      <p className={styles.wind}>💨 {data.windspeed_10m} km/h</p>
    </div>
  );
};
