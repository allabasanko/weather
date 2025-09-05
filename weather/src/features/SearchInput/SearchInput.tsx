'use client';
import { useWeatherStore } from '@/store/weatherStore';
import { FC, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import styles from './SearchInput.module.css';
import { City, Coordinates, SearchInputValue } from '@/types';

export const SearchInput: FC = () => {
  const {
    fetchCitiesList,
    selectCity,
    citiesList,
    error,
    showSuggestions,
    setShowSuggestions,
    setCloseSuggestions,
    name,
  } = useWeatherStore();

  const { register, watch, setValue } = useForm<SearchInputValue>({
    defaultValues: { search: '' },
  });

  const searchValue = watch('search');

  const debounceRef = useRef<number | undefined>(undefined);
  const suppressRef = useRef(false);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      const q = searchValue.trim();

      if (suppressRef.current) {
        suppressRef.current = false;
        return;
      }

      if (q.length < 3) {
        setCloseSuggestions();
        return;
      }

      if (q === name) {
        setCloseSuggestions();
        return;
      }

      fetchCitiesList(q);
      setShowSuggestions();
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchValue, name, fetchCitiesList, setShowSuggestions, setCloseSuggestions]);

  const handleSelectCity = (city: City) => {
    const adapted: Coordinates = {
      lat: city.latitude,
      lon: city.longitude,
      name: city.name,
      country: city.country,
    };

    suppressRef.current = true;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    selectCity(adapted);

    setValue('search', city.name, { shouldValidate: true, shouldDirty: false });

    setCloseSuggestions();
  };

  return (
    <div className={styles.wrapper}>
      <input
        {...register('search')}
        placeholder="Enter city..."
        className={styles.input}
        onFocus={() => {
          const q = searchValue.trim();
          if (q.length >= 3 && citiesList.length > 0) setShowSuggestions();
        }}
      />

      {error && <p className={styles.error}>{error}</p>}

      {showSuggestions && citiesList.length > 0 && (
        <ul className={styles.resultBox}>
          {citiesList.map((city) => (
            <li
              key={`${city.latitude}-${city.longitude}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelectCity(city)}
              className={styles.resultItem}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
