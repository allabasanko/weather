import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { WeatherByCityInputDto } from './weather-by-city.dto';

export class HourlyWeatherInputDto extends WeatherByCityInputDto {
  @ApiProperty({
    description: 'Number of hours for the forecast (1-48)',
    example: 12,
    minimum: 1,
    maximum: 48,
  })
  @IsNumber()
  @Type(() => Number)
  hours: number;
}
