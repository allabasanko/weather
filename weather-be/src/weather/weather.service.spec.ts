import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import axios from 'axios';
import { WeatherByCityInputDto } from './dto/input/weather-by-city.dto';
import { CurrentWeatherDto } from './dto/output/current-weather.dto';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherService],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getWeatherByCity', () => {
    it('should return CurrentWeatherDto', async () => {
      const input: WeatherByCityInputDto = { lat: 37.7749, lon: -122.4194 };

      const mockOutput: CurrentWeatherDto = {
        latitude: 48.854515,
        longitude: 20.354034,
        generationtime_ms: 0.0824928283691406,
        utc_offset_seconds: 0,
        timezone: 'GMT',
        timezone_abbreviation: 'GMT',
        elevation: 915,
        current_units: {
          time: 'iso8601',
          interval: 'seconds',
          temperature_2m: '°C',
          weathercode: 'wmo code',
          windspeed_10m: 'km/h',
        },
        current: {
          time: '2025-09-02T09:15',
          interval: 900,
          temperature_2m: 19.6,
          weathercode: 3,
          windspeed_10m: 13.7,
        },
      };

      mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockOutput });

      const result = await service.getWeatherByCity(input.lat, input.lon);

      expect(result).toEqual(mockOutput);
      expect(
        jest.spyOn(mockedAxios, 'get').mockResolvedValueOnce({
          status: 200,
          data: mockOutput,
        }),
      ).toHaveBeenCalledWith(expect.any(String), {
        params: {
          latitude: input.lat,
          longitude: input.lon,
          current: 'temperature_2m,weathercode,windspeed_10m',
        },
      });
    });
  });
});
