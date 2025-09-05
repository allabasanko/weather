import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class WeatherDto {
  @ApiProperty({
    description: 'Latitude of the location',
    example: 37.7749,
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  latitude: number;

  @ApiProperty({
    description: 'Longitude of the location',
    example: -122.4194,
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  longitude: number;

  @ApiProperty({
    description: 'Time when the data was generated',
    example: 1697049600,
  })
  @IsNumber()
  generationtime_ms: number;

  @ApiProperty({
    description: 'UTC offset in seconds',
    example: -25200,
  })
  @IsNumber()
  utc_offset_seconds: number;

  @ApiProperty({
    description: 'Timezone of the location',
    example: 'America/Los_Angeles',
  })
  @IsString()
  timezone: string;

  @ApiProperty({
    description: 'Abbreviation of the timezone',
    example: 'PDT',
  })
  @IsString()
  timezone_abbreviation: string;

  @ApiProperty({
    description: 'Elevation of the location in meters',
    example: 16.0,
  })
  @IsNumber()
  elevation: number;
}
