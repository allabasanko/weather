import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherByCityInputDto } from './dto/input/weather-by-city.dto';
import { DailyWeatherInputDto } from './dto/input/daily-weather-input.dto';
import { HourlyWeatherInputDto } from './dto/input/hourly-weather-input.dto';
import { CurrentWeatherDto } from './dto/output/current-weather.dto';
import { DailyWeatherDto } from './dto/output/daily-weather.dto';
import { HourlyWeatherDto } from './dto/output/hourly-weather.dto';

describe('WeatherController', () => {
  let controller: WeatherController;
  let service: WeatherService;

  const mockWeatherService = {
    getWeatherByCity: jest.fn(),
    getWeatherByDay: jest.fn(),
    getWeatherByHour: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        {
          provide: WeatherService,
          useValue: mockWeatherService,
        },
      ],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getWeather', () => {
    it('should return current weather', async () => {
      const query: WeatherByCityInputDto = { lat: 37.7749, lon: -122.4194 };

      const mockOutput: CurrentWeatherDto = {
        latitude: 37.7749,
        longitude: -122.4194,
        generationtime_ms: 0.1,
        utc_offset_seconds: 0,
        timezone: 'GMT',
        timezone_abbreviation: 'GMT',
        elevation: 10,
        current_units: {
          time: 'iso8601',
          interval: 'seconds',
          temperature_2m: '°C',
          weathercode: 'wmo code',
          windspeed_10m: 'km/h',
        },
        current: {
          time: '2025-09-01T12:00',
          interval: 3600,
          temperature_2m: 20.5,
          weathercode: 3,
          windspeed_10m: 15,
        },
      };

      const spy = jest.spyOn(service, 'getWeatherByCity');

      mockWeatherService.getWeatherByCity.mockResolvedValueOnce(mockOutput);

      const result = await controller.getWeather(query);

      expect(result).toEqual(mockOutput);
      expect(spy).toHaveBeenCalledWith(query.lat, query.lon);
    });
  });

  describe('getForecastByDay', () => {
    it('should return daily weather', async () => {
      const query: DailyWeatherInputDto = { lat: 37.7749, lon: -122.4194, days: 3 };

      const mockOutput: DailyWeatherDto = {
        latitude: 48.854515,
        longitude: 20.354034,
        generationtime_ms: 0.8962154388427734,
        utc_offset_seconds: 7200,
        timezone: 'Europe/Bratislava',
        timezone_abbreviation: 'GMT+2',
        elevation: 915,
        daily_units: {
          time: 'iso8601',
          temperature_2m_max: '°C',
          temperature_2m_min: '°C',
          weathercode: 'wmo code',
          windspeed_10m_max: 'km/h',
        },
        daily: {
          time: ['2025-09-02', '2025-09-03'],
          temperature_2m_max: [22.5, 21.4],
          temperature_2m_min: [12, 14.9],
          weathercode: [3, 65],
          windspeed_10m_max: [14, 19.8],
        },
      };

      const spy = jest.spyOn(service, 'getWeatherByDay');

      mockWeatherService.getWeatherByDay.mockResolvedValueOnce(mockOutput);

      const result = await controller.getForecastByDay(query);

      expect(result).toEqual(mockOutput);
      expect(spy).toHaveBeenCalledWith(query.lat, query.lon, query.days);
    });
  });

  describe('getForecastByHour', () => {
    it('should return hourly weather', async () => {
      const query: HourlyWeatherInputDto = { lat: 37.7749, lon: -122.4194, hours: 6 };

      const mockOutput: HourlyWeatherDto = {
        latitude: query.lat,
        longitude: query.lon,
        generationtime_ms: 0.1,
        utc_offset_seconds: 0,
        timezone: 'GMT',
        timezone_abbreviation: 'GMT',
        elevation: 10,
        hourly_units: {
          time: 'iso8601',
          temperature_2m: '°C',
          weathercode: 'wmo code',
          windspeed_10m: 'km/h',
        },
        hourly: {
          time: ['2025-09-01T12:00', '2025-09-01T13:00'],
          temperature_2m: [20, 21],
          weathercode: [3, 2],
          windspeed_10m: [15, 18],
        },
      };

      const spy = jest.spyOn(service, 'getWeatherByHour');

      mockWeatherService.getWeatherByHour.mockResolvedValueOnce(mockOutput);

      const result = await controller.getForecastByHour(query);

      expect(result).toEqual(mockOutput);
      expect(spy).toHaveBeenCalledWith(Number(query.lat), Number(query.lon), Number(query.hours));
    });
  });
});
