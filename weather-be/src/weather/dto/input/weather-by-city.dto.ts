import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class WeatherByCityInputDto {
  @ApiProperty({
    description: 'Latitude of the location',
    example: 37.7749,
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @Type(() => Number)
  @Min(-90)
  @Max(90)
  lat: number;

  @ApiProperty({
    description: 'Longitude of the location',
    example: -122.4194,
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  @Type(() => Number)
  @Min(-180)
  @Max(180)
  lon: number;
}
