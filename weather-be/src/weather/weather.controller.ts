import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { AuthGuard } from '../guard/auth.guard';
import { WeatherByCityInputDto } from './dto/input/weather-by-city.dto';
import { DailyWeatherInputDto } from './dto/input/daily-weather-input.dto';
import { HourlyWeatherInputDto } from './dto/input/hourly-weather-input.dto';
import { ApiBasicAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentWeatherDto } from './dto/output/current-weather.dto';
import { DailyWeatherDto } from './dto/output/daily-weather.dto';

@ApiTags('Weather')
@ApiBasicAuth()
@UseGuards(AuthGuard)
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiOperation({ summary: 'Get current weather by city coordinates' })
  @ApiResponse({ status: 200, description: 'Current weather data retrieved successfully.', type: CurrentWeatherDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getWeather(
    @Query()
    query: WeatherByCityInputDto,
  ) {
    const { lat, lon } = query;

    return this.weatherService.getWeatherByCity(lat, lon);
  }

  @ApiOperation({ summary: 'Get daily weather forecast by city coordinates' })
  @ApiResponse({
    status: 200,
    description: 'Daily weather forecast data retrieved successfully.',
    type: DailyWeatherDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('daily')
  async getForecastByDay(@Query() query: DailyWeatherInputDto) {
    const { lat, lon, days } = query;

    return this.weatherService.getWeatherByDay(lat, lon, days);
  }

  @ApiOperation({ summary: 'Get hourly weather forecast by city coordinates' })
  @ApiResponse({
    status: 200,
    description: 'Hourly weather forecast data retrieved successfully.',
    type: DailyWeatherDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('hourly')
  async getForecastByHour(@Query() query: HourlyWeatherInputDto) {
    const { lat, lon, hours } = query;

    return this.weatherService.getWeatherByHour(Number(lat), Number(lon), Number(hours));
  }
}
