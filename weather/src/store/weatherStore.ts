import { fetchCoordinates, fetchWeatherForecast, fetchWeatherHourly, fetchWeatherToday } from '@/services/operations';
import { City, Coordinates, WeatherCurrentResponse, WeatherDailyResponse, WeatherHourlyResponse } from '@/types';
import { create } from 'zustand';

interface WeatherState {
  name: string;
  country: string;
  lon: number | null;
  lat: number | null;
  showSuggestions: boolean;
  citiesList: City[];
  currentWeather: WeatherCurrentResponse | null;
  dailyWeather: WeatherDailyResponse | null;
  hourlyWeather: WeatherHourlyResponse | null;

  selectedDays: number;
  selectedHours: number;

  isLoading: boolean;
  error: string | null;

  fetchCitiesList: (city: string) => Promise<void>;
  selectCity: (city: Coordinates) => void;
  setShowSuggestions: () => void;
  setCloseSuggestions: () => void;

  selectDays: (time: number) => void;
  selectHours: (time: number) => void;

  fetchDailyWeather: (lat: number, lon: number, days: number) => Promise<void>;
  fetchHourlyWeather: (lat: number, lon: number, hours: number) => Promise<void>;
  fetchCurrentWeather: (lat: number, lon: number) => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  name: '',
  country: '',
  lat: null,
  lon: null,
  showSuggestions: false,
  citiesList: [],
  currentWeather: null,
  dailyWeather: null,
  hourlyWeather: null,
  selectedDays: 3,
  selectedHours: 6,
  isLoading: false,
  error: null,
  fetchCitiesList: async (search: string) => {
    set({ isLoading: true, error: null });
    try {
      const citiesList = await fetchCoordinates(search);

      if (!citiesList || citiesList.length === 0) {
        set({ isLoading: false, error: 'City not found' });
      }

      set({ citiesList, isLoading: false, error: null });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to fetch weather data' });
      console.error('Error fetching weather data:', error);
    }
  },

  setShowSuggestions: () => {
    set({ showSuggestions: true, citiesList: [] });
  },

  setCloseSuggestions: () => {
    set({ showSuggestions: false, citiesList: [] });
  },

  selectCity: (city: Coordinates) => {
    console.log(city, 'select city in store');

    set({
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
      citiesList: [],
      showSuggestions: false,
      error: null,
    });
  },

  selectDays: (time: number) => {
    set({ selectedDays: time });
  },

  selectHours: (time: number) => {
    set({ selectedHours: time });
  },

  fetchDailyWeather: async (lat: number, lon: number, days: number) => {
    try {
      set({ isLoading: true, error: null });

      const weather = await fetchWeatherForecast(lat, lon, days);

      set({ dailyWeather: weather, isLoading: false, error: null });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  },

  fetchHourlyWeather: async (lat: number, lon: number, hours: number) => {
    try {
      set({ isLoading: true, error: null });

      const weather = await fetchWeatherHourly(lat, lon, hours);

      set({ hourlyWeather: weather, isLoading: false, error: null });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  },

  fetchCurrentWeather: async (lat: number, lon: number) => {
    try {
      set({ isLoading: true, error: null });

      const weather = await fetchWeatherToday(lat, lon);

      set({ currentWeather: weather, isLoading: false, error: null });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  },
}));
