import { Sun, Cloud, CloudRain, CloudSnow, Wind, LucideIcon } from 'lucide-react';

export const weatherIconMap: Record<number, { label: string; icon: LucideIcon }> = {
  0: { label: 'Clear sky', icon: Sun },
  1: { label: 'Mainly clear', icon: Sun },
  2: { label: 'Partly cloudy', icon: Cloud },
  3: { label: 'Overcast', icon: Cloud },
  45: { label: 'Fog', icon: Cloud },
  48: { label: 'Depositing rime fog', icon: Cloud },

  51: { label: 'Light drizzle', icon: CloudRain },
  61: { label: 'Rain', icon: CloudRain },
  80: { label: 'Rain showers', icon: CloudRain },

  71: { label: 'Snow fall', icon: CloudSnow },
  73: { label: 'Snow fall', icon: CloudSnow },
  75: { label: 'Snow fall', icon: CloudSnow },
  85: { label: 'Snow showers', icon: CloudSnow },

  95: { label: 'Thunderstorm', icon: Wind },
  96: { label: 'Thunderstorm with hail', icon: Wind },
};
