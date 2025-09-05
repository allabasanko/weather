export interface LoginFormValues {
  username: string;
  password: string;
}

export type SearchInputValue = {
  search: string;
};

export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Coordinates {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export interface HourlyUnits {
  temperature_2m: string;
  time: string;
  weathercode: string;
  windspeed_10m: string;
}

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
  windspeed_10m: number[];
}

export interface WeatherHourlyResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: HourlyData;
}

export interface CurrentUnits {
  interval: string;
  temperature_2m: string;
  time: string;
  weathercode: string;
  windspeed_10m: string;
}

export interface CurrentData {
  interval: number;
  temperature_2m: number;
  time: string;
  weathercode: number;
  windspeed_10m: number;
}

export interface WeatherCurrentResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: CurrentData;
}

export interface DailyUnits {
  temperature_2m_max: string;
  temperature_2m_min: string;
  time: string;
  weathercode: string;
  windspeed_10m_max: string;
}

export interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
  windspeed_10m_max: number[];
}

export interface WeatherDailyResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: DailyData;
}
