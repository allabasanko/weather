import { ApiProperty } from '@nestjs/swagger';
import { WeatherByCityInputDto } from './weather-by-city.dto';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class DailyWeatherInputDto extends WeatherByCityInputDto {
  @ApiProperty({
    description: 'Number of days for the forecast (1-7)',
    example: 3,
    minimum: 1,
    maximum: 7,
  })
  @IsNumber()
  @Type(() => Number)
  days: number;
}
