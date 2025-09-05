import { CurrentWeather } from "@/features/CurrentWeather";

export default function TodayPage() {
  return (
    <div className="container">
      <h1 className="title">{"Today's Weather"}</h1>
      <CurrentWeather />
    </div>
  );
}
