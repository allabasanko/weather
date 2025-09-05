'use client';
import { FC, useEffect } from 'react';
import { SearchInput } from '../SearchInput';
import { ForecastTimeSelect } from '../ForecastTimeSelect';
import { usePathname } from 'next/navigation';
import { useWeatherStore } from '@/store';

import styles from './SearchBar.module.css';

export const SearchBar: FC = () => {
  const {
    selectedDays,
    selectedHours,
    lat,
    lon,
    fetchCurrentWeather,
    fetchDailyWeather,
    fetchHourlyWeather,
    selectDays,
    selectHours,
    name,
  } = useWeatherStore();
  const pathname = usePathname();
  const selectVariant = pathname.includes('hourly') ? 'hourly' : 'daily';

  useEffect(() => {
    if (lat && lon) {
      if (pathname.includes('/today')) {
        fetchCurrentWeather(lat, lon);
      } else if (pathname.includes('/hourly')) {
        fetchHourlyWeather(lat, lon, selectedHours);
      } else if (pathname.includes('/forecast')) {
        fetchDailyWeather(lat, lon, selectedDays);
      }
    }
  }, [lat, lon, pathname, fetchCurrentWeather, fetchDailyWeather, fetchHourlyWeather, selectedDays, selectedHours]);

  const handleSelectTime = (time: number) => {
    return selectVariant === 'hourly' ? selectHours(time) : selectDays(time);
  };

  return (
    <div className={styles.wrapper}>
      <SearchInput />
      {!pathname.includes('today') && name && (
        <ForecastTimeSelect
          variant={selectVariant}
          value={selectVariant === 'hourly' ? selectedHours : selectedDays}
          onChange={handleSelectTime}
        />
      )}
    </div>
  );
};
