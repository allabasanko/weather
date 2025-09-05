import { ApiProperty } from '@nestjs/swagger';
import { WeatherDto } from './weather.dto';
import { IsArray, IsNumber, IsString } from 'class-validator';

class DailyUnitsDto {
  @ApiProperty({
    description: 'Time unit',
    example: 'iso8601',
  })
  @IsString()
  time: string;

  @ApiProperty({
    description: 'Maximum temperature unit',
    example: '°C',
  })
  @IsString()
  temperature_2m_max: string;

  @ApiProperty({
    description: 'Minimum temperature unit',
    example: '°C',
  })
  @IsString()
  temperature_2m_min: string;

  @ApiProperty({
    description: 'Weather code unit',
    example: 'wmo code',
  })
  @IsString()
  weathercode: string;

  @ApiProperty({
    description: 'Maximum windspeed unit',
    example: 'km/h',
  })
  @IsString()
  windspeed_10m_max: string;
}

class DailyDto {
  @ApiProperty({ description: 'Dates for forecast', example: ['2025-09-02', '2025-09-03'] })
  @IsArray()
  @IsString({ each: true })
  time: string[];

  @ApiProperty({ description: 'Max daily temperatures', example: [22.5, 21.4] })
  @IsArray()
  @IsNumber({}, { each: true })
  temperature_2m_max: number[];

  @ApiProperty({ description: 'Min daily temperatures', example: [12, 14.9] })
  @IsArray()
  @IsNumber({}, { each: true })
  temperature_2m_min: number[];

  @ApiProperty({ description: 'Daily weather codes', example: [3, 65] })
  @IsArray()
  @IsNumber({}, { each: true })
  weathercode: number[];

  @ApiProperty({ description: 'Max daily windspeed (km/h)', example: [14, 19.8] })
  @IsArray()
  @IsNumber({}, { each: true })
  windspeed_10m_max: number[];
}

export class DailyWeatherDto extends WeatherDto {
  @ApiProperty({
    description: 'Units for the daily weather data',
  })
  daily_units: DailyUnitsDto;
  daily: DailyDto;
}
