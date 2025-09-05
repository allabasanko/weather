import { DailyWeather } from '@/features/DailyWeather';

export default function ForecastPage() {
  return (
    <div className="container">
      <h1 className="title">Daily Weather</h1>
      <DailyWeather />
    </div>
  );
}
