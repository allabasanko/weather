import { FC } from 'react';
import { weatherIconMap } from '@/utils/weatherIcons';
import styles from './WeatherCard.module.css';

type Props = {
  time: string;
  temp: string | number;
  weathercode: number;
  variant: 'hourly' | 'daily';
};

export const WeatherCard: FC<Props> = ({ time, temp, weathercode, variant }) => {
  const weather = weatherIconMap[weathercode] || { label: 'Unknown', icon: null };
  const Icon = weather.icon;

  return (
    <div className={styles.card}>
      <p className={styles.time}>{new Date(time).toLocaleString()}</p>
      {Icon && <Icon className={styles.icon} />}
      <p className={styles.temp}>
        {temp}
        {variant === 'hourly' ? '°C' : 'C'}
      </p>
      <p className={styles.weather}>{weather.label}</p>
    </div>
  );
};
