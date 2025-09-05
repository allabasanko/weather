import { HourlyWeather } from "@/features/HourlyWeather";

export default function ForecastPage() {
  return (
    <div className="container">
      <h1 className="title">Hourly Weather</h1>
      <HourlyWeather />
    </div>
  );
}
