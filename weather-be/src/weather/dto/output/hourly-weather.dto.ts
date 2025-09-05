import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { WeatherDto } from './weather.dto';

class HourlyUnitsDto {
  @ApiProperty({
    description: 'Time unit',
    example: 'iso8601',
  })
  @IsString()
  time: string;

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

class HourlyDto {
  @ApiProperty({
    description: 'Time of the hourly weather data',
    example: ['2023-10-11T14:00', '2023-10-11T15:00'],
  })
  @IsString({ each: true })
  time: string[];

  @ApiProperty({
    description: 'Temperature values for each hour',
    example: [20.5, 21.0],
  })
  @IsNumber({}, { each: true })
  temperature_2m: number[];

  @ApiProperty({
    description: 'Weather code values for each hour',
    example: [3, 2],
  })
  @IsNumber({}, { each: true })
  weathercode: number[];

  @ApiProperty({
    description: 'Windspeed values for each hour',
    example: [15.0, 10.0],
  })
  @IsNumber({}, { each: true })
  windspeed_10m: number[];
}

export class HourlyWeatherDto extends WeatherDto {
  hourly_units: HourlyUnitsDto;
  hourly: HourlyDto;
}
