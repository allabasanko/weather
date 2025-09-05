import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginInputDto {
  @ApiProperty({
    description: 'Username for login',
    example: 'user1',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password for login',
    example: 'password1',
  })
  @IsString()
  password: string;
}
