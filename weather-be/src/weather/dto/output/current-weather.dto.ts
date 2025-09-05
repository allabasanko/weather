import { ApiProperty } from '@nestjs/swagger';
import { WeatherDto } from './weather.dto';
import { IsNumber, IsString } from 'class-validator';

class CurrentUnitsDto {
  @ApiProperty({
    description: 'Time unit',
    example: 'iso8601',
  })
  @IsString()
  time: string;

  @ApiProperty({
    description: 'Interval unit',
    example: 'hours since 1970-01-01 00:00',
  })
  @IsString()
  interval: string;

  @ApiProperty({
    description: 'Temperature unit',
    example: '°C',
  })
  @IsString()
  temperature_2m: string;

  @ApiProperty({
    description: 'Weather code unit',
    example: 'wmo code',
  })
  @IsString()
  weathercode: string;

  @ApiProperty({
    description: 'Windspeed unit',
    example: 'km/h',
  })
  @IsString()
  windspeed_10m: string;
}

class CurrentDto {
  @ApiProperty({
    description: 'Time of the current weather data',
    example: '2023-10-11T14:00',
  })
  @IsString()
  time: string;

  @ApiProperty({
    description: 'Time interval of the current weather data',
    example: 1,
  })
  @IsNumber()
  interval: number;

  @ApiProperty({
    description: 'Current temperature in Celsius',
    example: 20.5,
  })
  @IsNumber()
  temperature_2m: number;

  @ApiProperty({
    description: 'Current weather code',
    example: 3,
  })
  @IsNumber()
  weathercode: number;

  @ApiProperty({
    description: 'Current windspeed in km/h',
    example: 15.0,
  })
  @IsNumber()
  windspeed_10m: number;
}
export class CurrentWeatherDto extends WeatherDto {
  @ApiProperty({
    description: 'Units for the current weather data',
  })
  current_units: CurrentUnitsDto;

  @ApiProperty({
    description: 'Current weather data',
  })
  current: CurrentDto;
}
